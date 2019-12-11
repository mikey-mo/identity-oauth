import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Sizes, Colors, CountryCode } from '../../Constants';
import { CustomButton } from '../../Components';
import logo from '../../assets/images/old-rocket.png';
import identityService from '../../Services/identity';
import notificationService from '../../Services/notification';
import mockData from '../../Constants/MockData';

const { code: { userId } } = mockData;
const { requestCode } = notificationService;
const { auth: { authIdentifier } } = identityService;
const { DESKTOP, MOBILE } = Sizes;
const { gray1, gray3, white, bgGreen, bgBlack, bodyBlack, errorRed } = Colors;

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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 80%;
`

const ValidationText = styled.div`
  font-family: Noto Sans TC;
  font-size: 12px;
  color: ${errorRed};
  text-align: center;
  letter-spacing: 2px;
  width: 95%;
  margin-top: 13px;

  @media ${MOBILE} {
    font-size 3.2vmin;
  }
`

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

const PhoneWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
`

const Select = styled.select`
  padding: 11px 10px;
  margin: 8px 0;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  box-sizing: border-box;
  -webkit-transition: 0.5s;
  color: ${bgGreen};
  font-family: Noto Sans TC;
  font-size: 12px;
  letter-spacing: 2px;
  background-color: ${bgBlack};
  border: 1px solid ${gray1};
  outline: none;

  &:focus {
    border: 1px solid ${bgGreen};
  }
`

const NumberFormatWrapper = styled(NumberFormat)`
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid ${gray1};
  box-sizing: border-box;
  border-radius: 0px;
  -webkit-transition: 0.5s;
  font-family: Noto Sans TC;
  font-size: 12px;
  letter-spacing: 2px;
  color: ${bgGreen};
  background-color: ${bgBlack};
  outline: none;
  
  @media ${MOBILE} {
    width: 80%;
  }

  &:focus {
    border: 1px solid ${bgGreen};
  }
`

class Identifiers extends Component {
  constructor(props) {
    super();

    this.state = {
      type: props.match.params.type,
      country: 'us',
      isNotValid: false,
      phoneRawValue: '',
      emailRawValue: '',
    };
  }

  renderOptions = () => {
    let codes = [];

    for (const key in CountryCode) {
      const code = CountryCode[key];
      codes.push(<option value={key}>{`+${code}`}</option>)
    }

    return (
      <Select onChange={this.onCountryChange}>
        {codes}
      </Select>
    )
  }

  nextPath = (url, params) => {
    const { history } = this.props;
    history.push(url, params);
  };

  onEmailChange = (event) => {
    this.setState({ emailRawValue: event.target.value })
  }

  onPhoneChange = (event) => {
    this.setState({ phoneRawValue: event.value })
  }
  
  onCountryChange = (event) => {
    this.setState({ country: event.target.value })
  }

  sendNotification = async (type, identifier) => {
    try {
      const response = await requestCode({ type, identifier, userId });
      if (response.status === 200) this.nextPath("/auth/verify", { type, identifier });
      else {
        console.warn('there was a problem');
        console.log(response);
      }
    } catch (e) {
      console.log('something went wrong', e);
    }
  }

  onSubmit = async () => {
    const { type, emailRawValue, phoneRawValue } = this.state;
    // const identifier = type === 'email' ? emailRawValue : phoneRawValue;
    let identifier;

    if (type === 'email') {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      identifier = emailRawValue;

      if (re.test(String(emailRawValue).toLowerCase())) {
        const response = await authIdentifier(type, identifier);

        if (response.status === 200 && !response.data.needsAuth) {
          this.nextPath('/auth/verified', {})
          // this will be a callback to the main app calling this
        } else this.sendNotification(type, identifier);
      } else {
        this.setState({ isNotValid: true });
      }
    }

    if (type === 'phone') {
      identifier = phoneRawValue;
      if (phoneRawValue.length === 10) {
        const response = await authIdentifier(type, identifier);

        if (response.status === 200 && !response.data.needsAuth) {
          this.nextPath('/auth/verified', {})
          // this will be a callback to the main app calling this
        } else this.sendNotification(type, identifier);
      } else {
        this.setState({ isNotValid: true });
      }
    }

  }

  render() {
    const { type, country, isNotValid } = this.state;

    const typeText = type === 'email' ?
    'EMAIL' :
    'PHONE NUMBER';

    let placeholder = '(555) 555-5555';
    let format = '(###) ###-####';

    if (country === 'gb') {
      placeholder = '7911 123456';
      format = '#### ######';
    }

    return (
      <Body>
        <Container>
          <MerchantText>{'OLD ROCKET'}</MerchantText>
      
          <ImageWrapper>
            <Image src={logo} alt="AVATAR" />
          </ImageWrapper>

          <EnrollText>
            {`PLEASE ENTER YOUR ${typeText} BELOW`}
          </EnrollText>

          <FormWrapper>
            { type === 'phone' ?
              <PhoneWrapper>
                {this.renderOptions()}
                <NumberFormatWrapper format={format} placeholder={placeholder} onValueChange={this.onPhoneChange} />
              </PhoneWrapper> :
              <Input
                type="text"
                onChange={this.onEmailChange}
                placeholder="jimmysupreme@gmail.com"
              />
            }
            <ButtonWrapper>
              <CustomButton primary onClick={this.onSubmit} text="SUBMIT"/>
              {
                isNotValid && <ValidationText>{`PLEASE MAKE SURE YOU HAVE ENTERED YOUR ${typeText} CORRECTLY`}</ValidationText>
              }
            </ButtonWrapper>
          </FormWrapper>
  
        </Container>
      </Body>
    )
  }
}

export default withRouter(Identifiers);
