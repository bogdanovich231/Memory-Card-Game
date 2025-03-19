import "./Card.scss";
import ICard from "../../utils/interfaces/card";

const Card = ({ image }: ICard) => {
  return (
    <div className="card">
      <img src={image} alt="emoji" />
    </div>
  );
};

export default Card;
