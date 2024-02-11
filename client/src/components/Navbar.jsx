import React, { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { UserContext } from '../context/UserContext';
import {FaBars} from 'react-icons/fa'
import Menu from './Menu';


function Navbar() {
  const {user} = useContext(UserContext);
  const [menu,setMenu]=useState(false) 
  const [prompt,setPrompt]=useState("")
  const showMenu=()=>{
    setMenu(!menu)
  }
  
  const navigate= useNavigate()

  return (
    <div className="flex items-center justify-between px-4 md:px-6 lg:px-12 py-4">
      <h1 className="text-xl font-extrabold">
        <Link to="https://thebloger.netlify.app/">TheBloger</Link>
      </h1>
      <div className="hidden md:flex items-center space-x-2 md:space-x-4">
      <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><CiSearch/></p>        <input
          onChange={(e)=>{
            setPrompt(e.target.value)
          }}
          className="outline-none px-2 py-1 rounded-md"
          placeholder="Search a post"
        ></input>
      </div>
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
      {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
      {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:<h3><Link to="/register">Register</Link></h3>}
    </div>
    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>
    </div>
    
  );
}

export default Navbar;
