import { config } from "./src/config/config";
import connectDB from "./src/config/db"
import { dbOpsWorker } from "./src/modules/dbOpsWorker/dbOps";
import { server } from "./src/server";
import { initializeSystem } from "./src/utils/init";

const startServer = async () => {

  await connectDB();
  await initializeSystem();
  await dbOpsWorker.run()

  server.listen(config.port, () => {
    console.log(`API Service listening on port ${config.port}`);
  })
}

startServer()
