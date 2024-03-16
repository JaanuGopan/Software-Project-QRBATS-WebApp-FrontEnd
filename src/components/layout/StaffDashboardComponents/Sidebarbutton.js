import React, { useState } from 'react'
import '../../pages/StaffMainNavigation/StaffMainNavigation.css'

const Sidebarbutton = ({title, titlewithiconicon}) => {
  return (
    <div className='SideBarButton'>
      {titlewithiconicon}
      <p className='SideBarLabel'>{title}</p>
    </div>
  )
}

export default Sidebarbutton