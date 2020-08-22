const workboxBuild = require('workbox-build');

const buildSW = () => {
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw-template.js', // this is your sw template file
      swDest: 'build/service-worker.js', // this will be created in the build step
      globDirectory: 'build',
      // globPatterns: ['**/*.{jpg}'], // precaching jpg files
      globPatterns: [
        '**/!(service-worker|precache-manifest.*).{js,css,html,jpg}',
      ],
    })
    .then(({count, size, warnings}) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(console.error);
};

buildSW();
