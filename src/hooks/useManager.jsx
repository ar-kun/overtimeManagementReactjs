import { useEffect, useState } from 'react';
import { getRole } from '../services/authService';

export const useManager = () => {
 const [isManager, setIsManager] = useState('');

 useEffect(() => {
  if (localStorage.getItem('token')) {
   setIsManager(getRole(localStorage.getItem('token')));
  } else {
   window.location.href = '/auth/login';
  }
 }, []);
 return isManager;
};
