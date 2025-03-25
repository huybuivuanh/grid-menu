import { useState } from "react";

const TextArea = ({ selectedFont }) => {
  const [text, setText] = useState("");
  return (
    <div className="container mx-auto px-10">
      <textarea
        className="w-3/4 h-10 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ fontFamily: selectedFont }}
        placeholder="Type something here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
