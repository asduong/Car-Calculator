import React from 'react';
import './style.css';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Facebook } from './images/facebook.svg';
import { ReactComponent as Instagram } from './images/instagram.svg';
import { ReactComponent as Twitter } from './images/twitter.svg';
import { ReactComponent as Key } from './images/key.svg';
import { ReactComponent as Mail } from './images/mail.svg';
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

    // Calculate total cost
    const totalPrice = parseFloat(
      (((upgrades + basePrice) * carFee + adminFee) * salesTax).toFixed(2)
    );

    if (currentAddOns.length === 0) {
      return [
        `The cost for this car is $${totalPrice} with no additional configurations`,
        0,
        0,
      ];
    }

    return [
      `The cost for this car is $${totalPrice} with the following configurations: ${currentAddOns.join(
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
            <a href="/">Models</a>
          </li>
          <li>
            <a href="/">Innovation</a>
          </li>
          <li>
            <a href="/">Locate Dealer</a>
          </li>
        </ul>
        <div className="container">
          <img src={tesla} alt="Tesla Model 3" className="tesla" />
          <div className="shopping-cart">
            <div>
              <p>
                <strong>Tesla Model 3</strong>
              </p>
              <p>MSRP $24,999</p>
              <p>
                <strong>Select Your Configuration(s):</strong>
              </p>

              {addOns.map((opt) => (
                <div className="price-config">
                  <CheckBox
                    {...opt}
                    label={opt.addOn}
                    handleChange={this.handleChange}
                  />
                </div>
              ))}
            </div>
            <div>
              <p>
                Your total upgrades cost: <strong>${addOnDetails[2]}</strong>
              </p>
              <p>
                Your current discount: <strong>${addOnDetails[1]}</strong>
              </p>
              <p>Car Fees: 2%</p>
              <p>Administration Fees: $1,200</p>
              <p>Sales Tax: 13%</p>
              <p className="spacing">{addOnDetails[0]}</p>
            </div>
            <button className="btn-design">PLACE ORDER</button>
          </div>
        </div>
        <div className="footer">
          <a
            href={`https://www.facebook.com/TESLAOFFICIAL/`}
            target="_blank"
            rel="noreferrer"
          >
            <Facebook></Facebook>
          </a>
          <a
            href={`https://www.instagram.com/teslamotors/?hl=en`}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram></Instagram>
          </a>
          <a
            href={`https://twitter.com/Tesla?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor`}
            target="_blank"
            rel="noreferrer"
          >
            <Twitter></Twitter>
          </a>
          <a
            href={`https://www.tesla.com/en_CA/drive`}
            target="_blank"
            rel="noreferrer"
          >
            <Key className="svg-size"></Key>
          </a>

          <a
            href={`https://www.tesla.com/en_CA/contact`}
            target="_blank"
            rel="noreferrer"
          >
            <Mail></Mail>
          </a>
        </div>
      </div>
    );
  }
}

const CheckBox = ({ id, handleChange, checked, label, price }) => {
  return (
    <label key={id}>
      <input
        onChange={handleChange}
        type="checkbox"
        checked={checked}
        value={id}
      />
      {label} - ${price}
    </label>
  );
};

export default App;
