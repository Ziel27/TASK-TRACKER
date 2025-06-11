import Navbar from './components/Navbar'
import LoginPage from './view/LoginPage'
import RegisterPage from './view/RegisterPage'
import Homepage from './view/Homepage'
import TaskPage from './view/TaskPage'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/:id" element={<TaskPage />} />
        </Routes>
    </div>
  )
}

export default App