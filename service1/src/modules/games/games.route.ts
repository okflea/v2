import express from 'express';
import { GameController } from './games.controller';
import { GameService } from './games.service';
import multer from 'multer';
import { authHandler, checkPermission } from '../../middlewares';
import { Resource } from '../../utils';

const gamesRoutes = express.Router();
const gamesController = new GameController(new GameService());
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });
const resource = Resource.GAMES;


gamesRoutes.post('/', authHandler, checkPermission(resource, 'w'), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'payout', maxCount: 1 }]), gamesController.createGame);
gamesRoutes.get('/', authHandler, checkPermission(resource, 'r'), gamesController.getGames);

gamesRoutes.get('/:id', authHandler, checkPermission(resource, 'r'), gamesController.getGame);
gamesRoutes.get('/:id/payouts', authHandler, checkPermission(resource, 'r'), gamesController.getGamePayouts);
gamesRoutes.patch('/:id/payouts/:payoutId', authHandler, checkPermission(resource, 'w'), gamesController.activateGamePayout);
gamesRoutes.delete('/:id/payouts/:payoutId', authHandler, checkPermission(resource, 'x'), gamesController.deleteGamePayout);
gamesRoutes.put('/:id', authHandler, checkPermission(resource, 'w'), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'payout', maxCount: 1 }]), gamesController.updateGame);
gamesRoutes.delete('/:id', authHandler, checkPermission(resource, 'x'), gamesController.deleteGame);

gamesRoutes.get('/tag/:tag', authHandler, checkPermission(resource, 'r'), gamesController.getGame);
gamesRoutes.get('/slug/:slug', authHandler, checkPermission(resource, 'r'), gamesController.getGame);
gamesRoutes.get('/name/:name', authHandler, checkPermission(resource, 'r'), gamesController.getGame);


export default gamesRoutes;
