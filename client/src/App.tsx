import {Navigate, Route, Routes} from 'react-router'
import Auth from './pages/Auth'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/' replace />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App