import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes, trimFont } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";
import { useEvaluation } from "../evaluation/EvaluationSystem";

const GridList500 = () => {
  const [fonts, setFonts] = useState([]);
  const [fontSizes, setFontSizes] = useState({});
  const [selectedFont, setSelectedFont] = useState("");
  const [recentFonts, setRecentFonts] = useState([]);
  const [hoverFont, setHoverFont] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const {
    targetText,
    targetFontFamily,
    showTrialButton,
    startTrial,
    evaluateSelection,
  } = useEvaluation(fonts);

  useEffect(() => {
    setFontSizes(JSON.parse(localStorage.getItem("fontSizes500")));
  }, []);

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

  const handleSelectFont = (font) => {
    setSelectedFont(font);
    evaluateSelection(font);

    setHoverFont("");
    setRecentFonts((prev) =>
      [font, ...prev.filter((f) => f !== font)].slice(0, 5)
    );
  };

  return (
    <div className="menu-container relative">
      {/* Font Grid */}
      <div
        className="grid gap-x-1 gap-y-1 p-1"
        style={{ gridTemplateColumns: "repeat(25, minmax(0, 1fr))" }}
        onMouseLeave={() => setHoverFont("")}
      >
        {fonts.map((font) => (
          <button
            key={font.family}
            onClick={() => handleSelectFont(font.family)}
            onMouseEnter={(e) => {
              setHoverFont(font.family);
              setHoverPosition({ x: e.clientX, y: e.clientY });
            }}
            onMouseMove={(e) =>
              setHoverPosition({ x: e.clientX, y: e.clientY })
            }
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
              fontSize: `${fontSizes[font.family] || 20}px`,
            }}
          >
            {trimFont(font.family, 5)}
          </button>
        ))}
      </div>

      {/* Hover preview popup */}
      {hoverFont && (
        <div
          className="absolute bg-white border border-gray-400 shadow-lg p-4 rounded-lg transition-opacity duration-200 ease-in-out"
          style={{
            top: Math.min(hoverPosition.y - 180, window.innerHeight - 100),
            left: Math.min(hoverPosition.x, window.innerWidth - 200),
            fontFamily: hoverFont,
            fontSize: "40px",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {hoverFont}
        </div>
      )}

      {/* Bottom UI */}
      <div
        style={{
          gap: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <TextArea selectedFont={hoverFont || selectedFont} />
        {showTrialButton && (
          <button id="trialButton" onClick={startTrial}>
            Start Evaluation
          </button>
        )}
        <p style={{ fontSize: "25px", fontFamily: targetFontFamily }}>
          {targetText}
        </p>
      </div>
    </div>
  );
};

export default GridList500;
