// Fetch fonts from Google API
export const fetchFonts = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC1_xKBz4moDq2xA1J4wd-I_vNXXv7GrRE`
    );
    const data = await response.json();
    return data.items.slice(0, 49); // Return first 49 fonts
  } catch (error) {
    console.error("Error fetching fonts:", error);
    return [];
  }
};

// Load Google Fonts dynamically
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
