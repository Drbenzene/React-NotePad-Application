import React, { useContext } from 'react'
import {GlobalContext} from '../../Contex'
import styles from './Favourites.module.css'
import { MdAutoDelete, MdEditNote, MdFavoriteBorder} from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import '../../App.css';
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClear, AiTwotoneLike, AiFillHeart } from "react-icons/ai";

function Favourites() {
    const store = useContext(GlobalContext);
    const { notes, deleteHandler, updateHandler, likeHandler, favourites, favouriteHandler } = store

        console.log(favourites)

  return (
    <div className={styles.container}>
  
        {favourites.map((theFav) => (
        <div className={styles.note} key={theFav.id}>
        <h3>{theFav.noteTitle}<AiFillHeart id={styles.modifying} className={favourites.favourites? "fav": ""} onClick={(e) => favouriteHandler(e, theFav.id)} /> 
        <AiTwotoneLike id={styles.modifying} className={notes.like ? "like" : ""} onClick={(e) => likeHandler(e, theFav.id)} /></h3>
        <p className={styles}>
        {theFav.noteText}
        </p>
        <div className={styles.options}>
          <div>
            <span className={styles.dateandtime}>Modified: {theFav.modified}</span>
          </div>
          <div className={styles.icons}>
            {/* <MdAutoDelete onClick={() => deleteHandler(theFav.id)} size="20px" />
            <FaEdit onClick={() => updateHandler(theFav.id)} size="20px" /> */}
          </div>
        </div>
      
      </div>   
))}

    </div>

  )
}

export default Favourites