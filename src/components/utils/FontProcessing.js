import { useState, useEffect, useRef } from "react";

export const useFontSizes = (fonts, baseFontSize) => {
  const [fontSizes, setFontSizes] = useState({});
  const measureRef = useRef(null);

  // Function to measure font size dynamically
  const measureFontSize = (fontFamily) => {
    if (!measureRef.current) {
      return baseFontSize; // Default size
    }

    // Set measurement text font
    measureRef.current.style.fontFamily = fontFamily;
    measureRef.current.style.fontSize = `${baseFontSize}px`; // Base font size
    const fontWidth = measureRef.current.offsetWidth;
    const fontHeight = measureRef.current.offsetHeight;

    // Measure Arial as reference
    measureRef.current.style.fontFamily = "Arial";
    const arialWidth = measureRef.current.offsetWidth;
    const arialHeight = measureRef.current.offsetHeight;

    // Compute scale factor
    const scaleWidth = arialWidth / fontWidth;
    const scaleHeight = arialHeight / fontHeight;
    return baseFontSize * Math.min(scaleWidth, scaleHeight);
  };

  // Compute font sizes after fonts load
  useEffect(() => {
    if (!measureRef.current || fonts.length === 0) return;

    const timeout = setTimeout(() => {
      const sizes = {};
      fonts.forEach((font) => {
        sizes[font.family] = measureFontSize(font.family);
      });
      setFontSizes(sizes);
    }, 0);

    return () => clearTimeout(timeout);
  }, [fonts]);


  return { fontSizes, measureRef };
};

// make fonts shorter
// fonts are at most "length" letters long, if there's a space, cut it entirely
export const trimFont = (fontFamily, length) => {
  const trimmed = fontFamily.slice(0, length);
  const spaceIndex = trimmed.indexOf(" ");

  return spaceIndex !== -1 ? trimmed.slice(0, spaceIndex) : trimmed;
};
