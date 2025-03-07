import { useState, useEffect } from "react";
import TextArea from "../TextArea";
import { fetchFonts, loadGoogleFont } from "../FontLoading";

const DropdownList300 = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // Fetch the fonts once on mount
  useEffect(() => {
    const loadFonts = async () => {
      const fontList = await fetchFonts(299); // Adjust as needed to retrieve 300 fonts
      setFonts(fontList);
      if (fontList.length > 0) {
        // Optionally select the first font by default
        setSelectedFont(fontList[0].family);
      }
    };

    loadFonts();
  }, []);

  // Load each Google Font when the fonts array is updated
  useEffect(() => {
    fonts.forEach((font) => {
      loadGoogleFont(font.family);
    });
  }, [fonts]);

  const handleChange = (event) => {
    setSelectedFont(event.target.value);
  };

  return (
    <div className="menu-container p-4">
      <label htmlFor="font-dropdown" className="block mb-2 text-lg">
        Select a Font:
      </label>
      <select
        id="font-dropdown"
        value={selectedFont}
        onChange={handleChange}
        className="dropdown p-2 border rounded-md text-lg"
        style={{ fontFamily: selectedFont }}
      >
        {fonts.map((font) => (
          <option
            key={font.family}
            value={font.family}
            style={{ fontFamily: font.family }}
          >
            {font.family}
          </option>
        ))}
      </select>
      <div className="mt-4">
        <TextArea selectedFont={selectedFont} />
      </div>
    </div>
  );
};

export default DropdownList300;
