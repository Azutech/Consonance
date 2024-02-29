import http from 'http';
import { config } from 'dotenv';
import { logger } from './middlewares/logger';

import database from './connections/database';
import { server } from './server';

config();

import { PORT } from './utils/config';

const httpServer = http.createServer(server);

const app = async () => {
	try {
		database().catch((err) => console.error(err));
		httpServer.listen(PORT, () => {
			logger.info(
				`Consonance is listening at http://localhost:${PORT} 🚀🚀`,
			);
		});
	} catch (err) {
		console.error(err);
	}
};

app();

export default httpServer;
