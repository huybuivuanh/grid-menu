const TextArea = ({ selectedFont, setText, text }) => {
  return (
    <div className="container mx-auto px-10">
      <textarea
        className="w-full h-30 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ fontFamily: selectedFont }}
        placeholder="Type something here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
