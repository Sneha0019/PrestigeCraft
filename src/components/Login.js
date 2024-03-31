import React, { useState } from "react";
import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const navigate = useNavigate();
  const { bgColor, txtColor } = props;
  const [credentials, setCredentials] = useState({email: "", password:""});
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    const response = await fetch(`https://ecommerce-website-full-stack-3.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({email: credentials.email, password: credentials.password}),

    });
    const json = await response.json();
    if(json.success){
      let name = json.username;
      console.log(`name is ${name}`)
      if(name){
        localStorage.setItem('username', name);
        // localStorage.setItem('token', json.authToken)
        console.log(`set successfully ${name}`);
      }

      //---save the token and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/");
    }else{
      alert("INvalid credentials");
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})

  }

  return (
    <>
      <div className="container my-5 w-50 justify-content-center">
        <h3 className="mb-4" style={{ color: txtColor }}>
          Login to Continue
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password"  className="form-label">
              Password
            </label>
            <input
            value={credentials.password}
            onChange={onChange} name="password"
              type="password"
              className="form-control"
              id="password"/>
            <div
              style={{ color: txtColor }}
              id="emailHelp"
              className="form-text">
              Forgot password?
            </div>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: bgColor, color: txtColor }}>
            Login
          </button>

          <div className="mt-3">
            <Link
              style={{ color: txtColor }}
              to="/signup"
              className="btn-link text-align-center"
              role="button"
              aria-disabled="true">
              Create An Account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
