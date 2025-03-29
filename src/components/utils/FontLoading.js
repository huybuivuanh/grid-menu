// Fetch fonts from Google API
// numOfFonts: number of fonts you want to import
export const fetchFonts = async (numOfFonts) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${
        import.meta.env.VITE_FONT_API
      }`
    );
    const data = await response.json();
    return data.items.slice(0, numOfFonts);
  } catch (error) {
    console.error("Error fetching fonts:", error);
    return [];
  }
};

// Load Google Fonts dynamically
// fontName: the font that will be loaded
export const loadGoogleFont = (fontName) => {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    / /g,
    "+"
  )}&display=swap`;

  if (!document.querySelector(`link[href="${fontUrl}"]`)) {
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};
