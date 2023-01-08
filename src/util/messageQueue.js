const amqplib = require("amqplib");
const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    /**
     * assertExchange is a method in the amqplib library that allows you to create a new exchange on the message broker, or to check if an exchange with the same name and type already exists. If the exchange already exists, assertExchange will return information about the existing exchange. If the exchange does not exist, assertExchange will create a new exchange with the specified name and type
     */
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
  // assertQueue:- to make sure whatever queue we are connecting that queue exists or it'll create that queue

  try {
    const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("received data");
      const payload = JSON.parse(msg.content.toString());
      service(payload);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_QUEUE");
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  subscribeMessage,
  createChannel,
  publishMessage,
};
