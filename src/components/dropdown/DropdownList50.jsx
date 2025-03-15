import { useState, useEffect, useRef } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";

const DropdownList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("Select a font...");
  const [isOpen, setIsOpen] = useState(false);
  const [recentFonts, setRecentFonts] = useState([]); // Separate list for recently used fonts
  const dropdownRef = useRef(null);

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

  // Handle font selection
  const handleSelect = (font) => {
    setSelectedFont(font);
    setIsOpen(false);

    // Update recent fonts without modifying original font list
    setRecentFonts((prev) => {
      const updatedRecent = [font, ...prev.filter((f) => f !== font)].slice(
        0,
        5
      );
      return updatedRecent;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="menu-container p-2 flex flex-col items-center gap-4">
      <FontMeasure measureRef={measureRef} baseFontSize={18} />

      <div className="relative w-[700px]" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border border-gray-400 rounded-md bg-white shadow-sm flex justify-between items-center"
        >
          <span style={{ fontFamily: selectedFont }}>{selectedFont}</span>
          <span className="text-gray-600">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[550px] overflow-y-auto">
            {/* Render recent fonts first (separate from original list) */}
            {recentFonts.length > 0 && (
              <>
                <div className="px-3 py-1 text-gray-500 font-semibold">
                  Recent Fonts
                </div>
                {recentFonts.map((font) => {
                  loadGoogleFont(font);
                  return (
                    <div
                      key={`recent-${font}`}
                      onClick={() => handleSelect(font)}
                      className="cursor-pointer px-3 py-2 bg-purple-400 text-white font-bold hover:bg-purple-500"
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </div>
                  );
                })}
                <hr className="my-1 border-gray-300" />
              </>
            )}

            {/* Render the full font list (always the same order) */}
            {fonts.map((font) => {
              loadGoogleFont(font.family);
              return (
                <div
                  key={font.family}
                  onClick={() => handleSelect(font.family)}
                  className={`cursor-pointer px-3 py-2 hover:bg-gray-200
                              ${
                                selectedFont === font.family
                                  ? "bg-blue-300 text-white font-bold"
                                  : "bg-white text-black"
                              }`}
                  style={{ fontFamily: font.family }}
                >
                  {font.family}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <TextArea selectedFont={selectedFont} />
    </div>
  );
};

export default DropdownList50;
