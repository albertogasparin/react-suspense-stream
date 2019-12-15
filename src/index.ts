import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

const port = process.env.PORT || 3000;
// @ts-ignore
server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }
  console.log(`✅ Server started at http://127.0.0.1:${port}`);
});

// @ts-ignore
if (module.hot) {
  console.log('ℹ ｢HMR｣: Server-side HMR enabled');

  // @ts-ignore
  module.hot.accept('./server', () => {
    console.log('ℹ ｢HMR｣: Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
