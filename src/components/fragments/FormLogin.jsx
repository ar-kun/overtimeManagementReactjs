/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Button } from '../elements/button/Index';
import { InputForm } from '../elements/input/Index';
import { Login } from '../../services/authService';

export const FormLogin = () => {
 const [loginFailed, setLoginFailed] = useState(false);
 const handleLogin = (e) => {
  e.preventDefault();
  const user = {
   email: e.target.email.value,
   password: e.target.password.value,
  };
  Login(user, (status, res) => {
   if (status) {
    localStorage.setItem('isLogin', true);
    localStorage.setItem('token', res);
    window.location.href = '/dashboard/schedule';
   } else {
    setLoginFailed(res.response.data);
   }
  });
 };

 const emailRef = useRef(null);
 useEffect(() => {
  emailRef.current.focus();
  return () => {};
 }, []);

 return (
  <>
   <form onSubmit={handleLogin}>
    {loginFailed && <p className="text-red-400 font-bold text-center my-3">{loginFailed}</p>}
    <InputForm value="Email" type="text" name="email" ref={emailRef} />
    <InputForm value="Password" type="password" name="password" />
    <div className="flex justify-between">
     <div className="flex items-start mb-6">
      <div className="flex items-center h-5">
       <input
        id="remember"
        type="checkbox"
        value=""
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
       />
      </div>
      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
       Remember me
      </label>
     </div>
     <a href="" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 underline hover:text-blue-300">
      Forgot password ?
     </a>
    </div>
    <Button text="Login" />
    <div className="flex items-center my-5">
     <i className="fa-solid fa-chevron-left"></i>
     <div className="border-b-2 border-slate-700 border-dashed w-full"></div>
    </div>
    <div className="bg-secondary rounded-xl text-center hover:bg-third focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-third dark:hover:bg-bg-secondary dark:focus:ring-secondary shadow-md shadow-slate-500">
     <button type="submit" className="text-white text-lg">
      Login With Google
     </button>
    </div>
   </form>
   {/* <form onSubmit={handleLogin}>
    <InputForm value="email" type="text" name="email" placeholder="example doe" ref={emailRef} />
    <InputForm value="Password" type="password" name="password" placeholder="******" />
    <Button text="Login" />
    {loginFailed && <p className="text-red-400 font-bold text-center my-3">{loginFailed}</p>}
   </form> */}
  </>
 );
};
