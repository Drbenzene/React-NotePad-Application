import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const GlobalContext = React.createContext();

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
    
      const [notes, setNote] = useState(localStorage.notes ? JSON.parse(localStorage.notes) :[]);
      const [update, setUpdate] = useState(false);
      const [title, setTitle] = useState("");
      const [favourite, setFavourite] = useState("")
      const[fav, setFav] = useState(false)
      const [favourites, setFavourites] = useState([{
        id: "",
        noteTitle: "",
        noteText: "",
      }])
      const [text, setText] = useState("");
      const [updated, setUpdated] = useState({
        id: "",
        noteTitle: "",
        noteText: "",
      })

    //Reuseable Code For local storage and Data Persisiting
    /* A hook that is used to store data in local storage. */

      useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
      }, [notes]);
    
    
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
              id: notes.length,
              noteTitle: title,
              noteText: text,
              favourites: false
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
    
      const deleteHandler = (id) => {
        let filtered = notes.filter(note => note.id !== id)
        theAlert("Deleted", "success")
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
    
        setNote(copyNotes)
        localStorage.setItem("notes", JSON.stringify(copyNotes));
    
        theAlert("Updated Successfully", "success")
        setUpdate(false)
      }

      const favouriteHandler = (e, id) => {
        setFav(true)

        if (fav === true) {
            e.target.classList.toggle("fav")
            console.log(e.target)
    
            const copy = [...notes]
            let item = copy.find(note => note.id === id)

            if (item.favourites) {
                item.favourites = false
            } else {
                item.favourites = true
            }
            setNote(copy)

            if(favourites.includes(item.id)) {
                return
            } else {
                setFavourites([...favourites, item ])
                console.log(favourites)
            }

        }

      }

        const state = {
            notes, setNote, update,
            updated, setUpdate,
            title, setTitle, favourite, setFavourite, favourites, setFavourites,
            text, setText, setUpdated, theAlert, alertMsg, favouriteHandler,
            onNoteUpdate, deleteHandler, updateHandler, handleSubmit, clearHandler, updateChangeHandler, titleChangeHandler, textChangeHandler,
             handleClearAll
    
        }
        
  return (
    <GlobalContext.Provider value={state}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const Consumer = GlobalContext.Consumer;

export { GlobalContext, Consumer, Provider };
