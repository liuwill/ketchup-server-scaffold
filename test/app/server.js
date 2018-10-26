const mockServer = require('./mock')

const request = mockServer.createRequest()

describe('router', function () {
  it('GET /status health check', function (done) {
    request
      .get('/status')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  });

  it('GET /api/demo/data demo check', function (done) {
    request
      .get('/api/demo/data')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  });

  it('GET /api/demo/error error check', function (done) {
    request
      .get('/api/demo/error')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  });
});
