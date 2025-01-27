
module.exports = {
  apps: [
    {
      name: "service1",
      script: "dist/index.js",
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
