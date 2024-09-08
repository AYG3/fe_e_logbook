import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Logbook from './pages/Logbook';
import CreateEntry from './pages/CreateEntry';
import EditEntry from './pages/EditEntry';
import DeleteEntry from './pages/DeleteEntry';
import DetailsEntry from './pages/DetailsEntry';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <Toaster />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/logbooks' element={<Logbook />}/>
      <Route path='/create' element={<CreateEntry/>}/>
      <Route path='/details/:entryId' element={<DetailsEntry/>}/>
      <Route path='/edit/:id' element={<EditEntry/>}/>
      <Route path='/delete/:id' element={<DeleteEntry/>}/>
    </Routes>
    </>
  )
}

export default App;
