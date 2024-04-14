import QRCodeGenerator from "@/components/ui/QrCodeGenerator";

const NetworkListHeading = () => {
  return (
    <div className="rounded-xl border border-border-light bg-white p-5 shadow">
      <QRCodeGenerator value="https://www.google.com" />
    </div>
  );
};

export default NetworkListHeading;
