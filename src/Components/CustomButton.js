import React from 'react';
import styled from 'styled-components';
import { Sizes } from '../Constants/Sizes';

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: 0;
  background-color: ${props => props.primary ? '#00FD97' : '#212121'};

  &:hover {
    background-color: ${props => props.primary ? 'rgba(0, 253, 151, 0.7)' : '#212121'};
  }

  &:active {
    background-color: ${props => props.primary ? 'rgba(0, 253, 151, 0.5)' : '#212121'};
  }

  @media ${Sizes.desktop} {
    height: 40px;
    width: 130px;
  }

  @media ${Sizes.mobile} {
    height: 40px;
    width: 50%;
  }
`

const Div = styled.div`
  color: ${props => props.primary ? '#212121' : '#FFFFFF'};
  font-family: Verdana;
  font-weight: ${props => props.primary ? '700' : '400'};
  text-align: center;
  letter-spacing: 2px;

  @media ${Sizes.desktop} {
    font-size: 10px;
  }

  @media ${Sizes.mobile} {
    font-size: 2.5vmin;
  }
`

const CustomButton = ({ text, primary, onClick }) => {
  const buttonText = text || 'BUTTON';

  return (
    <Button primary={primary} onClick={onClick}>
      <Div primary={primary}>{buttonText.toUpperCase()}</Div>
    </Button>
  )
}

export default CustomButton;
