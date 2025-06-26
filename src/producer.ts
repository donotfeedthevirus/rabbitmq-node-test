
import amqp from "amqplib";
import { RABBIT_URL, QUEUE_NAME } from "./config";

async function runProducer() {
  const connection = await amqp.connect(RABBIT_URL);
  const channel = await connection.createChannel();
  
  await channel.assertQueue(QUEUE_NAME);
  
  const hardcodedId = '1c2c3';

  for (let i = 0; i < 10000; i++) {
    const payload = JSON.stringify({ id: hardcodedId });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(payload));
  }

  console.log("Producer sent 10,000 messages.");
  await channel.close();
  await connection.close();
}

runProducer().catch(console.error);
