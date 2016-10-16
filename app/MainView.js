import React from 'react';
import InputNumber from './InputNumber'
import OutputNumber from './OutputNumber'


class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      number: ""
    }
  }
  onCheckedChange(newChecked) {
    this.setState({
      checked: newChecked,
    });
  }
  onNumberChange(newNumber) {
    this.setState({
      number: newNumber
    });
  }
  render() {
    return (
      <div>
        <InputNumber checked={this.state.checked}
          number={this.state.number}
          callbackCheckedChange={this.onCheckedChange.bind(this)}
          callbackNumberChange={this.onNumberChange.bind(this)} />
        <OutputNumber number={this.state.number} 
          checked={this.state.checked}/>
      </div>
    );
  }
}

export default MainView;