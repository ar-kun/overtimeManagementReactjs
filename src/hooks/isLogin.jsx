import { useEffect, useState } from 'react';
import { getUsername } from '../services/authService';

export const IsLoggedIn = () => {
 const [isLogin, setIsLogin] = useState(false);
 const [username, setUsername] = useState('');

 useEffect(() => {
  if (localStorage.getItem('token')) {
   setIsLogin(true);
   setUsername(getUsername(localStorage.getItem('token')));
  } else {
   setIsLogin(false);
  }
 }, []);

 return { isLogin, username };
};
