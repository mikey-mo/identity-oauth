import React, { Component } from 'react';
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
import identityService from '../../Services/identity';

const { auth: { getPermissions, grantAuths } } = identityService;
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
    height: ${window.innerHeight}px;
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

class Permissions extends Component {
  state = { permissions: [] }

  async componentDidMount() {
    try {
      const response = await getPermissions();
      if (response.status === 200) {
        const { data: { permissions } } = response;
        this.setState({ permissions });
      }
      else console.warn('something went wrong', response);
    }
    catch (e) {
      console.warn(e);
    }
  }

  nextPath = (url) => {
    const { history } = this.props;
    history.push(url);
  }

  list = () => this.state.permissions.map(
    ({ consumer, scope, read, write }) => (
      <LineItem
        key={`${scope.id}${consumer.id}`}
        request={
          `${scope.name} -   
          ${read.required ? 'Read access' : ''}
          ${read.required && write.required ? ' & ' : ''}
          ${write.required ? 'Write access' : ''}`
        }
        response={
          `${scope.description}`
        }
      />
    )
  )

  submit = async () => {
    const {
      history: {
        location: {
          state: {
            identityId,
          },
        },
      },
    } = this.props;
    const { permissions } = this.state;
    try {
      const response = await grantAuths(
        identityId,
        permissions.map(({ scope }) => {
          return {
            scope: scope.name,
            read: true,
            write: true,
            share: true
          };
        })
      );
  
      if (response.status === 201) this.nextPath("/auth/verified");
      else console.warn('something went wrong', response);
    }
    catch (e) {
      console.warn(e);
    }
  }

  render () {
    return (
      <Body>
      <Container>

        <Header merchant="JIGSAW" />

        <BodyDiv>
          <Banner merchant="JIGSAW" />
          {this.list()}
        </BodyDiv>

        <Policy />

        <FooterDiv>
          <CustomButton text="CANCEL" onClick={() => this.nextPath('/auth/cancelled')} />
          <CustomButton primary text="AUTHORIZE" onClick={this.submit} />
        </FooterDiv>

      </Container>
    </Body>
    );
  }
};

Permissions.defaultProps = {
  permissions: MockData.data,
}

Permissions.propTypes = {
  permissions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
}

export default withRouter(Permissions);
