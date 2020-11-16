import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 24999,
      upgrades: 0,
      addOns: [],
      discounts: 0,
    };
  }

  handleClick = (e) => {
    if (e.target.checked === true) {
      this.setState({
        upgrades: this.state.upgrades + parseInt(e.target.value),
      });
    } else {
      this.setState({
        upgrades: this.state.upgrades - parseInt(e.target.value),
      });
    }
  };



  render() {
    return (
      <div>
        <input
          onClick={(event) => this.handleClick(event)}
          type="checkbox"
          value="2500"
          addOn="AWD Drivetrain"
        />
        <input
          onClick={(event) => this.handleClick(event)}
          type="checkbox"
          value="2000"
          addOn="GPS Navigation"
        />
        <input
          onClick={(event) => this.handleClick(event)}
          type="checkbox"
          value="2000"
          addOn="Winter Tire Package"
        />
        <input
          onClick={(event) => this.handleClick(event)}
          type="checkbox"
          value="3500"
          addOn="Sport Package"
        />
        <input
          onClick={(event) => this.handleClick(event)}
          type="checkbox"
          value="1500"
          addOn="Live Traffic Updates"
        />
        <input
          onClick={(event) => this.handleClick(event)}
          type="checkbox"
          value="2500"
          addOn="Roadside Assistance"
        />
        
      </div>
    );
  }
}

export default App;
