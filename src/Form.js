import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      numbers: [],
      inputValue: "",
      operation: "",
      result: "",
      errorTest: "noError",
    };
  }

  //helper function for find mode number
  findMode = (numArr) => {
    let obj = {};
    numArr.forEach((num) => {
      if (obj.hasOwnProperty(num)) {
        obj[num] += 1;
      } else {
        obj[num] = 1;
      }
    });

    //newArr is an array with each element is a sub array,
    //inside each sub array the first element is the key ,second element is the value
    //Ex: [[1,2] ,[5,3] ,[7,1]]
    //[1,2] means number 1 appeared twice, [5,3] means number 5 appeared triple times

    let newArr = Object.entries(obj);
    let mode = newArr[0];
    for (let i = 1; i < newArr.length; i++) {
      if (newArr[i][1] > mode[1]) {
        mode = newArr[i];
      }
    }

    return mode[0];
  };

  handleTextInput = (event) => {
    const { value } = event.target;
    const numArr = value.split(",").map((ele) => {
      return Number(ele);
    });
    this.setState({
      numbers: numArr,
      inputValue: value,
    });
  };

  handleSelectInput = (event) => {
    const { value } = event.target;
    this.setState({
      operation: value,
    });
  };

  inputValidator = () => {
    const { numbers, operation } = this.state;
    if (numbers.length === 0) {
      return false;
    } else if (
      numbers.some((number) => {
        return Number.isNaN(number);
      })
    ) {
      return false;
    } else if (
      operation !== "sum" &&
      operation !== "average" &&
      operation !== "mode"
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { numbers, operation } = this.state;

    if (!this.inputValidator()) {
      this.setState({ result: "Invalid input.", errorTest: "error" });
    } else {
      //calculate for the sum
      if (operation === "sum") {
        this.setState({
          result: numbers.reduce((acc, ele) => {
            return (acc += ele);
          }),
          inputValue: "",
          operation: "",
          errorTest: "noError",
        });
      } else if (operation === "average") {
        //calculate for the average
        this.setState({
          result:
            numbers.reduce((acc, ele) => {
              return acc + ele;
            }) / numbers.length,
          inputValue: "",
          operation: "",
          errorTest: "noError",
        });
      } else {
        //calculate the mode
        this.setState({
          result: this.findMode(numbers),
          inputValue: "",
          operation: "",
          errorTest: "noError",
        });
      }
    }
  };

  render() {
    const { result, inputValue, operation, errorTest } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="values"
            name="values"
            type="text"
            value={inputValue}
            onChange={this.handleTextInput}
            class={errorTest}
          />
          <select
            id="operation"
            name="operation"
            value={operation}
            onChange={this.handleSelectInput}
            class={errorTest}
          >
            <option value=""></option>
            <option value="sum">sum</option>
            <option value="average">average</option>
            <option value="mode">mode</option>
          </select>
          <button type="submit">Calculate</button>
        </form>
        <p>{result}</p>
      </div>
    );
  }
}

export default Form;
