export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  USER: {
    ONLINE: "user:online",
  },
  USERS: {
    ONLINE: "users:online",
  },
  CONVERSATION: {
    CREATE: "conversation:create",
    CREATED: "conversation:created",
    DELETE: "conversation:delete",
    DELETED: "conversation:deleted",
  },
  MESSAGE: {
    SEND: "message:send",
    RECEIVE: "message:receive",
    UPDATE: "message:update",
    UPDATED: "message:updated",
    DELETE: "message:delete",
    DELETED: "message:deleted",
  },
  PROFILE: {
    UPDATE: "profile:update",
    UPDATED: "profile:updated",
  },
};
