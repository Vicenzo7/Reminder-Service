const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json);
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);

    sendBasicEmail(
      "Support from support@admin.com",
      "deeprajm35@gmail.com",
      "Booking confirmed",
      "Hey Your flight journey has been confirmed"
    );
  });
};

setupAndStartServer();
