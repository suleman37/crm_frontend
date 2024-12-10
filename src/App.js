import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dash";
import Attendence from "./Pages/Attendence";
import Profile from "./Pages/profile";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Monthly from "./Pages/monthly";
import CheckOutThankYouPage from "./Pages/Thankyou";

const Layout = () => {
  const location = useLocation();
  const noHeaderOrSidebarPaths = ["/", "/register"];

  const shouldHideHeaderAndSidebar = noHeaderOrSidebarPaths.includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideHeaderAndSidebar && <Header />}
      <div style={{ display: "flex" }}>
        {!shouldHideHeaderAndSidebar && <Sidebar />}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendence />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/last" element={<CheckOutThankYouPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;