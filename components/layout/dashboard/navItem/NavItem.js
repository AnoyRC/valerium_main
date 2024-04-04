const NavItem = ({ children, label }) => {
  return (
    <p className="mb-4 flex items-center last-of-type:mb-0 cursor-pointer">
      {children} <span className="ml-2">{label}</span>
    </p>
  );
};

export default NavItem;
