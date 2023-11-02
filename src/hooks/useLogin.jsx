import { useEffect, useState } from 'react';
import { getUsername } from '../services/authService';

export const useLogin = () => {
 const [username, setUsername] = useState('');

 useEffect(() => {
  if (localStorage.getItem('token')) {
   setUsername(getUsername(localStorage.getItem('token')));
  } else {
   window.location.href = '/auth/login';
  }
 }, []);
 return username;
};
