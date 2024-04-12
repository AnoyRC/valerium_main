const DashboardContainer = ({ children }) => {
  return (
    <div className="flex flex-grow justify-between gap-10 overflow-hidden rounded-t-xl border border-border-light bg-gradient-light-linear/85 p-10 shadow">
      {children}
    </div>
  );
};

export default DashboardContainer;
