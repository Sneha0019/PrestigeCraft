import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const navigate = useNavigate();

    const { bgColor, txtColor } = props;
    const [credentials, setCredentials] = useState({name:"", email:"", password:""});

    const handleClick = async(e) =>{
      e.preventDefault();
      const {name, email, password} = credentials;
    const response = await fetch(`https://ecommerce-website-full-stack-2.onrender.com/api/auth/createuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //----save the auth token and redirect
        localStorage.setItem("token", json.authToken)  //-->>saved in localstorage
        localStorage.setItem("username", json.username);

        navigate("/");
      }else{
      alert("Please enter proper credentials")
      }
    }

    const onChange = (e) =>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <>
    <div className="container my-5 w-50 justify-content-center">
        <h3 className="mb-4 outline-none" style={{color: txtColor}}>Register Your Account</h3>
      <form onSubmit={handleClick}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" onChange={onChange} minLength={3} id="name" name="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5}/>
  </div>
 
 <div className='mb-3'>
    <a style={{color: txtColor}} href="/login" className="btn-link" role="button" aria-disabled="true">Already have an account?</a>
</div> 

  <button type="submit" className="btn" style={{backgroundColor: bgColor, color: txtColor}}>Create Account</button>
</form>
</div>
    </>
  )
}

export default Signup
