import React from 'react'
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import AdminHeader from '../../components/Layout/admin/adminheader'
import "./Admindashboard.css"


const Orders = () => {
  return (
    <body className='body'>
      <div className="container-fluid ">
        <div className="row">
          <AdminHeader />

          <AdminSidebar />

          <div className="col-md-3">
            <div>
              <h3>Orders</h3>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Orders