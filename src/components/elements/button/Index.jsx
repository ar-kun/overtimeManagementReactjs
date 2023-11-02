/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export const Button = (props) => {
 const { variant = 'h-10 px-6 font-semibold rounded-md w-full bg-blue-600 text-white', text = '....', onClick } = props;
 return (
  <div className="bg-third rounded-xl text-center hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-third dark:hover:bg-bg-secondary dark:focus:ring-secondary shadow-md shadow-slate-500">
   <button className="text-white text-lg" type="submit" onClick={onClick}>
    {text}
   </button>
  </div>
 );
};
