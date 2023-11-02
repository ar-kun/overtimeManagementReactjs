import axios from 'axios';

export const getOvertime = (token, callback) => {
 axios
  .get('https://localhost:7166/api/Overtime', {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  })
  .then((res) => {
   //  console.log(res.data.data);
   callback(true, res.data.data);
  })
  .catch((res) => {
   callback(false, res);
  });
};

export const getOvertimeById = (token, id, callback) => {
 axios
  .get(`https://localhost:7166/api/Overtime/${id}`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  })
  .then((res) => {
   console.log(res.data.data);
   callback(true, res.data.data);
  })
  .catch((res) => {
   callback(false, res);
  });
};

export const createOvertime = (token, data, callback) => {
 axios
  .post('https://localhost:7166/api/Overtime', data, {
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
