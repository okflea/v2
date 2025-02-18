// src/types/dbOps.ts (simplified)
export type DBOperations = 'GET' | 'CREATE' | 'UPDATE' | 'DELETE';

export interface DBBaseMessage {
  operation: DBOperations;
  collection: string;
  requestId?: string;
  timestamp?: number;
}

export interface DBGetMessage extends DBBaseMessage {
  operation: 'GET';
  data: Record<string, any>;  // your filter
  options?: {
    fields?: string[];
  };
}

export interface DBCreateMessage extends DBBaseMessage {
  operation: 'CREATE';
  data: Record<string, any>;
}

export interface DBUpdateMessage extends DBBaseMessage {
  operation: 'UPDATE';
  data: {
    filter: Record<string, any>;
    update: Record<string, any>;
  };
  options?: {
    multi?: boolean;
  };
}

export interface DBDeleteMessage extends DBBaseMessage {
  operation: 'DELETE';
  data: Record<string, any>; 
}

export type DBMessage =
  | DBGetMessage
  | DBCreateMessage
  | DBUpdateMessage
  | DBDeleteMessage;
