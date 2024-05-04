const HeadLine = ({ title, secondary }) => {
  return (
    <div className="py-10 text-center font-serif">
      <h1 className="pb-3 text-4xl font-semibold">{title}</h1>
      <h2 className="text-lg">{secondary}</h2>
    </div>
  );
};

export default HeadLine;
