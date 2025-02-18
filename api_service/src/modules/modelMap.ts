
import { Model } from 'mongoose';
import { UserModel } from './users';
import TransactionModel from './transactions/transactions.model';
import { GameSessionModel, PlatformSessionModel, SpinModel } from './sessions/sessions.model';
import RoleModel from './roles/roles.model';
import PayoutModel from './payouts/payouts.model';
import GameModel from './games/games.model';

export const modelMap: Record<string, Model<any>> = {
  User: UserModel,
  Transaction: TransactionModel,
  PlatformSession: PlatformSessionModel,
  GameSession: GameSessionModel,
  Spin: SpinModel,
  Role: RoleModel,
  Payout: PayoutModel,
  Game: GameModel
};
