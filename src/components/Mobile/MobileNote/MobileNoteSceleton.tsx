import React, { FC } from "react";
import "./MobileNoteSceleton.scss";

const NoteSceleton: FC = () => {
  return (
    <div className="NoteSceleton__container">
      <div className="NoteSceleton__header"></div>
      <div className="NoteSceleton__content-image"></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "60%" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "30%" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "50%" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "20%" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "90%" }}
      ></div>
      <br />
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "56%" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "45%" }}
      ></div>
      <br />
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "50%" }}
      ></div>
    </div>
  );
};

export default NoteSceleton;
