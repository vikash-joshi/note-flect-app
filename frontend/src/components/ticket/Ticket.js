import React,{useState,useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import ToastComponent from "../common/controls/newtoast";
import _authContext from "../../context/authContext";
import TableSkeletonLoader from "../admin/Manage/table.skeleton";
import { GetAllRequest } from "../Methods/RequestMethods";
import { formatDistanceToNow } from "date-fns";
import NoRecordFound from "../common/noRecordFound/norecordfound";


function CreateTicket({User,onEvent}){
  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const [RequestModel, SetRequestModel] = useState({
     _id: "",
     RequestTitle:"",
     RequestType:"",
     RequestQuery:"",
     UserId:""
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

  useEffect(() => {
    SetRequestModel({
      UserId: User?.UserId,
      RequestType: User?.RequestType,
      RequestTitle: User?.RequestTitle,
      RequestQuery: User?.RequestQuery,
      _id: User?._id
    });
  }, [User?._id]);

  const handleChange = (field, value, call) => {
    if (call == undefined) {
      call = true;
    }
    if (call == true) {
      if (field === "RequestTitle" && call) {
        //SendMailModel.FromEmail = value;
        SetRequestModel((prev) => ({
          ...prev,
          RequestTitle: value
        }));
      }
      if (field === "RequestType" && call) {
        //SendMailModel.ToEmail = value;
        SetRequestModel((prev) => ({
          ...prev,
          RequestType: value
        }));
      }
      if (field === "RequestQuery" && call) {
        //SendMailModel.Subject = value;
        SetRequestModel((prev) => ({
          ...prev,
          RequestQuery: value
        }));
      }
    
      // SetUserModel(UserModel)
    }
  };

  const HandleSubmit = async (event,UserModel) => {
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

      const result = {message:'0:hello worodl'}//await SendMailLog(UserModel);
      if (result && result?.message && result?.message != "") {
        
        SetMessage({
          message: result.message,
          type: result?.message.includes("1:") ? "text-success" : "text-danger"
        });
        handleShowToast();
        if(result?.message.includes("1:")){
        setTimeout(() => {
          if (result?.message.includes("1:")) {
            sendValueToParent(true);
          }
        }, 500);
      }
      }
    }
  };
  return(
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

      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8"   style={{
              backgroundColor: "#3b82f6e8",
              borderRadius: "15px",
              color: "white"
            }}>
          <div className="form-body" style={{ backgroundColor: "#0090fe26" }}>
          <h3 className="text-center pt-3"><span className="material-symbols-outlined" style={{fontSize:'22px'}}>support</span>Raise Concern</h3>
          <form style={{ padding: "10px !important" }}>
            <div className="col-12 col-md-12">
            <div class="form-group d-block">
            <label htmlFor="exampleInput1">Request Title</label>
            <input
              onInput={(e) => handleChange("RequestTitle", e.target.value)}
              type="text"
              value={RequestModel.RequestTitle}
              class="form-control"
              id="exampleInput1"
              aria-describedby="Query Title"
              placeholder="Enter Query Title"
            />
          </div>
          <div class="form-group  d-block">
            <label htmlFor="exampleFormControlSelect1">Request Type</label>
            <select
              onInput={(e) => handleChange("RequestType", e.target.value)}
              value={RequestModel.RequestType}
              class="form-control"
              id="exampleFormControlSelect1"
            >
              <option default value="General_Question">Select Request Type</option>
              <option  value="General_Question">General Question</option>
              <option value="Account_Related">Account Related</option>
              <option value="Feature_Request">Feature Request</option>
              <option value="Bug_Report">Bug Report</option>
            </select>
          </div>
          <div class="form-group  d-block">
            <label htmlFor="exampleFormControlTextarea1">Request Detail</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" 
            placeholder="Detailed Query" rows="5" value={RequestModel.RequestQuery}
            onInput={(e) => handleChange("RequestQuery", e.target.value)}
            ></textarea>
      
          </div>
       
          <div class="form-group  d-block">
           
              <button
              onClick={(e) => HandleSubmit(e,RequestModel)}
              class="btn bg-white text-primary"
            >
              Submit
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={sendValueToParent} class="btn bg-white text-primary">
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
  const navigate = useNavigate();
  const [Loading, SetLoading] = useState(true);
  const [ShowNoRecord, SetNoRecord] = useState(false);
  
  const {isAuthenticated, logout } = useContext(_authContext);
  const [Grid_Form,setGridOrForm]=useState(true);
  const [ReuqestList,SetRequestList]=useState([])
  const {UserType} =useContext(_authContext);
  const [RequestModel, SetRequestModel] = useState({
    _id: "",
    RequestTitle:"",
    RequestType:"General_Question",
    RequestQuery:"",
    UserId:""
 });

 const fetchData = async () => {
  SetLoading(true);
  if (isAuthenticated) {
    let Res = await GetAllRequest();
    console.log(Res);
    if(Res && Res.logout)
    {
      logout();
      navigate("/Login"); // Handle the case where there's no message or an empty message
    }
    else if (Res && Res.message == undefined) {
      setTimeout(() => {
        SetLoading(false);
      }, 1000);
     
      SetRequestList(Res);
     
    } 
    else{
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
  fetchData();
  return () => {
    // Code to run on component unmount (cleanup)
  };
}, [isAuthenticated, logout, navigate]);

  const HanldeClick=(value)=>{
    SetRequestModel(value)
    setGridOrForm(!Grid_Form)
    if(value){

  }
  }
  const sendValueToParent=(Data,CallFrom)=>{

  }
  return (
    <>
      <div className="container mt-3">

        <div className="MobileMargin">
          <div className="row ">
          {Grid_Form && <>   
          <div className="col-md-8">
              <p style={{ fontWeight: 'bold', fontSize: '20px' }}>

                Raise Concern</p>
            </div>
            
          <div className={!ShowNoRecord ? 'align-items-center col-md-4 d-flex justify-content-around':'col-md-4 text-end  '}>
            {!ShowNoRecord &&    <button  className="btn btn-light" style={{border:'1px solid #80808069'}} >
                <span className="align-items-center d-flex">                        
                  <span className={Loading ? 'material-symbols-outlined rotate':'material-symbols-outlined'}>sync</span>
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
          {Grid_Form && Loading && <TableSkeletonLoader /> }
          {Grid_Form && ShowNoRecord && <NoRecordFound />}
          {Grid_Form && !Loading && !ShowNoRecord &&
          <table class="table mt-4 table-responsive table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">RequestNo</th>
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
            <td>{ele.RequestTitle}</td>
            <td>{ele.RequestType}</td>
            <td><span className={ele.RequestStatus == 'Closed' ? 'badge bg-warning' : 'badge bg-dander'}>{ele.RequestStatus}</span></td>
            <td>
              {formatDistanceToNow(ele.CreatedAt, {
                addSuffix: true
              })}
            </td>
            {/* Placeholder for any action buttons */}
            <td>
              <span  onClick={()=>sendValueToParent(ele,'edit')}
                style={{ cursor: "pointer" }}
                class="text-primary material-symbols-outlined"
              >
                edit_square
              </span>
             
            </td>
            </tr>
        ))}
            </tbody>
          </table>
          }
          { !Grid_Form &&
          <CreateTicket User={RequestModel} onEvent={HanldeClick} />
          }
        </div>
      </div>
    </>
  )
}


export default RaiseTicket;