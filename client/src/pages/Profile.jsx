import React, { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePosts from "../components/ProfilePosts";

function Profile() {

  const [username,setUsername]= useState("")
  const [email,setEmail]= useState("")
  const {setUser} = useContext(UserContext)
  const userId=useParams().id
  const navigate=useNavigate();
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)

  const fetchCredentials=async()=>{
    try{
      const res =await axios.get(URL+"/api/user/"+userId)
      setUsername(res.data.username)
      setEmail(res.data.email)
    }
    catch(err){
      console.log(err)
    }
  }
  const fetchUserPosts=async ()=>{
    try{
      const res=await axios.get(URL+"/api/post/user/"+userId)
      setPosts(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchCredentials();
  }, [userId]);

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  const handleUpdate=async()=>{
    setUpdated(false)
    try{
      const res= await axios.put(URL+"/api/user/"+userId,{username,email},{withCredentials:true})
      setUpdated(true)
    }
    catch(err){
      setUpdated(false)
      console.log(err)
    }

  } 

  const handleDelete=async()=>{
    try{
    const res= await axios.delete(URL+"/api/user/"+userId,{withCredentials:true})
    setUser(null)
    navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div className="px-8 md:px-[100px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[500%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-6 md:text-lg">Your posts:</h1>
          {posts?.map((p)=>(
            <ProfilePosts key={p._id} p={p}/>
          ))}

        </div>
        <div className="flex justify-start md:justify-end items-start md:w-[30% ] w-full md:items-end">
        <div className="flex flex-col space-y-4 items-start">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input
            className="outline- none px-4 py-2 text-gray-500"
            placeholder="Your username"
            type="text"
            onChange={
              (e)=>setUsername(e.target.value)
            }
            value={username}
          />
          <input
            className="outline- none px-4 py-2 text-gray-500"
            placeholder="Your email"
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
          />
          {/* <input
            className="outline- none px-4 py-2 text-gray-500 "
            placeholder="Your password"
            type="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            value={""}
          /> */}
          <div className="flex items-center space-x-4 mt-8">
            <button onClick={handleUpdate} className="bg-black text-white px-4 py-2 hover:text-black hover:bg-gray-300">
              Update
            </button>
            
            <button onClick={handleDelete} className="bg-black text-white px-4 py-2 hover:text-black hover:bg-gray-300">
              Delete
            </button>

            </div>
            
            {updated &&
              <h3 className="text-green-500 text-sm text-center mt-4">User Updated</h3>}
              
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
