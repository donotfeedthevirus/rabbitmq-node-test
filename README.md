# rabbitmq-node-test
A sandbox project coupling small TypeScript producer/consumer scripts with Dockerized RabbitMQ and MongoDB, designed to explore messaging patterns without provisioning infrastructure manually.  

## Overview
The current producer floods a queue with 10,000 identical messages, giving an easy way to observe throughput, back-pressure, and acknowledgements in RabbitMQ’s management UI.

## Prerequisites
- **Node.js** & **npm** — for running TypeScript scripts with `ts-node-dev` and installing dependencies  
- **Docker & Docker Compose** — to spin up RabbitMQ (with the management plugin) and MongoDB locally  

## Setup

1. Install dependencies
```bash
npm install
```

2. Create a `.env` file** at the project root with at least:
```env
RABBIT_URL=amqp://guest:guest@localhost:5672
QUEUE_NAME=demo.queue

# Optional, for Prisma + MongoDB experiments:
DATABASE_URL="mongodb://localhost:27017/demo"
```

3. Launch the infrastructure
```bash
docker compose up -d
```

This starts:
- MongoDB on `localhost:27017`
- RabbitMQ on `localhost:5672`
- RabbitMQ Management UI at [http://localhost:15672](http://localhost:15672) (`guest` / `guest`)

## Running the sandbox

### Publish messages with the producer
```bash
npm run dev:producer
```

- Hot-reloads `src/producer.ts`
- Connects to the configured queue
- Pushes **10,000 messages**
- Lets you inspect queue depth, rate, and acknowledgements in the RabbitMQ dashboard

### Build and test consumers
```bash
npm run dev:consumer
```

- Executes `src/consumer.ts` in watch mode
- Use it to experiment with:
  - Different consumption patterns
  - Manual acknowledgements
  - Persistence strategies

## Inspect the system

* **RabbitMQ UI** → [http://localhost:15672](http://localhost:15672) (default `guest` / `guest`)
* **MongoDB (optional)** → `mongodb://localhost:27017` if persisting consumed messages

## Prisma & MongoDB (optional)
If you want to persist messages, a **Prisma schema** for a simple `Record` collection is already included.

Generate the client and push the schema:
```bash
npm run prisma:gen
npm run prisma:push
```

* The model stores: `name`, `integer value`, and `timestamp`
* Extend it as needed to capture message payloads

## Quitting
When finished experimenting:
```bash
docker compose down
```

This removes the RabbitMQ and MongoDB containers but **keeps the named volume** so your MongoDB data persists between runs.

