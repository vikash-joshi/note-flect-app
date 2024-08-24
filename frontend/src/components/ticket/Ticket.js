import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import ToastComponent from "../common/controls/newtoast";
import _authContext from "../../context/authContext";
import TableSkeletonLoader from "../admin/Manage/table.skeleton";
import { GetAllRequest } from "../Methods/RequestMethods";
import { formatDistanceToNow } from "date-fns";
import NoRecordFound from "../common/noRecordFound/norecordfound";
import { SaveRequest } from "./TicketForm";
import FullScreenSpinner from "../common/spinner/spinners";
import SendMail from "../admin/Manage/sendMail";


function CreateTicket({ User, onEvent }) {
  const { isAuthenticated, logout, UserType } = useContext(_authContext);
  //const {UserType} =useContext(_authContext);
  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);
  const [ShowFormLoading, SetFormLoading] = useState(false);
  const [RequestModel, SetRequestModel] = useState({
    _id: "",
    RequestTitle: "",
    RequestType: "",
    RequestQuery: "",
    UserReqId: "",
    Response: "",
    RequestStatus: ""
  });

  const sendValueToParent = (value) => {
    onEvent(value);
  };
  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const Save_Request = async (Request) => {

    //SetFormLoading(true);
    let Result = await SaveRequest(Request);

    //SetFormLoading(false);
    /*if(Result && Result?.logout==true) {
      logout();
    }
    else
    if (Result && Result?.success && Result?.success == true) {
      SetMessage({ message: Result.message, type: "text-success" });
      //fetchData();
      handleShowToast();
      sendValueToParent();
    } else if (Result && Result?.error) {
      SetMessage({
        message: Result?.error.join("<br />"),
        type: "text-danger"
      });
      handleShowToast();
    } else {
      SetMessage({ message: Result?.message, type: "text-warning" });
      handleShowToast();
    }*/
  };


  useEffect(() => {
    SetRequestModel(User);
  }, [User?._id]);

  const handleChange = (field, value, call) => {
    if (call == undefined) {
      call = true;
    }
    if (call == true) {
      if (field === "RequestTitle" && call) {
        SetRequestModel((prev) => ({
          ...prev,
          RequestTitle: value
        }));
      }
      if (field === "RequestType" && call) {
        SetRequestModel((prev) => ({
          ...prev,
          RequestType: value
        }));
      }
      if (field === "RequestQuery" && call) {

        SetRequestModel((prev) => ({
          ...prev,
          RequestQuery: value
        }));
      }
      if (field === "Response" && call) {

        SetRequestModel((prev) => ({
          ...prev,
          Response: value
        }));
      }
      if (field === "RequestStatus" && call) {

        SetRequestModel((prev) => ({
          ...prev,
          RequestStatus: value
        }));
      }
    }
  };

  const HandleSubmit = async (event, UserModel) => {
    event.preventDefault();
    if (UserModel) {
      if (!(UserModel?.RequestTitle && UserModel?.RequestTitle != "")) {
        SetMessage({
          message: "Request Title cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }
      if (!(UserModel?.RequestType && UserModel?.RequestType != "")) {
        SetMessage({
          message: "Select Request Type ",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }
      if (!(UserModel?.RequestQuery && UserModel?.RequestQuery != "")) {
        SetMessage({
          message: "Request Query cannot be blank",
          type: "text-danger"
        });
        handleShowToast();
        return;
      }
      SetFormLoading(true);
      const result = await SaveRequest(UserModel);
      SetFormLoading(false);
      if (result && result?.logout == true) {
        logout();
      }
      else if (result && result?.error) {
        SetMessage({
          message: result?.error.join("<br />"),
          type: "text-danger"
        });
        handleShowToast();
      }
      else
        if (result && result?.message && result?.message != "") {

          SetMessage({
            message: result.message,
            type: result?.message.includes("1:") ? "text-success" : "text-danger"
          });
          handleShowToast();
          if (result?.message.includes("1:")) {
            setTimeout(() => {
              if (result?.message.includes("1:")) {
                sendValueToParent(true);
              }
            }, 500);
          }
        }
    }
  };
  return (
    <>
      <div
        className="position-fixed top-2 end-0 p-3"
        style={{ zIndex: 11, marginTop: "-55px" }}
      >
        {ShowFormLoading && <FullScreenSpinner />}
        <ToastComponent
          show={showToast}
          onClose={handleCloseToast}
          type={Message.type}
          message={Message.message}
          duration={10000}
        />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8" style={{
            backgroundColor: "#3b82f6e8",
            borderRadius: "15px",
            color: "white"
          }}>
            <div className="form-body" style={{ backgroundColor: "#0090fe26" }}>
              <h3 className="text-center pt-3"><span className="material-symbols-outlined" style={{ fontSize: '22px' }}>support</span>Raise Concern</h3>
              <form style={{ padding: "10px !important" }}>
                <div className="col-12 col-md-12">
                  <div className="form-group d-block">
                    <label htmlFor="exampleInput1">Request Title</label>
                    <input
                      onInput={(e) => handleChange("RequestTitle", e.target.value)}
                      type="text"
                      value={RequestModel.RequestTitle}
                      className="form-control"
                      id="exampleInput1"
                      aria-describedby="Query Title"
                      placeholder="Enter Query Title"
                    />
                  </div>
                  <div className="form-group  d-block">
                    <label htmlFor="exampleFormControlSelect1">Request Type</label>
                    <select
                      onInput={(e) => handleChange("RequestType", e.target.value)}
                      value={RequestModel.RequestType}
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option default value="General_Question">Select Request Type</option>
                      <option value="General_Question">General Question</option>
                      <option value="Account_Related">Account Related</option>
                      <option value="Feature_Request">Feature Request</option>
                      <option value="Bug_Report">Bug Report</option>
                    </select>
                  </div>
                  <div className="form-group  d-block">
                    <label htmlFor="exampleFormControlTextarea1">Request Detail</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"
                      placeholder="Detailed Query" rows="5" value={RequestModel.RequestQuery}
                      onInput={(e) => handleChange("RequestQuery", e.target.value)}
                    ></textarea>

                  </div>
                  {UserType == "Admin" && <>
                    <div className="form-group  d-block">
                      <label htmlFor="exampleFormControlSelect1">Request Status</label>
                      <select
                        onInput={(e) => handleChange("RequestStatus", e.target.value)}
                        value={RequestModel.RequestStatus}
                        className="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option default value="General_Question">Select Request Status</option>
                        <option value="In Process">In Process</option>
                        <option value="Closed">Closed</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </div>
                    <div className="form-group  d-block">
                      <label htmlFor="exampleFormControlTextarea1">Response</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1"
                        placeholder="Detailed Response" rows="5" value={RequestModel.Response}
                        onInput={(e) => handleChange("Response", e.target.value)}
                      ></textarea>

                    </div>
                  </>}


                  <div className="form-group  d-block">

                    <button
                      onClick={(e) => HandleSubmit(e, RequestModel)}
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
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

function RaiseTicket() {

   //Pagination

 const [totalRecord, SettotalRecord] = useState(0);
 const [RecordCount, SetRecordCount] = useState(5);
let [PageNo, SetPageNo] = useState(1);

const HandleNext=()=>{
 PageNo=PageNo+1;
 SetPageNo(PageNo);
 fetchData()
}

const HandlePrev=()=>{
 SetPageNo(PageNo ==1 ? 1 :PageNo-1);
 fetchData()
}

  const navigate = useNavigate();
  const [Loading, SetLoading] = useState(true);
  const [FormLoading, SetFormLoading] = useState(true);
  const [ShowNoRecord, SetNoRecord] = useState(false);
  const [Action, SetAction] = useState('Form')
  const { isAuthenticated, logout } = useContext(_authContext);
  const [Grid_Form, setGridOrForm] = useState(true);
  const [ReuqestList, SetRequestList] = useState([])
  const { UserType } = useContext(_authContext);
  const [RequestModel, SetRequestModel] = useState({
    RequestType: "General_Question",
    _id: "",
    RequestTitle: "",
    RequestQuery: "",
    UserReqId: "",
    Response: "",
    RequestStatus: ""
  });




  const fetchData = async () => {
    debugger;
    SetLoading(true);
    if (isAuthenticated) {
      let Res = await GetAllRequest(PageNo);

      console.log(Res);
      if (Res && Res.logout) {
        logout();
        navigate("/Login"); // Handle the case where there's no message or an empty message
      }
      else if (Res && Res?.RequestDetail) {
        SetRequestList(Res?.RequestDetail);
       // setTimeout(() => {
          SetLoading(false);
          SetNoRecord(Res?.RequestDetail.length==0)
          SettotalRecord(Res?.TotalRecord)
       
        //}, 500);

      }
      else {
        SetLoading(false);
        SetNoRecord(true);
        SetRequestList([]);
      }
    } else {
      logout();
      navigate("/Login");
    }
  };

  useEffect(() => {
    const getdata=async ()=>{await fetchData() }
    getdata();
    return () => {
      // Code to run on component unmount (cleanup)
    };
  }, [isAuthenticated, logout, navigate]);

  const HanldeClick = (value) => {
    setGridOrForm(!Grid_Form)
    fetchData();
  }
  const sendValueToParent = (Data, CallFrom) => {
    SetRequestModel(Data);
    SetAction(CallFrom);
    HanldeClick();
  }

  const SendMail_Call = (Value) => {
    SetAction('Email')
    sendValueToParent(Value);
  }

  return (
    <>
      <div className="container mt-3">

        <div className="MobileMargin">
          <div className="row ">
            {Grid_Form && <>
              <div className="col-md-9">
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>

                  Raise Concern</p>
              </div>

              <div className={!ShowNoRecord ? 'align-items-center col-md-3 d-flex justify-content-around' : 'col-md-3 text-end  '}>
                {!ShowNoRecord && <button onClick={fetchData} className="btn btn-light" style={{ border: '1px solid #80808069' }} >
                  <span className="align-items-center d-flex">
                    <span className={Loading ? 'material-symbols-outlined rotate' : 'material-symbols-outlined'}>sync</span>
                    <span>Refresh Ticket</span>
                  </span>
                </button>
                }
                <button className="btn btn-primary" onClick={HanldeClick}>
                  <span className="align-items-center d-flex">
                    <span className="material-symbols-outlined">support</span>
                    <span>Create Ticket</span>
                  </span>
                </button>


              </div>
            </>
            }
          </div>

          {Grid_Form && Loading && <TableSkeletonLoader />}
          {Grid_Form && ShowNoRecord && <NoRecordFound />}
          {Grid_Form && !Loading && !ShowNoRecord &&
          <> 
          <div className="col-md-1">
            <span className="badge bg-primary" style={{fontSize:'15px'}}>Total Records:{totalRecord}</span>
            </div><div className="col-md-11"></div>
           <table className="table mt-4 table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">RequestNo</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {ReuqestList &&
                  ReuqestList.length > 0 &&
                  ReuqestList.map((ele, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>Req_{ele._id}</td>
                      <td>{ele.Name}</td>
                      <td>{ele.Email}</td>
                      <td>{ele.RequestTitle}</td>
                      <td>{ele.RequestType}</td>
                      <td><span className={ele.RequestStatus == 'Closed' ? 'badge bg-warning' : 'badge bg-danger'}>{ele.RequestStatus}</span></td>
                      <td>
                        {formatDistanceToNow(ele.CreatedAt, {
                          addSuffix: true
                        })}
                      </td>
                      {/* Placeholder for any action buttons */}
                      <td>
                        <span onClick={() => sendValueToParent(ele, 'Form')}
                          style={{ cursor: "pointer" }}
                          className="text-primary material-symbols-outlined"
                        >
                          edit_square
                        </span>
                        <span onClick={() => sendValueToParent(ele, 'Email')}
                          style={{ cursor: "pointer" }}
                          className="text-danger material-symbols-outlined"
                        >
                          mail
                        </span>

                      </td>
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
          {!Grid_Form && Action === 'Form' &&
            <CreateTicket User={RequestModel} onEvent={HanldeClick} />}
          {!Grid_Form && Action === 'Email' &&
            <SendMail User={{email:RequestModel.Email}} onEvent={HanldeClick} />
          }
        </div>
      </div>
    </>
  )
}


export default RaiseTicket;