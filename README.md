# basics
ES6 Modules that do exactly what they need to and nothing more.

## Modules

### Router
Calls functions based on matched routes.

Example Usage:

```
import Router from './src/router';

const router = new Router({
  // optional root for the uri
  root: '/things',
  // example available routes
  routes: {
    '/': 'home',
    '/one': 'one',
    '/two(/:id)': 'two',
    '/three': 'three',
    '/^\/f/': 'four',
    '*': 'notFound'
  },
  // functions called on matched routes
  callbacks: {
    home() {},
    one() {},
    two(id) {},
    three() {},
    four() {},
    notFound() {}
  }
});

// load first route based on url
router.start();  

// navigate to route and update uri with pushState
router.go('/two');


// navigate to route and update uri with replaceState
router.go('/two/2', true);

// navigate back in browser history
router.back();

```
