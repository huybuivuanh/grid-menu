import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes, trimFont } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";

const GridList500 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");
  const [recentFonts, setRecentFonts] = useState([]); // Track 5 most recent fonts
  const [hoverFont, setHoverFont] = useState(""); // Track hovered font
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 }); // Track cursor position for popup

  // Fetch fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(500);
      setFonts(fontList);
    };
    loadFonts();
  }, []);

  // Use the custom hook for font sizes
  const { fontSizes, measureRef } = useFontSizes(fonts, 15);

  // Handle font selection
  const handleSelectFont = (font) => {
    setSelectedFont(font);
    setHoverFont(""); // Reset hover state when a font is selected

    // Update recent fonts list (keep only the last 5)
    setRecentFonts((prev) => {
      const updatedRecent = [font, ...prev.filter((f) => f !== font)]; // Remove duplicates
      return updatedRecent.slice(0, 5); // Keep only the last 5 fonts
    });
  };

  return (
    <div className="menu-container relative">
      <FontMeasure measureRef={measureRef} baseFontSize={15} />

      {/* Font Grid */}
      <div
        className="grid gap-x-1 gap-y-1 p-1"
        style={{ gridTemplateColumns: "repeat(25, minmax(0, 1fr))" }}
        onMouseLeave={() => setHoverFont("")} // Reset font when leaving grid
      >
        {fonts.map((font) => {
          loadGoogleFont(font.family); // Load font dynamically

          return (
            <button
              key={font.family}
              onClick={() => handleSelectFont(font.family)}
              onMouseEnter={(e) => {
                setHoverFont(font.family);
                setHoverPosition({ x: e.clientX, y: e.clientY }); // Store cursor position
              }}
              onMouseMove={(e) =>
                setHoverPosition({ x: e.clientX, y: e.clientY })
              } // Update position
              className={`border border-gray-400 p-0 w-full h-7 flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out
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
              {trimFont(font.family, 5)}
            </button>
          );
        })}
      </div>

      {/* Hover preview popup */}
      {hoverFont && (
        <div
          className="absolute bg-white border border-gray-400 shadow-lg p-4 rounded-lg transition-opacity duration-200 ease-in-out"
          style={{
            top: Math.min(hoverPosition.y - 180, window.innerHeight - 100), // Keep it inside viewport
            left: Math.min(hoverPosition.x - 0, window.innerWidth - 200), // Prevent overflow
            fontFamily: hoverFont,
            fontSize: "40px", // Larger preview
            zIndex: 50,
            pointerEvents: "none", // Prevents blocking interactions
          }}
        >
          {hoverFont}
        </div>
      )}

      {/* Pass hoverFont if hovering, otherwise use selectedFont */}
      <TextArea selectedFont={hoverFont || selectedFont} />
    </div>
  );
};

export default GridList500;
