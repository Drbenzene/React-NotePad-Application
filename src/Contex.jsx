import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './index.css'
import { v4 as uuidv4 } from 'uuid'
import likeTone from './Assets/Facebook.mp3'

const GlobalContext = React.createContext();

let date = new Date().toLocaleString();

const Provider = (props) => {
    const alertMsg = (message, icon) => {

        Swal.fire({
          html: message,
          icon: icon,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
    
      }
      const theAlert = (message, icon) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast'
          },
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: icon,
          title: message,
        })
      }
    
      const [notes, setNote] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
      const [update, setUpdate] = useState(false);
      const [title, setTitle] = useState("");
      const [favourite, setFavourite] = useState("")
      const[fav, setFav] = useState(false)
      const [like, setLike] = useState(false)
      const [favourites, setFavourites] = useState([])
      const [text, setText] = useState("");
      const [updated, setUpdated] = useState({
        id: "",
        noteTitle: "",
        noteText: "",
        modified: "",
      })


    //Reuseable Code For local storage and Data Persisiting
    /* A hook that is used to store data in local storage. */

      useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
        
       const getFav = localStorage.getItem('favourites')
       console.log(getFav)
        if (getFav && getFav.length > 0) {
          setFavourites(JSON.parse(getFav));

        } else {
          setFavourites([]);
        }

      }, []);

// console.log(favourites)
    
    const titleChangeHandler = (e) => {
      setTitle(e.target.value);
    }
    
      const textChangeHandler = (e) => {
        setText(e.target.value);
      };
    
      const updateChangeHandler = (e) => {
         const { name, value } = e.target
         setUpdated({
            ...updated, [name]: value
         })
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        setTitle(title);
        setText(text);
    
        if (title === "" && text === "") {
          return alertMsg("You Note title and info cannot be empty", "warning");
        }
        if (title === "") {
        return  alertMsg("Please enter a title", "warning")
        } 
        if (text === "") {
        return  alertMsg("Please provide some notes about your Todo", "warning")
        }
        else {
          setNote([
            ...notes,
            {
              id: uuidv4(),
              noteTitle: title,
              noteText: text,
              favourites: true,
              modified: date,
              like: false,
            }
          ]);

          theAlert("Note Added", "success")
          localStorage.setItem("notes", JSON.stringify(notes));
          setTitle("");
          setText("");
        }
    
      };

      const handleClearAll = (e) => {
        e.preventDefault();

         
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this once all notes are cleared!",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Clear',
    denyButtonText: `Don't Clear`,
  }).then((result) => {

    if (result.isConfirmed) {
        theAlert ("All Notes Cleared", "success")
        setNote([]);
        localStorage.setItem("notes", JSON.stringify([]));
    } else if (result.isDenied) {
      return
    }
  })


      }
    
      const clearHandler = () => {
        setTitle("");
        setText("");
      };
    
      const deleteHandler = async (id) => {
        let filtered = notes.filter(note => note.id !== id)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
          await Toast.fire({
            icon: 'error',
            title: 'Deleted'
          })

        setNote(filtered);
        localStorage.setItem("notes", JSON.stringify(filtered));
      }
    
      const updateHandler = (id) => {
        setUpdate(true)
    
        const copy = [...notes]
        let item = copy.find(note => note.id === id)
        setUpdated(item)
      }
    
    
      const onNoteUpdate = (id) => {
        const copyNotes = [...notes]
        const Index = copyNotes.indexOf(copyNotes.find(item => item.id === id))
    
        copyNotes[Index].noteText = updated.noteText;
        copyNotes[Index].noteTitle = updated.noteTitle;
        copyNotes[Index].modified = date
    
        setNote(copyNotes)
        localStorage.setItem("notes", JSON.stringify(copyNotes));
    
        theAlert("Updated Successfully", "success")
        setUpdate(false)
      }

      const favouriteHandler = (e, id) => {
        setFav(true)

        if (fav === true) {
            e.target.classList.toggle("fav")
            // console.log(e.target)
    
            const copy = [...notes]
            let item = copy.find(note => note.id === id)

            item.favourites = true;
            if (item.favourites) {
                item.favourites = false
            } else {
                item.favourites = true
            }

            setNote(copy)

            // console.log(copy.filter(note => favourites.includes(note.id)))
            setFavourites([...favourites, item ])
             const fa = favourites.find((f) => f.id === item.id)
            //  console.log(fa)
            if(!fa) {
                setFavourites([...favourites, item ])
                localStorage.setItem("favourites", JSON.stringify(favourites))
                console.log("Added Fav", favourites)
            } else {
                const newFavourites = favourites.filter((f)=> f.id !== fa.id)
                setFavourites(newFavourites)
                console.log("Fav Removed", newFavourites)
                localStorage.setItem("favourites", JSON.stringify(newFavourites))

            }

        }

      }

      const likeHandler = (e, id) => {
        setLike(true)

        if (like === true) {
          e.target.classList.toggle("like")

          const copy = [...notes]
          let item = copy.find(note => note.id === id)


          if (item.like) {
            item.like = false
        } else {
            item.like = true
            const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
            e.target.addEventListener("click", () => {
                audio.play();
              });
  
        }

        setNote(copy)
        } 
      }

      const menuHandler = async () => {
        await Swal.fire({
          html:
          '<a href="/">Home</a>' +
          '<p><a href="/Calender">Calender</a></p>' +
          '<p class="thenavs"><a href="/favourites">Favourite Notes</a></p>' +
          '© Copyright 2022, Boyinbode Ebenezer Ayomide'+
          '<p>All Right Reserved</p>',
          position: 'top-start',
          showClass: {
            popup: `
              animate__animated
              animate__fadeInLeft
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutLeft
              animate__faster
            `
          },
          grow: 'column',
          width: 300,
          showConfirmButton: false,
          showCloseButton: true
        })

        
      }
        const state = {
            notes, setNote, update,
            updated, setUpdate,
            title, setTitle, favourite, setFavourite, favourites, setFavourites,
            text, setText, setUpdated, theAlert, alertMsg, favouriteHandler,
            onNoteUpdate, deleteHandler, updateHandler, handleSubmit, clearHandler, updateChangeHandler, titleChangeHandler, textChangeHandler,
            handleClearAll, menuHandler, likeHandler
    
        }
        
  return (
    <GlobalContext.Provider value={state}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const Consumer = GlobalContext.Consumer;

export { GlobalContext, Consumer, Provider };
