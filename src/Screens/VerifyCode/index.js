import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../assets/images/old-rocket.png';
import { CustomButton } from '../../Components';
import { Sizes, Colors } from '../../Constants';
import notificationService from '../../Services/notification';
import identityService from '../../Services/identity';
import mockData from '../../Constants/MockData';

const { auth: { addIdentifier } } = identityService;
const { code: { userId } } = mockData;
const { DESKTOP, MOBILE } = Sizes;
const { white, bgBlack, bgGreen, bodyBlack, gray1, gray3 } = Colors;
const { verifyCode } = notificationService;

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
  border-radius: 8px;
  padding: 10px;
`

const Image = styled.img`
  height: 110px;
  border-radius: 8px;

  @media ${MOBILE} {
    height: 35vmin;
  }
`

const EnrollText = styled.div`
  font-family: Noto Sans TC;
  font-size: 16px;
  color: ${white};
  text-align: center;
  letter-spacing: 2px;
  width: 95%;

  @media ${MOBILE} {
    font-size 5vmin;
  }
`

const MerchantText = styled.div`
  width: 100%;
  color: ${bgGreen};
  text-align: center;
  font-family: Noto Sans TC;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;

  @media ${MOBILE} {
    font-size: 9vmin;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 110px;
  width: 80%;
`

// const Input = styled.input`
//   background: #555A63;
//   border: 1px solid #979797;
//   font-family: Noto Sans TC;
//   font-size: 18px;
//   color: #FFFFFF;
//   padding: 5px;
//   letter-spacing: 0.39px;
//   width: 50%;
// `
const Input = styled.input`
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid ${gray1};
  border-radius: 0px;
  box-sizing: border-box;
  -webkit-transition: 0.5s;
  font-family: Noto Sans TC;
  font-size: 12px;
  letter-spacing: 2px;
  color: ${bgGreen};
  background-color: ${bgBlack};
  outline: none;

  &:focus {
    border: 1px solid ${bgGreen};
  }

  @media ${MOBILE} {
    width: 80%;
  }
`

const AnotherCode = styled.button`
  font-family: Noto Sans TC;
  font-size: 14px;
  color: #B6B6B6;
  letter-spacing: 0.31px;
  background: none;
  border: none;
  margin-top: 10px;
`

class VerifyCode extends Component {
  state = { value: '', errorMsg: '' };

  nextPath = (url, params) => {
    const { history } = this.props; 
    history.push(url, params)
  }

  onInputChange = ({ target: { value } }) => this.setState({ value });

  verifyCode = async () => {
    const { value } = this.state;
    const { history: { location: { state: { type, identifier } } } } = this.props;

    try {
      const response = await verifyCode({ code: value, userId });
      if (response.status === 200) {
        const data = await addIdentifier(type, identifier);
        if (data.status === 200) {
          const { data: { identity: { id } } } = data; 
          this.nextPath("/auth/permissions", { identityId: id });          
        }
      }
      else console.warn('there was a problem', response);
    }
    catch (e) {
      console.warn('something went wrong', e);
    }
  }

  render () {
    const { merchant } = this.props;
    const { value } = this.state;

    return (
      <Body>
        <Container>
          <MerchantText>{`${merchant.toUpperCase()}`}</MerchantText>
    
          <ImageWrapper>
            <Image src={logo} alt="AVATAR" />
          </ImageWrapper>

          <EnrollText>ENTER YOUR VERIFICATION CODE BELOW</EnrollText>

          <Input 
            placeholder="456123"
            value={value}
            onChange={this.onInputChange}
            type="number"
            maxlength="6"
          />

          <ButtonWrapper>
            <CustomButton
              primary
              width="80%"
              onClick={this.verifyCode}
              text="SUBMIT"
            />
            <AnotherCode>Send Another Code</AnotherCode>
          </ButtonWrapper>

        </Container>
      </Body>
    )
  }
}


VerifyCode.defaultProps = {
  merchant: 'OLD ROCKET',
}

VerifyCode.propTypes = {
  merchant: PropTypes.string,
}

export default withRouter(VerifyCode);
