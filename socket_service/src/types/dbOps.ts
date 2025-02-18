
/**
 * The set of valid operations
 */
export type DBOperations = 'GET' | 'CREATE' | 'UPDATE' | 'DELETE';

/**
 * Base interface for a DB operation message
 */
export interface DBBaseMessage {
  /**
   * The type of operation to perform
   */
  operation: DBOperations;

  /**
   * Which MongoDB collection to target
   */
  collection: string;

  /**
   * (Optional) For logging/tracking correlation
   */
  requestId?: string;

  /**
   * (Optional) For debugging or analytics
   */
  timestamp?: number;
}

/**
 * Specific message when the operation is `GET`
 */
export interface DBGetMessage extends DBBaseMessage {
  operation: 'GET';
  /**
   * A filter to match the documents to retrieve.
   * Example: { _id: "abc123" }
   */
  data: Record<string, any>;

  /**
   * (Optional) Additional options for GET
   */
  options?: {
    /**
     * Fields to project (include). Example: ['name', 'email']
     */
    fields?: string[];
    // You can add other relevant GET options here
  };
}

/**
 * Specific message when the operation is `CREATE`
 */
export interface DBCreateMessage extends DBBaseMessage {
  operation: 'CREATE';
  /**
   * The document to insert.
   * Example: { name: "Alice", email: "alice@example.com" }
   */
  data: Record<string, any>;

  /**
   * (Optional) Additional options for CREATE
   */
  options?: Record<string, any>;
}

/**
 * Specific message when the operation is `UPDATE`
 */
export interface DBUpdateMessage extends DBBaseMessage {
  operation: 'UPDATE';
  /**
   * `data.filter` is the MongoDB filter,
   * `data.update` is the object containing update fields.
   */
  data: {
    filter: Record<string, any>;
    update: Record<string, any>;
  };
  /**
   * (Optional) Additional options for UPDATE
   */
  options?: {
    /**
     * If true, update multiple documents. Defaults to false.
     */
    multi?: boolean;
    // Add other relevant update options here
  };
}

/**
 * Specific message when the operation is `DELETE`
 */
export interface DBDeleteMessage extends DBBaseMessage {
  operation: 'DELETE';
  /**
   * Filter to match documents that should be deleted.
   * Example: { _id: "abc123" }
   */
  data: Record<string, any>;

  /**
   * (Optional) Additional options for DELETE
   */
  options?: Record<string, any>;
}

/**
 * Union type of all possible DB operation messages.
 * TypeScript can discriminate which interface to use
 * based on the `operation` field.
 */
export type DBMessage =
  | DBGetMessage
  | DBCreateMessage
  | DBUpdateMessage
  | DBDeleteMessage;
