import { PubSub } from "@google-cloud/pubsub";

const pubSubClient = new PubSub();

const publishMessage = async (payload) => {
  const dataBuffer = Buffer.from(JSON.stringify(payload));
  try {
    const messageId = await pubSubClient
      .topic("test-topic")
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
  }
};

export default publishMessage;
