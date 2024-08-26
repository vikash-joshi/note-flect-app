import React, { useEffect, useState, useContext } from "react";
import ToastComponent from "../common/controls/newtoast";
import { FetchAllNotes, FetchNotesByCategory, RemoveNote, SaveNotes } from "./notes_methods";
import { formatDistanceToNow } from "date-fns";
import "./Notes.css";
import { useNavigate } from "react-router-dom";
import CustomTinyMCEEditor from "../common/controls/quill-editor/quill-editor";
import _authContext from "../../context/authContext";
import NoRecordFound from "../common/noRecordFound/norecordfound";
import FullScreenSpinner from "../common/spinner/spinners";
import "./notecard.css"
import NoteCard from "./notecard";

export default function Notes() {


  const [editorHtml, setEditorHtml] = useState('');
  const { isAuthenticated, logout } = useContext(_authContext);

  //Pagination

  const [totalRecord, SettotalRecord] = useState(0);
  const [RecordCount, SetRecordCount] = useState(4);
  let [PageNo, SetPageNo] = useState(1);

  const HandleNext = () => {
    PageNo = PageNo + 1;
    SetPageNo(PageNo);
    //alert(PageNo);
    HandleCategoryClick('', 'mainid0');
  }

  const HandlePrev = () => {
    SetPageNo(PageNo == 1 ? 1 : PageNo - 1);
    HandleCategoryClick('', 'mainid0');
  }

  const navigate = useNavigate();
  const _handleChange = (html) => {
    setEditorHtml(html);
  };


  const handleEditorChange = (value) => {
    SetNotesModel((prev) => ({
      ...prev,
      content: value
    }));
    //handleChange('content',value);
  }


  const [Form_Or_List, setFormOrList] = useState(false);
  const [activeIndex, setActiveIndex] = useState('mainid0');
  const [Action, setAction] = useState("");
  const [ShowLoading, SetLoading] = useState(true);
  const [ShowNoRecord, SetNoRecord] = useState(false);

  const [CategoryList, SetCategoryList] = useState([]);
  const [NotesList, SetNotesList] = useState([]);

  const [Message, SetMessage] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);
  const [showFormLoading, setshowFormLoading] = useState(false);

  const [SelCategory, handleSelectChange] = useState("-1");
  const [NotesModel, SetNotesModel] = useState({
    title: "",
    category: "",
    content: "",
    id: ""
  });

  const Handle_Edit_Delete = async (action, Data) => {
    console.log('data', Data)
    setshowFormLoading(true)
    setTimeout(() => {
      setshowFormLoading(false)
    }, 2000);
    setAction(action);
    SetNotesModel(Data);
    if (action !== "delete") {
      handleEditorChange(NotesModel?.content);
      HandleHideShow();
    }
    else {
      let Datas = await HandleRemove(Data);
    }
  };

  const HandleCategoryClick = async (category, element) => {
    setActiveIndex(element)
    let Response = null;
    if (element !== 'mainid0') {
      Response = await FetchNotesByCategory({ category: category, user: '' }, PageNo)
      if (Response && Response?.logout == true) {
        logout();
      }
      else
        if (
          Response &&
          Response?.messsage &&
          Response?.messsage?.toString().includes("0:")
        ) {
          SetMessage({ message: Response?.messsage, type: "text-warning" });
          SetLoading(false);
          SetNoRecord(true);

          SetNotesList([]);
          handleShowToast();
        } else if (Response == null || Response == undefined || Response?.length == 0) {
          SetNoRecord(true);
          SetNotesList(Response);
          SetLoading(false);
        }
        else {
          SetNoRecord(false);
          SetNotesList(Response);
          SetLoading(false);
        }
    }
    else {
      Response = await fetchallNotes(PageNo)

    }


  }

  const HandleCategory = (value) => {
    handleSelectChange(value);
    SetNotesModel((prev) => ({
      ...prev,
      category: value
    }));
  };

  const HandleSave = async () => {
    console.log(NotesModel);
    SetLoading(true);
    let Result = await SaveNotes(NotesModel);
    SetLoading(false);
    if (Result && Result?.logout == true) {

      logout();
    }
    else
      if (Result && Result?.success && Result?.success == true) {
        SetMessage({ message: Result.message, type: "text-success" });
        GetRecord();
        handleShowToast();
        HandleHideShow();
      } else if (Result && Result?.error) {
        SetMessage({
          message: Result?.error.join("<br />"),
          type: "text-danger"
        });
        handleShowToast();
      } else {
        SetMessage({ message: Result?.message, type: "text-warning" });
        handleShowToast();
      }
  };

  const HandleRemove = async (_NotesModel) => {

    let Result = await RemoveNote(_NotesModel);
    if (Result && Result?.logout == true) {
      logout();
    }
    else
      if (Result && Result?.message && Result?.message?.includes('1:')) {
        let Data = NotesList && NotesList.length > 0 ? NotesList.filter(x => x._id !== _NotesModel._id) : [];
        SetNotesList(Data);
        GetRecord();
        clearNote();
        SetMessage({ message: Result.message, type: "text-success" });
        handleShowToast();
      } else {
        SetMessage({ message: Result?.message, type: "text-danger" });
        handleShowToast();
        clearNote();
      }
  };



  const handleChange = (field, value) => {
    let NoteModel = NotesModel;
    SetNotesModel({
      title: field == "title" ? value : NoteModel.title,
      category: field == "category" ? value : NoteModel.category,
      content: field == "content" ? value : NoteModel.content
    });
  };
  const HandleHideShow = () => {
    debugger;
    setFormOrList(!Form_Or_List);
    if (Form_Or_List) {
      clearNote();
    }
  };

  const clearNote = () => {
    SetNotesModel({});
  };


  const GetRecord = () => {
    fetchallNotes(PageNo);
    setActiveIndex('mainid0')
  }


  const fetchallNotes = async (PageNo) => {
    let Response = await FetchAllNotes(PageNo);
    if (Response && Response?.logout == true) {
      logout();
    }
    else {
      if (Response && Response?.messsage && Response?.messsage != "") {
        SetNoRecord(true);
        SetLoading(false);
        SetNotesList([]);
      } else {
        SetNoRecord(Response?.['Notes'] && Response?.['Notes']?.length == 0);
        SetLoading(false);
        SetNotesList(Response?.['Notes']);
        SetCategoryList(Response?.['Category']);
        //console.clear();
        console.log(Response?.['TotalCount'])
        SettotalRecord(Response?.['TotalCount']);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        let Res = await fetchallNotes();
      }
      else {
        logout();
        SetMessage({ message: 'Logged Out', type: "text-success" });
        handleShowToast();
        navigate("/Login");
      }
    };
    fetchData();
    return () => {
      // Code to run on component unmount (cleanup)
    };
  }, [isAuthenticated]);

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
        {(ShowLoading || showFormLoading)  && <FullScreenSpinner />}
        <ToastComponent
          show={showToast}
          onClose={handleCloseToast}
          type={Message.type}
          message={Message.message}
          duration={3000}
        />
      </div>
      <div className="container">
        {(!Form_Or_List &&
          <div className="row mt-4 mobile-width-padding">
            <div className="col-md-10" style={{ fontSize: '20px', fontWeight: 'bold' }}>Notes Management</div>
            <div className="col-md-2 d-flex justify-content-end mb-3">
              <button
                className="active align-item-center bg-primary btn d-flex justify-content-center"
                onClick={() => Handle_Edit_Delete("Add", NotesModel)}
              >
                <span className="card-icon text-white material-symbols-outlined">
                  add
                </span>
                <span className="text-white">Add Note </span>
              </button>


            </div>
            {CategoryList && CategoryList.length > 0 &&
              <>  <div className={ShowNoRecord ? '' : 'col-md-3'}>
                <ul className="list-group">

                  <li
                    id="mainid0"
                    className={activeIndex === 'mainid0' ? ' list-group-item d-flex justify-content-between align-items-center noteactive ' : 'list-group-item d-flex justify-content-between align-items-center'}
                    onClick={() => HandleCategoryClick('', 'mainid0')}
                  >
                    All
                  </li>
                  {CategoryList &&
                    CategoryList.length > 0 &&
                    CategoryList.map((item, index) => (
                      <li onClick={() => HandleCategoryClick(item._id, 'mainid' + index + 1)}
                        id={'mainid' + index + 1}
                        className={activeIndex === 'mainid' + index + 1 ? ' list-group-item d-flex justify-content-between align-items-center noteactive ' : 'list-group-item d-flex justify-content-between align-items-center'}
                      >
                        {item?.name} <span className="badge bg-info">{item?.noteCount}</span>
                      </li>
                    ))}
                </ul>
              </div>
              </>
            }


            <div className={ShowNoRecord ? 'col-md-12 right-panel_noRec' : 'col-md-9 right-panel'}>
              {ShowLoading == false && ShowNoRecord == false ? (

                <div className="row">
                  {NotesList && NotesList.length > 0 && <div className="col-md-12 prevnext_container mb-2">
                    <button onClick={HandlePrev} className="btn prevnextbtn btn-link" disabled={PageNo == 1}><span className="prevnext material-symbols-outlined">arrow_back_ios</span></button>
                    <button style={{ marginLeft: '8px' }} onClick={HandleNext} className="ml-2 btn prevnextbtn btn-link" disabled={PageNo * 4 >= totalRecord}><span className="prevnext material-symbols-outlined">arrow_forward_ios</span></button>
                  </div>}
                  {NotesList && NotesList.length > 0
                    ?

                    NotesList?.map((note) => (
                      <div className="col-md-6">
                        <NoteCard note={note} OnEvent={Handle_Edit_Delete} /> 
                        <div class="notes d-none ">
                          <div class="note-item">
                            <div class="lazur-bg">
                              <span className="header_note">   <span className="badge bg-primary">{note.category}</span>
                                <a>
                                  <i onClick={() => Handle_Edit_Delete("Update", note)} class="text-primary material-symbols-outlined">edit</i><i
                                    onClick={() => Handle_Edit_Delete("Delete", note)} class=" text-danger material-symbols-outlined">close</i>
                                </a>
                              </span>
                              <h4>{note.title}</h4>
                              <p className="content_bodys" dangerouslySetInnerHTML={{ __html: note.content }}></p>
                              <i class="footer"><span class="material-symbols-outlined">
                                calendar_month
                              </span> &nbsp; {formatDistanceToNow(note.createdAt, {
                                addSuffix: true
                              })}</i>
                            </div>
                          </div>
                        </div>

                        <div className="card mb-3 note-width d-none">
                          <div className="align-items-center card-header cardheader d-flex justify-content-between align-item-center">
                            <span className="badge rounded-pill text-bg-primary">
                              {note.category}
                            </span>
                            <span>
                              <span data-toggle="tooltip" data-placement="top" title="Favorite" className="Favorite card-icon material-symbols-outlined text-gray">star</span>
                              <span data-toggle="tooltip" data-placement="top" title="Edit"
                                className="card-icon material-symbols-outlined text-primary"
                                onClick={() =>
                                  Handle_Edit_Delete("edit", note)
                                }
                              >
                                edit
                              </span>
                              <span data-toggle="tooltip" data-placement="top" title="Remove"
                                className="card-icon material-symbols-outlined text-danger"
                                onClick={() =>
                                  Handle_Edit_Delete("delete", note)
                                }
                              >
                                close
                              </span>
                            </span>
                          </div>
                          <div className="card-body note-content">
                            <p className="card-title">{note.title}</p>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: note.content }} ></p>

                          </div>
                          <div className="card-footers">
                            <p className="card-title badge text-black">
                              {formatDistanceToNow(note.createdAt, {
                                addSuffix: true
                              })}
                            </p>
                          </div>
                        </div>{" "}
                      </div>
                    ))
                    : ""}
                </div>

              ) : (
                ""
              )}
              {ShowNoRecord && (
                <NoRecordFound />
              )}

              {ShowLoading && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="d-flex">
                          <div className="skeleton skeleton-icon"></div>
                          <div className="skeleton skeleton-icon"></div>
                        </div>
                      </div>
                      <div className="card-body card-skeleton-body">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="d-flex">
                          <div className="skeleton skeleton-icon"></div>
                          <div className="skeleton skeleton-icon"></div>
                        </div>
                      </div>
                      <div className="card-body card-skeleton-body">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="d-flex">
                          <div className="skeleton skeleton-icon"></div>
                          <div className="skeleton skeleton-icon"></div>
                        </div>
                      </div>
                      <div className="card-body card-skeleton-body">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="d-flex">
                          <div className="skeleton skeleton-icon"></div>
                          <div className="skeleton skeleton-icon"></div>
                        </div>
                      </div>
                      <div className="card-body card-skeleton-body">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="d-flex">
                          <div className="skeleton skeleton-icon"></div>
                          <div className="skeleton skeleton-icon"></div>
                        </div>
                      </div>
                      <div className="card-body card-skeleton-body">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="d-flex">
                          <div className="skeleton skeleton-icon"></div>
                          <div className="skeleton skeleton-icon"></div>
                        </div>
                      </div>
                      <div className="card-body card-skeleton-body">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {Form_Or_List && (
          <div className="row mt-4 mobile-width-padding">
            <div className="col-md-12 formheader d-none">
              <p style={{ marginTop: "5px", color: "white" }}>
                Add / Update Note
              </p>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-8 FormPanel" style={{
              backgroundColor: "#3b82f6e8",
              borderRadius: "15px",
              color: "white"
            }}>
              <div className="row mt-3">
              <div className="col-md-12 mb-3">
                <h3 className="text-center text-white" >Notes</h3>
              </div>
                              <div className="col-md-12 mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={SelCategory}
                    onInput={(e) => HandleCategory(e.target.value)}
                  >
                    <option value="New">New</option>

                    {CategoryList &&
                      CategoryList.length > 0 &&
                      CategoryList.map((item, index) => (
                        <option value={item?.name}
                        >
                          {item?.name}
                        </option>
                      ))}

                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={NotesModel.category}
                    placeholder="Category"
                    onChange={(e) => handleChange("category", e.target.value)}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <input
                    type="text"
                    value={NotesModel.title}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Title"
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <CustomTinyMCEEditor onEditorChange={handleEditorChange} />
                </div>
               
                <div className="col-md-12 mb-3 d-flex">
                  
           
                  <button 
                    className="btn bg-white text-primary"
                    onClick={HandleSave}
                  >
                    
                    <span className="">{Action}</span>
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="btn bg-white  text-primary "
                    onClick={HandleHideShow}
                  >
                    
                    <span className="">Back</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        )}
      </div>
    </>
  );
}
