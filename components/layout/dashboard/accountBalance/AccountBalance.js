const AccountBalance = () => {
  return (
    <section className=" bg-white rounded-xl px-6 py-5 font-noto flex justify-between mt-8 ">
      <div>
        <p className=" font-medium ">
          nooberBoy
          <span className=" bg-gradient-primary-light bg-clip-text text-transparent">
            @valerium
          </span>
        </p>
        <h2 className="text-5xl font-bold my-3">$ 3.6023</h2>
        <p className=" text-text-gray font-medium ">
          ~ 0.4947 <span className=" text-highlight-blue font-bold ">ETH</span>{" "}
        </p>
      </div>
      <div>
        <p>Base</p>
      </div>
    </section>
  );
};

export default AccountBalance;
