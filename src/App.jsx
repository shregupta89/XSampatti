import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LandingPage from './pages/LandingPage'
import { Toaster } from './components/ui/toaster'
import Dashboard from './pages/Dashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import ReminderPage from './pages/ReminderPage'
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route element={<PrivateRoutes/>}> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
      {/* </Route> */}
      <Route path='/reminders' element={<ReminderPage/>}/>

     
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
