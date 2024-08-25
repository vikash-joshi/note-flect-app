import React, { useState,useContext } from "react";
import { Link,useNavigate }  from "react-router-dom";
import _authContext   from "../../context/authContext";
import axios from 'axios';
import ToastComponent from "../common/controls/newtoast";
import FullScreenSpinner from "../common/spinner/spinners";

export default function Login() {
  const { login } = useContext(_authContext);
  const [ShowLoading,SetLoading]=useState(false);
  const navigate = useNavigate();
  const [EyeIcon,SetEyeIcon]=useState('visibility')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
   
  const OnSubmit_ =async (event) => {
    event.preventDefault();
    await LoginUser(Email,Password);

  };

  const LoginUser = async (email, password) => {
    try{
      SetLoading(true)

      if(!email || email==='')
      {
        SetLoading(false)
        SetMessage({ message: 'Email Required', type: "text-danger" });
        handleShowToast();
        return;
      }
      if(!password || password==='')
        {
          SetLoading(false)
          SetMessage({ message: 'Password Required', type: "text-danger" });
          handleShowToast();
          return;
        }

        SetLoading(true)
    const response = await axios.post(process.env.REACT_APP_API_URL+'/api/auth/VerifyUser', {
      email: email,
          password: password
    }, {
      withCredentials: true, // Ensure cookies are included
    });
    const result= response;
    SetLoading(false)
    if(result && result.data && result?.data?.message && result?.data?.message!='')
    {
      SetMessage({ message: result?.data?.message, type: "text-danger" });
      handleShowToast();
    }
    else{
    login(result?.data?.data);
    navigate('/Profile')
    }
  }
  catch(ex)
  {
    SetLoading(false)
  }
  };
  
  const FetchRequtes=async()=>{
    try {
      debugger;
      SetLoading(true)
      const response = await fetch(process.env.REACT_APP_API_URL+'/api/auth/verifytoken', {
        method: "GET",credentials:'include',
         headers: {
          'Content-Type': 'application/json',
        },  
      });

      if (response.status=='400') {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      SetLoading(true)
      login();
      return json;
    } catch (error) {
      SetLoading(true)
      console.error(error.message);
    }
  }

  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };





  

  const TogglePassword=()=>{
    let _togglepwd=document.getElementById('togglepwd');
    let inputPassword3=document.getElementById('inputPassword3');
    
    if(_togglepwd && inputPassword3)
      {
       
        SetEyeIcon(inputPassword3.type=='text' ? 'visibility':'visibility_off');
        inputPassword3.type=inputPassword3.type=='text' ? 'password':'text'
      }
  }

  return (
    <div style={{ backgroundColor: "white", height: "auto" }}>
       {ShowLoading && <FullScreenSpinner />} 
         <div
        className="position-fixed top-2 end-0 p-3"
        style={{ zIndex: 11, marginTop: "-55px" }}
      >
        <ToastComponent
          show={showToast}
          onClose={handleCloseToast}
          type={Message.type}
          message={Message.message}
          duration={3000}
        />
      </div>
      <div
        className="container mt-5"
        style={{ border: "1.5px solid #e1e1e1", borderRadius: "3px" }}
      >
        <div className="row">
          <div
            className="col-md-6 left-panel text-white login_register_left_panel"
          >
            <div className="m-5 resigters" style={{padding:'50px'}}>
              <div>
                <h1>Welcome Back</h1>
              </div>
              <div>
                <p>
                  To keep connected with us please login with your personal
                  information.
                </p>
              </div>
              <div>
              <Link to="/Register">
                <button
                  type="submit"
                  style={{ width: "100%", borderRadius: '30px' }}
                  className="btn btn-light text-primary"
                >
                  Sign Up
                  
                </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 bg-white right-panel">
            <div style={{ padding: "30px" }}>
              <div>
                <h3 className="text-center">Login</h3>
              </div>
              <form onSubmit={(e) => {
                  OnSubmit_(e);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: " center",
                    width:'100%'
                  }}
                >
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                    >
                      <span className="material-symbols-outlined" style={{    color: '#178fff',   fontSize: '31px'}}>
mail
</span>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-2 row" style={{    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'}}>
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                    >
       <span className="material-symbols-outlined" style={{    color: '#178fff',   fontSize: '31px'}}>
lock
</span>
                    </label>
                    <div className="col-sm-10 passwords">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword3"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      /><span id='togglepwd' onClick={TogglePassword} className="eyeicon material-symbols-outlined" >
                      {EyeIcon}
                      </span>   
                    </div>
                  </div>
                  <div className="form-group mt-2 row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                      <input
                        type="submit"
                        style={{ width: "100%",    borderRadius: '30px' }}
                        className="btn btn-primary"
                        value="Sign In"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
