
import Sidebar from "./components/Sidebar";
import './App.css';
import {useEffect, useState} from "react";
import uuid from "react-uuid"
import Main from "./components/Main";



function App() {
    //ローカルストレージから保存されたノートオブジェクトを取得、ないときは空の配列をセットする
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes"))||[]);
    //選択されたノートを格納する状態変数
    const [activeNote, setActiveNote] = useState(false);

    
    useEffect(() => {
        //ローカルストレージにノートを保存する
        localStorage.setItem("notes",JSON.stringify(notes));

    }, [notes]);

    //ページをリロードするときデフォルトで１番目のノートを選択するようにする
    useEffect(() => {
        
        setActiveNote(notes[0]?.id);

    }, []);



    //ノートを追加する関数
    const onAddNote = () => {
        //ノートオブジェクトのスキーマを定義する
        const newNote = {
            id: uuid(),
            title: "新しいノート",
            content: "",
            modDate: Date.now(),
        };

        setNotes([...notes, newNote]);
    }

    //ノート削除する関数
    const onDeleteNote = (id) => {

        //削除しようとするノート以外のノートを新しい配列に格納して残す
        const filterNotes = notes.filter(note => note.id !== id);
        setNotes(filterNotes);
    }

    //ノートを更新する関数
    const onUpdateNote = (updatedNote) => {
        //編集された新しいノートの配列を返す
        const updatedNotesArray = notes.map( note => {
            //もしnoteidが更新中のnoteidとマッチすれば更新後のノートオブジェクトを返す
            if(note.id === updatedNote.id){
                return updatedNote;
            //もしnoteidが更新中のnoteidとマッチしない場合そのまま返す
            }else{
                return note;
            }
        });
        setNotes(updatedNotesArray);
    }

    //アクティブになっているノートのオブジェクトを取得する関数
    const getActiveNote = () => {
        return notes.find(note => note.id === activeNote);
    }



  return (
   <div className="App">
     <Sidebar onAddNote={onAddNote}
              notes={notes}
              onDeleteNote={onDeleteNote}
              setActiveNote={setActiveNote}
              activeNote={activeNote}

     />
        {/* ページがレンダリングされた際にアクティブノートを取得したいためカッコをつける */}
       <Main activeNote={getActiveNote()}
             onUpdateNote={onUpdateNote}
       />
   </div>
  );
}

export default App;
