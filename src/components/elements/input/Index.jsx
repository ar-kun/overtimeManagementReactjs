/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { Input } from './input';
import { Label } from './label';

export const InputForm = forwardRef((props, ref) => {
 const { type, value, placeholder, name } = props;
 return (
  <div className="relative z-0 w-full mb-6 group rounded-b-lg bg-secondary px-5 shadow-md shadow-slate-500">
   <Input type={`${type}`} placeholder={`${placeholder}`} name={`${name}`} ref={ref} />
   <Label value={`${value}`} htmlFor={`${name}`} />
  </div>
 );
});
