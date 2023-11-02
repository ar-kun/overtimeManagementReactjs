/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navbar } from '../components/layouts/Navbar';
import { useLogin } from '../hooks/useLogin';
import { CreateOvertimeModal } from '../hooks/createOvertimeModal';
import { createOvertime, getOvertime } from '../services/overtimeService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useManager } from '../hooks/useManager';
import { useGuid } from '../hooks/useGuid';

export const Schedule = () => {
 const username = useLogin();
 const manager = useManager();
 const isGuid = useGuid();

 const [dataOvertime, setDataOvertime] = useState([]);

 const [activeDate, setActiveDate] = useState(new Date());
 const [month, setMonth] = useState(activeDate.getMonth());
 const [year, setYear] = useState(activeDate.getFullYear());
 const [daysArray, setDaysArray] = useState([]);

 const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

 const { modalData, modalHandler, closeModal } = CreateOvertimeModal();

 const initCalendar = () => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  const newDaysArray = [];

  // Add previous month days
  for (let x = day; x > 0; x--) {
   newDaysArray.push(
    <div key={`prev-${x}`} className="prev-date">
     {prevDays - x + 1}
    </div>
   );
  }

  const daysWithOvertime = dataOvertime.map((overtimeValue) => {
   const date = new Date(overtimeValue.dateRequest);
   return {
    day: date.getDate(),
    month: date.getMonth(),
   };
  });

  console.log(daysWithOvertime);

  // Add current month days
  for (let i = 1; i <= lastDate; i++) {
   const isToday = i === activeDate.getDate() && month === activeDate.getMonth() && year === activeDate.getFullYear();
   const isOvertimeDay = daysWithOvertime.some((overtimeValue) => overtimeValue.day === i && overtimeValue.month === month);

   const classNames = ['hover:bg-secondary/75', 'hover:text-primary', 'rounded-lg', 'py-5', 'px-[3.75rem]'];

   if (isToday) {
    classNames.push('today');
   }

   if (isOvertimeDay) {
    classNames.push('overtime');
   }

   newDaysArray.push(
    <div onClick={() => modalHandler({ day: i, month: months[month], year: year, open: true })} className={classNames.join(' ')} key={`day-${i}`}>
     {i}
    </div>
   );
  }

  // Add next month days
  for (let j = 1; j <= nextDays; j++) {
   newDaysArray.push(
    <div key={`next-${j}`} className="next-date">
     {j}
    </div>
   );
  }

  setDaysArray(newDaysArray);
 };

 useEffect(() => {
  initCalendar();
 }, [year, month]);

 const prevMonth = () => {
  setMonth((prevMonth) => prevMonth - 1);
  if (month < 0) {
   setMonth(11);
   setYear((prevYear) => prevYear - 1);
  }
 };

 const nextMonth = () => {
  setMonth((prevMonth) => prevMonth + 1);
  if (month > 11) {
   setMonth(0);
   setYear((prevYear) => prevYear + 1);
  }
 };

 const goToDate = () => {
  const dateInputValue = document.getElementById('date-input').value;
  const dateArr = dateInputValue.split('/');
  if (dateArr.length === 2) {
   const selectedMonth = parseInt(dateArr[0], 10);
   const selectedYear = parseInt(dateArr[1], 10);

   if (!isNaN(selectedMonth) && !isNaN(selectedYear) && selectedMonth > 0 && selectedMonth < 13 && dateArr[1].length === 4) {
    setMonth(selectedMonth - 1);
    setYear(selectedYear);
    initCalendar();
   } else {
    alert('Invalid Date');
   }
  } else {
   alert('Invalid Date');
  }
 };

 const gotoToday = () => {
  setActiveDate(new Date());
  setMonth(activeDate.getMonth());
  setYear(activeDate.getFullYear());
 };

 const getDayOfWeek = (date) => {
  // console.log(date);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = new Date(date).getDay();
  // console.log(dayIndex);
  return daysOfWeek[dayIndex];
 };

 const handleOvertime = (e) => {
  e.preventDefault();
  const data = {
   employeeGuid: '0A1D8DF8-A07F-4593-E073-08DBD93ACFAB',
   dateRequest: e.target.floating_date.value,
   duration: e.target.floating_duration.value,
   remarks: e.target.floating_remarks.value,
   //  type: e.target.floating_type.value,
  };
  createOvertime(localStorage.getItem('token'), data, (status) => {
   if (status) {
    Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Request overtime schedule success',
     showConfirmButton: true,
    });
    setTimeout(() => {
     window.location.reload();
    }, 2500);
   } else {
    Swal.fire({
     position: 'center',
     icon: 'error',
     title: 'Request overtime schedule failed',
     showConfirmButton: true,
     timer: 2500,
    });
   }
  });
 };

 useEffect(() => {
  getOvertime(localStorage.getItem('token'), (status, data) => {
   if (status) {
    manager !== 'manager'
     ? setDataOvertime(data.filter((item) => item.status === 'Approved' && item.employeeGuid === isGuid))
     : setDataOvertime(data.filter((item) => item.status === 'Approved'));
   }
  });
 }, []);

 return (
  <main className="flex px-16 gap-10 py-5 max-h-screen">
   <section className="w-1/5 bg-gradient-to-r from-third to-secondary rounded-2xl text-white" id="sidebar">
    <img src="/images/logo.png" alt="" className="px-5 pt-5" />
    <div className="border-b-2 border-primary border-dashed w-full mb-4"></div>
    <div className="px-10 text-xl my-2">
     <Link to={'/dashboard/schedule'} className="flex gap-5">
      <i className="fa-regular fa-calendar-check"></i>
      <p>Dashboard</p>
     </Link>
     <div className="border-b-2 border-primary w-full mb-4"></div>
    </div>
    {manager == 'manager' && (
     <>
      <div className="px-10 text-xl my-2">
       <Link to={'/dashboard/overtime'} className="flex gap-5">
        <i className="fa-regular fa-rectangle-list"></i>
        <p>Overtime</p>
       </Link>
      </div>
      <div className="px-10 text-xl my-2">
       <Link to={'/dashboard/employees'} className="flex gap-5">
        <i className="fa-solid fa-users"></i>
        <p>Employees</p>
       </Link>
      </div>
     </>
    )}
   </section>
   <section className="w-4/5 backdrop-blur-md text-third px-10 py-10 relative rounded-2xl" id="schedule">
    <div className="">
     <Navbar username={username} buttonText="Transkip Gaji" name="schedule" data={dataOvertime} />
     <div>
      <div className="">
       <div className="flex justify-between" id="month">
        <i className="fa-solid fa-chevron-left" id="prev" onClick={prevMonth}></i>
        <p className="text-2xl" id="date">
         {months[month]} {year}
        </p>
        <i className="fa-solid fa-chevron-right" id="next" onClick={nextMonth}></i>
       </div>
       <div className="flex px-[20px] [&>p]:w-[calc(100%/7)] [&>p]:flex [&>p]:items-center [&>p]:justify-center [&>p]:text-xl py-5" id="weekdays">
        <p>Sun</p>
        <p>Mon</p>
        <p>Tue</p>
        <p>Wed</p>
        <p>Thu</p>
        <p>Fri</p>
        <p>Sat</p>
       </div>
       <div
        className="w-full flex flex-wrap justify-between py-0 px-[20px] text-lg font-bold mb-[20px] [&>*]:w-[calc(100%/7)] [&>*]:h-[70px] [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:cursor-pointer"
        id="days"
       >
        {daysArray}
       </div>
       <div className="flex justify-between" id="goto-today">
        <div className="flex items-center bg-third px-3 py-2 gap-5 rounded-md shadow-md shadow-slate-600">
         <input
          type="text"
          placeholder="mm/yyyy"
          className="py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
          id="date-input"
         />
         <button className="bg-primary p-2 text-third rounded-md hover:bg-secondary hover:text-primary" onClick={goToDate}>
          Go
         </button>
        </div>
        <button className="hover:text-third" onClick={gotoToday}>
         Today
        </button>
       </div>
      </div>

      <div
       id=""
       tabIndex="-1"
       aria-hidden="true"
       className={`${
        modalData.open ? ' ' : 'hidden'
       } absolute bg-secondary/50 w-full h-full top-0 left-0 flex justify-center items-center ease-out transition-all duration-300 backdrop-blur-md text-primary rounded-xl`}
      >
       <div className="bg-third w-1/2 rounded-lg p-5 relative shadow-md shadow-slate-500">
        <div className="flex px-5 py-2 gap-5" id="today-date">
         <div className="" id="event-date">
          {modalData.date ? getDayOfWeek(new Date(`${modalData.year}-${modalData.month}-${modalData.date}`)) : ''}, {modalData.date}th{' '}
          {modalData.month} {modalData.year}
         </div>
        </div>
        <div className="absolute right-0 top-0 text-3xl p-5" onClick={() => closeModal()}>
         <i className="fas fa-times"></i>
        </div>
        <div className="" id="events"></div>
        <div className="flex items-center" id="add-event-wrapper">
         <form onSubmit={handleOvertime} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
           <input
            type="date"
            name="floating_date"
            id="floating_date"
            className=" py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={`${new Date(`${modalData.year}-${modalData.month}-${modalData.date + 1}`).toISOString().split('T')[0]}`}
            required
            readOnly
           />
          </div>
          <div className="relative z-0 w-full mb-6 group">
           <input
            type="number"
            name="floating_duration"
            id="floating_duration"
            className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
           />
           <label
            htmlFor="floating_duration"
            className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
           >
            Duration
           </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
           <input
            type="text"
            name="floating_remarks"
            id="floating_remarks"
            className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
           />
           <label
            htmlFor="floating_remarks"
            className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
           >
            Remarks
           </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
           <input
            type="number"
            name="floating_type"
            id="floating_type"
            className="py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={`${
             new Date(`${modalData.year}-${modalData.month}-${modalData.date}`).getDay() === 0 ||
             new Date(`${modalData.year}-${modalData.month}-${modalData.date}`).getDay() === 6
              ? 1
              : 0
            }`}
            required
            readOnly
           />
          </div>

          <div className="group bg-primary rounded-xl text-center hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-third dark:hover:bg-bg-secondary dark:focus:ring-secondary shadow-md shadow-slate-500">
           <button type="submit" className="text-third text-lg group-hover:text-primary">
            Send Request Overtime
           </button>
          </div>
         </form>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </main>
 );
};
