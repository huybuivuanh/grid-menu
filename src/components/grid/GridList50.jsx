import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";

const DropdownList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // Fetch fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(50);
      setFonts(fontList);
    };

    loadFonts();
  }, []);

  // Use the custom hook for font sizes
  const { fontSizes, measureRef } = useFontSizes(fonts, 25);

  return (
    <div className="menu-container">
      <FontMeasure measureRef={measureRef} baseFontSize={25} />
      <div
        className="grid gap-x-1 gap-y-1 p-1"
        style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}
      >
        {fonts.map((font) => {
          loadGoogleFont(font.family); // Load font dynamically

          return (
            <button
              key={font.family}
              onClick={() => setSelectedFont(font.family)}
              className={`border border-gray-400 h-[100px] w-full 
             flex items-center justify-center shadow-sm
             transition-all duration-200 ease-in-out 
             ${
               selectedFont === font.family
                 ? "bg-blue-400 text-white"
                 : "bg-gray-200 hover:bg-gray-300"
             }`}
              style={{
                fontFamily: font.family,
                fontSize: `${fontSizes[font.family] || 20}px`,
              }}
            >
              {font.family}
            </button>
          );
        })}
      </div>
      <TextArea selectedFont={selectedFont} />
    </div>
  );
};

export default DropdownList50;
