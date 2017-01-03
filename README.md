# basics
ES6 Modules that do exactly what they need to and nothing more.

## Modules

### Router
Calls functions based on matched routes.

Example Usage:

```
import Router from './src/router';

const router = new Router({
  // optional: root for the uri
  root: '/things',

  // optional: setup function to be called on construction
  setup() {
    // do some work here
  },

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

// navigate to route and update url with pushState
router.go('/two');


// navigate to route and update url with replaceState
router.go('/two/2', true);

// navigate back in browser history
router.back();

```

### Ajax
Promised based XMLHttpRequests. Has methods for `GET`, `POST`, `PUT`, and `DELETE`. Sends and receives `application/json`.

Example Usage:

```
import Ajax from '../src/ajax';

ajax = new Ajax();

// make a get request
ajax.get('/resource')
    .then((results) => {
      // do some work with the results
    }, (error) => {
      console.log(error);
    });

// make a get request with data
ajax.get({
    url: '/songs',
    data: {
      query: 'Lateralus',
      offset: 0,
      limit: 5
    }
  })
    .then((results) => {
      // do some work with the results
    }, (error) => {
      console.log(error);
    });
    
// make a post request
ajax.post({
    url: '/create',
    data: {
      name: 'Maynard'
    }
  })
    .then((results) => {
      // do some work with the results
    }, (error) => {
      console.log(error);
    });
```
