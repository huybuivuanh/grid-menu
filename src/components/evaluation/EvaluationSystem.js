import { useState, useRef } from "react";
import Trial from "./Trial.js";

export const useEvaluation = (fonts) => {
  const [targetText, setTargetText] = useState("");
  const [targetFontFamily, setTargetFontFamily] = useState("");
  const [showTrialButton, setShowTrialButton] = useState(true);

  const trialRef = useRef({
    currTrial: null,
    setOfTrials: null,
    inTrial: false,
    trialNum: 0,
    startTime: null,
    trialStartTime: null,
  });

  const timeoutRef = useRef(null);

  const startTrial = () => {
    if (!fonts.length) return;

    if (!trialRef.current.inTrial) {
      trialRef.current.inTrial = true;
      trialRef.current.setOfTrials = new Trial();
      trialRef.current.trialNum = 0;
      trialRef.current.startTime = Date.now();
      setShowTrialButton(false);
    }

    const { trialNum } = trialRef.current;
    if (trialNum >= 10) return;

    const newTrial = new Trial();
    newTrial.setTrialNum(trialNum + 1);
    const target = Math.floor(Math.random() * fonts.length);
    newTrial.setTarget(target);

    trialRef.current.currTrial = newTrial;
    trialRef.current.trialNum += 1;
    trialRef.current.trialStartTime = Date.now();

    setTargetText(`Trail ${trialNum + 1}:   ${fonts[target].family}`);
    setTargetFontFamily(fonts[target].family);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      evaluateSelection(null);
    }, 10000);
  };

  const evaluateSelection = (font) => {
    clearTimeout(timeoutRef.current); // Clear the 10s timeout

    const {
      currTrial,
      setOfTrials,
      inTrial,
      trialNum,
      trialStartTime,
      startTime,
    } = trialRef.current;

    if (!inTrial || !currTrial || !fonts.length) return;

    const targetFont = fonts[currTrial.getTarget()].family;
    const isCorrect = font === targetFont && font !== null;

    if (isCorrect) {
      currTrial.setCorrect(currTrial.getCorrect() + 1);
      setOfTrials.setCorrect(setOfTrials.getCorrect() + 1);
    } else {
      currTrial.setErrors(currTrial.getErrors() + 1);
      setOfTrials.setErrors(setOfTrials.getErrors() + 1);
    }

    const trialTime = Date.now() - trialStartTime;
    const setCorrect = setOfTrials.getCorrect();
    const setErrors = setOfTrials.getErrors();
    const setTotal = setCorrect + setErrors;
    const setCorrectPct = ((setCorrect / setTotal) * 100).toFixed(0);
    const setErrorPct = ((setErrors / setTotal) * 100).toFixed(0);

    console.log(
      `Trial: ${trialNum}, Is Correct: ${isCorrect}, Trial Result: ${setCorrect}/${setTotal}, Percentage: ${setCorrectPct}%, Error Percentage: ${setErrorPct}%, Trial time: ${(
        trialTime / 1000
      ).toFixed(2)}s`
    );
    console.log("");

    if (trialNum >= 10) {
      const totalTime = Date.now() - startTime;
      const setCorrect = setOfTrials.getCorrect();
      const setErrors = setOfTrials.getErrors();
      const setTotal = setCorrect + setErrors;
      const setCorrectPct = ((setCorrect / setTotal) * 100).toFixed(0);
      const setErrorPct = ((setErrors / setTotal) * 100).toFixed(0);

      console.log("Final Result:");
      console.log(`Completion time: ${(totalTime / 1000).toFixed(2)}s`);
      console.log(
        `Total Correct: ${setCorrect}, Total Incorrect: ${setErrors}, Percentage: ${setCorrectPct}%, Error Percentage: ${setErrorPct}%`
      );

      trialRef.current.inTrial = false;
      trialRef.current.trialNum = 0;
      setTargetText("");
      setShowTrialButton(true);
    } else {
      startTrial(); // Next trial
    }
  };


  return {
    targetFontFamily,
    targetText,
    showTrialButton,
    startTrial,
    evaluateSelection,
  };
};
