import CardLevel from "../../Components/CardLevel/CardLevel";
import Logo from "../../Components/Logo/Logo";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="container">
      <Logo />
      <div className="levels">
        <CardLevel />
        <CardLevel />
      </div>
    </div>
  );
};

export default MainPage;
