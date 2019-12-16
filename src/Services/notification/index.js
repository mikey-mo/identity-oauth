import axios from 'axios';

const notificationUrl = "https://identity-notif.ddns.net/";
const requestCodePath = "code";

const requestCode = async ({ type, identifier }) => {
    try {
        return await axios({
            method: 'post',
            url: `${notificationUrl}${requestCodePath}`,
            data: {
              type,
              identifier,
            },
          })
          .catch(error => error.response);
    }
    catch (e) {
        console.log('error requesting code', e);
        return e;
    }
}

const verifyCode = async ({ code, identifier }) => {
    try {
        return await axios({
            method: 'patch',
            url: `${notificationUrl}${requestCodePath}`,
            data: {
                code,
                identifier,
            },
        })
        .catch(error => error.response);
    }
    catch (e) {
        console.log('error verifying code', e);
        return e;
    }
};

export default {
    requestCode,
    verifyCode,
};
