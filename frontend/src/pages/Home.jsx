import Header from '../components/header/Header'
import Posts from '../components/posts/Posts'
import Sidebar from '../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './home.css'
import Topbar from '../components/topbar/TopBar'

export default function Home() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  useEffect(() => {
    const fatchPost = () => {
        axios.get('/posts' + search)
      .then((result) => {
        setPosts(result.data);
        
      }).catch((err) => {
        // console.log(err)
      });
    }
    fatchPost()
  }, [search])
  
  return (
    <>
    <Topbar/>
    <Header/>
    <div className='home'>
      <Posts posts={posts}/>
      <Sidebar/>
    </div>
    </>
  )
}
