import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  FormGroup,
  InputGroup,
} from 'react-bootstrap'

class OutputNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binaryRes: "",
      decimal: "",
      hexadecimal: "",
      mapBase:[2,10,16]
    }
  }
  changeToDec(numbers, base) {
    var sum = 0;
    var length = numbers.length
    for (let i = 0; i < length; i++) {
      let number = parseInt(numbers[i]);
      sum += Math.pow(base, length - i - 1) * number;
    }
    return sum.toString();
  }
  //十进制转换其他进制
  decChange(numbers, base) {
    var num = parseInt(numbers);
    var str = '';
    var k = parseInt(num);
    var m = num % base;
    while (k >= base) {
      if(m > 9)
        str = String.fromCharCode(0x40 + (m - 9)) + str;
      else
        str = m.toString() + str;
      k = parseInt(k / base);
      m = k % base;
    }
    if(m > 9)
      str = String.fromCharCode(0x40 + (m - 9)) + str;
    else
      str = m.toString() + str;
    return str;
  }
  componentWillReceiveProps(nextProps) {
    var base = this.state.mapBase[nextProps.checked];
    var numberDec = this.changeToDec(nextProps.number,base);
    this.setState({
      binaryRes:this.decChange(numberDec,2),
      decimal:this.decChange(numberDec,10),
      hexadecimal:this.decChange(numberDec,16)
    });
  }
  render() {
    return (
      <Grid>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>二进制：</InputGroup.Addon>
            <FormControl type="text" name="binary" value={this.state.binaryRes} />
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>十进制：</InputGroup.Addon>
            <FormControl type="text" name="decimal" value={this.state.decimal} />
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>十六制：</InputGroup.Addon>
            <FormControl type="text" name="hexadecimal" value={this.state.hexadecimal} />
          </InputGroup>
        </FormGroup>
      </Grid>
    )
  }
}


export default OutputNumber;