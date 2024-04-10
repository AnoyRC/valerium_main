import Alpha from "@/components/ui/Alpha";

const DesignSection = () => {
  return (
    <section className="light-onboard-background flex basis-[515px] flex-col justify-between bg-cover p-12">
      <div className="flex items-center">
        <div className=" mr-2.5 rounded-md bg-black p-2">
          <img src="/valerium-logo.svg" alt="logo" />
        </div>

        <span className="font-gloock text-2xl tracking-wider"> Valerium</span>
      </div>

      <div className="-translate-x-3 translate-y-5">
        <Alpha size="text-sm" />
      </div>
    </section>
  );
};

export default DesignSection;
