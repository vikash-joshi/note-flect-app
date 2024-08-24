import React, { useState, useEffect, useContext } from "react"
import ToastComponent from "../../common/controls/newtoast";
import { CreateUser } from "./admin_methods";
import { fetchallUsers, fetchEmailLogs } from "./admin_methods";
import TableSkeletonLoader from "./table.skeleton";
import { useNavigate } from "react-router-dom";
import _authContext from "../../../context/authContext";
import './admin.css';
import "./sendmail.css"
import { formatDistanceToNow } from "date-fns";
import SendMail from "./sendMail";
import NoRecordFound from "../../common/noRecordFound/norecordfound";

function CRUD_User({ User, onEvent }) {
  const [IsEmailVerified, SetEmailVerified] = useState(false);
  const [IsAccountLocked, SetIsAccountLocked] = useState(false);
  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);


  const [UserModel, SetUserModel] = useState({
    name: "",
    email: "",
    IsAccountLocked: false,
    IsEmailVerified: false,
    UserType: 'User',
    gender: 'Male',
    _id: ""

  });
  useEffect(() => {
    SetIsAccountLocked(User.IsAccountLocked);

    SetEmailVerified(User.IsEmailVerified);
    SetUserModel({
      name: User?.name,
      email: User?.email,
      IsAccountLocked: User?.IsAccountLocked,
      IsEmailVerified: User?.IsEmailVerified,
      UserType: User?.UserType,
      gender: User?.gender,
      _id: User?._id
    })
    handleChange('gender', User?.gender)
    handleChange('UserType', User?.UserType)
  }, [User.IsAccountLocked, User.IsEmailVerified]);

  const sendValueToParent = (value) => {
    onEvent(value);
  };

  const HandleSubmit = async (event, UserModel) => {
    event.preventDefault();
    if (UserModel) {
      if (!(UserModel?.name && UserModel?.name != "")) {
        SetMessage({ message: "Name cannot be blank", type: "text-danger" });
        handleShowToast();
        return
      }
      if (!(UserModel?.email && UserModel?.email != "")) {
        SetMessage({ message: "Email cannot be blank", type: "text-danger" });
        handleShowToast();
        return
      }
      if (!(UserModel?.UserType && UserModel?.UserType != "")) {
        SetMessage({
          message: "UserType cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return
      }

      const result = await CreateUser(UserModel, UserModel?._id && UserModel?._id != '' ? 'update' : 'create');
      if (result && result?.message && result?.message != "") {
        SetMessage({
          message: result.message,
          type: result?.message.includes("1:") ? "text-success" : "text-danger"
        });
        handleShowToast();
        setTimeout(() => {
          if (result?.message.includes("1:")) {
            sendValueToParent(true);
          }
        }, 500);

      }
    }
  };
  const handleCheckboxChange = (event, call) => {
    const isChecked = event.target.checked;
    if (call == "IsAccountLocked") {
      SetIsAccountLocked(isChecked);
      SetUserModel((prev) => ({
        ...prev,
        IsAccountLocked: isChecked
      }));
    }
    else if (call == 'IsEmailVerified') {
      SetEmailVerified(isChecked);
      SetUserModel((prev) => ({
        ...prev,
        IsEmailVerified: isChecked
      }));

    }
  };

  const handleChange = (field, value, call) => {
    if (call == undefined) {
      call = true;
    }
    if (call == true) {
      if (field === "name" && call) {
        UserModel.name = value;
        SetUserModel((prev) => ({
          ...prev,
          name: value
        }));
      }
      if (field === "email" && call) {
        UserModel.email = value;
        SetUserModel((prev) => ({
          ...prev,
          email: value
        }));
      }
      if (field === "gender" && call) {
        UserModel.gender = value;
        SetUserModel((prev) => ({
          ...prev,
          gender: value
        }));
      }
      if (field === "UserType" && call) {
        UserModel.UserType = value;
        SetUserModel((prev) => ({
          ...prev,
          UserType: value
        }));
      }
      // SetUserModel(UserModel)
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <div
        className="position-fixed top-2 end-0 p-3"
        style={{ zIndex: 11, marginTop: "-55px" }}
      >
        <ToastComponent
          show={showToast}
          onClose={handleCloseToast}
          type={Message.type}
          message={Message.message}
          duration={10000}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-2"></div>
        <div
          className="col-md-8"
          style={{
            backgroundColor: "#3b82f6e8",
            borderRadius: "15px",
            color: "white"
          }}
        >
          <div className="pt-3 pb-2 text-center">
            <h4>Add User</h4>
          </div>
          <div className="form-group d-block">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              onInput={(e) => handleChange("email", e.target.value)}
              type="email"
              value={UserModel.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group  d-block">
            <label htmlFor="exampleInputPassword1">UserName</label>
            <input
              onInput={(e) => handleChange("name", e.target.value)}
              type="text"
              value={UserModel.name}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group  d-block">
            <label htmlFor="exampleFormControlSelect1">Select Gender</label>
            <select
              onInput={(e) => handleChange("gender", e.target.value)}
              value={UserModel.gender}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group  d-block">
            <label htmlFor="exampleFormControlSelect2">Select Usertype</label>
            <select
              onInput={(e) => handleChange("UserType", e.target.value)}
              value={UserModel.UserType}
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {UserModel.UserType}
          </div>
          <div className="form-check  d-block">
            <input
              checked={IsAccountLocked}
              onChange={(event) =>
                handleCheckboxChange(event, "IsAccountLocked")
              }
              value={UserModel.IsAccountLocked}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Is Account Locked
            </label>
          </div>
          <div className="form-check  d-block">
            <input
              checked={IsEmailVerified}
              onChange={(event) =>
                handleCheckboxChange(event, "IsEmailVerified")
              }
              value={UserModel.IsEmailVerified}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Is Email Verified
            </label>
          </div>
          <div className="form-group d-block">
            <button
              onClick={(e) => HandleSubmit(e, UserModel)}
              className="btn bg-white text-primary"
            >
              Submit
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={sendValueToParent} className="btn bg-white text-primary">
              Go Back
            </button>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}

function NewManageUsers() {
  const [Grid_Form, setGridOrForm] = useState(true);
  const [FormAction, SetFormAction] = useState('');

  const navigate = useNavigate();
  const [User, SetUser] = useState({})
  const [NoRecord, SetNoRecord] = useState(false)
  const { isAuthenticated, logout } = useContext(_authContext);
  const [UserList, SetUserLists] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [totalRecord, SettotalRecord] = useState(0);
  const [RecordCount, SetRecordCount] = useState(5);
  let [PageNo, SetPageNo] = useState(1);

  const HandleNext = () => {
    PageNo = PageNo + 1;
    SetPageNo(PageNo);
    fetchData()
  }

  const HandlePrev = () => {
    SetPageNo(PageNo == 1 ? 1 : PageNo - 1);
    fetchData()
  }


  const HanldeClick = () => {
    setGridOrForm(!Grid_Form)
  }

  const fetchData = async () => {
    SetLoading(true);
    if (isAuthenticated) {
      let Res = await fetchallUsers(PageNo);
      console.log(Res);
      if (Res && Res.logout) {
        logout();
        navigate("/Login"); // Handle the case where there's no message or an empty message
      }
      else if (Res && Res.Users) {
        SetLoading(false);
        SetUserLists(Res.Users);
        SettotalRecord(Res.TotalRecord)
        SetNoRecord(Res.Users?.length==0)

      }
      else {
        SetLoading(false);
        SetNoRecord(true);
        SetUserLists([]);
      }
    } else {
      logout();
      navigate("/Login");
    }
  };
  useEffect(() => {

    fetchData();
    return () => {
      // Code to run on component unmount (cleanup)
    };
  }, [isAuthenticated, logout, navigate]);

  const Hanlde_CRUD = (value, call) => {
    SetUser(value);
    SetFormAction(call)
    HanldeClick();
  }
  return (
    <>
      <div className="container mt-3">

        <div className="MobileMargin">
          <div className="row ">
            <div className="col-md-9">
              <p style={{ fontWeight: 'bold', fontSize: '20px' }}>

                Manage Users</p>
            </div>
            {Grid_Form &&
              <div className="align-items-center col-md-3 d-flex justify-content-around">
                <button className="btn btn-light" style={{ border: '1px solid #80808069' }} onClick={fetchData}>
                  <span className="align-items-center d-flex">
                    <span className={Loading ? 'material-symbols-outlined rotate' : 'material-symbols-outlined'}>sync</span>
                    <span>Refresh User</span>
                  </span>
                </button>

                <button className="btn btn-primary" onClick={HanldeClick}>
                  <span className="align-items-center d-flex">
                    <span className="material-symbols-outlined">person_add</span>
                    <span>Add User</span>
                  </span>
                </button>

              </div>
            }
          </div>
          {Grid_Form && Loading && <TableSkeletonLoader />}
          {Grid_Form && NoRecord && <NoRecordFound />}
          {Grid_Form && !Loading && !NoRecord &&
            <>
            <div className="col-md-1">
            <span className="badge bg-primary" style={{fontSize:'15px'}}>Total Records:{totalRecord}</span>
            </div><div className="col-md-11"></div>
           
              <table className="table-responsive table table-striped table-bordered mt-4">
                <thead>
               
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Email</th>
                    <th scope="col">IsEmail</th>
                    <th scope="col">UserType</th>
                    <th scope="col">IsLocked</th>
                    <th scope="col">CreatedOn</th>
                    <th class="sticky-col-right" scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {UserList &&
                    UserList.length > 0 &&
                    UserList.map((ele, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td>
                          {ele.IsEmailVerified ? (
                            <span className="badge bg-success">Verified</span>
                          ) : (
                            <span className="badge bg-danger">Unverified</span>
                          )}
                        </td>
                        <td>{ele.UserType}</td>{" "}
                        {/* Assuming you have a userType field */}
                        <td>
                          {ele.IsAccountLocked ? (
                            <span className="material-symbols-outlined text-danger">
                              lock
                            </span>
                          ) : (
                            <span className="text-success material-symbols-outlined">
                              lock_open
                            </span>
                          )}
                        </td>{" "}
                        {/* Assuming you have an accountLocked field */}
                        <td>
                          {" "}
                          {formatDistanceToNow(ele.createdAt, {
                            addSuffix: true
                          })}
                        </td>{" "}
                        {/* Placeholder for any action buttons */}
                        <td>
                          <span onClick={() => Hanlde_CRUD(ele, 'edit')}
                            style={{ cursor: "pointer" }}
                            className="text-primary material-symbols-outlined"
                          >
                            edit_square
                          </span>
                          &nbsp;
                          <span onClick={() => Hanlde_CRUD(ele, 'delete')}
                            style={{ cursor: "pointer" }}
                            className="text-danger material-symbols-outlined"
                          >
                            delete
                          </span>
                          &nbsp;
                          <span onClick={() => Hanlde_CRUD(ele, 'mail')}
                            style={{ cursor: "pointer" }}
                            className="text-danger material-symbols-outlined"
                          >
                            mail
                          </span>
                        </td>{" "}
                        {/* Placeholder for any action buttons */}
                        {/* Placeholder for any action buttons */}
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="row">
              <div className="col-md-9">
                <span className="badge bg-light text-black" style={{fontSize:'15px'}}>Page No. {PageNo}</span>
              </div>
              <div className="col-md-3 mt-3 text-end">
                <button className="btn bg-black text-white" onClick={HandlePrev} disabled={PageNo === 1}>
                  Previous
                </button>
                &nbsp;&nbsp;
                <button className="btn bg-black text-white"
                  onClick={HandleNext}
                  disabled={PageNo * 5 >= totalRecord}
                >
                  Next
                </button>
              </div></div>
              </>

          }
          {!Grid_Form && FormAction !== 'mail' &&
            <CRUD_User User={User} onEvent={HanldeClick} />
          }
          {!Grid_Form && FormAction === 'mail' &&
            <SendMail User={User} onEvent={HanldeClick} />
          }
        </div>
      </div>
    </>
  )
}

export default NewManageUsers;