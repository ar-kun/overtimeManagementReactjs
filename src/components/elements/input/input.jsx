/* eslint-disable react/display-name */
import { forwardRef } from 'react';

/* eslint-disable react/prop-types */
export const Input = forwardRef((props, ref) => {
 const { type, name } = props;
 return (
  <input
   type={`${type}`}
   className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
   placeholder=" "
   name={`${name}`}
   id={`${name}`}
   ref={ref}
   required
  />
 );
});
