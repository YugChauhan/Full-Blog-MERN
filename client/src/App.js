import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PostDetails from "./components/PostDetails";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import Myblogs from "./pages/Myblogs";

function App() {
  return (
    <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/post/:id" element={<PostDetails />}></Route>
            <Route exact path="/write" element={<CreatePost/>}></Route>
            <Route exact path="/edit/:id" element={<EditPost />}></Route>
            <Route exact path="/profile/:id" element={<Profile />}></Route>
            <Route exact path="/myblogs/:id" element={<Myblogs />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
