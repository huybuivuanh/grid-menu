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

    setTargetText("Target Font: " + fonts[target].family);
    setTargetFontFamily(fonts[target].family);
  };
  const evaluateSelection = (font) => {
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
    const isCorrect = font === targetFont;

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
      `Trial: ${trialNum}, Is Correct: ${isCorrect}, Trial Result: ${setCorrect}/${setTotal}, Percentage: ${setCorrectPct}%, Error Percentage: ${setErrorPct}%, Trial time: ${
        trialTime.toFixed(2) / 1000
      }s`
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
      console.log(`Completion time: ${totalTime.toFixed(2) / 1000}s`);
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
