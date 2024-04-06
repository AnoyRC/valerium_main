const OnBoardSection = ({ heading, paragaph, children, footer }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-gloock text-4xl">{heading}</h1>
      <p className="font-noto text-text-gray text-sm mt-2">{paragaph}</p>

      {children}
    </div>
  );
};

export default OnBoardSection;
