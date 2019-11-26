import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';
import logo from '../logo.svg';


const { MOBILE } = Sizes;

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Colors.bgBlack};
`

const Image = styled.img`
  height: 40px;

  @media ${MOBILE} {
    height: 10.5vmin;
  }
`

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 10px 0px 20px;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #ccc;
`

const ReqText = styled.div`
  color: ${Colors.white};
  font-family: Verdana;
  font-size: 12px;
  margin-bottom: 5px;
  letter-spacing: 1.5px;

  @media ${MOBILE} {
    font-size: 2.8vmin;
    margin-bottom: 3px;
  }
`

const ResText = styled.div`
  font-family: Verdana;
  font-size: 12px;
  letter-spacing: 1.5px;
  color: #545454;

  @media ${MOBILE} {
    font-size: 2.8vmin;
  }
`


const LineItem = ({ request, response }) => (
  <ContainerDiv>
    <Image src={logo} alt="IMAGE" />
    <WrapperDiv>
      <ReqText>{request.toUpperCase()}</ReqText>
      <ResText>{response.toUpperCase()}</ResText>
    </WrapperDiv>
  </ContainerDiv>
)


LineItem.propTypes = {
  request: PropTypes.string,
  response: PropTypes.string,
};

LineItem.defaultProps = {
  request: 'Request for permission here',
  response: 'Response for permission',
};

export default LineItem;
