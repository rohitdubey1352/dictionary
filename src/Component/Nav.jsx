import { useState, useEffect } from "react";
import Logo from "../assets/Images/logo.svg";
import Moon from "../assets/Images/icon-moon.svg";

const Nav = () => {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggleMode = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    document.body.style.backgroundColor = isToggled ? "#050505" : "#ffffff";
    document.body.style.color = isToggled ? "#ffffff" : "#050505";
    const anchors = document.querySelectorAll("a");
    anchors.forEach((anchor) => {
      anchor.style.color = isToggled ? "#ffffff" : "#757575";
    });
    const searchHere = document.getElementById("typeHere");
    searchHere.style.background = isToggled ? "#1F1F1F" : "#F4F4F4";
    searchHere.style.color = isToggled ? "#fff" : "#232323";
  }, [isToggled]);

  return (
    <>
      <nav>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="toggle">
          <div className="dropdown">
            <a href="#" className="fontName">
              Monospace
            </a>
          </div>
          <div className="toggleIcon">
            <button
              id="toggleMode"
              className={isToggled ? "toggled" : ""}
              onClick={handleToggleMode}
            ></button>
          </div>
          <img src={Moon} alt="moon" />
        </div>
      </nav>
    </>
  );
};

export default Nav;
