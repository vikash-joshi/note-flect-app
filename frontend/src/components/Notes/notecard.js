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
      <div class="notes ">
        <div class="note-item">
          <div class="lazur-bg" style={{ maxHeight: isExpanded ? '100%' : '208px' }}>
            <span className="header_note">   <span className="badge bg-primary">{note.category}</span>
              <a>
                <i onClick={() => Handle_Edit_Delete("edit", note)} class=" text-primary material-symbols-outlined">edit</i>
                <i
                  onClick={() => Handle_Edit_Delete("delete", note)} class=" text-danger material-symbols-outlined">close</i>
              </a>
            </span>
            <h4>{note.title}</h4>
            <p className="content_bodys" dangerouslySetInnerHTML={{ __html: isExpanded ? note.content : note.content.length>100 ? note.content.substring(0, 100) + '...' : note.content }}></p>
            {note.content?.length > 100 && <button onClick={toggleExpand} className="read-more-btn">
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>}
            <i class="footer"><span class="material-symbols-outlined">
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