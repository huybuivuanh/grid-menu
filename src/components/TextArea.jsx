import { useState } from "react";

const TextArea = ({ selectedFont }) => {
  const [text, setText] = useState("");
  return (
    <textarea
      className="w-100 h-12 p-1 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ fontFamily: selectedFont, fontSize: "25px" }}
      placeholder="Type something here"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default TextArea;
