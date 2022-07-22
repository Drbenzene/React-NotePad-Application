import React, {useState, useEffect, useContext} from "react";
import { MdAutoDelete, MdEditNote, MdFavoriteBorder} from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import styles from "./Notes.module.css";
import '../../App.css';
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClear, AiTwotoneLike, AiFillHeart } from "react-icons/ai";
import {GlobalContext} from '../../Contex'
import 'animate.css';

// let today = new Date();
// let date =
//   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "," + today.getHours() + ":" + today.getMinutes();
//   ;


function Notes() {
  const store = useContext(GlobalContext);
  const {update, title, titleChangeHandler, textChangeHandler, text, updated, updateChangeHandler, clearHandler, notes, handleSubmit, onNoteUpdate, favourite, favouriteHandler,
  deleteHandler, updateHandler, likeHandler } = store

  return (
    <div className={styles.container}>

      {update === true ? ( <div className={styles.note}>
      <form>
          <label>
            <h3>
              Update Note <MdEditNote size="20px" />
            </h3>
            <input
              name="noteTitle"
              value={updated.noteTitle}
              type="text"
              placeholder="Title"
              onChange={updateChangeHandler }
            />
          </label>

          <textarea
            name="noteText"
            value={updated.noteText}
            placeholder="What's on your mind today"
            onChange={updateChangeHandler }
          />
        </form>

        <div className={styles.icons}>
          <button onClick={() => onNoteUpdate(updated.id)}   className={styles.addbtn}>
            <IoMdAddCircleOutline size="17px" /> Update Note
          </button>
        </div>
      </div>) : (      <div className={styles.note}>
      <form>
          <label>
            <h3>
              Add New Note <MdEditNote size="20px" />
            </h3>
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={titleChangeHandler}
            />
          </label>

          <textarea
            value={text}
            placeholder="What's on your mind today"
            onChange={textChangeHandler}
          />
        </form>

        <div className={styles.icons}>
          <button onClick={clearHandler}  className={styles.clearbtn}>
            <AiOutlineClear size="17px" />
            Clear
          </button>

          <button onClick={handleSubmit}   className={styles.addbtn}>
            <IoMdAddCircleOutline size="17px" /> Add
          </button>
        </div>
      </div>) }




      {notes.map((note) => (
              <div className={styles.note} key={note.id}>
              <h3>{note.noteTitle}<AiFillHeart id={styles.modifying} className={notes.favourites? "fav": ""} onClick={(e) => favouriteHandler(e, note.id)} /> 
              <AiTwotoneLike id={styles.modifying} className={notes.like ? "like" : ""} onClick={(e) => likeHandler(e, note.id)} /></h3>
              <p className={styles}>
              {note.noteText}
              </p>
              <div className={styles.options}>
                <div>
                  <span className={styles.dateandtime}>Modified: {note.modified}</span>
                </div>
                <div className={styles.icons}>
                  <MdAutoDelete onClick={() => deleteHandler(note.id)} size="20px" />
                  <FaEdit onClick={() => updateHandler(note.id)} size="20px" />
                </div>
              </div>
            
            </div>   
      ))}

    </div>
  );
}

export default Notes;
