import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';

const logo = require('../assets/images/old-rocket.png');
const { MOBILE } = Sizes;
const { bgGreen, bgBlack } = Colors;


const Container = styled.div`
  flex-direction: column;
  background-color : ${bgBlack};
`

const BottomBorder = styled.div`
  width: 96%;
  height: 2px;
  background-color: ${bgGreen};
  margin: auto;
`

const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 135px;
  padding: 0px 20px;
  background-color: ${bgBlack};
`
  
const MerchantWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ServiceText = styled.div`
  color: ${bgGreen};
  font-size: 14px;
  font-family: Noto Sans TC;
  letter-spacing: 1.5px;

  @media ${MOBILE} {
    font-size: 2.7vmin;
  }
`

const MerchantText = styled.div`
  font-size: 44px;
  font-family: Noto Sans TC;
  font-weight: 800;
  letter-spacing: 3px;
  color: ${bgGreen};
  white-space: nowrap;  
  overflow: hidden; 
  text-overflow: ellipsis;
  max-width: 8em;

  @media ${MOBILE} {
    letter-spacing: 2px;
    font-size: 8vmin;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(250, 250, 250, 0.2);
  border-radius: 8px;
  padding: 9px;
`

const Image = styled.img`
  height: 75px;
  border-radius: 7px;
  
  @media ${MOBILE} {
    height: 19vmin;
  }
`

const Header = ({ merchant }) => {
  return (
    <Container>
      <WrapperDiv>
        <MerchantWrapper>
          <ServiceText>CONNECT TO IDENTITY.SERVICE</ServiceText>
          <MerchantText>{merchant}</MerchantText>
        </MerchantWrapper>
        <ImageWrapper>
          <Image src={logo} alt="IMAGE" />
        </ImageWrapper>
      </WrapperDiv>
      <BottomBorder />
    </Container>
  )
}


Header.propTypes = {
  merchant: PropTypes.string.isRequired,
};


export default Header;
