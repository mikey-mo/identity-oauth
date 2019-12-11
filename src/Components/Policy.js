import React from 'react';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';


const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: ${Colors.gray4};
`

const TermsText = styled.div`
  font-family: Noto Sans TC;
  font-size: 9px;
  letter-spacing: 1px;
  color: ${Colors.gray2};
  text-align: center;


  @media ${Sizes.MOBILE} {
    font-size: 2.5vmin;
  }
`

const Policy = () => (
  <ContainerDiv>
    <TermsText>
      FOR MORE INFORMATION REGARDING TERMS AND AGREEMENT PLEASE CLICK
      <span style={{ fontWeight: '800' }}> HERE</span>
    </TermsText>
  </ContainerDiv>
)


export default Policy;
