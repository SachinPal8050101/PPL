import React,{useState,createContext} from 'react'
import Layout from './Component/Layout'
import Home from './Component/Home'
import FeaturesBar from './Component/FeaturesBar'
import LogIn from './Component/LogIn'
import Header from './Component/Header'
import Register from './Component/Register'
import ResetPassword from './Component/ResetPassword'
import SinglePost from './Component/SinglePost'
import Timeline from './Component/Timeline'
import ForgotPassword from './Component/ForgotPassword'
import {BrowserRouter as Router,Route,Link,Switch  } from 'react-router-dom'
import UploadPostContent from './Component/UploadPostContent'
export const MyContext=createContext()
function App() {
  const [resultAllPost,setresultAllPost] = useState([])
  const [LogInData,setLogInData] = useState({
    email:'',
    password:''
  })  
  let LsUser=localStorage.getItem('LogInUser');
  console.log(LsUser)
  if(LsUser!==null){
    LsUser=JSON.parse(LsUser);
  }else{
    LsUser=[]
  }
    const [user,setLogInUser]=useState(LsUser)
  return (
    <div>
         <Router>
         <MyContext.Provider value={user}> 
         <Layout>
           <Switch>
             <Route exact  path="/login"  > <LogIn LogInData={LogInData} setLogInData={setLogInData} setLogInUser={setLogInUser}/></Route>
             <Route exact  path="/">
               {
                 user && user._id!==undefined ? <Home resultAllPost={resultAllPost} setresultAllPost={setresultAllPost} />:<LogIn setLogInUser={setLogInUser}/>
               }
             </Route>
             <Route exact  path="/timeline" component={Timeline}/>
             <Route exact  path="/register"><Register setLogInUser={setLogInUser}/></Route>
             <Route exact  path="/forgotpassword/resetpassword/:id"><ResetPassword  setLogInData={setLogInData} setLogInUser={setLogInUser}/></Route>
             <Route exact  path="/forgotpassword" component={ForgotPassword} />
             <Route exact  path="/uploadpostcontent">
               {
                 user && user._id!==undefined ? <UploadPostContent/>:<LogIn setLogInUser={setLogInUser}/>
               }
             </Route>
           </Switch>
           </Layout>
           </MyContext.Provider>
         </Router>
         
        
    </div>
  )
}

export default App
