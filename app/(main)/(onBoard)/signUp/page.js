import Steps from "@/components/layout/onBoard/signup/stepper/Stepper";
import Step1 from "@/components/layout/onBoard/signup/steps/Step1";
import Step2 from "@/components/layout/onBoard/signup/steps/Step2";
import Step3 from "@/components/layout/onBoard/signup/steps/Step3";

const SignUpPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[70%] flex gap-20">
        <Steps />
        {/* <Step1 /> */}
        {/* <Step2 /> */}
        <Step3 />
      </div>
    </div>
  );
};

export default SignUpPage;
