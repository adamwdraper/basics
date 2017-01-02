import Router from '../src/router';

describe('Router', function() {
  let router;

  beforeEach(function() {
    router = new Router({
      root: '/debug.html',
      routes: {
        '/': 'home',
        '/one': 'one',
        '/two(/:id)': 'two',
        '/three': 'three',
        '/^\/f/': 'four',
        '*': 'notFound'
      },
      callbacks: {
        home() {},
        one() {},
        two() {},
        three() {},
        four() {},
        notFound() {}
      }
    });
  });

  afterEach(function() {
    router = null;
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(router).to.be.an('object');
    });
  });

  describe('routes', function() {
    it('should call routes', function() {
      const routes = {
        one: '/one',
        two: '/two/2',
        four: '/f',
        notFound: 'ljkflakjflkjsafe'
      };

      for (let route in routes) {
        sinon.spy(router.callbacks, route);
      }

      router.start();

      for (let route in routes) {
        router.go(routes[route]);

        expect(router.callbacks[route].called).to.be.true;
      }
    });
  });

  describe('fragments', function() {
    it('should generate fragment path', function() {
      const paths = {
        '/': '/',
        'path': '/path',
        '/path': '/path',
        '/path/path2': '/path/path2'
      };
      const rootPaths = {
        '/': '/root',
        'path': '/root/path',
        '/path': '/root/path',
        '/path/path2': '/root/path/path2'
      };
      const rootExtPaths = {
        '/': '/root.html',
        'path': '/root.html/path',
        '/path': '/root.html/path',
        '/path/path2': '/root.html/path/path2'
      };

      // test with / as root
      router.root = '/';

      for (let path in paths) {
        expect(router._createPath(path)).to.equal(paths[path]);
      }

      // test with a root
      router.root = '/root';

      for (let path in rootPaths) {
        expect(router._createPath(path)).to.equal(rootPaths[path]);
      }

      // test with a root.html
      router.root = '/root.html';

      for (let path in rootExtPaths) {
        expect(router._createPath(path)).to.equal(rootExtPaths[path]);
      }
    });
  });
});
