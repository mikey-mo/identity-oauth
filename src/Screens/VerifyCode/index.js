import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';
import { Sizes, Colors } from '../../Constants';
import notificationService from '../../Services/notification';
import identityService from '../../Services/identity';

const CODE_LENGTH = new Array(6).fill(0);
const { verifyCode } = notificationService;
const { auth: { addIdentifier } } = identityService;
const { DESKTOP, MOBILE } = Sizes;
const { gray1, gray2, white, bgGreen, bgBlack, bodyBlack, errorRed } = Colors;

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
  background-color: white;
  
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

const EnrollText = styled.div`
  font-family: Raleway, sans-serif;
  font-size: 16px;
  color: black;
  text-align: center;
  letter-spacing: 2px;
  width: 95%;

  @media ${MOBILE} {
    font-size 5vmin;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
`

const Box = styled.div`
  border-right: 1px solid ${gray1};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  position: relative;
  color: black;

  @media ${MOBILE} {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  &:last-child {
    border-right: none;
  }
`

const Wrapper = styled.div`
  border: 1px solid black;
  display: inline-block;
  position: relative;
  display: flex;
`

const Input = styled.input`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: ${({ selectedIndex }) => selectedIndex * 60}px;
  width: 60px;
  opacity: ${({ hideInput }) => hideInput ? 0 : 1};
  border: none;
  font-size: 40px;
  text-align: center;
  background-color: transparent;
  outline: none;
  color: black;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; 
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  @media ${MOBILE} {
    font-size: 24px;
    width: 40px;
    left: ${({ selectedIndex }) => selectedIndex * 40}px;
  }
`

const Outline = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 0 2px black;
`

const ValidationText = styled.div`
  font-family: Raleway, sans-serif;
  font-size: 12px;
  color: ${errorRed};
  text-align: center;
  letter-spacing: 2px;
  width: 95%;
  margin-top: 13px;

  @media ${MOBILE} {
    font-size 3.2vmin;
  }
`

const AnotherCode = styled.button`
  font-family: Raleway, sans-serif;
  font-size: 14px;
  color: ${gray2};
  letter-spacing: 2px;
  background: none;
  border: none;
  margin-bottom: 10px;
`

class Verify extends Component {
  input = React.createRef();
  state = {
    value: '',
    focused: false,
    isNotValid: false,
  };

  nextPath = (url, params) => {
    const { history } = this.props; 
    history.push(url, params)
  }

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
    const inputValue = e.target.value;

    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + inputValue).slice(0, CODE_LENGTH.length),
        isNotValid: false,
      };
    }, () => {
      const { value } = this.state;
      if (value.length === 6){
        this.verifyCode(value);
      }
    });
  }

  handleKeyUp = e => {
    if (e.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
          isNotValid: false,
        };
      });
    }
  };

  renderBox = (values, focused) => {    
    return CODE_LENGTH.map((v, index) => {
      const selected = values.length === index;
      const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;

      return (
        <Box key={v + index}>
          {values[index]}
          {(selected || filled) && focused && <Outline />}
        </Box>
      );
    })
  }

  verifyCode = async (value) => {
    const { history: { location: { state: { type, identifier } } } } = this.props;

    try {
      const response = await verifyCode({ code: value, identifier });
      if (response.status === 200) {
        const data = await addIdentifier(type, identifier);
        if (data.status === 200) {
          const { data: { identity: { id } } } = data; 
          this.nextPath("/auth/permissions", { identityId: id });          
        } else this.setState({ isNotValid: 'couldnt add identifier' });
      } else {
        const { data: { error: { description } } } = response;
        console.warn('there was a problem verifying code', response);
        this.setState({ isNotValid: description });
      }
    }
    catch (e) {
      console.warn('something went wrong', e);
      this.setState({ isNotValid: 'something went wrong' });
    }
  }

  render() {
    const { value, focused, isNotValid } = this.state;
    const values = value.split("");
    const selectedIndex = values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;
    const hideInput = !(values.length < CODE_LENGTH.length);

    return (
      <Body>
        <Container>
  
          <EnrollText>ENTER YOUR VERIFICATION CODE BELOW</EnrollText>

          <InputContainer>
            <Wrapper onClick={this.handleClick}>
              <Input
                value=""
                type="tel"
                ref={this.input}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                selectedIndex={selectedIndex}
                hideInput={hideInput}
              />
              { this.renderBox(values, focused) }
            </Wrapper>

            { isNotValid && <ValidationText>{isNotValid}</ValidationText> }
          </InputContainer>

          <AnotherCode>SEND NEW CODE</AnotherCode>
        </Container>
      </Body>
    );
  }
}

export default withRouter(Verify);
