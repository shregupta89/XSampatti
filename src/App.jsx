import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LandingPage from './pages/LandingPage'
import { Toaster } from './components/ui/toaster'
import Dashboard from './pages/Dashboard'
import ReminderPage from './pages/ReminderPage'
import Layout from './Layout'
import DetailedExpenses from './pages/DetailedExpenses'

function App() {


  return (
    <>
    {/* <Layout> */}
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route element={<PrivateRoutes/>}> */}
      {/* </Route> */}
      <Route path="/" element={<Layout />}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/reminders' element={<ReminderPage/>}/>
        <Route path='/expenses' element={<DetailedExpenses/>}/>
      </Route>
     
     
    </Routes>
    {/* </Layout>/ */}
    <Toaster/>
    </>
  )
}

export default App
