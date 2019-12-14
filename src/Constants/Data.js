let consumerToken;
let userId = "1";

export default {
  data: [
    {
      request: 'Access your username and avatar',
      response: 'jimmysupreme',
    },
    {
      request: 'Access your email address',
      response: 'james@jigsaw.xyz',
    },
    {
      request: 'Access your phone number',
      response: '(917) 123-1234',
    },
  ],
  getConsumerToken: () => consumerToken,
  setConsumerToken: token => {
    consumerToken = token;
    return true;
  },
  getUserId: () => userId,
  setUserId: id => {
    userId = id;
    return true;
  },
}