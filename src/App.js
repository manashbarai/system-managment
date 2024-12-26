

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import UserDashBoard from './page/user/UserDashBoard'
import AdminDashBoard from './page/admin/AdminDashBoard'
import SuperAdminDaashBoard from './page/superAdmin/SuperAdminDaashBoard'
import TeamDashBoard from './component/TeamDashBoard'
import ContactUs from './page/file/ContactUs'
import Pricing from './page/file/Pricing'
import Aboutpage from './page/file/Aboutpage'
import Blog from './page/file/Blog'
import Sales from './page/file/Features/Sales'
import Productivity from './page/file/Features/Productivity'
import Analysis from './page/file/Features/Analysis'


import 'bootstrap/dist/css/bootstrap.min.css';

// import Navbar from './newdesign/Navbar'
import './App.css'
import UserupdatePassword from './page/user/UserupdatePassword'
import Landingpage from './page/Landingpage'
import Navbar from './page/Navbar'
import WithOutTeam from './page/admin/WithOutTeam'
import Finrefy from './page/finrefy/Finrefy'
import RequestDemo from './page/finrefy/tenant/requestDemo/RequestDemo'
import CompanyDashBoard from './page/finrefy/tenant/compnayDashBoard/CompanyDashBoard'


// import NoContextMenu from './NoContextMenu'







const App = () => {

  const userRole = localStorage.getItem('crm_userRole')

  let dashboardComponent;

  if (userRole === '3') {
    dashboardComponent = <UserDashBoard />;
  } else if (userRole === '2') {
    dashboardComponent = <AdminDashBoard />;
  } else if (userRole === '1') {
    dashboardComponent = <SuperAdminDaashBoard />;
  } else {

    dashboardComponent = <Landingpage />;
  }

  return (
    <>
   {/* <NoContextMenu />P */}
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={dashboardComponent} />
          <Route path="/userdashBoard" element={<UserDashBoard />} />
          <Route path="/adminBoard" element={<AdminDashBoard />} />
          <Route path="/superAdmin" element={<SuperAdminDaashBoard />} />
          <Route path="/finrefy" element={<Finrefy />} />
          <Route path="/companyDashBoard" element={<CompanyDashBoard />} />
          <Route path="/team" element={<TeamDashBoard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/adminWithOutTeam" element={<WithOutTeam/>} />
          <Route path="/requestDemo" element={<RequestDemo/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/price" element={<Pricing/>} />
          <Route path="/about" element={<Aboutpage/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/sales" element={<Sales/>} />
          <Route path="/productivity" element={<Productivity/>} />
          <Route path="/analysis" element={<Analysis/>} />
          
          <Route path="/updatePassword/:id" element={<UserupdatePassword />} />
        </Routes>
      </BrowserRouter> 

    </>
  );

}

export default App