import "./Card.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const Card = ({ title, description, imageUrl }: CardProps) => {
  return (
    <div className="card">
      <img className="img" src={imageUrl} alt="No image available" />
      <span className="title">{title}</span>
      <span className="description">{description}</span>
    </div>
  );
};
