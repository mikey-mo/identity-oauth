import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';
import logo from '../logo.svg';


const { MOBILE } = Sizes;

const ContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 135px;
  padding: 0px 25px;
  background-color: ${Colors.bgGreen};
`
  
const MerchantWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ServiceText = styled.div`
  color: ${Colors.bgBlack};
  font-size: 14px;
  font-family: Verdana;
  letter-spacing: 1.5px;

  @media ${MOBILE} {
    font-size: 2.7vmin;
  }
`

const MerchantText = styled.div`
  font-size: 44px;
  font-family: Verdana;
  font-weight: 800;
  letter-spacing: 3px;

  @media ${MOBILE} {
    letter-spacing: 2px;
    font-size: 10vmin;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(250, 250, 250, 0.7);
  border-radius: 8px;
  padding: 3px;
`

const Image = styled.img`
  height: 90px;
  
  @media ${MOBILE} {
    height: 20vmin;
  }
`

const Header = ({ merchant }) => {
  return (
    <ContainerDiv>
      <MerchantWrapper>
        <ServiceText>CONNECT TO IDENTITY.SERVICE</ServiceText>
        <MerchantText>{merchant}</MerchantText>
      </MerchantWrapper>
      <ImageWrapper>
        <Image src={logo} alt="IMAGE" />
      </ImageWrapper>
    </ContainerDiv>
  )
}


Header.propTypes = {
  merchant: PropTypes.string.isRequired,
};


export default Header;
