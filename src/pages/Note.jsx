import React, { useState } from "react";
import { IoSend, IoArrowBackOutline } from "react-icons/io5";
import styles from "./notes.module.css";
import ContentArea from "../components/ContentArea";

const Notes = ({ notesData, size, updateNotesData }) => {
  const [displayCreateNote, setDisplayCreateNote] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [noteSelected, setNoteSelected] = useState({});
  const [shownotesContent, setShownotesContent] = useState(false);
  const [text, setText] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [rightContainerDisplay, setRightContainerDisplay] = useState(false);

  const openCreateNote = () => {
    setDisplayCreateNote(true);
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleSelectColor = (color) => {
    setBackgroundColor(color);
  };

  const handleCreateNote = () => {
    setDisplayCreateNote(false);
    if (groupName.trim() === "" || backgroundColor === "") {
      setGroupName("");
      setBackgroundColor("");
      return;
    }
    const newNote = {
      title: groupName,
      bgColor: backgroundColor,
      content: [],
      key: size + 1,
    };
    let newNotesData = [];
    if (notesData?.length > 0) {
      newNotesData = [newNote, ...notesData];
    } else {
      newNotesData = [newNote];
    }
    updateNotesData(newNotesData, size + 1);
    setGroupName("");
    setBackgroundColor("");
  };

  const handleNoteClicked = (note) => {
    setShownotesContent(true);
    setNoteSelected(note);
    setSavedEntries(note.content);
    if (window.innerWidth <= 768) setRightContainerDisplay(true);
  };

  const updateNoteContent = () => {
    if (text.trim() !== "") {
      const entry = {
        text: text,
        timestamp: new Date().toLocaleString(),
      };

      setSavedEntries([...savedEntries, entry]);
      setText("");

      const updatedNotesData = notesData.map((note) => {
        if (note.key === noteSelected.key) {
          return {
            title: note.title,
            bgColor: note.bgColor,
            content: [...savedEntries, entry],
            key: note.key,
          };
        } else {
          return note;
        }
      });

      updateNotesData(updatedNotesData, size);
    }
    setText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (text.trim() !== "") {
        updateNoteContent();
      }
    }
  };

  const handleEnterClicked = () => {
    updateNoteContent();
    setText("");
  };

  const handleBackClicked = () => {
    setRightContainerDisplay(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.leftContainer}
        style={{
          display: rightContainerDisplay && "none",
        }}
      >
        <div className={styles.pocketNotesHeader}>Pocket Notes</div>

        <div className={styles.leftInnerContainer}>
          <button onClick={openCreateNote} className={styles.createNotesButton}>
            + Create Notes group
          </button>
        </div>
        
        {notesData && notesData?.length > 0 && (
          <div className={styles.notesGroup}>
            {notesData.map((note) => {
              return (
                <div
                  onClick={() => handleNoteClicked(note)}
                  key={note.key}
                  className={styles.noteTitle}
                  style={{
                    backgroundColor: `${
                      note.key === noteSelected.key ? "#F7ECDC" : ""
                    }`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: `${note.bgColor}`,
                    }}
                    className={styles.noteIcon}
                  >
                    {note.title.slice(0, 2)}
                  </div>
                  <div>{note.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        className={styles.rightContainer}
        style={{
          display: rightContainerDisplay ? "flex" : "",
        }}
      >
       
        {!shownotesContent && <ContentArea />}

       
        {shownotesContent && (
          <div className={styles.notesContainer}>
            <div>
              <div
                className={styles.noteTitle}
                style={{
                  backgroundColor: "#E8E8E8",
                  borderRadius: "0",
                }}
              >
                <div className={styles.backArrow} onClick={handleBackClicked}>
                  <IoArrowBackOutline />
                </div>
                <div
                  style={{
                    backgroundColor: `${noteSelected.bgColor}`,
                  }}
                  className={styles.noteIcon}
                >
                  {noteSelected.title.slice(0, 2)}
                </div>
                <div>{noteSelected.title}</div>
              </div>
            </div>
            <div className={styles.notesContent}>
              {savedEntries?.length > 0 &&
                savedEntries.map((entry, index) => (
                  <div key={index} className={styles.note}>
                    <div className={styles.notesTime}>
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        {new Date(entry.timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className={styles.notesText}>{entry.text}</div>
                  </div>
                ))}
            </div>
            <div className={styles.textInputContainer}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.textArea}
                placeholder="Enter your text here..........."
              ></textarea>
              <div onClick={handleEnterClicked} className={styles.enterIcon}>
                <IoSend />
              </div>
            </div>
          </div>
        )}
      </div>
   
      {displayCreateNote && (
        <div
          className={styles.createNotesBg}
          onClick={() => {
            setDisplayCreateNote(false);
            setGroupName("");
            setBackgroundColor("");
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.createNotesModal}
          >
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              Create New Notes group
            </div>
           
            <div className={styles.modalInnerContainer}>
              <label>Group Name</label>
              <input
                type="text"
                placeholder="Enter your group name...."
                name="groupName"
                onChange={handleGroupName}
                className={styles.inputGroupName}
              ></input>
            </div>
         
            <div className={styles.modalInnerContainer}>
              <p>Choose colour</p>
              <div className={styles.chooseColor}>
                {colors.map((color) => {
                  return (
                    <div
                      onClick={() => {
                        handleSelectColor(color);
                      }}
                      style={{
                        backgroundColor: `${color}`,
                        border: `${
                          color === backgroundColor ? "2px solid green" : ""
                        }`,
                      }}
                      key={color}
                      className={styles.notesColorSelector}
                    ></div>
                  );
                })}
              </div>
            </div>
          
            <div className={styles.createButtonContainer}>
              <button
                onClick={handleCreateNote}
                className={styles.createButton}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
