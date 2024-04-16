const SummaryHeading = ({ paragraph }) => {
  return (
    <div>
      <h2 className="text-2.5xl font-bold text-black">Summary</h2>

      <p className="text-sm font-normal text-text-gray">{paragraph}</p>
    </div>
  );
};

export default SummaryHeading;
