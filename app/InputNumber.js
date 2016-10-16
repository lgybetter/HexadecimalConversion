import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  FormGroup,
  Radio,
  InputGroup,
} from 'react-bootstrap'

class InputNumber extends React.Component {
  constructor(props) {
    super(props);
    var checkedList = [false, false, false];
    checkedList[this.props.checked] = true;
    this.state = {
      checkedList: checkedList,
      number: this.props.number
    }
  }
  selectHandleChange(event) {
    var checkedList = [false, false, false];
    checkedList[event.target.value] = true;
    this.setState({
      checkedList: checkedList
    });
    this.props.callbackCheckedChange(event.target.value);
  }
  textHandleChange(event) {
    this.setState({
      number: event.target.value
    });
    this.props.callbackNumberChange(event.target.value);
  }
  render() {
    return (
      <Grid>
        <FormGroup>
          <Radio inline name="binary" value="0" onChange={this.selectHandleChange.bind(this)} checked={this.state.checkedList[0]} >二进制</Radio>
          <Radio inline name="decimal" value="1" onChange={this.selectHandleChange.bind(this)} checked={this.state.checkedList[1]} >十进制</Radio>
          <Radio inline name="hexadecimal" value="2" onChange={this.selectHandleChange.bind(this)} checked={this.state.checkedList[2]} >十六进制</Radio>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>请输入：</InputGroup.Addon>
            <FormControl type="text" name="text" value={this.state.number} onChange={this.textHandleChange.bind(this)} />
          </InputGroup>
        </FormGroup>
      </Grid>
    );
  }
}

export default InputNumber;