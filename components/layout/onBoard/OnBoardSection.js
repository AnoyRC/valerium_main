const OnBoardSection = ({ heading, paragaph, children, footer }) => {
  // Right side section component
  return (
    <div>
      <div>
        <h1>{heading}</h1>
        <p>{paragaph}</p>
        {children}
      </div>
      <div>{footer}</div>
    </div>
  );
};

export default OnBoardSection;
