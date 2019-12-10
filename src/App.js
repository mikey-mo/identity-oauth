import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { CustomButton } from './Components';
import { Sizes, Colors } from './Constants';
import identityService from './Services/identity';
import notificationService from './Services/notification';
import mockData from './Constants/MockData';

const { code: { userId } } = mockData;
const { requestCode } = notificationService;
const { auth: { authIdentifier } } = identityService;
const { bgBlack } = Colors;
const { DESKTOP, MOBILE } = Sizes;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${bgBlack};

  @media ${DESKTOP} {
    width: 500px;
    height: 250px;
    overflow: hidden;
    box-shadow: 2px 2px 6px black;
  }

  @media ${MOBILE} {
    height: 100%;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

let inputIdentifier;

function App ({ history, match: { params: { type } } }) {
  const nextPath = (url, params) => history.push(url, params);

  const submit = async () => {
    const { value: identifier } = inputIdentifier;

    const response = await authIdentifier(type, identifier);

    if (response.status === 200 && !response.data.needsAuth) {
      nextPath('/auth/verified', {})
      // this will be a callback to the main app calling this
    } else sendNotification(type, identifier);
  }

  const sendNotification = async (type, identifier) => {
    try {
      const response = await requestCode({ type, identifier, userId });
      if (response.status === 200) nextPath("/auth/verify", { type, identifier });
      else {
        console.warn('there was a problem');
        console.log(response);
      }
    } catch (e) {
      console.log('something went wrong', e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container>
            <Input
              ref={(el) => { inputIdentifier = el; }}
              placeholder="identifer"
            />
            <ButtonWrapper>
              <CustomButton
                primary
                width="80%"
                onClick={submit}
                text="SUBMIT"
              />
            </ButtonWrapper>
          </Container>
      </header>
    </div>
  );
}

export default App;
