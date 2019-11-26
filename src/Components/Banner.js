import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sizes, Colors } from '../Constants';

const { MOBILE } = Sizes;

const Div = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: ${Colors.bgBlack};
  height: 30px;
`

const Text = styled.div`
  font-family: Verdana;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: ${Colors.gray1};

  @media ${MOBILE} {
    font-size: 2.7vmin;
  }
`

const Banner = ({ merchant }) => (
  <Div>
    <Text>{`THIS WILL ALLOW ${merchant} TO`}</Text>
  </Div>
)


Banner.propTypes = {
  merchant: PropTypes.string.isRequired,
};


export default Banner;
