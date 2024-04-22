import { Mouse } from "lucide-react";

const Header = () => {
  return (
    <header
      className="light-dashboard-background relative flex flex-col space-y-32 bg-white font-noto"
      style={{
        background: `url(/light-background-shade.svg) center top -100px no-repeat, url(/light-background-grid.svg) top center / contain no-repeat`,
      }}
    >
      <h1 className="mx-auto mt-40 text-center font-gloock">
        <span className="block text-4xl">
          <span className="font-noto font-bold">#</span>
          Valerium
        </span>

        <div className="bg-gradient-primary-light-radial text-9xl gradient-text">
          <span className="block">Unchain Your</span>
          <span className="block">Assets</span>
        </div>
      </h1>

      <div className="pb-40 text-center">
        <Mouse size={28} className="mx-auto" />

        <div className="text-xs">
          <span className="block">Scroll</span>
          <span className="block">Down</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
