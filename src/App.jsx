import { Route, Routes } from 'react-router-dom';
import UploadWidget from './components/images/UploadWidget';
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

const App = () => {
  return (
    <>
    <Toaster />
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/adminlogin' element={< AdminLogin />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/logbooks' element={<Logbook />}/>
        <Route path='/create' element={<CreateEntry/>}/>
        <Route path='/details/:entryId' element={<DetailsEntry/>}/>
        <Route path='/edit/:id' element={<EditEntry/>}/>
        <Route path='/delete/:id' element={<DeleteEntry/>}/>
      </Routes>
      {/* <UploadWidget /> */}
    </Layout>
    </>
  )
}

export default App;
