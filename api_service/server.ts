import { config } from "./src/config/config";
import connectDB from "./src/config/db"
import { server } from "./src/app";
import { initializeSystem } from "./src/utils/init";
import { dbOpsWorker } from "./src/modules/dbOpsWorker/dbOps";

const startServer = async () => {

    await connectDB();
    await initializeSystem();
    await dbOpsWorker.run()

    server.listen(config.port, () => {
        console.log(`API Service listening on port ${config.port}`);
    })
}

startServer()
