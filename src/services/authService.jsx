/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const Login = (user, callback) => {
 axios
  .post('https://localhost:7166/api/Account/login', user)
  .then((res) => {
   callback(true, res.data.data.token);
  })
  .catch((err) => {
   callback(false, err);
  });
};

export const getUsername = (token) => {
 const decode = jwt_decode(token);
 return decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
};

export const getRole = (token) => {
 const decode = jwt_decode(token);
 return decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
};

export const getGuid = (token) => {
 const decode = jwt_decode(token);
 return decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
};
