import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserPanel from "./components/UserPanel";
import Sidebar from "./components/Sidebar";
import Home from "./components/Profile"; // Home bileşenini import ettik
import Settings from "./components/Settings"; // Home bileşenini import ettik
import { UserProvider } from "./context/UserContext";
import ProfileEdit from "./components/ProfileEdit";
import AddPosts from "./components/AddPosts";
import MyPosts from "./components/MyPosts";
import AllUsers from "./components/AllUsers";
import SidebarAdmin from "./components/SidebarAdmin";
import AdminProfileEdit from "./components/AdminProfileEdit";
import AdminProfileEditLast from "./components/AdminProfileEditLast";
import UserEdit from "./components/UserEdit";

// import { UserProvider } from "../context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* SignIn ve SignUp sayfaları */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Home sayfası */}
        <Route
          path="/userpanel/profile"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <Sidebar />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <Home />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/profile/profileedit"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <Sidebar />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <ProfileEdit />
              </div>
            </div>
          }
        />
        {/* UserPanel sayfası */}
        <Route
          path="/userpanel"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <Sidebar />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <UserPanel />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/settings"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <Sidebar />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <Settings />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/addpost"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <Sidebar />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <AddPosts />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/myposts"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <Sidebar />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <MyPosts />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/allusers"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <SidebarAdmin />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <AllUsers />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/adminprofileedit"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <SidebarAdmin />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <AdminProfileEdit />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/adminprofileedit/adminprofileeditlast"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <SidebarAdmin />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <AdminProfileEditLast />
              </div>
            </div>
          }
        />
        <Route
          path="/userpanel/useredit"
          element={
            <div className="d-flex" style={{ minHeight: "100vh" }}>
              <SidebarAdmin />
              <div
                className="main-content p-4"
                style={{ flex: 1, marginLeft: "200px" }}
              >
                <UserEdit />
              </div>
            </div>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
