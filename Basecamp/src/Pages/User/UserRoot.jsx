import { Outlet } from 'react-router'
import Navbar from '../../Components/User/Navbar.jsx'
import Footer from '../../Components/User/Footer.jsx'
function UserRoot() {
  return (
    <div>
    <Navbar/>
     <Outlet/>
    <Footer/>
    </div>
  )
}

export default UserRoot