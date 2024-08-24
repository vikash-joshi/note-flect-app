import React, { useEffect, useState, useContext } from "react";
import _authContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { UpdateUser } from "../admin/Manage/admin_methods";
import FullScreenSpinner from "../common/spinner/spinners";
import ToastComponent from "../common/controls/newtoast";

export default function Profile() {
  const [user, setUser] = useState({});
  const { isAuthenticated, logout, login } = useContext(_authContext);
  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);
  const [ShowLoading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const fetchResult = async () => {
      if (isAuthenticated) {
        let Result = await Fetchuser();
        console.log(Result);
        if (Result === undefined || Result?.message) {
          logout();
          navigate("/Login");
        } else {
          setUser(Result);
          login(Result);
        }
      } else {
        logout();
        SetMessage({ message: "Logged Out", type: "text-success" });
        handleShowToast();
        navigate("/Login");
      }
    };
    fetchResult();
  }, [isAuthenticated]);

  const UpdateProfile = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    try {
      let UserModel = user;
      if (UserModel) {
        if (!UserModel?.name) {
          SetMessage({ message: "Name cannot be blank", type: "text-danger" });
          handleShowToast();
          return;
        }
        if (!UserModel?.gender) {
          SetMessage({
            message: "Gender cannot be blank",
            type: "text-danger",
          });
          handleShowToast();
          return;
        }
        if (!UserModel?.UserBio) {
          SetMessage({
            message: "UserBio cannot be blank",
            type: "text-danger",
          });
          handleShowToast();
          return;
        }

        SetLoading(true);
        const result = await UpdateUser(UserModel);
        SetLoading(false);
        console.log(result);
        if (result && result?.message) {
          SetMessage({
            message: result.message,
            type: result?.message.includes("1:") ? "text-success" : "text-danger",
          });
          handleShowToast();
        }
      }
    } catch (ex) {
      SetMessage({
        message: ex.message,
        type: "text-danger",
      });
      handleShowToast();
      SetLoading(false);
    }
  };

  const handleChange = (field, value, call) => {
    if (!call) return;
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const Fetchuser = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/users/getuser",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 400) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container mt-4">
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
        <div className="row mt-5">
          <div className="col-md-2"></div>
          <div
            className="col-md-3 leftpanel"
            style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="imagecontainer">
              <img
                style={{ width: "100%" }}
                src="https://cdni.iconscout.com/illustration/premium/thumb/edit-social-media-profile-5295893-4412910.png"
              />
            </div>
          </div>
          <div
            className="col-md-5"
            style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="registration-form">
              <div className="profile-pictures">
                <h3 className="text-center mt-2">Edit Profile</h3>
              </div>
              <form onSubmit={UpdateProfile}>
                <div className="form-group">
                  <label className="disablelabel">{user?.email}</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="User Name"
                    onInput={(e) => handleChange("name", e.target.value, true)}
                    value={user?.name}
                  />
                </div>

                <div className="form-group">
                  <select
                    onInput={(e) => handleChange("gender", e.target.value, true)}
                    className="form-select"
                    aria-label="Default select example"
                    value={
                      user?.gender === "Male"
                        ? 1
                        : user?.gender === "Female"
                        ? 2
                        : 3
                    }
                  >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other's</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    onInput={(e) =>
                      handleChange("UserBio", e.target.value, true)
                    }
                    id="exampleFormControlTextarea1"
                    placeholder="User Bio"
                    rows="3"
                    value={user?.UserBio}
                  ></textarea>
                </div>
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
}
