import Ajax from '../src/ajax';

describe('Ajax', function() {
  let xhr;
  let requests;
  let ajax;

  beforeEach(function() {
    ajax = new Ajax();

    xhr = sinon.useFakeXMLHttpRequest();
    requests = sinon.requests = [];

    xhr.onCreate = function(xhr) {
        requests.push(xhr);
    };
  });

  afterEach(function() {
    ajax = null;

    xhr.restore();
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(ajax).to.be.an('object');
    });
  });

  describe('requests', function() {
    it('should make a GET request', function() {
      const url = '/test/url?id=12345';
      const responseText = '{"id":12345,"name":"name"}';
      const success = (data) => {
        response = data;
      };
      const spy = sinon.spy(success);
      let response;

      ajax.get(url)
        .then(success)
        .then(() => {
          expect(success.called).to.be.true;
          expect(response).to.be.an('object');
          expect(JSON.stringify(response)).to.equal(responseText);
        });

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal(url);
      expect(requests[0].method).to.equal('GET');

	    requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, responseText);
    });

    it('should make a POST request', function() {
      const url = '/test/url';
      const responseText = '{"id":12345,"name":"name"}';
      const data = {
        id: 12345
      };
      const success = (data) => {
        response = data;
      };
      const spy = sinon.spy(success);
      let response;

      ajax.post({
        url,
        data
      })
        .then(success)
        .then(() => {
          expect(success.called).to.be.true;
          expect(response).to.be.an('object');
          expect(JSON.stringify(response)).to.equal(responseText);
        });

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal(url);
      expect(requests[0].method).to.equal('POST');
      expect(JSON.stringify(requests[0].requestHeaders)).to.equal('{"Content-Type":"application/json;charset=utf-8"}');
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));

	    requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, responseText);
    });

    it('should make a DELETE request', function() {
      const url = '/test/url';
      const responseText = '{"id":12345,"name":"name"}';
      const data = {
        id: 12345
      };
      const success = (data) => {
        response = data;
      };
      const spy = sinon.spy(success);
      let response;

      ajax.delete({
        url,
        data
      })
        .then(success)
        .then(() => {
          expect(success.called).to.be.true;
          expect(response).to.be.an('object');
          expect(JSON.stringify(response)).to.equal(responseText);
        });

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal(url);
      expect(requests[0].method).to.equal('DELETE');
      expect(JSON.stringify(requests[0].requestHeaders)).to.equal('{"Content-Type":"application/json;charset=utf-8"}');
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));

	    requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, responseText);
    });

    it('should make a PUT request', function() {
      const url = '/test/url';
      const responseText = '{"id":12345,"name":"name"}';
      const data = {
        id: 12345
      };
      const success = (data) => {
        response = data;
      };
      const spy = sinon.spy(success);
      let response;

      ajax.put({
        url,
        data
      })
        .then(success)
        .then(() => {
          expect(success.called).to.be.true;
          expect(response).to.be.an('object');
          expect(JSON.stringify(response)).to.equal(responseText);
        });

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal(url);
      expect(requests[0].method).to.equal('PUT');
      expect(JSON.stringify(requests[0].requestHeaders)).to.equal('{"Content-Type":"application/json;charset=utf-8"}');
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));

	    requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, responseText);
    });
  });
});
