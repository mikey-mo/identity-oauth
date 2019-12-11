import React, { Component } from 'react';
import styled from 'styled-components';
import { Sizes, Colors } from '../../Constants';
import notificationService from '../../Services/notification';
import identityService from '../../Services/identity';
import mockData from '../../Constants/MockData';

const CODE_LENGTH = new Array(6).fill(0);
const { DESKTOP, MOBILE } = Sizes;
const { gray1, gray3, white, bgGreen, bgBlack, bodyBlack, errorRed } = Colors;

const Body = styled.div`
  background-color: ${bodyBlack};

  @media ${DESKTOP} {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  @media ${MOBILE} {
    height: 100vh;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${bgBlack};
  
  @media ${DESKTOP} {
    width: 450px;
    height: 350px;
    overflow: hidden;
    box-shadow: 2px 2px 6px black;
  }

  @media ${MOBILE} {
    height: 100%;
  }
`

const Display = styled.div`
  border-right: 1px solid ${gray1};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  position: relative;
  color: ${bgGreen};

  &:last-child {
    border-right: none;
  }
`

const Wrap = styled.div`
  border: 1px solid ${gray1};
  display: inline-block;
  position: relative;
  display: flex;
`

const Input = styled.input`
  position: absolute;
  border: none;
  font-size: 40px;
  text-align: center;
  background-color: transparent;
  outline: none;
  color: ${bgGreen};
`

const Outline = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 0 4px ${bgGreen};
`


class Verify extends Component {
  input = React.createRef();
  state = {
    value: '',
    focused: false,
  };

  handleClick = () => {
    this.input.current.focus();
  }

  handleFocus = () => {
    this.setState({ focused: true });
  }

  handleBlur = () => {
    this.setState({ focused: false });
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  }

  handleKeyUp = e => {
    if (e.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };

  renderInputs = (values, focused) => {    
    return CODE_LENGTH.map((v, index) => {
      const selected = values.length === index;
      const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;

      return (
        <Display>
          {values[index]}
          {(selected || filled) && focused && <Outline />}
        </Display>
      );
    })
  }

  render() {
    const { value, focused } = this.state;
    const values = value.split("");
    const selectedIndex = values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;
    const hideInput = !(values.length < CODE_LENGTH.length);

    return (
      <Body>
        <Container>
          <Wrap onClick={this.handleClick}>
            <Input
              value=""
              ref={this.input}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={{
                width: "60px",
                top: "0px",
                bottom: "0px",
                left: `${selectedIndex * 60}px`,
                opacity: hideInput ? 0 : 1,
              }}
            />
            { this.renderInputs(values, focused) }
          </Wrap>
        </Container>
      </Body>
    );
  }
}
export default Verify;