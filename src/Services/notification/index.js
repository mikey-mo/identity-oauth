import axios from 'axios';

const notificationUrl = "http://104.248.61.250:8080/";
const requestCodePath = "code";

const requestCode = async ({ type, identifier, userId }) => {
    try {
        return await axios({
            method: 'post',
            url: `${notificationUrl}${requestCodePath}`,
            data: {
              type,
              identifier,
              userId,
            },
          });
    }
    catch (e) {
        console.log('error', e);
        return e;
    }
}

const verifyCode = async ({ code, userId }) => {
    try {
        return await axios({
            method: 'patch',
            url: `${notificationUrl}${requestCodePath}`,
            data: {
                code,
                userId,
            },
        });
    }
    catch (e) {
        console.log('error', e);
        return e;
    }
};

export default {
    requestCode,
    verifyCode,
};
