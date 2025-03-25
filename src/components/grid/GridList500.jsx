import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import { useFontSizes, trimFont } from "../utils/FontProcessing";
import FontMeasure from "../utils/FontMeasure";
import Trial from "../evaluation/trial.js"

// used for the evaluation process
let currTrial;
let setOfTrials;
let targetFont;
let inTrial = false;
let trialNum = 0;

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

    // if currently in a trial
    if (inTrial) {
      // if the selected font is the target font
      if (font === fonts[currTrial.getTarget()].family) {
        // update the correct trial for the current trial and the set of trials
        currTrial.setCorrect(currTrial.getCorrect() + 1);
        setOfTrials.setCorrect(setOfTrials.getCorrect() + 1);
      } else {
        // update the errors for the current trial and set of trials
        currTrial.setErrors(currTrial.getErrors() + 1);
        setOfTrials.setErrors(setOfTrials.getErrors() + 1);
      }

      // if on the final trial
      if (currTrial.trialNum === 10) {
        // log the final trial
        console.timeEnd("trial time"); // stop the timer the trial
        console.log("Trial Number: " + currTrial.trialNum + ", Total Correct: " + currTrial.getCorrect() +
            ", Total Incorrect: " + currTrial.getErrors() +
            ", Correct Percentage: " + (currTrial.getCorrect() / 1) * 100 + "%" +
            ", Error Percentage: " + (currTrial.getErrors() / 1) * 100 + "%"
        );

        // log the results of the set of trials
        console.log("\n" + "Results after 10 trials: " + "\n");
        console.timeEnd("completion time"); // stop the timer after all trials
        console.log("Total Correct: " + setOfTrials.getCorrect() +
            ", Total Incorrect: " + setOfTrials.getErrors() +
            ", Percentage: " + (setOfTrials.getCorrect() / 10) * 100 + "%" +
            ", Error Percentage: " + (setOfTrials.getErrors() / 10) * 100 + "%"
        );
        inTrial = false; // stop the trial
        // show the button again and remove the target font
        document.getElementById("trialButton").hidden = false;
        document.getElementById("targetID").textContent = "";

      } else {
        console.timeEnd("trial time"); // stop the timer the trial
        console.log("Trial Number: " + currTrial.trialNum + ", Total Correct: " + currTrial.getCorrect() +
            ", Total Incorrect: " + currTrial.getErrors() +
            ", Percentage: " + (currTrial.getCorrect() / 1) * 100 + "%" +
            ", Error Percentage: " + (currTrial.getErrors() / 1) * 100 + "%"
        );
        StartTrial();
      }
    }

    setHoverFont(""); // Reset hover state when a font is selected

    // Update recent fonts list (keep only the last 5)
    setRecentFonts((prev) => {
      const updatedRecent = [font, ...prev.filter((f) => f !== font)]; // Remove duplicates
      return updatedRecent.slice(0, 5); // Keep only the last 5 fonts
    });
  };

  const StartTrial = () => {
    // if not in a trial yet
    if (!inTrial){
      inTrial = true;
      console.time("completion time"); // start a timer for the completion time of the 10 trials
      document.getElementById("trialButton").hidden = true; // hide the button
      setOfTrials = new Trial(); // create a trial to represent the 10 trials
    }
    trialNum++; // increment the trial number to prepare for the new trial
    currTrial = new Trial(); // create a new trial
    console.time("trial time"); // start a timer for the completion time of a single trial
    currTrial.setTrialNum(trialNum); // increment the trial number for the current trial
    targetFont = Math.round((Math.random() * 500)); // get a random value from 0 to 499 (500 values)
    // set the text field to the current target font
    document.getElementById("targetID").textContent = "Target Font: " + fonts[targetFont].family;
    currTrial.setTarget(targetFont); // set the target font index
  }

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
      <div style={{ display: "flex" }}>
        <TextArea selectedFont={hoverFont || selectedFont} />
        <button id="trialButton" onClick={() => StartTrial()}>Start Evaluation</button>
        <label id="targetID"></label>
      </div>
    </div>
  );
};

export default GridList500;
