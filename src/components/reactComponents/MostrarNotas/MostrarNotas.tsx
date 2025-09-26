import { Note } from "../Note/Note.tsx";
import "./MostrarNotas.css";

type Props = {
  notes: Note[];
};

interface Note {
  title: string;
  descripcion: string;
  contenido: string;
}

export const MostrarNotas = ({ notes }: Props) => {
  return (
    <div className="notes-generator">
      {notes.map((note: Note) => (
        <Note
          title={note.title}
          contenido={note.contenido}
          descripcion={note.descripcion}
        />
      ))}
    </div>
  );
};
