// import React, { useState, useEffect } from 'react';
// import './signup.css'
// import API from '../../../Resources/api';
// import Axios from 'axios'
// import {Link} from 'react-router-dom'
// import { UseAppContext } from '../../../Context/app-context'
// import Alert from '@mui/material/Alert';

// const Signup =()=>{
//     const {loggedIn} = UseAppContext()
//     const [error, setError] = useState({status: false, msg :''})
//     const [formValues, setFormValues] = useState({
//         firstname : "",
//         lastname : "",
//         username : '',
//         email : '',
//         password1 : "",
//         password2 : "",
//     })
  
//   const handleError = (status, message) => {
//     setError({status : status, msg : message})
//   };
 
//     const setValues =(e)=>{
//         let name = e.target.name
//         let value = e.target.value
//         if(name=='username'){
//             value = value.replace(/\s+/g, '')
//         }
//         setFormValues(prev => {
//             return{...prev, [name] : value}
//         })
//     }    

//     const signUp = async(e)=>{

//       try{
//         e.preventDefault()
//         const { firstname, lastname, username, email, password1, password2} = formValues
       
//           if(!firstname){
//             setError({status : true, msg : "Please enter Your first name"})
//             setTimeout(()=>{
//                return setError({status : false, msg :''})
//             }, 4000)
//          }else if(!lastname){
//             setError({status : true, msg : "Please enter Your last name"})
//             setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         }else if(!username){
//             setError({status : true, msg : "Please enter Your Username"})
//             setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         }else if(!email){
//             setError({status : true, msg : "Please enter Your E-mail"})
//             setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         }else if(password2.length == 0 || password1.length == 0){
//             setError({status : true, msg : "Please enter and comfirm your password"})
//             setTimeout(()=>{
//                 setError({status : false, msg :''})
//             }, 4000)
//         } else if(password2.length < 8 || password1.length < 8){
//           handleError(true, "Password Must be 8 characters or longer")
//           setTimeout(()=>{
//               setError({status : false, msg :''})
//           }, 4000)
//       }else{
//               if(password2 !== password1){
//                 handleError(true, "Password Mismatch")
//                 setTimeout(()=>{
//                     setError({status : false, msg :''})
//                 }, 4000)
//              }else{
//               const options = {
//                   url: `${API}/auth/sign-up`,
//                   method : "POST",
//                   headers : {
//                       "Accept" : "application/json",
//                       "Content-Type" : "application/json"
//                   },
//                   data:{
//                       firstname : firstname, 
//                       lastname : lastname,
//                       username : username,
//                       email : email,
//                       password : password1
//                   }
//               }
  
//               setTimeout(()=>{
//                 setError({status : true, msg :"Please check your network connection"})
//               },10000)
//               setTimeout(()=>{
//                 setError({status : false, msg :""})
//               },16000)
//               const result = await Axios(options)
//               const {response, user} = result.data
              
//               if(response === 'Success'){
//                   return window.location.href = `/profiling/${user._id}`
//               }else if(response === 'Fail'){
//                   const {message} = result.data
//                   handleError(true, message)
//                   setTimeout(()=>{
//                       setError({status : false, msg :''})
//                   }, 4000)
//               }
//             }
//           }
//       }catch(error){
//         handleError(true, error.message)
//       }

//     }

//     useEffect(() => {
//         window.scrollTo(0, 0)
//       }, [])
    

//     if(loggedIn == "true"){
//       return window.location.href = `/`
//     }
    
//     return (
//     <div className='signup' >
//         {
//             error.status && <div className='alert' style={{position:"absolute"}}>
//             <Alert severity="error">{error.msg}</Alert>
//           </div>
//           }
//         <div className='signup-heading' xs={12} sm={6}>
//             <h2 className='title'>Home Workout and Analytics</h2>
//         </div>     

