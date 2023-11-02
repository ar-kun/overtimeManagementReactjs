import axios from 'axios';

export const getApproval = (token, callback) => {};

export const getApprovalById = (token, id, callback) => {};

export const createApproval = (token, data, callback) => {
 axios
  .post('https://localhost:7166/api/Approval', data, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  })
  .then((res) => {
   console.log(res.data.data);
   callback(true, res.data.data);
  })
  .catch((err) => {
   callback(false, err);
  });
};

export const updateApproval = (token, id, data, callback) => {};

export const deleteApproval = (token, id, callback) => {};
