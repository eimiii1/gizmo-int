import {Navigate, Route, Routes} from 'react-router'
import Login from '@/pages/Login.tsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </>
  )
}

export default App