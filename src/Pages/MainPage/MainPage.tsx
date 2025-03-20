import CardLevel from "../../Components/CardLevel/CardLevel";
import Logo from "../../Components/Logo/Logo";
import { dataLevels } from "../../utils/dataLevels/dataLevels";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="container">
      <Logo />
      <div className="levels">
        {dataLevels.map((level) => (
          <CardLevel
            key={level.id}
            id={level.id}
            level={level.level}
            cards={level.cards}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
