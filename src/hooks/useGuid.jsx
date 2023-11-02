import { useEffect, useState } from 'react';
import { getGuid } from '../services/authService';

export const useGuid = () => {
 const [guid, setGuid] = useState('');

 useEffect(() => {
  if (localStorage.getItem('token')) {
   setGuid(getGuid(localStorage.getItem('token')));
  } else {
   window.location.href = '/auth/login';
  }
 }, []);
 return guid;
};
