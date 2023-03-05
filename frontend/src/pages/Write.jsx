import Topbar from "../components/topbar/TopBar";
import { useState } from "react";
import axios  from 'axios'
import "./write.css";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const {user} = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      axios.post('/upload', data)
      .then((result) => {
        
      }).catch((err) => {
        
      });
    }
    axios.post('/posts', newPost)
    .then((result) => {
      window.location.replace('/post/'+ result.data._id)
    }).catch((err) => {
      
    });
  }
  return (
    <>
    <Topbar/>
    <div className="write">
    {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input 
            id="fileInput" 
            type="file" 
            style={{ display: "none" }} 
            onChange={(e) => setFile(e.target.files[0])}
           />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
    </>
  );
}
