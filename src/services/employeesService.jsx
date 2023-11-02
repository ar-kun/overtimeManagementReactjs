import axios from 'axios';

export const getEmployees = (token, callback) => {
 axios
  .get('https://localhost:7166/api/Employee', {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  })
  .then((res) => {
   //  console.log(res.data.data);
   callback(true, res.data.data);
  })
  .catch((res) => {
   return res;
  });
};

export const getEmployeeById = (token, id, callback) => {
 axios
  .get(`https://localhost:7166/api/Employee/${id}`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  })
  .then((res) => {
   // console.log(res.data.data);
   callback(true, res.data.data);
  })
  .catch((res) => {
   callback(false, res);
  });
};

export const createEmployee = (token, data, callback) => {
 axios
  .post('https://localhost:7166/api/Employee', data, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  })
  .then((res) => {
   //  console.log(res.data.data);
   callback(true, res.data.data);
  })
  .catch((err) => {
   callback(false, err);
  });
};
