const { expect } = require('chai');
const Auth = require('../src/helpers/auth');

describe('Auth', function () {
  let token;
  it('should create a token', async function () {
    token = await Auth.encode({
      hello: 'world',
    });
    expect(token).to.be.string;
  });

  it('should be able to decode the token', async function () {
    const payload = await Auth.decode(token);
    expect(payload).to.contain({
      hello: 'world',
    });
  });

  it('should not be able to decode bad token', async function () {
    try {
      const payload = await Auth.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwiaWF0IjoxNjA5NDI0MTk0LCJleHAiOjE2MTAwMjg5OTR9.eH2Rkoip1RMpmEYfC6udhjmSRPpmveItbBUHt4x');
      expect(payload).to.contain({
        hello: 'world',
      });
    } catch (ex) {
      expect(ex.message).to.include('invalid signature');
    }
  });
});
