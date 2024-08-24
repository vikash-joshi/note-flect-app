import React,{useState,useEffect, useContext} from "react"
import TableSkeletonLoader from "./table.skeleton";
import { useNavigate } from "react-router-dom";
import _authContext from "../../../context/authContext";

//import ToastComponent from "../common/controls/newtoast";
import ModalComponent from "../../common/modal";
import { formatDistanceToNow } from "date-fns";
import SendMail from "./sendMail";
import NoRecordFound from "../../common/noRecordFound/norecordfound";
const { fetchEmailLogs } = require("./admin_methods");


export default function EmailLog() {
    //const [Grid_Form,setGridOrForm]=useState(true);
  
    const navigate = useNavigate();
   // const [User,SetUser]=useState({})
    const {isAuthenticated, logout } = useContext(_authContext);
    const [EmailList, SetUserLists] = useState([]);
    const [Loading, SetLoading] = useState(true);
    const [NoRecord, SetNoRecord] = useState(false);
    
    const [totalRecord, SettotalRecord] = useState(15);
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
    const HanldeClick=()=>{
      setGridOrForm(!Grid_Form)
    }

  
    const fetchData = async () => {
      SetLoading(true);
      if (isAuthenticated) {
        let Res = await fetchEmailLogs(PageNo);
        console.log(Res);
        if (Res && Res.logout) {
          logout();
          navigate("/Login"); // Handle the case where there's no message or an empty message
        }
        else if (Res && Res.EmailList) {
          //setTimeout(() => {
            SetLoading(false);
          //}, 1000);
         
          SetNoRecord(Res.EmailList?.length==0)
          SetUserLists(Res.EmailList);
          SettotalRecord(Res.TotalRecords)
         
        } else {
          logout();
          navigate("/Login"); // Handle the case where there's no message or an empty message
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
  
    const Hanlde_CRUD=(value,call)=>{
      SetUser(value);
      //rmAction(call)
      HanldeClick();
    }
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [Modal, SetModal] = useState({});
  const [User,SetUser]=useState({})
  const openModal = (ele) => {
    SetModal({
      Title: "Email Body",
      Content: ele.Body,
      Action: false
    });
    setIsModalOpen(true);
  };
  const [Grid_Form,setGridOrForm]=useState(true);
  const closeModal = () => setIsModalOpen(false);
  const sendValueToParent = (value) => {
    HanldeClick();
    SetUser(value);

    //onEvent(value, Action);
  };
  return (
    <>
    <div className="container mt-3">
      <div className="row ">
            <div className="col-md-9">
              <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Email Logs
                </p>
            </div>
            
            {Grid_Form && 
            <div className="align-items-center col-md-3 d-flex justify-content-around">
              <button className="btn btn-light" onClick={fetchData} style={{border:'1px solid #80808069'}}>
                <span className="align-items-center d-flex">                        
                  <span className={Loading ? 'material-symbols-outlined rotate':'material-symbols-outlined'}>sync</span>
                  <span>Refresh Log</span>
                  </span>
              </button>

              <button className="btn btn-primary" onClick={HanldeClick}>
                <span className="align-items-center d-flex">
                  <span className="material-symbols-outlined">support</span>
                  <span>Send Mail</span>
                  </span>
              </button>
            
            </div> 
            }
          </div>
          
    <div className="">
    {Grid_Form &&  Loading && <TableSkeletonLoader />}
  {Grid_Form && NoRecord && <NoRecordFound />}
      {Grid_Form && !Loading &&
      <>
      <div className="col-md-1">
            <span className="badge bg-primary" style={{fontSize:'15px'}}>Total Records:{totalRecord}</span>
            </div><div className="col-md-11"></div>
           
       <table className="table-responsive table table-striped table-bordered mt-4">
        <thead>
          <tr className="text -end d-none">
            <th colspan="9">
              <span
                style={{ cursor: "pointer" }}
                className="btn btn-outline-secondary btn-sm d-inline-flex justify-content-center align-item-center"
              >
                <span
                  style={{ fontSize: "20px" }}
                  className="material-symbols-outlined"
                >
                  autorenew
                </span>{" "}
                <span>Refresh</span>
              </span>
            </th>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserName</th>
            <th scope="col">From Email</th>
            <th scope="col">To Email</th>
            <th scope="col">Subject</th>
            <th scope="col">Body</th>

            <th scope="col">CreatedOn</th>
            <th scope="col">SendDate</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {EmailList &&
            EmailList.length > 0 &&
            EmailList.map((ele, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{ele.name}</td>
                <td>{ele.FromEmail}</td>
                <td>{ele.ToEmail}</td>
                <td>{ele.Subject}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => openModal(ele)}
                  >
                    View
                  </button>
                </td>
                <td>
                  {ele.createdAt
                    ? formatDistanceToNow(ele.createdAt, {
                        addSuffix: true
                      })
                    : "---"}
                </td>
                <td>{ele.SentAt ? ele.SentAt : "---"}</td>
                <td>
                  <span
                    onClick={() => sendValueToParent(ele, "edit")}
                    style={{ cursor: "pointer" }}
                    className="text-primary material-symbols-outlined"
                  >
                    edit_square
                  </span>
                  &nbsp;
                  <span
                    onClick={() => sendValueToParent(ele, "delete")}
                    style={{ cursor: "pointer" }}
                    className="text-danger material-symbols-outlined"
                  >
                    delete
                  </span>
                  &nbsp;
                  <span
                    onClick={() => sendValueToParent(ele, "mail")}
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
                <button className="btn btn-light btn-sm d-inline-flex text-black" onClick={HandlePrev} disabled={PageNo === 1}>
                  <span class="material-symbols-outlined">
keyboard_double_arrow_left
</span>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-light btn-sm d-inline-flex text-black"
                  onClick={HandleNext}
                  disabled={PageNo * 5 >= totalRecord}
                >
                  <span class="material-symbols-outlined">
keyboard_double_arrow_right
</span>
                </button>
              </div></div></>
     
      }
      {!Grid_Form && <SendMail User={User} onEvent={sendValueToParent} />}
      </div>
      {isModalOpen && (
        <ModalComponent
          Modal={Modal}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
</div>
    </>
  );
    
}