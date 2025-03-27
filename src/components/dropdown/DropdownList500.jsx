import { useState, useEffect, useRef } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useEvaluation } from "../evaluation/EvaluationSystem";

const DropdownList500 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("Select a font...");
  const [hoverFont, setHoverFont] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentFonts, setRecentFonts] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(500);
      setFonts(fontList);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    fonts.forEach((font) => loadGoogleFont(font.family));
  }, [fonts]);

  const {
    targetFontFamily,
    targetText,
    showTrialButton,
    startTrial,
    evaluateSelection,
  } = useEvaluation(fonts);

  const handleSelect = (font) => {
    setSelectedFont(font);
    evaluateSelection(font);
    setHoverFont("");
    setIsOpen(false);
    setRecentFonts((prev) =>
      [font, ...prev.filter((f) => f !== font)].slice(0, 5)
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="menu-container p-2 flex flex-col items-center gap-4">
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
            {recentFonts.length > 0 && (
              <>
                <div className="px-3 py-1 text-gray-500 font-semibold">
                  Recent Fonts
                </div>
                {recentFonts.map((font) => (
                  <div
                    key={`recent-${font}`}
                    onClick={() => handleSelect(font)}
                    onMouseEnter={() => setHoverFont(font)}
                    onMouseLeave={() => setHoverFont("")}
                    className="cursor-pointer px-3 py-2 bg-purple-400 text-white font-bold hover:bg-purple-500"
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </div>
                ))}
                <hr className="my-1 border-gray-300" />
              </>
            )}

            {fonts.map((font) => (
              <div
                key={font.family}
                onClick={() => handleSelect(font.family)}
                onMouseEnter={() => setHoverFont(font.family)}
                onMouseLeave={() => setHoverFont("")}
                className={`cursor-pointer px-3 py-2 hover:bg-gray-200 ${
                  selectedFont === font.family
                    ? "bg-blue-300 text-white font-bold"
                    : "bg-white text-black"
                }`}
                style={{ fontFamily: font.family }}
              >
                {font.family}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          gap: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextArea selectedFont={hoverFont || selectedFont} />
        {showTrialButton && (
          <button onClick={startTrial}>Start Evaluation</button>
        )}
        <p style={{ fontSize: "25px", fontFamily: targetFontFamily }}>
          {targetText}
        </p>
      </div>
    </div>
  );
};

export default DropdownList500;
