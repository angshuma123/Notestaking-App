import { useEffect, useState } from "react";
import Note from "./pages/Note";

function App() {
  const [notesData, setNotesData] = useState(
    JSON.parse(localStorage.getItem("note"))
  );

  const [notesLength, setNotesLength] = useState(
    JSON.parse(localStorage.getItem("length"))
      ? JSON.parse(localStorage.getItem("length"))
      : 0
  );

  const setLocalStorage = () => {
    localStorage.setItem("note", JSON.stringify(notesData));
    localStorage.setItem("length", JSON.stringify(notesLength));
  };

  useEffect(() => {
    setLocalStorage();
  }, [notesData]);

  const updateNotesData = (data, len) => {
    setNotesData(data);
    setNotesLength(len);
  };

  return (
    <Note
      notesData={notesData}
      size={notesLength}
      updateNotesData={updateNotesData}
    />
  );
}

export default App;
