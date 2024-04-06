import Alpha from "@/components/ui/Alpha";

const DesignSection = () => {
  return (
    <section className="basis-[515px] light-onboard-background bg-cover p-12 flex flex-col justify-between">
      <div className="flex items-center">
        <div className=" bg-black p-2 rounded-md mr-2.5">
          <img src="/valerium-logo.svg" alt="logo" />
        </div>

        <span className="text-2xl font-gloock tracking-wider"> Valerium</span>
      </div>

      <div className="-translate-x-3 translate-y-5">
        <Alpha size="text-sm" />
      </div>
    </section>
  );
};

export default DesignSection;
