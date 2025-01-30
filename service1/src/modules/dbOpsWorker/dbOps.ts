import { Worker, WorkerOptions, Job } from 'bullmq';
import { DBCreateMessage, DBDeleteMessage, DBGetMessage, DBMessage, DBUpdateMessage } from '../../types/dbOps';
import { modelMap } from '../modelMap';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const workerOptions: WorkerOptions = {
  connection: {
    port: 6379,
    host: 'redis'
  },
  autorun: false
};

/**
 * dbOpsWorker processes DBMessage jobs using Mongoose.
 */
export const dbOpsWorker = new Worker<DBMessage>(
  'dbOps',
  async (job: Job<DBMessage>) => {
    console.log(`[Worker] Received job => ${job.id}`);

    const {
      operation,
      collection,
      requestId
    } = job.data;

    console.log('[Worker] Received job =>', { operation, collection, requestId });

    // Retrieve the correct Mongoose model
    const Model = modelMap[collection];
    if (!Model) {
      throw new Error(`No Mongoose model found for collection "${collection}"`);
    }

    switch (operation) {
      case 'GET': {
        const { data, options } = job.data as DBGetMessage;
        // e.g. data = { _id: 'abc123' }
        // Build a projection object if fields are provided
        let projection: any = {};
        if (options?.fields && Array.isArray(options.fields)) {
          // convert ['name', 'email'] to { name: 1, email: 1 }
          projection = options.fields.reduce((acc: any, field: string) => {
            acc[field] = 1;
            return acc;
          }, {});
        }

        // Use Mongoose's findOne if you expect a single doc, or find() for multiple
        const doc = await Model.findOne(data, projection).exec();
        return doc;
      }

      case 'CREATE': {
        const { data } = job.data as DBCreateMessage;
        // data = { name: "Alice", email: "alice@example.com" }
        const doc = await Model.create(data);
        return doc;
      }

      case 'UPDATE': {
        const { data, options } = job.data as DBUpdateMessage;
        // data = { filter: { _id: 'abc123' }, update: { email: '...' } }
        const multi = options?.multi || false;

        if (multi) {
          const res = await Model.updateMany(data.filter, { $set: data.update });
          return res;
        } else {
          const res = await Model.updateOne(data.filter, { $set: data.update });
          return res;
        }
      }

      case 'DELETE': {
        const { data } = job.data as DBDeleteMessage;
        // data = { _id: 'abc123' } to match a single doc
        // For multiple docs, consider .deleteMany
        const res = await Model.deleteOne(data);
        return res;
      }

      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  },
  workerOptions,

);

// Optional: Listen for job completion/failure events
dbOpsWorker.on('completed', (job, result) => {
  console.log(`[Worker] Job completed: ${job.id}, result:`, result);
});

dbOpsWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job failed: ${job?.id}, error:`, err);
});


