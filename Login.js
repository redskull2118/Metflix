import { useNavigate, useLocation , Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {firebaseconfig} from './firebaseconfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

const Login=()=>{
  const app= initializeApp(firebaseconfig);
  const navigate=useNavigate();
  const location = useLocation()
  const page = location.pathname === '/login' ?true:false;
  // console.log(location);
  const[isemailuse,setemailuse]=useState(false);
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[isuserexist,setuserexist]=useState(false);
  const[emailvalid,setemailvalid]=useState(true);
  const[passwordvalid,setpasswordvalid]=useState(true);
  const validation = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };
  const auth=getAuth();
  const signIn = (e)=>{
    e.preventDefault();
    if(!validation('email', email) || !validation('password', password)){
      setemailvalid(validation('email', email));
      setpasswordvalid(validation('password', password));
      return;
    }
    if(page)
    {
      signInWithEmailAndPassword(auth,email,password)
    .then(auth =>{
      if(auth)
      {
        navigate('/dashboard');
      }
    })
    .catch(error=>setuserexist(true));
    }
    else{
      createUserWithEmailAndPassword(auth,email,password)
      .then(
        auth=>{
          if(auth){
            navigate('/dashboard')
          }
        }
      )
      .catch(error=>setemailuse(true));
    }
 
  }
  useEffect(()=>{
    setemailuse(false);
    setuserexist(false);
  },[location])
  const onemailchange=(e)=>{
setEmail(e.target.value);
  }

  const onpasswordchange=(e)=>{
    setPassword(e.target.value);
  }


   return(
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page? "Sign In ": "Register"}</h1>
        <br/>
        <form>
          <input className="form-control" value={email} onChange={onemailchange} type="email" placeholder="Email"/>
          {!emailvalid && <p className="text-danger">Email is Invalid</p>}
          <input className="form-control" value={password} onChange={onpasswordchange} type="password" placeholder="Password"/>
          {!passwordvalid && <p className="text-danger">Password is Invalid</p>}
           <button className="btn btn-danger btn-block" onClick={signIn}>{page? "Sign In ": "Register"}</button>
          <br/>
         {page && <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              Remember Me
            </label>
          </div>}
             
       
        </form>
        <br/>
        <br/>
        { isuserexist && <p className="text-danger">
          user does not exist
        </p>}
        { isemailuse  && <p className="text-danger">
          Email already in use | Go to Sign In 
        </p>}
        
       <div className="login-form-other">
          <div className="login-signup-now">
          {page? "New to Netflix": "Existing User"} &nbsp;
            <Link className=" " to={page? '/register' :'/login'}>
              {page? "Sign Up Now": "Sign In"}
              </Link>
             
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
   )
}

export default Login;