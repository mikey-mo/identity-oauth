import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';

const { MOBILE } = Sizes;
const { bgGreen, bgBlack, white } = Colors;

const Button = styled.button`
  height: 40px;
  width: 130px;
  cursor: pointer;
  border: none;
  outline: 0;
  background-color: ${props => props.primary ? bgGreen : bgBlack};

  @media ${MOBILE} {
    height: 40px;
    width: 50%;
  }

  &:hover {
    background-color: ${props => props.primary ? 'rgba(0, 253, 151, 0.7)' : bgBlack};
  }

  &:active {
    background-color: ${props => props.primary ? 'rgba(0, 253, 151, 0.5)' : bgBlack};
  }
`

const Div = styled.div`
  color: ${props => props.primary ? bgBlack : white};
  font-family: Verdana;
  font-size: 10px;
  font-weight: ${props => props.primary ? '700' : '400'};
  text-align: center;
  letter-spacing: 2px;

  @media ${MOBILE} {
    font-size: 2.5vmin;
  }
`

const CustomButton = ({ text, primary, onClick }) => (
  <Button primary={primary} onClick={onClick}>
    <Div primary={primary}>{text.toUpperCase()}</Div>
  </Button>
)


CustomButton.defaultProps = {
  text: 'BUTTON',
  primary: false,
  onClick: () => console.log('CLICKING'),
}

CustomButton.propTypes = {
  text: PropTypes.string,
  primary: PropTypes.bool,
  onClick: PropTypes.func,
}


export default CustomButton;
