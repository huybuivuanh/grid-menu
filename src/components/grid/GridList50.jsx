import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useEvaluation } from "../evaluation/EvaluationSystem";

const GridList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [fontSizes, setFontSizes] = useState({});
  const [selectedFont, setSelectedFont] = useState("");
  const [recentFonts, setRecentFonts] = useState([]);
  const [hoverFont, setHoverFont] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const storedSizes = localStorage.getItem("fontSizes50");
    if (storedSizes) setFontSizes(JSON.parse(storedSizes));
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(50);
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

  const handleSelectFont = (font) => {
    setSelectedFont(font);
    evaluateSelection(font);
    setHoverFont("");

    setRecentFonts((prev) => {
      const updated = [font, ...prev.filter((f) => f !== font)];
      return updated.slice(0, 5);
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
            className={`border border-gray-400 h-[100px] w-full flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out
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
            {font.family}
          </button>
        ))}
      </div>

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Push children to sides
          alignItems: "center",
          width: "100%", // Ensure full width to allow spacing
          padding: "0 20px", // Optional horizontal padding
          boxSizing: "border-box", // So padding doesn't affect layout
        }}
      >
        <TextArea selectedFont={hoverFont || selectedFont} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {showTrialButton && (
            <button onClick={startTrial}>Start Evaluation</button>
          )}
          <p style={{ fontSize: "25px", fontFamily: targetFontFamily }}>
            {targetText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GridList50;
