const carPricingCalculator = (arr) => {
  const basePrice = 24999;
  const adminFee = 1200;
  const carFee = 1.02;
  const salesTax = 1.13;
  const currentAddOns = [];
  const reqDiscountAmt = 8000;
  let upgrades = 0;

  arr.forEach((obj) => {
    // To prevent adding the same addon
    if (!currentAddOns.includes(obj.add_on)) {
      currentAddOns.push(obj.add_on);
      upgrades += obj.price;
    }
  });

  if (upgrades >= reqDiscountAmt) {
    upgrades = (upgrades - reqDiscountAmt) / 2 + reqDiscountAmt;
  }

  return parseFloat(
    (((upgrades + basePrice) * carFee + adminFee) * salesTax).toFixed(2)
  );
};

const addOnInfo = [
  {
    add_on: 'AWD Drivetrain',
    price: 2500,
  },
  {
    add_on: 'Sport Package',
    price: 3500,
  },
];
console.log(carPricingCalculator(addOnInfo));
