import React from 'react';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  CustomButton,
  Banner,
  Header,
  LineItem,
  Policy,
} from '../../Components';
import { Sizes, Colors, MockData } from '../../Constants';


const { DESKTOP, MOBILE } = Sizes;
const { bgBlack, bodyBlack } = Colors;

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
  @media ${DESKTOP} {
    width: 500px;
    overflow: hidden;
    box-shadow: 2px 2px 6px black;
  }

  @media ${MOBILE} {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const Permissions = ({ history, permissions }) => {
  const nextPath = (param) => history.push(param)

  const list = permissions.map(permission => (
    <LineItem
      key={permission.response}
      request={permission.request}
      response={permission.response}
    />
  ))

  return (
    <Body>
      <Container>

        <Header merchant="OLD ROCKET" />

        <BodyDiv>
          <Banner merchant="OLD ROCKET" />
          {list}
        </BodyDiv>

        <Policy />

        <FooterDiv>
          <CustomButton text="CANCEL" onClick={() => nextPath('/auth')} />
          <CustomButton primary text="AUTHORIZE" onClick={() => console.log('Authorize')} />
        </FooterDiv>

      </Container>
    </Body>
  );
}


Permissions.defaultProps = {
  permissions: MockData.data,
}

Permissions.propTypes = {
  permissions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
}

export default withRouter(Permissions);
