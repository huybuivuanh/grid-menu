import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes, trimFont } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";

const GridList300 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // Fetch fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(300);
      setFonts(fontList);
    };

    loadFonts();
  }, []);

  // Use the custom hook for font sizes
  const { fontSizes, measureRef } = useFontSizes(fonts, 19);

  return (
    <div className="menu-container">
      <FontMeasure measureRef={measureRef} baseFontSize={19} />
      <div
        className="grid gap-x-1 gap-y-1 p-1"
        style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
      >
        {fonts.map((font) => {
          loadGoogleFont(font.family); // Load font dynamically

          return (
            <button
              key={font.family}
              onClick={() => setSelectedFont(font.family)}
              className={`border border-gray-400 p-0 bg-gray-200 w-full h-7 flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out ${
                selectedFont === font.family
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              style={{
                fontFamily: font.family,
                fontSize: `${fontSizes[font.family] || 20}px`, // Apply calculated font size
              }}
            >
              {trimFont(font.family, 6)}
            </button>
          );
        })}
      </div>
      <TextArea selectedFont={selectedFont} />
    </div>
  );
};

export default GridList300;
