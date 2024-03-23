import React, { useEffect } from 'react';
import '../../pages/AdminDashboard/AdminDashboard.css'
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

const Table = ({handleUpdateEvent}) => {
  useEffect(()=>{
    axios.get('')
    .then(res => console.log(res))
    .catch(er => console.log(er));
  }, [])
  return (
    <div className='tableDesign'>
       <table className='tableArrangement'>
          <thead>
            <tr>
              <th>No</th>
              <th className='expand'>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Time</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Event 1</td>
              <td>Fri 29 Dec</td>
              <td>NCC</td>
              <td>10.00 am</td>
              <td><button onClick={handleUpdateEvent} className='EditButton'><FaEdit className='EditIcon'/></button></td>
            </tr>
            <tr>
            <td>2</td>
              <td>Event 2</td>
              <td>Tue 25 Dec</td>
              <td>LT2</td>
              <td>08.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event 3</td>
              <td>Wed 12 Nov</td>
              <td>OCC</td>
              <td>02.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
            <td>4</td>
              <td>Event 4</td>
              <td>Thus 29 Dec</td>
              <td>NCC</td>
              <td>01.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Event 5</td>
              <td>Mon 29 Dec</td>
              <td>LT1</td>
              <td>10.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>1</td>
              <td>Event 1</td>
              <td>Fri 29 Dec</td>
              <td>NCC</td>
              <td>10.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
            <td>2</td>
              <td>Event 2</td>
              <td>Tue 25 Dec</td>
              <td>LT2</td>
              <td>08.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event 3</td>
              <td>Wed 12 Nov</td>
              <td>OCC</td>
              <td>02.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
            <td>4</td>
              <td>Event 4</td>
              <td>Thus 29 Dec</td>
              <td>NCC</td>
              <td>01.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Event 5</td>
              <td>Mon 29 Dec</td>
              <td>LT1</td>
              <td>10.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>1</td>
              <td>Event 1</td>
              <td>Fri 29 Dec</td>
              <td>NCC</td>
              <td>10.00 am</td>
              <td><button className='EditButton'><FaEdit className='EditIcon'/></button></td>
            </tr>
            <tr>
            <td>2</td>
              <td>Event 2</td>
              <td>Tue 25 Dec</td>
              <td>LT2</td>
              <td>08.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event 3</td>
              <td>Wed 12 Nov</td>
              <td>OCC</td>
              <td>02.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
            <td>4</td>
              <td>Event 4</td>
              <td>Thus 29 Dec</td>
              <td>NCC</td>
              <td>01.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Event 5</td>
              <td>Mon 29 Dec</td>
              <td>LT1</td>
              <td>10.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>1</td>
              <td>Event 1</td>
              <td>Fri 29 Dec</td>
              <td>NCC</td>
              <td>10.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
            <td>2</td>
              <td>Event 2</td>
              <td>Tue 25 Dec</td>
              <td>LT2</td>
              <td>08.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event 3</td>
              <td>Wed 12 Nov</td>
              <td>OCC</td>
              <td>02.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
            <td>4</td>
              <td>Event 4</td>
              <td>Thus 29 Dec</td>
              <td>NCC</td>
              <td>01.00 pm</td>
              <td><button><FaEdit /></button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Event 5</td>
              <td>Mon 29 Dec</td>
              <td>LT1</td>
              <td>10.00 am</td>
              <td><button><FaEdit /></button></td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}

export default Table;