import React from 'react';
import styled from 'styled-components';
import {
  CustomButton,
  Banner,
  Header,
  LineItem,
  Policy,
} from '../../Components';
import { Sizes, Colors, MockData } from '../../Constants';


const { DESKTOP, MOBILE } = Sizes;
const { bgBlack, gray1 } = Colors;

const BodyDiv = styled.div`
  height: 40vh;
  background-color: ${bgBlack};
  padding: 0px 20px;
  overflow-y: scroll;

  @media ${MOBILE} {
    flex: 1;
  }
`

const FooterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
  padding: 0px 20px;
  background-color: ${bgBlack};
`

const Body = styled.div`
  background-color: ${gray1};

  @media ${DESKTOP} {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  @media ${MOBILE} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const Container = styled.div`
  @media ${DESKTOP} {
    width: 500px;
    overflow: hidden;
    box-shadow: 2px 2px 6px black;
  }

  @media ${MOBILE} {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`


const BodyComponent = ({ permissionsList }) => {
  const list = permissionsList.map(permission => (
    <LineItem
      request={permission.request}
      response={permission.response}
    />
  ))

  return (
    <BodyDiv>
      <Banner merchant="JIGSAW" />
      {list}
    </BodyDiv>
  )
}


const FooterComponent = () => (
  <FooterDiv>
    <CustomButton text="CANCEL" onClick={() => console.log('Cancel')} />
    <CustomButton primary text="AUTHORIZE" onClick={() => console.log('Authorize')} />
  </FooterDiv>
)

const Permissions = () => (
  <Body>
    <Container>
      <Header merchant="JIGSAW" />
      <BodyComponent permissionsList={MockData.data} />
      <Policy />
      <FooterComponent />
    </Container>
  </Body>
);

export default Permissions;
