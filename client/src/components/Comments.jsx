import React from 'react'
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from '../url';
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
function Comments({c, posts}) {
  
  const {user}=useContext(UserContext)
  const handleDeleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
    
  }

  return (
    
    <div>
         <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2 my-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-600">{c.author}</h3>

            <div className="flex justify-center items-center space-x-4">
              <p className="text-gray-500 text-sm">16/06/2023</p>
              <p className="text-gray-500 text-sm">16:45</p>
              {user?._id===posts?.userId?
               <div className="flex items-center justify-center space-x-2">
                
               {/* <p>
                 <BiEdit />
               </p> */}
               <p className="cursor-pointer" onClick={()=>handleDeleteComment(c._id)}><MdDelete /></p>
             </div>
             :""}
             
            </div>
          </div>
          <p className="px-4 mt-2">{c.comment}</p>
        </div>
    </div>
  )
}

export default Comments