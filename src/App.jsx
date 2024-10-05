import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Logbook from './pages/Logbook';
import CreateEntry from './pages/CreateEntry';
import EditEntry from './pages/EditEntry';
import DeleteEntry from './pages/DeleteEntry';
import DetailsEntry from './pages/DetailsEntry';
import Layout from './components/Layout';
import AdminLogin from './pages/admin/adminLogin';
import { Toaster } from 'sonner';
import AdminSignUp from './pages/admin/adminSignup';
import UsersList from './pages/admin/UsersList';
import StudentLogbook from './pages/admin/studentLogbook';
import Navbar from './components/shared/navbar';
import ConfirmUserDelete from './pages/admin/ConfirmUserDelete';
import AdminHome from './pages/admin/AdminHome';
import UserProfile from './pages/UserProfile';
import UserAuthContext from './context/user/UserAuthContext';
import AdminAuthContext from './context/admin/AdminAuthContext';
import AdminNavbar from './components/shared/AdminNavbar';
import UserNavbar from './components/shared/UserNavbar';

const App = () => {
  const { isAdmin } = useContext(AdminAuthContext)
  const { isLoggedIn } = useContext(UserAuthContext)
  return (
    <>
    <Toaster />
    <Layout>
      {isAdmin ? AdminNavbar : isLoggedIn ? UserNavbar : null}
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/navbar' element={<Navbar/>} /> */}
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/logbooks' element={<Logbook />}/>
        <Route path='/userprofile/:id' element={<UserProfile />}/>
        <Route path='/create' element={<CreateEntry/>}/>
        <Route path='/details/:entryId/:rIndex' element={<DetailsEntry/>}/>
        <Route path='/edit/:id' element={<EditEntry/>}/>
        <Route path='/delete/:id' element={<DeleteEntry/>}/>
        {/* ADMIN ROUTES */}
        <Route path='/adminHome' element={< AdminHome />}/>
        <Route path='/adminlogin' element={< AdminLogin />}/>
        <Route path='/adminsignup' element={< AdminSignUp />}/>
        <Route path='/adminprofile/:id' element={<UserProfile />}/>
        <Route path='/users' element={< UsersList />}/>
        <Route path='/confirmUserDelete/:userId' element={<ConfirmUserDelete />}/>
        <Route path='/userslogbook/:userId/:userName' element={< StudentLogbook />}/>

      </Routes>
      {/* <UploadWidget /> */}
    </Layout>
    </>
  )
}

export default App;