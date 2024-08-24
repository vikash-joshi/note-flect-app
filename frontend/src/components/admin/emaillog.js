import React, { useState } from "react";
//import "./admin.css";
//import "./sendmail.css"
import { formatDistanceToNow } from "date-fns";
import ModalComponent from "../common/modal";
import SendMail from "./Manage/sendMail";
export default function EmailLogs({ EmailList, onEvent }) {
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
    const HanldeClick=()=>{
      setGridOrForm(!Grid_Form)
    }
    const closeModal = () => setIsModalOpen(false);
    const sendValueToParent = (value) => {
      HanldeClick();
      SetUser(value);

      //onEvent(value, Action);
    };
    return (
      <>
        <div className="row ">
              <div className="col-md-9">
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  Email Logs
                  </p>
              </div>
              {Grid_Form &&
              <div className="align-items-center col-md-3 d-flex justify-content-around">
                <button className="btn btn-info text-white">
                  <span className="align-items-center d-flex">                        
                    <span className="material-symbols-outlined">sync</span>
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
            
      <div className="table-container">
        {Grid_Form && 
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

      </>
    );
}
