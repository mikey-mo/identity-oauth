import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../logo.svg';
import { CustomButton } from '../../Components';
import { Sizes, Colors } from '../../Constants';


const { DESKTOP, MOBILE } = Sizes;
const { white, bgBlack, gray1, gray3 } = Colors;

const Body = styled.div`
  background-color: ${gray1};

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
    width: 500px;
    height: 450px;
    overflow: hidden;
    box-shadow: 2px 2px 6px black;
  }

  @media ${MOBILE} {
    height: 100%;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${gray3};
  border-radius: 4px;
  padding: 3px;
`

const Image = styled.img`
  height: 130px;

  @media ${MOBILE} {
    height: 35vmin;
  }
`

const EnrollWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const EnrollText = styled.div`
  font-family: Verdana;
  font-size: 18px;
  color: ${white};
  letter-spacing: 1px;

  @media ${MOBILE} {
    font-size 5vmin;
  }
`

const MerchantText = styled.div`
  font-family: Verdana;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${white};
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  width: 100%;
`

const Auth = ({ history, merchant }) => {
  const nextPath = (param) => history.push(param)

  const pathname = '/auth/identifiers';

  return (
    <Body>
      <Container>

        <ImageWrapper>
          <Image src={logo} alt="AVATAR" />
        </ImageWrapper>

        <EnrollWrapper>
          <EnrollText>ENROLL WITH&nbsp;</EnrollText>
          <MerchantText>{`${merchant.toUpperCase()}`}</MerchantText>
        </EnrollWrapper>

        <ButtonWrapper>
          <CustomButton primary width="80%" onClick={() => nextPath({ pathname, identifier: 'EMAIL' })} text="USING EMAIL" />
          <CustomButton primary width="80%" onClick={() => nextPath({ pathname, identifier: 'PHONE NUMBER' })} text="USING PHONE NUMBER"/>
        </ButtonWrapper>

      </Container>
    </Body>
  )
}


Auth.defaultProps = {
  merchant: 'JIGSAW',
}

Auth.propTypes = {
  merchant: PropTypes.string,
}

export default withRouter(Auth);
