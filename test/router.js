describe('Router', function() {
  let router;

  beforeEach(function() {
    class TestRouter extends Router {
      home() {}
      one() {}
      two() {}
      three() {}
      four() {}
      notFound() {}
    }

    router = new TestRouter({
      root: '/mocha',
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
    it('should route to home', function() {
      sinon.spy(router.callbacks, 'home');

      router.start();

      expect(router.callbacks.home.calledOnce).to.be.true;
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
    });
  });
});
