import { useContext } from "react";
import { React, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title,setTitle]= useState("")
  const [desc,setDesc]= useState("")
  const [file,setFile]= useState(null)
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  
  const deleteCategory = (i) => {
  let updatedcats = [...cats];
  updatedcats.splice(i, 1);
  setCats(updatedcats);
};
  const addCategory = () => {
    let updatedcats = [...cats];
    updatedcats.push(cat);
    setCat("");
    setCats(updatedcats);
  };
  
  const handleCreate=async(e)=>{
    e.preventDefault();
    const post = {
      title,
      desc,
      username:user.username,
      userId:user._id,
      categories:cats
    }

    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo=filename
      
      //Image upload
      try{
        const imgUpload= await axios.post(URL+"/api/upload",data)
        console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    
    //Post Upload
    try{
      const res=await axios.post(URL+"/api/post/create",post,{withCredentials:true})
      navigate("/post/"+res.data._id)
    }
    catch(err) {
    console.log(err)
    }
  }
  

  return (
    <div className="px-6 md:px-[50px] mt-8">
      <h1 className="font- bold md: text-2xl text-x1 px-3 md:px-[10px]">
        Create a post
      </h1>
      <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
        <input
          onChange={
            (e)=>{
              setTitle(e.target.value)
            }
          }
          type="text"
          placeholder="Enter post title"
          className="px-4 py-2 outline-none"
        />
        <input onChange={
            (e)=>{
              setFile(e.target.files[0])
            }
          } 
          type="file" className="px-4" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input
              onChange={(e) => setCat(e.target.value)}
              className="px-4 py-2 outline-none"
              placeholder="Enter post category"
              type="text"
            />
            <div
              onClick={addCategory}
              className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
            >
              Add
            </div>
          </div>
          <div className="flex px-4 mt-4 mb-6">
            {cats?.map((c,i) => (
              <div
                key={i}
                className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
              >
                <p>{c}</p>
                <p
                   onClick={() => deleteCategory(i)}
                  className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                >
                  <ImCross />
                </p>
              </div>
            ))}
          </div>
        </div>

        <textarea
          onChange={
            (e)=>{
              setDesc(e.target.value)
            }
          }
          rows={5}
          cols={30}
          className="px-4 py-2 outline-none"
          placeholder="Enter Post Description"
        />
        <button onClick={handleCreate} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg mt-2">
          Create
        </button>       
      </form>
    </div>
  );
}

export default CreatePost;
