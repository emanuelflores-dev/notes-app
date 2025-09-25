import { useEffect, useState } from "react";
import "./Form.css";

// 1. Define una interfaz para la estructura de una nota
interface Note {
  title: string;
  descripcion: string;
  contenido: string;
}

export const Form = () => {
  const [note, setNote] = useState<Note>({
    title: "",
    descripcion: "",
    contenido: "",
  });

  // 2. Inicializa el estado con un array vacío para el SSR.
  //    No intentes leer localStorage directamente aquí.
  const [notes, setNotes] = useState<Note[]>([]);

  // 3. Estado para controlar si el componente está montado en el cliente.
  const [isClient, setIsClient] = useState(false);

  // 4. Usa useEffect para cargar los datos de localStorage.
  //    Esto solo se ejecutará en el cliente después de la hidratación inicial.
  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("notesList");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Error al cargar datos de localStorage:", error);
    }
    // Una vez que se ha montado, establece isClient en true.
    setIsClient(true);
  }, []);

  // 5. Usa otro useEffect para guardar los datos cuando cambien las notas.
  useEffect(() => {
    if (isClient) {
      // Solo guarda si ya estamos en el cliente
      localStorage.setItem("notesList", JSON.stringify(notes));
    }
  }, [notes, isClient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotes((prevNotes) => [...prevNotes, note]);
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
