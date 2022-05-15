import React, { FC } from "react";
import "./MobileNoteSceleton.scss";

const NoteSceleton: FC = () => {
  return (
    <div className="NoteSceleton__container">
      <div className="NoteSceleton__header"></div>
      <div className="NoteSceleton__content-image"></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "600px" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "300px" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "500px" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "200px" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "900px" }}
      ></div>
      <br />
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "560px" }}
      ></div>
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "450px" }}
      ></div>
      <br />
      <div
        className="NoteSceleton__content-text_row"
        style={{ width: "500px" }}
      ></div>
    </div>
  );
};

export default NoteSceleton;
