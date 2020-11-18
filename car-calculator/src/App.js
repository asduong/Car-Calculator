import React from 'react';
import './style.css';
import { ReactComponent as Logo } from './images/logo.svg';
import tesla from './images/tesla.jpeg';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addOns: [
        {
          id: 1,
          price: 2500,
          addOn: 'AWD Drivetrain',
          checked: false,
        },
        {
          id: 2,
          price: 2000,
          addOn: 'GPS Navigation',
          checked: false,
        },
        {
          id: 3,
          price: 2000,
          addOn: 'Winter Tire Package',
          checked: false,
        },
        {
          id: 4,
          price: 3500,
          addOn: 'Sport Package',
          checked: false,
        },
        {
          id: 5,
          price: 1500,
          addOn: 'Live Traffic Updates',
          checked: false,
        },
        {
          id: 6,
          price: 2500,
          addOn: 'Roadside Assistance',
          checked: false,
        },
      ],
    };
  }

  handleChange = (e) => {
    let addOns = this.state.addOns;
    addOns.forEach((opt) => {
      if (opt.id.toString() === e.target.value) {
        opt.checked = e.target.checked;
      }
    });
    this.setState({ addOns });
  };

  carPricingCalculator = (arr) => {
    const basePrice = 24999;
    const adminFee = 1200;
    const carFee = 1.02;
    const salesTax = 1.13;
    const reqDiscountAmt = 8000;
    const currentAddOns = [];
    let discount = 0;
    let upgrades = 0;

    arr.forEach((obj) => {
      // To prevent adding the same addon
      if (!currentAddOns.includes(obj.addOn)) {
        currentAddOns.push(obj.addOn);
        upgrades += obj.price;
      }
    });
    // If the Upgrade amount is greater than the Required Discount Amount
    if (upgrades >= reqDiscountAmt) {
      discount = (upgrades - reqDiscountAmt) / 2;
      upgrades = upgrades - discount;
    }

    const totalPrice = parseFloat(
      (((upgrades + basePrice) * carFee + adminFee) * salesTax).toFixed(2)
    );

    if (currentAddOns.length === 0) {
      return [
        `The cost for this car is $${totalPrice} with no additional configurations`,
        0,
      ];
    }

    return [
      `The cost for this car is $${totalPrice} with the following configurations ${currentAddOns.join(
        ', '
      )}`,
      discount,
      upgrades,
    ];
  };

  render() {
    const addOns = this.state.addOns;
    const selectedAddons = addOns.filter((opt) => opt.checked);
    const addOnDetails = this.carPricingCalculator(selectedAddons);
    return (
      <div>
        <ul id="nav">
          <Logo className="logo" />
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
        <div className="container">
          <img src={tesla} alt="Tesla" className="tesla" />
          <div className="shopping-cart">
            <div className="configurations">
              <p>Select Your Configuration(s)</p>
              <p>MSRP $24,999</p>
              <p>Administration Fees: $1,200</p>
              <p>Car Fees: 2%</p>
              <p>Sales Tax: 13%</p>

              {addOns.map((opt) => (
                <div>
                  <CheckBox
                    {...opt}
                    label={opt.addOn}
                    handleChange={this.handleChange}
                  />
                </div>
              ))}
            </div>
            <div>Your total upgrades cost: ${addOnDetails[2]}</div>
            <div>Your current discount: ${addOnDetails[1]}</div>
            <div>{addOnDetails[0]}</div>
            <button>PLACE ORDER</button>
          </div>
        </div>
      </div>
    );
  }
}

const CheckBox = ({ id, handleChange, checked, label }) => {
  return (
    <label key={id}>
      <input
        onChange={handleChange}
        type="checkbox"
        checked={checked}
        value={id}
      />
      {label}
    </label>
  );
};

export default App;
