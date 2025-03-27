import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes, trimFont } from "../utils/FontProcessing";
import { useEvaluation } from "../evaluation/EvaluationSystem";

const GridList100 = () => {
  const [fonts, setFonts] = useState([]);
  const [fontSizes, setFontSizes] = useState({});
  const [selectedFont, setSelectedFont] = useState("");
  const [recentFonts, setRecentFonts] = useState([]);
  const [hoverFont, setHoverFont] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setFontSizes(JSON.parse(localStorage.getItem("fontSizes100")));
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(100);
      setFonts(fontList);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    fonts.forEach((font) => loadGoogleFont(font.family));
  }, [fonts]);

  const {
    targetText,
    targetFontFamily,
    showTrialButton,
    startTrial,
    evaluateSelection,
  } = useEvaluation(fonts);

  const handleSelectFont = (font) => {
    setSelectedFont(font);
    evaluateSelection(font);
    setHoverFont("");
    setRecentFonts((prev) => {
      const updatedRecent = [font, ...prev.filter((f) => f !== font)];
      return updatedRecent.slice(0, 5);
    });
  };

  return (
    <div className="menu-container relative">
      <div
        className="grid gap-x-1 gap-y-1 p-1"
        style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}
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
              fontSize: `${fontSizes[font.family] || 20}px`,
            }}
          >
            {trimFont(font.family, 7)}
          </button>
        ))}
      </div>

      {hoverFont && (
        <div
          className="absolute bg-white border border-gray-400 shadow-lg p-4 rounded-lg transition-opacity duration-200 ease-in-out"
          style={{
            top: Math.min(hoverPosition.y - 180, window.innerHeight - 100),
            left: Math.min(hoverPosition.x - 0, window.innerWidth - 200),
            fontFamily: hoverFont,
            fontSize: "40px",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {hoverFont}
        </div>
      )}

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

export default GridList100;
