import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../FontLoading";

const GridList100 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // fetch fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(300);
      setFonts(fontList);
    };

    loadFonts();
  }, []);
  return (
    <div className="menu-container">
      <div
        className="grid gap-1 p-1"
        style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
      >
        {fonts.map((font) => {
          loadGoogleFont(font.family); // Load the font dynamically

          return (
            <button
              key={font.family}
              onClick={() => setSelectedFont(font.family)}
              className={`border p-0 text-[10px] ${
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

export default GridList100;
