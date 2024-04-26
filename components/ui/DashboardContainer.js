const DashboardContainer = ({ children }) => {
  return (
    <div className="flex flex-grow flex-col 2xl:flex-row 2xl:justify-between gap-10 overflow-hidden rounded-t-xl border border-border-light bg-gradient-light-linear/85 p-10 shadow">
      {children}
    </div>
  );
};

export default DashboardContainer;
