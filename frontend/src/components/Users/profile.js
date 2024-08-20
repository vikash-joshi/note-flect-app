import React, { useEffect, useState, useContext } from "react";
import { GetUserDetail } from "../common/User_Detail";
import _authContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  
  const [user, setuser] = useState({});
  const { logout, login } = useContext(_authContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let Result = await FetchRequtes();
      if (Result && !Result?.message) {
        const json = Result;
        Result = await Fetchuser(json["id"]);
        console.clear();
        console.log(Result);
        if (Result?.message) {
          logout();
          navigate("/Login");
        } else {
          const res = Result;
          setuser(res);
          login(res);
        }
      } else {
        logout();
        navigate("/Login");
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Code to run on component unmount (cleanup)
    };
  }, []);
  const FetchRequtes = async () => {
    try {
      debugger;
      const response = await fetch(
        process.env.REACT_APP_API_URL+"/api/auth/verifytoken",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status == "400") {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      login();
      return json;
    } catch (error) {
      console.error(error.message);
    }
  };

  const Fetchuser = async (Id) => {
    try {
      debugger;
      const response = await fetch(
        process.env.REACT_APP_API_URL+"/api/users/getuser/" + Id,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status == "400") {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json[0];
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return (
    <div className="container mt-4">
        <div className="row mt-5" >
        <div className="col-md-2"></div>
         <div className="col-md-3 leftpanel" style={{boxShadow:'0 0 20px rgba(0, 0, 0, 0.1)'}}>
              <div className="imagecontainer">
                <img style={{width:'100%'}} src="https://cdni.iconscout.com/illustration/premium/thumb/edit-social-media-profile-5295893-4412910.png" />
              </div>
             </div>
            <div className="col-md-5" style={{boxShadow:'0 0 20px rgba(0, 0, 0, 0.1)'}}><div className="registration-form">
      <div className="profile-pictures">
      <h3 className="text-center mt-2">
        Edit Profile
      </h3>
      </div>
      <form>
      <div className="form-group">
          <label className="disablelabel">{user.email}</label>
        </div>
           <div className="form-group">
        <input type="text" placeholder="User Name" value={user.name} />
                </div>
     
        <div className="form-group">
        <select
                        className="form-select"
                        aria-label="Default select example"
                        value={user.gender == 'Male' ? 1 : user.gender == 'Female' ? 2:3 }>
                        <option value="1"> Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other's</option>
                      </select>
        </div>
       
        <div className="form-group">
        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="User Bio" rows="3" value={user.UserBio}></textarea>
        </div>
        <button type="submit" className="submit-btn">Update Profile</button>
      </form>
    </div></div>
            <div className="col-md-2"></div>
        </div>
     
    </div>
  );
}
