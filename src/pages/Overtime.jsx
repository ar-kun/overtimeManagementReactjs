/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import JSZip from 'jszip'; // For Excel export
import PDFMake from 'pdfmake'; // For PDF export

import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import { Navbar } from '../components/layouts/Navbar';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import { getOvertime } from '../services/overtimeService';
import { createApproval } from '../services/approvalService';
import Swal from 'sweetalert2';
import { useManager } from '../hooks/useManager';

export const Overtime = () => {
 const username = useLogin();
 const manager = useManager();

 if (manager !== 'manager') {
  window.location.href = '/unauthorized';
  return null;
 }

 const [dataOvertime, setDataOvertime] = useState([]);
 const tableRef = useRef(null);
 DataTable.Buttons.jszip(JSZip);
 DataTable.Buttons.pdfMake(PDFMake);

 useEffect(() => {
  let table;

  if (tableRef.current) {
   // Setelah komponen dipasang, inisialisasi DataTable setelah data dimuat
   setTimeout(() => {
    table = $(tableRef.current).DataTable({
     dom: 'Bfrtip',
     buttons: [
      {
       extend: 'copyHtml5',
       exportOptions: {
        columns: [0, ':visible'],
       },
      },
      {
       extend: 'excelHtml5',
       exportOptions: {
        columns: ':visible',
       },
      },
      {
       extend: 'pdfHtml5',
       exportOptions: {
        columns: [0, 1, 2, 5],
       },
      },
      'colvis',
     ],
    });
   }, 1000);
  }
  // Cleanup: Hancurkan DataTable saat komponen tidak lagi ada
  return () => {
   if (table) {
    table.destroy();
   }
  };
 }, [dataOvertime]);

 useEffect(() => {
  getOvertime(localStorage.getItem('token'), (status, data) => {
   if (status) {
    setDataOvertime(data);
   }
  });
 }, []);

 const handlerApproval = (e) => {
  e.preventDefault();
  const data = {
   guid: e.target.guid.value,
   approvalStatus: parseInt(e.target.status.value),
   approvedBy: e.target.approvedBy.value,
   remarks: e.target.remarks.value,
  };
  console.log(data);

  Swal.fire({
   title: 'Are you sure?',
   text: "You won't be approve this overtime request!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, approve it!',
  }).then((result) => {
   if (result.isConfirmed) {
    createApproval(localStorage.getItem('token'), data, (status) => {
     if (status) {
      Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Success to approve overtime request',
       showConfirmButton: true,
      });
      setTimeout(() => {
       window.location.reload();
      }, 2500);
     } else {
      Swal.fire({
       position: 'center',
       icon: 'error',
       title: 'Failed to approve overtime request',
       showConfirmButton: true,
       timer: 2500,
      });
     }
    });
   }
  });
 };

 return (
  <main className="flex px-16 gap-10 py-5 max-h-screen">
   <section className="w-1/5 bg-gradient-to-r from-third to-secondary rounded-2xl text-white" id="sidebar">
    <img src="/images/logo.png" alt="" className="px-5 pt-5" />
    <div className="border-b-2 border-primary border-dashed w-full mb-4"></div>
    <div className="px-10 text-xl my-2">
     <Link to={'/dashboard/schedule'} className="flex gap-5">
      <i className="fa-regular fa-calendar-check"></i>
      <p>Dashboard</p>
     </Link>
    </div>
    {manager == 'manager' && (
     <>
      <div className="px-10 text-xl my-2">
       <Link to={'/dashboard/overtime'} className="flex gap-5">
        <i className="fa-regular fa-rectangle-list"></i>
        <p>Overtime</p>
       </Link>
       <div className="border-b-2 border-primary w-full mb-4"></div>
      </div>
      <div className="px-10 text-xl my-2">
       <Link to={'/dashboard/employees'} className="flex gap-5">
        <i className="fa-solid fa-users"></i>
        <p>Employees</p>
       </Link>
      </div>
     </>
    )}
   </section>
   <section className="w-4/5 backdrop-blur-md text-third px-10 relative rounded-2xl" id="overtimeRequest">
    <Navbar username={username} buttonText="History Overtime" />
    <div className="border-2 border-slate-500 rounded-lg p-5 relative">
     <table ref={tableRef} className="display">
      <thead>
       <tr>
        <th>Date Request</th>
        <th>Duration</th>
        <th>Remarks</th>
        <th>Action</th>
       </tr>
      </thead>
      <tbody>
       {dataOvertime.length > 0 &&
        dataOvertime.map(
         (overtime) =>
          overtime.status === 'Requested' && (
           <tr key={overtime.guid}>
            <td>{overtime.dateRequest}</td>
            <td>{overtime.duration}</td>
            <td>{overtime.remarks}</td>
            <td className="flex gap-3">
             <form onSubmit={handlerApproval}>
              <input type="hidden" name="guid" value={overtime.guid} />
              <input type="hidden" name="status" value="1" />
              <input type="hidden" name="approvedBy" value="manager" />
              <input type="hidden" name="remarks" value={overtime.remarks} />

              <button type="submit" className="underline">
               Accept
              </button>
             </form>
             <p>|</p>
             <button type="submit" className="underline">
              Reject
             </button>
            </td>
           </tr>
          )
        )}
      </tbody>
     </table>
    </div>
   </section>
  </main>
 );
};
