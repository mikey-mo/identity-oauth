import axios from 'axios';

const consumer = '1ae452fc-28f0-497e-accc-5517c2d7bc61';
const authUrl = "http://52.23.163.152/";
const version = "v1/";

const authIdentifier = async (type, identifier) => {
    try {
        return await axios({
            method: 'get',
            url: `${authUrl}${version}auth/identifiers/${type}/${identifier}`,
            headers: { consumer },
         })
         .catch(error => error.response);
    }
    catch (e) {
        console.warn(e);
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
        console.warn(e);
        return e;
    }
};

const getPermissions = async () => {
    try {
        return await axios({
            method: 'get',
            url: `${authUrl}${version}auth/permissions/${consumer}`,
        })
        .catch(error => error.response);
    }
    catch (e) {
        console.warn(e);
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
                consumer,
                grants,
            },
        })
        .catch(error => error.response);
    }
    catch (e) {
        console.warn(e);
        return e;
    }
};

export default {
    authIdentifier,
    addIdentifier,
    getPermissions,
    grantAuths,
};
