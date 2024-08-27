import { useState } from "react";
import "./notecard.css"
import { formatDistanceToNow } from "date-fns";

export default function NoteCard({ note, OnEvent }) {
  const Handle_Edit_Delete = (call, note) => {
    OnEvent(call, note)
  }


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="notes ">
        <div className="note-item">
          <div className="lazur-bg" style={{ maxHeight: isExpanded ? '100%' : '250px' }}>
            <span className="header_note">   <span className="badge bg-primary">{note.category}</span>
              <a>
                <i onClick={() => Handle_Edit_Delete("edit", note)} className=" text-primary material-symbols-outlined">edit</i>
                <i
                  onClick={() => Handle_Edit_Delete("delete", note)} className=" text-danger material-symbols-outlined">close</i>
              </a>
            </span>
            <h4>{note.title}{note.content.length}{note.content.length>80 ? 1:0}</h4>
            <p className="content_bodys" dangerouslySetInnerHTML={{ __html: !isExpanded ? note.content.length>50 ? note.content.substring(0, 50)+"..." : note.content.substring(0, 50): note.content }}></p>
            {note.content?.length >50 && <button onClick={toggleExpand} className="read-more-btn">
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>}
            <i className="footer"><span className="material-symbols-outlined">
              calendar_month
            </span> &nbsp; {formatDistanceToNow(note.createdAt, {
              addSuffix: true
            })}</i>
          </div>
        </div>
      </div>

    </>
  );
}