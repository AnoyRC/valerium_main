const DesignSection = () => {
  //Left side design
  return (
    <section className=" basis-[515px] light-onboard-background bg-cover p-12">
      <div className="flex items-center">
        <div className=" bg-black p-2 rounded-md mr-2.5">
          <img src="/valerium-logo.svg" alt="logo" />
        </div>
        <span className="text-2xl font-gloock tracking-wider"> Valerium</span>
      </div>
      <p className=" absolute left-9 bottom-7">Alpha @0.0.2</p>
    </section>
  );
};

export default DesignSection;
