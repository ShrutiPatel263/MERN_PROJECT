import React from 'react'
import './App.css'
import Homepage from './pages/HomePage.jsx'
import SignupPage from './pages/signupPage.jsx'
import {Route,Routes} from 'react-router-dom';
import LoginPage from './pages/loginPage.jsx';
import CreatePostPage from './pages/createPostPage.jsx';
import DashboardPage from './pages/dashboardPage.jsx';
import ForgotPasswordPage from './pages/forgotPasswordPage.jsx';
function App() {
   return (
     
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      
   )
}

export default App;
