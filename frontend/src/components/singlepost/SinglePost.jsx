import './singlePost.css'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { Context } from '../../context/Context';



export default function SinglePost() {
  const PF = "http://localhost:2200/images/";
  const {user} = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const [title, setTitle] = useState({})
  const [desc, setDesc] = useState({})
  const [updateMode, setUpdateMode] = useState(false)
  useEffect(() => {
    axios.get('/posts/' + path)
    .then((result) => {
      setPost(result.data)
      setTitle(result.data.title)
      setDesc(result.data.desc)
    }).catch((err) => {
      console.log(err)
    });
  }, [path])
  const handleDelete = () => {
    axios.delete('/posts/' + path, {data:{username: user.username}})
    .then((result) => {
      window.location.replace('/')
    }).catch((err) => {
      
    });
  }

  const handleUpdate = () => { 
    axios.put('/posts/' + path, {username: user.username, title, desc})
    .then((result) => {
      setUpdateMode(false)
      window.location.replace()
    }).catch((err) => {
      
    });
   }
   console.log(post._id)
   console.log(user.username)
  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
    {post.photo && (
          <img
          className="singlePostImg"
          src={PF+post.photo}
          alt=""
        />
      )}{ updateMode ? <input 
        type="text" 
        className='
        singlePostTitleInput'
         value={title} 
         onChange={(e)=> setTitle(e.target.value)}
         /> : (

  

      
      <h1 className="singlePostTitle">
        
        {post.title}
        {post.username === user?.username && (
        <div className="singlePostEdit">
          <i className="singlePostIcon far fa-edit" onClick={(e)=> setUpdateMode(true)}></i>
          <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
        </div>
        )}
      </h1>
      )}

      <div className="singlePostInfo">
        <span>
          Author:
          <b className="singlePostAuthor">
            <Link className='link' to={`/?user=${post.username}`}>
              {post.username}
            </Link>
          </b>
        </span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode ? <textarea 
      type="text" 
      className='singlePostDescInput' 
      onFocus={true} value={desc}
      onChange={(e)=> setDesc(e.target.value)}
      /> 

      : (
      <p className="singlePostDesc">
        {post.desc}
      </p>
        )}
        {updateMode &&
        <button className='singlePostButton'  onClick={handleUpdate}>Update</button>
        }
    </div>
  
  </div>


  )
}
