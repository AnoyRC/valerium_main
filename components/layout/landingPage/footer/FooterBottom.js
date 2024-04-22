const FooterBottom = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="overflow-hidden text-center">
        <div
          className="translate-y-1/3 font-gloock text-[280px] gradient-text"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFF 0%, #FFF 56.87%, #888 81.25%)",
          }}
        >
          Valerium
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-text-light-gray py-5 text-sm font-medium">
        <span className="text-black">© 2024 Valerium</span>
        <span className="text-gray">Terms & Condition Privacy Policy</span>
      </div>
    </div>
  );
};

export default FooterBottom;
