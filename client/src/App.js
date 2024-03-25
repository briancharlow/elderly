import React from "react";
import LoginForm from "./Pages/Login/login";
import CaregiverSignUpForm from "./Pages/Signup/caregiver";
import GuardianSignUpForm from "./Pages/Signup/guardian";
import CaregiversList from "./Components/CenterOutlet/centeroutlet";
import Home from "./Pages/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CaregiverDetails from "./Components/Caregiver/CaregiverDetails";
import Logout from "./Components/Logout/Logout";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/caregiver" element={<CaregiverSignUpForm />} />
        <Route path="/guardian" element={<GuardianSignUpForm />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<CaregiversList />} />
          <Route path="/home/caregiver/:id" element={<CaregiverDetails />} />
          <Route path="/home/logout" element={<Logout />} />

          {/* <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/profilePage" element={<ProfilePage />} /> */}


        </Route>
      </Routes>
    </Router>
  );
};

export default App;
