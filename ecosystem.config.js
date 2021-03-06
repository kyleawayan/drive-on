module.exports = {
  apps: [
    {
      name: "drive-on",
      script: "npm",
      args: "run start 3000",
    },
  ],

  deploy: {
    production: {
      user: "bitnami",
      host: "driveon",
      ref: "origin/main",
      repo: "https://github.com/kyleawayan/drive-on",
      path: "/home/bitnami/driveon",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
