import React from 'react';
import logo from '../../logo.svg'
import './Permissions.css';
import { CustomButton, Banner } from '../../Components';
import { MockData } from '../../Constants/MockData';

const LineItemComponent = ({ request, response }) => (
  <div className="permissions--line-item-container">
    <img src={logo} className="permissions--line-item-image" alt="IMAGE" />
    <div className="permissions--line-item-request-wrapper">
      <text className="permissions--line-item-request-title">{request.toUpperCase()}</text>
      <text className="permissions--line-item-request-response">{response.toUpperCase()}</text>
    </div>
  </div>
)

const HeaderComponent = ({ merchant }) => {
  const merchantName = merchant || 'JIGSAW'

  return (
    <div className="permissions--header-container">
      <div className="permissions--header-merchant-wrapper">
        <text className="permissions--header-id">CONNECT TO IDENTITY.SERVICE</text>
        <text className="permissions--header-merchant-name">{merchantName}</text>
      </div>
      <div className="permissions--header-merchant-image-wrapper">
        <img src={logo} className="permissions--header-merchant-image" alt="IMAGE" />
      </div>
    </div>
  )
}

const BodyComponent = ({ permissionsList }) => {

  const list = permissionsList.map(permission => (
    <LineItemComponent
      request={permission.request}
      response={permission.response}
    />
  ))

  return (
    <div className="permissions--body-container">
      <Banner />
  
      {list}
    </div>
  )
}

const PolicyComponent = () => (
  <div className="permissions--policy-container">
    <text className="permissions--policy-terms-text">
      FOR MORE INFORMATION REGARDING TERMS AND AGREEMENT PLEASE CLICK
      <span style={{ fontWeight: '800' }}> HERE</span>
    </text>
  </div>
)

const FooterComponent = () => (
  <div className="permissions--footer-container">
    <CustomButton text="CANCEL" onClick={() => console.log('Cancel')} />
    <CustomButton primary text="AUTHORIZE" onClick={() => console.log('Authorize')} />
  </div>
)

const Permissions = () => (
  <div className="permissions--body">
      <div className="permissions--container">
        <HeaderComponent />
        <BodyComponent permissionsList={MockData} />
        <PolicyComponent />
        <FooterComponent />
      </div>
  </div>
);

export default Permissions;
