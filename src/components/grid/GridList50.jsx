import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../FontLoading";

const GridList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // fetch fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts();
      setFonts(fontList);
    };

    loadFonts();
  }, []);

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
      <TextArea selectedFont={selectedFont}></TextArea>
    </div>
  );
};

export default GridList50;
