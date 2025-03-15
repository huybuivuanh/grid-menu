const FontMeasure = ({ measureRef, baseFontSize }) => {
  return (
    <div
      ref={measureRef}
      className="absolute invisible"
      style={{ fontSize: `${baseFontSize}px`, position: "absolute" }}
    >
      Sample
    </div>
  );
};

export default FontMeasure;
