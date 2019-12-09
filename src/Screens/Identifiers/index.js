import React from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Sizes, Colors, CountryCode } from '../../Constants';
import { CustomButton } from '../../Components';
import logo from '../../logo.svg';


const { DESKTOP, MOBILE } = Sizes;
const { gray1, gray3, white, bgGreen, bgBlack, errorRed } = Colors;

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

const EnrollText = styled.div`
  font-family: Verdana;
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
  justify-content: space-between;
  align-items: center;
  height: 120px;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justifyContent: flex-start;
  align-items: center;
  height: 200px;
  width: 80%;
`

const ValidationText = styled.div`
  font-family: Verdana;
  font-size: 12px;
  color: ${errorRed};
  text-align: center;
  letter-spacing: 2px;
  width: 95%;
  margin-top: 20px;

  @media ${MOBILE} {
    font-size 2.8vmin;
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
  font-family: Verdana;
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
  font-family: Verdana;
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
  font-family: Verdana;
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

class Identifiers extends React.Component {
  constructor(props) {
    super();

    this.state = {
      identifier: props.location.identifier || 'EMAIL',
      country: 'us',
      isNotValid: false,
      phoneRawValue: '',
      emailRawValue: '',
    };
  }

  nextPath = (param) => {
    const { history } = this.props;

    history.push(param)
  };

  onSubmit = () => {
    const { phoneRawValue, emailRawValue, identifier } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (identifier === 'EMAIL') {
      if (re.test(String(emailRawValue).toLowerCase())) {
        this.nextPath('/auth/permissions');
      } else {
        this.setState({ isNotValid: true });
      }
    }

    if (identifier === 'PHONE NUMBER') {
      if (phoneRawValue.length === 10) {
        this.nextPath('/auth/permissions');
      } else {
        this.setState({ isNotValid: true });
      }

    }

  }

  onEmailChange = (event) => {
    this.setState({ emailRawValue: event.target.value })
  }

  onPhoneChange = (event) => {
    this.setState({ phoneRawValue: event.value })
  }
  
  onCountryChange = (event) => {
    this.setState({ country: event.target.value })
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

  render() {
    const { identifier, country, isNotValid } = this.state;

    let placeholder = '(555) 555-5555';
    let format = '(###) ###-####';

    if (country === 'gb') {
      placeholder = '7911 123456';
      format = '#### ######';
    }

    return (
      <Body>
        <Container>
          <ImageWrapper>
            <Image src={logo} alt="AVATAR" />
          </ImageWrapper>
  
          <EnrollText>
            {`PLEASE ENTER YOUR ${identifier} BELOW`}
          </EnrollText>
  
          <FormWrapper>
            { identifier === 'PHONE NUMBER' ?
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
                isNotValid && <ValidationText>{`PLEASE MAKE SURE YOU HAVE ENTERED YOUR ${identifier} CORRECTLY`}</ValidationText>
              }
            </ButtonWrapper>
          </FormWrapper>
  
        </Container>
      </Body>
    )
  }
}


Identifiers.defaultProps = {
  location: {},
};

Identifiers.propTypes = {
  location: PropTypes.shape({}),
};

export default withRouter(Identifiers);
