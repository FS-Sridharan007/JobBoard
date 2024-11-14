// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllJobsPage from './pages/AllJobsPage';       // New full job list page
import JobListingsPage from './pages/JobListingsPage'; // Page for search results
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import PostJob from './pages/PostJob';
import JobDetailPage from './pages/JobDetailPage';
import Footer from './components/Footer';
import JobApplicationForm from './components/JobApplicationForm';
import ProfilePage from './pages/ProfilePage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import ProfileUpdatePage from './pages/ProfileUpdatePage';

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<AllJobsPage />} />  {/* Shows all jobs */}
          <Route path="/joblistings" element={<JobListingsPage />} /> {/* Shows search results */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/account-settings" element={<JobApplicationForm />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="/update-profile" element={<ProfileUpdatePage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/post job" element={<PostJob />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
