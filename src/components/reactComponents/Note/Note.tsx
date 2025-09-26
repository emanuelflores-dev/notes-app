import "./Note.css";

interface Props {
  title: string;
  contenido: string;
  descripcion: string;
}

export const Note = ({ title, contenido, descripcion }: Props) => {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{descripcion}</p>
      <p>{contenido}</p>
    </div>
  );
};
