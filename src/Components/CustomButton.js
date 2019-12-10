import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';

const { DESKTOP, MOBILE } = Sizes;
const { bgGreen, bgBlack, white } = Colors;

const Button = styled.button`
  height: 44px;
  width: ${({ width }) => width || '130px'};
  cursor: pointer;
  border: none;
  outline: 0;
  background-color: ${({ primary }) => primary ? bgGreen : bgBlack};

  @media ${DESKTOP} {
    &:hover {
      background-color: ${({ primary }) => primary ? 'rgba(0, 253, 151, 0.7)' : bgBlack};
    }
  
    &:active {
      background-color: ${({ primary }) => primary ? 'rgba(0, 253, 151, 0.5)' : bgBlack};
    }
  }

  @media ${MOBILE} {
    height: 48px;
    width: ${({ width }) => width || '50%'};;
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

const CustomButton = ({ text, primary, width, onClick }) => (
  <Button primary={primary} width={width} onClick={onClick}>
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
