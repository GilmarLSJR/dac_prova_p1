import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import DeleteEvent from "./pages/DeleteEvent";
import CreateVolunteer from "./pages/CreateVolunteer";
import LoginVolunteer from "./pages/LoginVolunteer";
import EventsSignUpPage from "./pages/EventsSignUpPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/CreateEvent"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />

        <Route
        path="/DeleteEvent"
        element={
        <PrivateRoute>
          <DeleteEvent />
          </PrivateRoute>
          }
          />
          
          <Route
          path="/CreateVolunteer"
          element={
          <PrivateRoute>
            <CreateVolunteer />
            </PrivateRoute>
            }
            />
            
            <Route
            path="/LoginVolunteer"
            element={
            <PrivateRoute>
              <LoginVolunteer />
              </PrivateRoute>
              }
            />
            
            <Route
            path="/EventsSignUpPage"
            element={
            <PrivateRoute>
              <EventsSignUpPage />
              </PrivateRoute>
              }
              />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
