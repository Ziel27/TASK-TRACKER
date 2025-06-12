import Navbar from './components/Navbar'
import LoginPage from './view/LoginPage'
import RegisterPage from './view/RegisterPage'
import Homepage from './view/Homepage'
import TaskPage from './view/TaskPage'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
    <div>
      <Navbar />
      <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }>
            </Route>
          <Route
            path="/:id"
            element={
              <ProtectedRoute>
                <TaskPage />
              </ProtectedRoute>
            } />
        </Routes>
    </div>
    </AuthProvider>
  )
}

export default App