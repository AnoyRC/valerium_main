function formatAmount(amount) {
  if (Number(amount) < 0.0001 && Number(amount) !== 0){
    return "<0.0001";
  } else {
    return Number(amount).toFixed(4);
  }
}

export { formatAmount };