//         <div className='signup-form' xs={12} sm={6} >
//             <div>
//                  <h4 className='sign-up-title'>Sign Up</h4>
//                  <input className='signup-input' value ={formValues.firstname}  onChange={setValues} type='text' name='firstname' placeholder='Firstname'/>
//                  <input className='signup-input' value ={formValues.lastname}  onChange={setValues} type='text' name='lastname' placeholder='Lastname'/>
//                 <input className='signup-input' value ={formValues.username}  onChange={setValues} type='text' name='username' placeholder='Username'/>
//                 <input className='signup-input' value ={formValues.email}  onChange={setValues} type='email' name='email' placeholder='E-Mail'/>
//                 <input className='signup-input' value ={formValues.password1}  onChange={setValues} type='password' name='password1' placeholder='Password'/>
//                 <input className='signup-input' value ={formValues.password2}  onChange={setValues} type='password' name='password2' placeholder='Comfirm Password'/>
//               <div className='auth-btns'>
//                 <span className='auth-signup-btn-main' onClick={signUp}>Sign up</span>
                
//               </div>
//               <div className='auth-alt-text'>Already have an account? <br/><Link to='/sign-in' className='auth-signup-btn' >Sign in</Link></div>
//             </div>
//         </div>
//     </div>
// )}

// export default Signup



import React, { useState, useEffect } from 'react';
import './signup.css';
import API from '../../../Resources/api';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../../Context/app-context';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Signup = () => {
  const { loggedIn } = UseAppContext();
  const [error, setError] = useState({ status: false, msg: '' });
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleError = (status, message) => {
    setError({ status: status, msg: message });
  };

  const setValues = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'username') {
      value = value.replace(/\s+/g, '');
    }
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signUp = async (e) => {
    try {
      e.preventDefault();
      const { firstname, lastname, username, email, password1, password2 } = formValues;

      // Validation checks...

      const options = {
        url: `${API}/auth/sign-up`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password1,
        },
      };

      // Network connection alerts...

      const result = await Axios(options);
      const { response, user } = result.data;

      if (response === 'Success') {
        return (window.location.href = `/profiling/${user._id}`);
      } else if (response === 'Fail') {
        const { message } = result.data;
        handleError(true, message);
        setTimeout(() => {
          setError({ status: false, msg: '' });
        }, 4000);
      }
    } catch (error) {
      handleError(true, error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loggedIn === 'true') {
    return (window.location.href = '/');
  }

  return (
    <Grid container className="signup">
      {error.status && (
        <div className="alert" style={{ position: 'absolute' }}>
          <Alert severity="error">{error.msg}</Alert>
        </div>
      )}

      <Grid item xs={12} sm={6}  className="signup-heading">
        <h2 className="signup-heading-title">
          Home Workout <br/>
          <span className='signup-heading-title-center'>and</span><br/> 
          <span className='signup-heading-title-bottom'>Analytics</span></h2>
      </Grid>

      <Grid item xs={12} sm={6}  className="signup-form">
        <div className="signup-form-inner">
          <h4 className="sign-up-title">Sign Up</h4>
          <TextField
            className="signup-input"
            value={formValues.firstname}
            onChange={setValues}
            type="text"
            name="firstname"
            label="Firstname"
            style={{ marginTop: '0.7rem' }}
          />
          <TextField
            className="signup-input"
            value={formValues.lastname}
            onChange={setValues}
            type="text"
            name="lastname"
            label="Lastname"
            style={{ marginTop: '0.7rem' }}
          />
          <TextField
            className="signup-input"
            value={formValues.username}
            onChange={setValues}
            type="text"
            name="username"
            label="Username"
            style={{ marginTop: '0.7rem' }}
          />
          <TextField
            className="signup-input"
            value={formValues.email}
            onChange={setValues}
            type="email"
            name="email"
            label="E-Mail"
            style={{ marginTop: '0.7rem' }}
          />
          <TextField
            className="signup-input"
            value={formValues.password1}
            onChange={setValues}
            type="password"
            name="password1"
            label="Password"
            style={{ marginTop: '0.7rem' }}
          />
          <TextField
            className="signup-input"
            value={formValues.password2}
            onChange={setValues}
            type="password"
            name="password2"
            label="Confirm Password"
            style={{ marginTop: '0.7rem' }}
          />
          <div className="auth-btns">
            <Button variant="contained" className="auth-signup-btn-main" onClick={signUp}>
              Sign up
            </Button>
          </div>
          <div className="auth-alt-text">
            Already have an account? <br />
            <Link to="/sign-in" className="auth-signup-btn">
              Sign in
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;
