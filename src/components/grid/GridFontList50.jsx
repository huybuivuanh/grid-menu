import { useState, useEffect } from "react";
import TextArea from "../TextArea";

const GridFontList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC1_xKBz4moDq2xA1J4wd-I_vNXXv7GrRE`
    )
      .then((response) => response.json())
      .then((data) => setFonts(data.items.slice(0, 49))); // Load 49 fonts
  }, []);

  const loadGoogleFont = (fontName) => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      / /g,
      "+"
    )}&display=swap`;
    if (!document.querySelector(`link[href="${fontUrl}"]`)) {
      const link = document.createElement("link");
      link.href = fontUrl;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  };

  return (
    <div className="menu-container">
      <div className="grid grid-cols-7 gap-4 p-4">
        {fonts.map((font) => {
          loadGoogleFont(font.family); // Load the font dynamically

          return (
            <button
              key={font.family}
              onClick={() => setSelectedFont(font.family)}
              className={`border p-3 rounded-md text-lg ${
                selectedFont === font.family
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              style={{ fontFamily: font.family }}
            >
              {font.family}
            </button>
          );
        })}
      </div>
      <TextArea
        selectedFont={selectedFont}
        text={text}
        setText={setText}
      ></TextArea>
    </div>
  );
};

export default GridFontList50;
