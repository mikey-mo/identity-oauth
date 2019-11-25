import React from 'react';
import styled from 'styled-components';
import { Sizes } from '../Constants/Sizes';

const Div = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #212121;
  height: 30px;
`

const Text = styled.text`
  font-family: Verdana;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #CDCDCD;
  
  @media ${Sizes.desktop} {
    font-size: 10px;
  }

  @media ${Sizes.mobile} {
    font-size: 2.7vmin;
  }
`

const Banner = () => (
  <Div>
    <Text>THIS WILL ALLOW JIGSAW TO</Text>
  </Div>
)

export default Banner;
