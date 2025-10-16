import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import DeleteEvent from "./pages/DeleteEvent";
import CreateVolunteer from "./pages/CreateVolunteer";
import LoginVolunteer from "./pages/LoginVolunteer";
import EventsSignUpPage from "./pages/EventsSignUpPage";
import EventsDashboardPublic from "./pages/EventsDashboardPublic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="/DeleteEvent" element={<DeleteEvent />} />
        <Route path="/CreateVolunteer" element={<CreateVolunteer />} />
        <Route path="/LoginVolunteer" element={<LoginVolunteer />} />
        <Route path="/EventsSignUpPage" element={<EventsSignUpPage />} />
        <Route path="/EventsDashboardPublic" element={<EventsDashboardPublic/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


