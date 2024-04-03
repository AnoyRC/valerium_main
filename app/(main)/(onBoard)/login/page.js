import Login from "@/components/layout/onBoard/login/Login";

const LoginPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[70%] flex gap-20">
        <div></div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
