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
import ConfirmUserDelete from './pages/admin/ConfirmUserDelete';
import AdminHome from './pages/admin/AdminHome';
import UserProfile from './pages/UserProfile';
import AdminDetailsEntry from './pages/admin/AdminDetailsEntry';

const App = () => {
  
  return (
    <>
    <Toaster />
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
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
        <Route path='/adminDetails/:entryId/:rIndex' element={<AdminDetailsEntry/>}/>
      </Routes>
      {/* <UploadWidget /> */}
    </Layout>
    </>
  )
}

export default App;