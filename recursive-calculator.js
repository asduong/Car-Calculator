const carPricingCalculator = (arr, index = 0, upg = 0, currAddOns = []) => {
  const basePrice = 24999;
  const adminFee = 1200;
  const carFee = 1.02;
  const salesTax = 1.13;
  const currentAddOns = currAddOns;
  const reqDiscountAmt = 8000;
  let upgrades = upg;

  if (index === arr.length - 1) {
    if (!currentAddOns.includes(arr[index].add_on)) {
      currentAddOns.push(arr[index].add_on);
      upgrades += arr[index].price;
    }

    // If the Upgrade amount is greater than the Required Discount Amount
    if (upgrades >= reqDiscountAmt) {
      upgrades = (upgrades - reqDiscountAmt) / 2 + reqDiscountAmt;
    }

    return parseFloat(
      (((upgrades + basePrice) * carFee + adminFee) * salesTax).toFixed(2)
    );
  }

  // To prevent adding the same addon
  if (!currentAddOns.includes(arr[index].add_on)) {
    currentAddOns.push(arr[index].add_on);
    upgrades += arr[index].price;
    index = index + 1;
    return carPricingCalculator(arr, index, upgrades, currentAddOns);
  }
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
  {
    add_on: 'Sport Package',
    price: 3500,
  },
];

console.log(carPricingCalculator(addOnInfo));
