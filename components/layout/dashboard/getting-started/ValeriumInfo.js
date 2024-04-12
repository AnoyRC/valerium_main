import Image from "next/image";
import logoSvg from "/public/valerium-logo.svg"
const ValeriumInfo = () => {
    return <div className=" bg-gradient-light-linear/85 flex p-[34px]  border-solid border-border-light border rounded-xl">
        <div className="bg-black relative w-[163px] h-[163px] p-9 rounded-[32px] mr-7">
            <Image src={logoSvg}  alt="valerium logo" className=" w-full" />
        </div>
        <div>
            <h2 className="font-gloock text-3xl">Valerium Public Alpha V1.0.0</h2>
            <p className="max-w-[451px] mt-2">Welcome to Valerium, your cutting-edge smart contract wallet designed for enhanced privacy and security in the Web3 ecosystem.</p>
        </div>
    </div>
}

export default ValeriumInfo;