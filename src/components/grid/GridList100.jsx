import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes, trimFont } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";

const GridList100 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");
  const [recentFonts, setRecentFonts] = useState([]); // Track 5 most recent fonts

  // Fetch fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(100);
      setFonts(fontList);
    };
    loadFonts();
  }, []);

  // Use the custom hook for font sizes
  const { fontSizes, measureRef } = useFontSizes(fonts, 25);

  // Handle font selection and update recent fonts
  const handleSelectFont = (font) => {
    setSelectedFont(font);

    // Update recent fonts list (keep only the last 5)
    setRecentFonts((prev) => {
      const updatedRecent = [font, ...prev.filter((f) => f !== font)]; // Remove duplicates
      return updatedRecent.slice(0, 5); // Keep only the last 5 fonts
    });
  };

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
              onClick={() => handleSelectFont(font.family)}
              className={`border border-gray-400 p-0 w-full h-[60px] flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out
                ${
                  selectedFont === font.family
                    ? "bg-blue-400 text-white"
                    : recentFonts.includes(font.family)
                    ? "bg-purple-400 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              style={{
                fontFamily: font.family,
                fontSize: `${fontSizes[font.family] || 20}px`, // Apply calculated font size
              }}
            >
              {trimFont(font.family, 7)}
            </button>
          );
        })}
      </div>

      <TextArea selectedFont={selectedFont} />
    </div>
  );
};

export default GridList100;
