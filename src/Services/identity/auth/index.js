import axios from 'axios';
import Data from '../../../Constants/Data';

const { getConsumerToken } = Data;
const authUrl = "http://52.23.163.152/";
const version = "v1/";

const authIdentifier = async (type, identifier) => {
    try {
        return await axios({
            method: 'get',
            url: `${authUrl}${version}auth/identifiers/${type}/${identifier}`,
            headers: { 'content-type': 'application/json', consumer: getConsumerToken() },
         })
         .catch(error => error.response);
    }
    catch (e) {
        console.warn('error authing identififer', e);
        return e;
    }
};

const addIdentifier = async (type, identifier) => {
    try {
        return await axios({
            method: 'post',
            url: `${authUrl}${version}auth/identifiers`,
            data: { type: type, value: identifier },
            headers: { 'content-type': 'application/json' },
        })
        .catch(error => error.response);
    }
    catch (e) {
        console.warn('error adding identifier', e);
        return e;
    }
};

const getPermissions = async () => {
    try {
        return await axios({
            method: 'get',
            url: `${authUrl}${version}auth/permissions/${getConsumerToken()}`,
        })
        .catch(error => error.response);
    }
    catch (e) {
        console.warn('error getting permissions', e);
        return e;
    }
};

const grantAuths = async (identity, grants) => {
    try {
        return await axios({
            method: 'post',
            url: `${authUrl}${version}auth/grants`,
            data: {
                identity,
                consumer: getConsumerToken(),
                grants,
            },
        })
        .catch(error => error.response);
    }
    catch (e) {
        console.warn('erroring granting auths', e);
        return e;
    }
};

export default {
    authIdentifier,
    addIdentifier,
    getPermissions,
    grantAuths,
};
