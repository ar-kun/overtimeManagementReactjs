/* eslint-disable react/prop-types */
export const Label = (props) => {
 const { value, htmlFor } = props;
 return (
  <label
   htmlFor={`${htmlFor}`}
   className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:bg-third peer-focus:p-[0.4rem] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
  >
   {value}
  </label>
 );
};
