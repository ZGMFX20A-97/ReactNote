import React from "react";
import "./Sidebar.css"

const Sidebar = ({onAddNote, onDeleteNote, activeNote, setActiveNote, notes}) => {
   
    //編集日時が最新のノートが上に来るようにソートする
    const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

    return (
        <div className="app-side">
            <div className="app-sidebar-header">
                <h1>ノート</h1>
                <button onClick={onAddNote}>追加</button>
            </div>
            <div className="app-side-notes">
                {sortedNotes.map((note) => (
                    // 現在のnoteがクリックされた場合、classnameにactiveを追加する
                    <div className={`app-side-note ${note.id === activeNote && "active"}`} 
                         onClick={() => setActiveNote(note.id)}
                         key={note.id}>

                        <div className="sidebar-note-title">
                            <strong>{note.title}</strong>
                            <button onClick={() => onDeleteNote(note.id)}>削除</button>
                        </div>
                        <p>{note.content}</p>
                        {/* エポックタイムを日本時間に変換する */}
                        <small>{new Date(note.modDate).toLocaleDateString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</small>
                    </div>
                ))}

            </div>
        </div>
    );
};


export default Sidebar;