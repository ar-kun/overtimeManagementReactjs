import { useState } from 'react';

export const CreateOvertimeModal = () => {
 const [modalData, setModalData] = useState({
  open: false,
  date: null,
  month: null,
  year: null,
 });

 const modalHandler = ({ day, month, year, open }) => {
  setModalData({
   date: day,
   month: month,
   year: year,
   open: open,
  });
 };
 const closeModal = () => {
  setModalData((prevModalData) => ({
   ...prevModalData,
   open: false,
  }));
 };
 return { modalData, modalHandler, closeModal };
};
