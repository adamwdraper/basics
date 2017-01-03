import Ajax from '../src/ajax';

describe('Ajax', function() {
  let xhr;
  let requests;
  let ajax;

  beforeEach(function() {
    ajax = new Ajax();
    
    xhr = sinon.useFakeXMLHttpRequest();

    requests = [];

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
});
