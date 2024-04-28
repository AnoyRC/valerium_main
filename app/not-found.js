import Link from "next/link";

const NotFound = () => {
  return (
    <div className="light-dashboard-background light-dashboard-background relative flex h-screen w-screen flex-col items-center justify-center bg-white font-noto">
      <h1 className="text-9xl font-bold leading-normal">Oops!</h1>

      <p>The page you are looking for does not exist.</p>

      <Link href="/home" className="mt-8 underline">
        Go back home
      </Link>
    </div>
  );
};
export default NotFound;
