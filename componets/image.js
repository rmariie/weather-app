// components/images.js
import React from "react";

const BackgroundImage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/public/images/pic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1, // So the background stays behind other content
      }}
    />
  );
};

export default BackgroundImage;
