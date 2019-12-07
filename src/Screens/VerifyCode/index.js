import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../logo.svg';
import { CustomButton } from '../../Components';
import { Sizes, Colors } from '../../Constants';
import notificationService from '../../Services/notification';
import identityService from '../../Services/identity';
import mockData from '../../Constants/MockData';

const { auth: { addIdentifier } } = identityService;
const { code: { userId } } = mockData;
const { DESKTOP, MOBILE } = Sizes;
const { white, bgBlack, gray1, gray3 } = Colors;
const { verifyCode } = notificationService;

const Body = styled.div`
  background-color: ${gray1};

  @media ${DESKTOP} {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }
  
  @media ${MOBILE} {
    height: ${window.innerHeight}px;
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
  justify-content: flex-end;
  align-items: center;
  height: 110px;
  width: 100%;
`

const Input = styled.input`
  background: #555A63;
  border: 1px solid #979797;
  font-family: AppleSDGothicNeo-Regular;
  font-size: 18px;
  color: #FFFFFF;
  padding: 5px;
  letter-spacing: 0.39px;
  width: 50%;
`

const AnotherCode = styled.button`
  font-family: AppleSDGothicNeo-Regular;
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

          <ImageWrapper>
            <Image src={logo} alt="AVATAR" />
          </ImageWrapper>

          <EnrollWrapper>
            <EnrollText>ENROLL WITH&nbsp;</EnrollText>
            <MerchantText>{`${merchant.toUpperCase()}`}</MerchantText>
          </EnrollWrapper>

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
  merchant: 'JIGSAW',
}

VerifyCode.propTypes = {
  merchant: PropTypes.string,
}

export default withRouter(VerifyCode);
