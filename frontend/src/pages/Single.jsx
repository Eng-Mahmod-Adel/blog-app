import './single.css'
import Sidebar from '../components/sidebar/Sidebar'
import SinglePost from '../components/singlepost/SinglePost'
import Topbar from '../components/topbar/TopBar';

export default function Single() {
  return (
    <>
    <Topbar/>
    <div className='single'>
      <SinglePost/>
      <Sidebar/>
    </div>
    </>
  )
}
