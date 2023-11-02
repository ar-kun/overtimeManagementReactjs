/* eslint-disable react/prop-types */
import { Button } from '../elements/button/Index';
import { useState } from 'react';
// import { DarkMode } from '../../context/darkMode';
import { Link } from 'react-router-dom';

export const Navbar = ({ username, buttonText, name, handlerOnlick, data = [] }) => {
 //  const { darkMode, setDarkMode } = useContext(DarkMode);
 const [isModalOpen, setModalOpen] = useState(false);
 const [listOpen, setListOpen] = useState(false);

 const handleLogout = () => {
  localStorage.removeItem('isLogin');
  localStorage.removeItem('token');
  window.location.href = '/';
 };

 const openModal = () => {
  setModalOpen(!isModalOpen);
 };

 const openList = () => {
  setListOpen(!listOpen);
 };

 return (
  <div className="">
   <div className="flex flex-wrap justify-between items-center mb-5">
    <h1 className="text-3xl font-bold">Overtime Management</h1>
    <div className="flex gap-5 items-center">
     {name == 'schedule' ? (
      <>
       <div
        onClick={openList}
        className="bg-third px-5 py-3 rounded-xl shadow-md text-white shadow-slate-600 hover:bg-secondary hover:shadow-none cursor-pointer"
       >
        List Overtime
       </div>
       <div className={`${listOpen ? '' : 'hidden'} absolute left-0 top-28 w-full  h-4/5 flex items-center`}>
        <div className={` relative z-30 w-full overflow-x-auto shadow-md sm:rounded-lg`}>
         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
           <tr>
            <th scope="col" className="p-4">
             <div className="flex items-center">
              <input
               id="checkbox-all"
               type="checkbox"
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all" className="sr-only">
               checkbox
              </label>
             </div>
            </th>
            <th scope="col" className="px-6 py-3">
             Product name
            </th>
            <th scope="col" className="px-6 py-3">
             Color
            </th>
            <th scope="col" className="px-6 py-3">
             Category
            </th>
            <th scope="col" className="px-6 py-3">
             Price
            </th>
           </tr>
          </thead>
          <tbody>
           {data.map((item) => (
            <tr key={item.guid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <td className="w-4 p-4">
              <div className="flex items-center">
               <input
                id="checkbox-table-1"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
               />
               <label htmlFor="checkbox-table-1" className="sr-only">
                checkbox
               </label>
              </div>
             </td>
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.guid}
             </th>
             <td className="px-6 py-4">{item.duration} hours</td>
             <td className="px-6 py-4">{item.remarks}</td>
             <td className="px-6 py-4">{item.dateRequest}</td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
        <div className="h-full w-full top-0 absolute bg-opacity-75 backdrop-blur-md shadow-md shadow-slate-500 bg-secondary rounded-lg"></div>
       </div>
      </>
     ) : null}

     {name == 'employee' ? (
      <div
       onClick={handlerOnlick}
       className="bg-third px-5 py-2 rounded-lg shadow-md text-white shadow-slate-600 hover:bg-secondary hover:shadow-none"
      >
       Register Employee
      </div>
     ) : (
      <Button
       text={buttonText}
       className="bg-third px-5 py-2 rounded-lg shadow-md text-white shadow-slate-600 hover:bg-secondary hover:shadow-none"
      />
     )}

     <a href="">
      <i className="fa-regular fa-bell text-2xl"></i>
     </a>
     <div type="button" onClick={openModal} className="w-14 h-1/4 bg-white rounded-full cursor-pointer">
      <img src="/images/profile.png" alt="" className="" />
     </div>
     {isModalOpen && (
      <div id="profile-modal" tabIndex="-1" aria-hidden="true" className="fixed top-24 p-5 z-50  overflow-x-hidden overflow-y-auto">
       <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-md shadow-slate-400 dark:bg-gray-700">
         <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={openModal}
         >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
         </button>
         <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">{username}</h3>
         </div>
         <div className="p-6">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Welcome back, You can manage your account here</p>
          <ul className="my-4 space-y-3">
           <li>
            <Link
             to={'/dashboard/schedule'}
             className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
             <i className="fa-solid fa-calendar text-secondary"></i>
             <span className="flex-1 ml-3 whitespace-nowrap">Schedule</span>
             <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              Overtime
             </span>
            </Link>
           </li>
           <li>
            <Link
             to={'/dashboard/overtime'}
             className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
             <i className="fa-solid fa-receipt"></i>
             <span className="flex-1 ml-3 whitespace-nowrap">Overtime</span>
             <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              Request
             </span>
            </Link>
           </li>
           <li>
            <Link
             to={'/dashboard/employees'}
             className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
             <i className="fa-regular fa-rectangle-list"></i>
             <span className="flex-1 ml-3 whitespace-nowrap">Emoloyes</span>
             <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              List
             </span>
            </Link>
           </li>
          </ul>
          <div className="text-center">
           <div
            onClick={handleLogout}
            className="inline-flex items-center gap-3 text-md font-normal text-gray-500 hover:underline dark:text-gray-400 cursor-pointer"
           >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Logout
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     )}
    </div>
    <div className="border-b-2 border-slate-700 border-dashed w-full"></div>
   </div>
  </div>
 );
};
