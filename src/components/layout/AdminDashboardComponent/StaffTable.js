import React, { useEffect } from 'react';
import '../../pages/AdminDashboard/AdminDashboard.css'
import { FaEdit } from "react-icons/fa";

const StaffTable = ({handleUpdateStaff}) => {
  return (
    <div className='tableDesign'>
    <table className='student-tableArrangement'>
       <thead>
         <tr>
           <th>No</th>
           <th className='expand'>Name</th>
           <th>Department</th>
           <th>Username</th>
           <th>Password</th>
           <th>Edit</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>1</td>
           <td>name 1</td>
           <td>Civil</td>
           <td>Njdshg</td>
           <td>********</td>
           <td><button onClick={handleUpdateStaff} className='EditButton'><FaEdit className='EditIcon'/></button></td>
         </tr>
         <tr>
         <td>2</td>
           <td>Name 2</td>
           <td>sdjhss</td>
           <td>kjfued</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>3</td>
           <td>Name 3</td>
           <td>shdygsd</td>
           <td>skdguys</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
         <td>4</td>
           <td>Name 4</td>
           <td>skdfud</td>
           <td>sfhuss</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>5</td>
           <td>Name 5</td>
           <td>kshufs</td>
           <td>ksdfhus</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>6</td>
           <td>Name 6</td>
           <td>kdfjhyd</td>
           <td>sdfjguys</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
         <td>7</td>
           <td>Name 7</td>
           <td>sdfysg</td>
           <td>hfduysfg</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>8</td>
           <td>Name 8</td>
           <td>djfuhfds</td>
           <td>dfkjhi</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
         <td>9</td>
           <td>Name 9</td>
           <td>sndbhfusd</td>
           <td>sdkfjhi</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>10</td>
           <td>Name 10</td>
           <td>dmfjhbf</td>
           <td>fjh</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>11</td>
           <td>Name 11</td>
           <td>jshdgusy</td>
           <td>sjdhfs</td>
           <td>********</td>
           <td><button className='EditButton'><FaEdit className='EditIcon'/></button></td>
         </tr>
         <tr>
         <td>12</td>
           <td>Name 12</td>
           <td>asdkjbha</td>
           <td>sdfjhsifd</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>13</td>
           <td>Name 13</td>
           <td>sjdfhuf</td>
           <td>xckvhx</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
         <td>14</td>
           <td>Name 14</td>
           <td>Txchbx</td>
           <td>kjxhfd</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>15</td>
           <td>Name 15</td>
           <td>Mosdfjh</td>
           <td>kjfewhif</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
         <tr>
           <td>16</td>
           <td>Name 1</td>
           <td>sjdhb</td>
           <td>rffdcs</td>
           <td>********</td>
           <td><button><FaEdit /></button></td>
         </tr>
       </tbody>
     </table>
 </div>
  );
}

export default StaffTable;
