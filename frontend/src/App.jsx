import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './web-pages/LoginPage'
import SignupPage from './web-pages/SignupPage'
import Main from './web-pages/Main'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import { AuthProvider } from './hooks/useAuth'

function App() {

  return (
    <>
      <div className='pageWrapper'>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<ProtectedRoute><Main /></ProtectedRoute>} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
      
    </>
  )
}

export default App
