const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

// const { sendBasicEmail } = require("./services/email-service");

const jobs = require("./util/job");
const TicketController = require("./controllers/ticket-controller");
const { createChannel } = require("./util/messageQueue");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const channel = await createChannel();

  app.post("/api/v1/tickets", TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
    jobs();
    // sendBasicEmail(
    //   "Support from support@admin.com",
    //   "deeprajm35@gmail.com",
    //   "Booking confirmed",
    //   "Hey Your flight journey has been confirmed"
    // );
  });
};

setupAndStartServer();
