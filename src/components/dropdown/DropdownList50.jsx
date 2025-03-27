import { useState, useEffect, useRef } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../utils/FontLoading";
import Trial from "../evaluation/trial.js";

// used for the evaluation process
let currTrial;
let setOfTrials;
let targetFont;
let inTrial = false;
let trialNum = 0;

const DropdownList50 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("Select a font...");
  const [hoverFont, setHoverFont] = useState(""); // Track hovered font
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

  // Handle font selection
  const handleSelect = (font) => {
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
        console.log(
          "Trial Number: " +
            currTrial.trialNum +
            ", Total Correct: " +
            currTrial.getCorrect() +
            ", Total Incorrect: " +
            currTrial.getErrors() +
            ", Correct Percentage: " +
            (currTrial.getCorrect() / 1) * 100 +
            "%" +
            ", Error Percentage: " +
            (currTrial.getErrors() / 1) * 100 +
            "%"
        );

        // log the results of the set of trials
        console.log("\n" + "Results after 10 trials: " + "\n");
        console.timeEnd("completion time"); // stop the timer after all trials
        console.log(
          "Total Correct: " +
            setOfTrials.getCorrect() +
            ", Total Incorrect: " +
            setOfTrials.getErrors() +
            ", Percentage: " +
            (setOfTrials.getCorrect() / 10) * 100 +
            "%" +
            ", Error Percentage: " +
            (setOfTrials.getErrors() / 10) * 100 +
            "%"
        );
        inTrial = false; // stop the trial
        // show the button again and remove the target font
        document.getElementById("trialButton").hidden = false;
        document.getElementById("targetID").textContent = "";
        trialNum = 0; // reset the trial number
      } else {
        console.timeEnd("trial time"); // stop the timer the trial
        console.log(
          "Trial Number: " +
            currTrial.trialNum +
            ", Total Correct: " +
            currTrial.getCorrect() +
            ", Total Incorrect: " +
            currTrial.getErrors() +
            ", Percentage: " +
            (currTrial.getCorrect() / 1) * 100 +
            "%" +
            ", Error Percentage: " +
            (currTrial.getErrors() / 1) * 100 +
            "%"
        );
        StartTrial();
      }
    }

    setHoverFont(""); // Reset hover state when selecting a font
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

  useEffect(() => {
    fonts.forEach((font) => loadGoogleFont(font.family));
  }, [fonts]);

  const StartTrial = () => {
    // if not in a trial yet
    if (!inTrial) {
      inTrial = true;
      console.time("completion time"); // start a timer for the completion time of the 10 trials
      document.getElementById("trialButton").hidden = true; // hide the button
      setOfTrials = new Trial(); // create a trial to represent the 10 trials
    }
    trialNum++; // increment the trial number to prepare for the new trial
    currTrial = new Trial(); // create a new trial
    console.time("trial time"); // start a timer for the completion time of a single trial
    currTrial.setTrialNum(trialNum); // increment the trial number for the current trial
    targetFont = Math.floor(Math.random() * 50); // get a random value from 0 to 49 (50 values)
    // set the text field to the current target font
    document.getElementById("targetID").textContent =
      "Target Font: " + fonts[targetFont].family;
    currTrial.setTarget(targetFont); // set the target font index
  };

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
            {/* Render recent fonts first (separate from original list) */}
            {recentFonts.length > 0 && (
              <>
                <div className="px-3 py-1 text-gray-500 font-semibold">
                  Recent Fonts
                </div>
                {recentFonts.map((font) => (
                  <div
                    key={`recent-${font}`}
                    onClick={() => handleSelect(font)}
                    onMouseEnter={() => setHoverFont(font)} // Change font on hover
                    onMouseLeave={() => setHoverFont("")} // Reset on leave
                    className="cursor-pointer px-3 py-2 bg-purple-400 text-white font-bold hover:bg-purple-500"
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </div>
                ))}
                <hr className="my-1 border-gray-300" />
              </>
            )}

            {/* Render the full font list (always the same order) */}
            {fonts.map((font) => (
              <div
                key={font.family}
                onClick={() => handleSelect(font.family)}
                onMouseEnter={() => setHoverFont(font.family)} // Change font on hover
                onMouseLeave={() => setHoverFont("")} // Reset on leave
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
            ))}
          </div>
        )}
      </div>

      {/* Pass hoverFont if hovering, otherwise use selectedFont */}
      <div style={{ gap: "10px", display: "flex", justifyContent: "center" }}>
        <TextArea selectedFont={hoverFont || selectedFont} />
        <button id="trialButton" onClick={() => StartTrial()}>
          Start Evaluation
        </button>
        <label id="targetID"></label>
      </div>
    </div>
  );
};

export default DropdownList50;
