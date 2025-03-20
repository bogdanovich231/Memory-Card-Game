import "./CardLevel.scss";

const CardLevel = () => {
  return (
    <div className="level-card">
      <div className="level-card_number">
        <h2>1</h2>
      </div>
      <div className="level-card_content">
        <div className="level-card_content-title">
          <h4>Light</h4>
        </div>
        <div className="level-card_content-info">
          <p>Cards: 8</p>
        </div>
      </div>
      <button className="level-card_button"></button>
    </div>
  );
};

export default CardLevel;
