const detectModule = require('detect-port');
const detect = detectModule.default;
const { exec } = require('child_process');

(async () => {
  const defaultPort = 3000;
  const port = await detect(defaultPort);

  if (port === defaultPort) {
    console.log(`Starting dev server on port ${port}`);
  } else {
    console.log(`Port ${defaultPort} is in use, switching to ${port}`);
  }

  exec(`PORT=${port} next dev`, { stdio: 'inherit' });
})();
