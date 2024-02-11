import {React, useEffect, useState} from 'react'
import axios from "axios";
import { URL } from "../url";
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
// import { useLocation } from "react-router-dom";


function Home() {

  // const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]= useState([])
  const {user}= useContext(UserContext)

  //fetch Backend Posts 
  const fetchPosts=async()=>{
    const res=await axios.get(URL+"/api/post/")
    setPosts(res.data)
  }

  useEffect(()=>{
    fetchPosts()

  },[])
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-4">
        {posts.map((post) => (
          <Link key={post._id} to={user ? `/post/${post._id}` : '/login'} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-3 md:mb-8">
            <BlogCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;