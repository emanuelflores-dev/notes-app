import { useEffect, useState } from "react";
import "./Form.css";

export const Form = () => {
  const [note, setNote] = useState({
    title: "",
    descripcion: "",
    contenido: "",
  });

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setNote(JSON.parse(savedNote));
    }
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [note]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nota creada:", note);

    localStorage.setItem("note", JSON.stringify(note));
    setNotes([...notes, note]);
    setNote({ title: "", descripcion: "", contenido: "" });
  };

  return (
    <form id="create-new-note" onSubmit={handleSubmit}>
      <h2>Crea una Nota</h2>

      <div className="form-section">
        <label>Titulo: </label>
        <input
          type="text"
          id="nombre"
          name="title"
          placeholder="Titulo"
          required
          value={note.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <label>Descripcion: </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          placeholder="Descripcion"
          required
          value={note.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <label>Contenido: </label>
        <textarea
          id="contenido"
          name="contenido"
          placeholder="Contenido"
          required
          value={note.contenido}
          onChange={handleChange}
        ></textarea>
      </div>

      <button className="form-button" type="submit">
        CREAR NOTA
      </button>
    </form>
  );
};
