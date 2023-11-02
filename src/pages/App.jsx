/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { faqs } from './../Utils/data';
import { Link } from 'react-router-dom';
import { IsLoggedIn } from '../hooks/isLogin';

function FAQItem({ answer, question }) {
 const [isOpen, setIsOpen] = useState(false);

 const handleFaqs = () => {
  setIsOpen(!isOpen);
 };

 return (
  <div className="w-full">
   <div onClick={handleFaqs} className="flex  justify-between gap-2 items-center bg-third px-5 py-3 text-white rounded-xl relative z-10">
    <p className="text-lg ">{question}</p>
    <i className={`fa-solid  fa-angle-${isOpen ? 'up' : 'down'} text-3xl`}></i>
   </div>
   <div
    className={`bg-secondary p-5 ${
     isOpen ? 'scale-y-100' : 'hidden'
    } text-white rounded-b-xl overflow-hidden transform scale-y-0 origin-top transition-all duration-500 -mt-3 `}
   >
    <p>{answer}</p>
   </div>
  </div>
 );
}

export const App = () => {
 const [navbarVisible, setNavbarVisible] = useState(false);
 const [navScroll, setNavScroll] = useState('');
 const [isModalOpen, setModalOpen] = useState(false);
 const { isLogin, username } = IsLoggedIn();

 const handleScroll = () => {
  if (window.pageYOffset > 50) {
   setNavbarVisible(true);
   setNavScroll('bg-secondary bg-opacity-75 backdrop-blur-md shadow-md shadow-slate-500 text-primary');
  } else {
   setNavbarVisible(false);
   setNavScroll('');
  }
 };

 useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
   window.removeEventListener('scroll', handleScroll);
  };
 }, []);

 const openModal = () => {
  setModalOpen(!isModalOpen);
 };

 const handleLogout = () => {
  localStorage.removeItem('isLogin');
  localStorage.removeItem('token');
  window.location.href = '/';
 };

 return (
  <>
   <header>
    <nav
     className={`${navbarVisible ? navScroll : ''} hidden fixed lg:flex justify-end items-center gap-14 w-full px-32 py-5 z-20 transition-all`}
     id="navbar"
    >
     <ul className="flex justify-between gap-10 items-center text-2xl">
      <li className="group">
       <a
        href="#home"
        className="group-hover:text-secondary duration-700 after:block after:origin-left after:scale-x-0 after:border-b-4 after:border-third after:pb-1 after:transition-all after:content-[''] hover:after:scale-x-100"
       >
        Home
       </a>
      </li>
      <li className="group">
       <a
        href="#"
        className="group-hover:text-secondary duration-700 after:block after:origin-left after:scale-x-0 after:border-b-4 after:border-third after:pb-1 after:transition-all after:content-[''] hover:after:scale-x-100"
       >
        About
       </a>
      </li>
      <li className="group">
       <a
        href=""
        className="group-hover:text-secondary duration-700 after:block after:origin-left after:scale-x-0 after:border-b-4 after:border-third after:pb-1 after:transition-all after:content-[''] hover:after:scale-x-100"
       >
        FAQs
       </a>
      </li>
      <li className="group">
       <a
        href=""
        className="group-hover:text-secondary duration-700 after:block after:origin-left after:scale-x-0 after:border-b-4 after:border-third after:pb-1 after:transition-all after:content-[''] hover:after:scale-x-100"
       >
        Contact
       </a>
      </li>
     </ul>
     {isLogin ? (
      <>
       <div type="button" onClick={openModal} className="w-14 h-1/4 bg-white rounded-full cursor-pointer">
        <img src="./images/profile.png" alt="" className="" />
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
      </>
     ) : (
      <Link
       to={'/auth/login'}
       className="bg-third px-2 py-1 lg:px-10 lg:rounded-full relative z-10 text-primary rounded-md text-xl shadow-md shadow-slate-500 hover:shadow-none hover:bg-secondary transition-all -mt-2"
      >
       Login
      </Link>
     )}
    </nav>
   </header>
   <main>
    <section id="head" className="min-h-screen flex flex-col justify-between">
     <div className="container text-center mt-10 lg:absolute lg:top-1/3 lg:right-[8%] lg:w-1/3" id="headCaptions">
      <h1 className="text-3xl lg:text-4xl font-bold">Overtime Management</h1>
      <p className="lg:text-xl font-light mb-10 mt-3">
       Lorem ipsum dolor sit amet consectetur. Ac eleifend pellentesque est sit. Libero praesent ornare posuere eu nulla ut quam lacus aenean.
      </p>
      <a
       href="login.html"
       className="bg-third px-5 py-2 lg:px-10 lg:rounded-full relative z-10 text-primary rounded-md text-xl shadow-md shadow-slate-500 hover:shadow-none hover:bg-secondary transition-all"
      >
       Get Started
      </a>
     </div>
     <img src="./images/head-mobile.png" alt="" className="lg:hidden" />
     <img src="./images/head-dekstop.png" alt="" className="hidden lg:block" />
    </section>
    <section id="widget" className="bg-secondary h-28 lg:mx-32 -mt-4 lg:-mt-14 z-10 relative rounded-lg"></section>
    <section id="about" className="lg:ms-32 mr-0 lg:my-24">
     <h1 className="font-secondary text-4xl lg:text-5xl text-center my-10">About</h1>
     <div className="lg:flex justify-between items-center">
      <div className="lg:w-[40%] text-xl [&>p]:my-8 [&>p]:indent-10 text-justify px-[18px] lg:px-0">
       <p>
        Lorem ipsum dolor sit amet consectetur. Maecenas et feugiat erat aenean suspendisse. Leo et purus sit ut urna in. Nisi sagittis platea neque
        consequat dolor eget fermentum. Sed ac rutrum nam quis. Hac sit cursus malesuada ipsum consectetur tempus. Ullamcorper egestas volutpat
        fermentum volutpat in nulla ut. Id sed ultrices magna dis eu lacus aliquam neque.
       </p>
       <p>
        Lorem ipsum dolor sit amet consectetur. Maecenas et feugiat erat aenean suspendisse. Leo et purus sit ut urna in. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quam maxime odio nulla voluptatem incidunt ea.
       </p>
      </div>
      <div className="w-full lg:w-[45%] flex justify-end">
       <img src="./images/about.png" alt="" className="w-[80%] lg:w-full" />
      </div>
     </div>
    </section>
    <section id="faqs" className="lg:mx-32 mr-0 lg:my-24">
     <h1 className="font-secondary text-4xl lg:text-5xl text-center my-10">FAQs</h1>
     <div className="mx-[18px] lg-mx-0 flex flex-col gap-5 justify-between items-center">
      {faqs.map((faq) => (
       <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
     </div>
    </section>
    <section id="contact" className="lg:me-32 mr-0 lg:my-24">
     <h1 className="font-secondary text-4xl lg:text-5xl text-center my-10">Contact</h1>
     <div className="lg:flex justify-between items-center">
      <div className="w-full lg:w-[45%] flex justify-start">
       <img src="./images/contact.png" alt="" className="w-[80%] lg:w-full" />
      </div>
      <div className="lg:w-[40%] text-xl [&>p]:my-8 [&>p]:indent-10 px-[18px] lg:px-0">
       <div className="flex items-center">
        <i className="fa-solid fa-chevron-left"></i>
        <div className="border-b-2 border-slate-700 border-dashed w-full"></div>
       </div>
       <p className="text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse beatae odio aliquam minus accusantium eveniet placeat, quaerat laboriosam rem
       </p>
       <form>
        <div className="relative z-0 w-full mb-6 group rounded-b-lg bg-secondary px-5 shadow-md shadow-slate-500">
         <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
         />
         <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:bg-third peer-focus:p-[0.4rem] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
         >
          Email address
         </label>
        </div>
        <div className="relative z-0 w-full mb-6 group rounded-b-lg bg-secondary px-5 shadow-md shadow-slate-500">
         <textarea
          name="floating_message"
          id="floating_message"
          cols="30"
          rows="4"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
         ></textarea>
         <label
          htmlFor="floating_message"
          className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:bg-third peer-focus:p-[0.4rem] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
         >
          Message
         </label>
        </div>
        <div className="bg-third rounded-xl text-center hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-third dark:hover:bg-bg-secondary dark:focus:ring-secondary shadow-md shadow-slate-500">
         <button type="submit" className="text-white">
          Submit
         </button>
        </div>
       </form>
      </div>
     </div>
    </section>
   </main>
   <footer className="h-44 bg-secondary lg:px-32 pt-10 text-white">
    <div className="container flex gap-10">
     <div className="w-[40%] flex gap-5">
      <i className="fa-solid fa-location-dot text-2xl"></i>
      <p>APL Tower lt.37 Suite 1-8 Jl. Letjen S. Parman Kav. 28 Kel. Tanjung Duren Selatan Kec. Grogol Petamburan Kota Administrasi Jakarta Barat</p>
     </div>
     <div className="w-[15%] flex flex-col gap-3">
      <div className="flex items-center gap-5">
       <i className="fa-brands fa-whatsapp text-2xl"></i>
       <p>+62 811 19 500900</p>
      </div>
      <div className="flex items-center gap-5">
       <i className="fa-solid fa-phone text-2xl"></i>
       <p>+62 21 2934 5777</p>
      </div>
     </div>
     <div className="w-[15%] flex gap-5 text-third">
      <div className="h-12 w-12 rounded-full bg-[#D1D9E5] flex items-center justify-center shadow-md shadow-slate-500 hover:bg-third hover:text-white hover:shadow-none">
       <i className="fa-brands fa-linkedin-in text-2xl"></i>
      </div>
      <div className="h-12 w-12 rounded-full bg-[#D1D9E5] flex items-center justify-center shadow-md shadow-slate-500 hover:bg-third hover:text-white hover:shadow-none">
       <i className="fa-brands fa-instagram text-2xl"></i>
      </div>
      <div className="h-12 w-12 rounded-full bg-[#D1D9E5] flex items-center justify-center shadow-md shadow-slate-500 hover:bg-third hover:text-white hover:shadow-none">
       <i className="fa-brands fa-twitter text-2xl"></i>
      </div>
     </div>
     <div className="w-[20%] h-20 overflow-hidden">
      <img src="./images/logo.png" alt="" className="" />
     </div>
    </div>
    <p className="text-center mt-5">Copyright by @arkun. 2023 Alright</p>
   </footer>
  </>
 );
};
