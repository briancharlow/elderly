import React from "react";
import LoginForm from "./Pages/Login/login";
import CaregiverSignUpForm from "./Pages/Signup/caregiver";
import GuardianSignUpForm from "./Pages/Signup/guardian";
import CaregiversList from "./Components/CenterOutlet/centeroutlet";
import Home from "./Pages/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/caregiver" element={<CaregiverSignUpForm />} />
        <Route path="/guardian" element={<GuardianSignUpForm />} />
        <Route path="/home" element={<Home />}>
          {/* Render CenterOutlet by default */}
          <Route index element={<CaregiversList />} />
          {/* <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/logout" element={<LogoutPopup />} />
          <Route path="/home/profilePage" element={<ProfilePage />} /> */}


        </Route>
      </Routes>
    </Router>
  );
};

export default App;
