/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import JSZip from 'jszip'; // For Excel export
import PDFMake from 'pdfmake'; // For PDF export

import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import { Navbar } from '../components/layouts/Navbar';
import { useLogin } from '../hooks/useLogin';
import { createEmployee, getEmployees } from '../services/employeesService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useManager } from '../hooks/useManager';

export const Employees = () => {
 const manager = useManager();
 if (manager !== 'manager') {
  window.location.href = '/unauthorized';
  return null;
 }

 const [registerOpen, setRegisterOpen] = useState(false);
 const [dataEmployee, setDataEmployee] = useState([]);
 const username = useLogin();
 const tableRef = useRef(null);
 DataTable.Buttons.jszip(JSZip);
 DataTable.Buttons.pdfMake(PDFMake);

 useEffect(() => {
  getEmployees(localStorage.getItem('token'), (status, data) => {
   if (status) {
    setDataEmployee(data);
   }
  });
 }, []);

 const openRegister = () => {
  setRegisterOpen(!registerOpen);
 };

 useEffect(() => {
  let table;

  if (tableRef.current) {
   // Setelah komponen dipasang, inisialisasi DataTable setelah data dimuat
   setTimeout(() => {
    table = $(tableRef.current).DataTable({
     dom: 'Bfrtip',
     buttons: [
      {
       extend: 'copyHtml5',
       exportOptions: {
        columns: [0, ':visible'],
       },
      },
      {
       extend: 'excelHtml5',
       exportOptions: {
        columns: ':visible',
       },
      },
      {
       extend: 'pdfHtml5',
       exportOptions: {
        columns: [0, 1, 2, 5],
       },
      },
      'colvis',
     ],
    });
   }, 1000);
  }
  // Cleanup: Hancurkan DataTable saat komponen tidak lagi ada
  return () => {
   if (table) {
    table.destroy();
   }
  };
 }, [dataEmployee]);

 const handleEmployee = (e) => {
  e.preventDefault();
  const data = {
   firstName: e.target.floating_first_name.value,
   lastName: e.target.floating_last_name.value,
   birthDate: e.target.floating_birthdate.value,
   gender: parseInt(e.target.floating_genre.value),
   hiringDate: e.target.floating_hiredate.value,
   email: e.target.floating_email.value,
   phoneNumber: e.target.floating_phone.value,
   salary: e.target.floating_salary.value,
   managerNik: e.target.floating_managerNik.value,
   password: e.target.floating_password.value,
   confirmPassword: e.target.floating_repeat_password.value,
  };
  console.log(data);
  createEmployee(localStorage.getItem('token'), data, (status) => {
   if (status) {
    Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Register employee success',
     showConfirmButton: true,
    });
    setTimeout(() => {
     window.location.reload();
    }, 2500);
   } else {
    Swal.fire({
     position: 'center',
     icon: 'error',
     title: 'Register employee failed',
     showConfirmButton: true,
     timer: 2500,
    });
   }
  });
 };

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
       <div className="border-b-2 border-primary w-full mb-4"></div>
      </div>
     </>
    )}
   </section>
   <section className="w-4/5 backdrop-blur-md text-third px-10 relative rounded-2xl" id="overtimeRequest">
    <Navbar username={username} buttonText="Register Employee" handlerOnlick={openRegister} name="employee" />
    {registerOpen && (
     <div className="flex justify-center">
      <form onSubmit={handleEmployee} className="absolute w-1/2 p-5 text-white bg-secondary z-30 rounded-lg">
       <div className="flex justify-between items-center text-lg font-bold mb-5">
        <h2>Register Employee</h2>
        <i className="fa-solid fa-xmark cursor-pointer text-xl" onClick={openRegister}></i>
       </div>
       <div className="relative z-0 w-full mb-6 group">
        <input
         type="email"
         name="floating_email"
         id="floating_email"
         className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
         placeholder=" "
         required
        />
        <label
         htmlFor="floating_email"
         className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         Email address
        </label>
       </div>
       <div className="relative z-0 w-full mb-6 group">
        <input
         type="password"
         name="floating_password"
         id="floating_password"
         className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
         placeholder=" "
         required
        />
        <label
         htmlFor="floating_password"
         className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         Password
        </label>
       </div>
       <div className="relative z-0 w-full mb-6 group">
        <input
         type="password"
         name="repeat_password"
         id="floating_repeat_password"
         className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
         placeholder=" "
         required
        />
        <label
         htmlFor="floating_repeat_password"
         className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         Confirm password
        </label>
       </div>
       <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="text"
          name="floating_first_name"
          id="floating_first_name"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_first_name"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          First name
         </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="text"
          name="floating_last_name"
          id="floating_last_name"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_last_name"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Last name
         </label>
        </div>
       </div>
       <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="tel"
          name="floating_phone"
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_phone"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Phone number (123-456-7890)
         </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="text"
          name="floating_managerNik"
          id="floating_managerNik"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          // required
         />
         <label
          htmlFor="floating_managerNik"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Manager NIK
         </label>
        </div>
       </div>
       <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="number"
          name="floating_salary"
          id="floating_salary"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_salary"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Salary
         </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="number"
          name="floating_genre"
          id="floating_genre"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_genre"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Gender
         </label>
        </div>
       </div>

       <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="date"
          name="floating_birthdate"
          id="floating_birt"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_birt"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Birthdate
         </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
         <input
          type="date"
          name="floating_hiredate"
          id="floating_h"
          className="block py-2.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-pritext-primary peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_h"
          className="peer-focus:font-medium absolute text-sm text-primary dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
          Hiring date
         </label>
        </div>
       </div>

       <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pritext-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       >
        Submit
       </button>
      </form>
     </div>
    )}
    <div className="border-2 border-slate-500 rounded-lg p-5 relative">
     <table ref={tableRef} className="display">
      <thead>
       <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Action</th>
       </tr>
      </thead>
      <tbody>
       {dataEmployee.length > 0 &&
        dataEmployee.map((employee) => (
         <tr key={employee.guid}>
          <td>
           {employee.firstName} {employee.lastName}
          </td>
          <td>{employee.email}</td>
          <td>{employee.phoneNumber}</td>
          <td className="flex gap-3">
           <i className="fa-regular fa-pen-to-square"></i>
           <p>|</p>
           <i className="fa-solid fa-trash"></i>
          </td>
         </tr>
        ))}
      </tbody>
     </table>
    </div>
   </section>
  </main>
 );
};
