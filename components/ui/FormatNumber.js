const FormatNumber = ({ number, size, integerSize, decimalSize }) => {
  const integerPart = Math.floor(number);
  let decimalPart = (number % 1).toFixed(5).substring(2);

  const isLongDecimal = decimalPart.length > 4;
  if (isLongDecimal) {
    decimalPart = decimalPart.substring(0, 4);
  }

  return (
    <div className="font-bold text-black flex items-center">
      {isLongDecimal && <span className={size}>{">"}</span>}

      <p>
        <span className={integerSize}>$ {integerPart}.</span>
        <span className={decimalSize}>{decimalPart}</span>
      </p>
    </div>
  );
};

export default FormatNumber;
