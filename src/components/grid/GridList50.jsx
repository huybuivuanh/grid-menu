import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";
import Trial from "../evaluation/trial.js"

let currTrial;
let trialNumber = 0;
let targetFont;
let inTrial = false;


const DropdownList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");
  const [recentFonts, setRecentFonts] = useState([]); // Track recent fonts
  const [hoverFont, setHoverFont] = useState(""); // Track hovered font
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 }); // Track mouse position for popup

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
  const handleSelectFont = (font) => {
    setSelectedFont(font);

    if (inTrial) {
        // if the selected font is the target font
        if (font === fonts[currTrial.getTarget()].family) {
            // update the correct trial
            currTrial.setCorrect(currTrial.getCorrect() + 1);
            console.log("CORRECT INDETIFIED");
        } else {
            console.log("Error recorded");
            currTrial.setErrors(currTrial.getErrors() + 1);
        }


        if (trialNumber === 1) {
            console.log("Total Time: ");
            // need to stop it here
            console.timeEnd("completion time"); // stop the timer
            console.log("Total Correct: " + currTrial.getCorrect());
            console.log("Total Incorrect: " + currTrial.getErrors());
            console.log("Percentage: " + (currTrial.getCorrect() / 1) * 100 + "%");
            inTrial = false;

        } else {
            StartTrial();

        }
    }

    setHoverFont(""); // Reset hover state when a font is selected

    // Update the recent fonts list (keep only the last 5)
    setRecentFonts((prev) => {
      const updatedRecent = [font, ...prev.filter((f) => f !== font)]; // Remove duplicates
      return updatedRecent.slice(0, 5); // Keep only the last 5 fonts
    });
  };


    const StartTrial = () => {
        inTrial = true;
        trialNumber++; // increment the trial number
        targetFont = Math.round((Math.random() * 50)); // get a random value from 0 to 49 (50 values)
        // set the text field to the current target font
        document.getElementById("targetID").textContent = "Target Font: " + fonts[targetFont].family;
        currTrial = new Trial(); // create a new trial
        console.time("completion time"); // start a timer for the completion time of the 10 trials
        currTrial.setTarget(targetFont); // set the target font index
        }



  return (
    <div className="menu-container relative">
      <FontMeasure measureRef={measureRef} baseFontSize={25} />

      {/* Font grid */}
      <div
        className="grid gap-x-1 gap-y-1 p-1"
        style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}
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
              className={`border border-gray-400 h-[100px] w-full 
               flex items-center justify-center shadow-sm
               transition-all duration-200 ease-in-out 
               ${
                 selectedFont === font.family
                   ? "bg-blue-400 text-white"
                   : recentFonts.includes(font.family)
                   ? "bg-purple-400 text-white" // Purple for recent fonts
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
      <button onClick={() => StartTrial()}>Start Evaluation</button>
      <label id="targetID"></label>

    </div>

  );

};

export default DropdownList50;
