module.exports = {
  apps: [
    {
      name: "notrebeauvoyage",
      script: "node",
      args: ".next/standalone/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
