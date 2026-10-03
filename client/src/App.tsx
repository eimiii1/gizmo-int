import {Navigate, Route, Routes, Outlet } from 'react-router'
import Auth from './pages/Auth'
import MainPage from './pages/MainPage'

const App = () => {
  const Protected = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      return <Navigate to='/auth' replace />
    }

    return <Outlet />
  }

  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      
      <Route element={<Protected />}>
        <Route path='/' element={<MainPage />} />
      </Route>
    </Routes>
  )
}

export default App