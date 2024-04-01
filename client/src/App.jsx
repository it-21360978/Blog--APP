import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();

//components
import Header from "./Components/navBar";
import HOME from "./Pages/homepage";
import LOGIN from "./Pages/Login";
import SIGNuP from "./Pages/register";
import CONTACT from "./Pages/Contact";
import DASHBOARD from "./Pages/Dashbord";
import EachBlog from "./Components/eachBlog";
import ResetPw from "./Pages/resetPw";
import AddBlog from "./Components/addBlog";
import EditBlog from "./Components/editBlog";
//import Blog from "./Components/blog";
import ForgotPw from "./Pages/forgotPw";
import HideNav from "./Components/hideNav";
import AllBlog from "./Pages/allBlog";
import Comment from "./Components/Comment";
import REply from "./Components/Reply";
import ViewComments from "./Pages/viewComments";
import PRivacy from "./Pages/Privacy";
import ABout from "./Pages/About";
import EditUser from "./Components/editUser";
import Auth from "./Components/Auth-check";









function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} reverseOrder={false} />

      <Router>
        <HideNav>
          <Header/>
        </HideNav>

      {/** public Routes */}
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signUp" element={<SIGNuP />} />
          <Route path="/contact" element={<CONTACT />} />
          <Route path="/privacy" element={<PRivacy />} />
          <Route path="/about" element={<ABout />} />
          <Route path="/reset/:token" element={<ResetPw />} />
          <Route path="/forgot" element={<ForgotPw />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          


          {/* Private Routes*/}
          <Route path="/dashboard" element={<Auth><DASHBOARD /></Auth>}  />
          <Route path="/allBlog" element={<Auth> <AllBlog /> </Auth>} />
          <Route path="/add" element={<Auth> <AddBlog /></Auth>} />
          <Route path="/edit/:id" element={<Auth> <EditBlog /></Auth>} />
          <Route path="/each/:id" element={<Auth> <EachBlog /></Auth>} />
         {/*  <Route path="/comment" element={ <Comment />} /> */}
          <Route path="/:id/viewComments" element={<Auth> <ViewComments /></Auth>} />
          <Route path="/reply" element={<Auth> <REply /></Auth>} />
          <Route path="/:id/editUser" element={<Auth> <EditUser /></Auth>} />
         
          

          {/* If you have a catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}



export default App;
