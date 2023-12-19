export type ServerToClientEvents = {
    chatSync: (message: object) => void;
    chatEdited: (messageEditer: {
        id: string;
        editContent: string;
        editMention: string[];
    }) => void;
    chatDelete: (messageID: string) => void;
    chatGet: (message: object[]) => void;
    userNotify: (channelID: string) => void;
    modNotify: (groupID: string, channelID: string) => void;
    adminNotify: (groupID: string, channelID: string) => void;
    userTyping: (channelID: string, userID: string) => void;
    serverError: (error: {error: string}) => void;
};

export type ClientToServerEvents = {
    chatNew: (channelID: string, content: string) => void;
    chatNewImg: (channelID: string, type: string, attachment: Uint8Array[]) => void;
    chatEdit: (channelID: string, messageID: string, content: string) => void;
    chatTyping: (channelID: string) => void;
    joinChannel: (groupID: string, channelID: string) => void;
    getMessage: (messageIds: string []) => void;
    modAction: (groupID: string, channelID: string, messageID: string) => void;
    adminAction: (groupID: string, channelID: string, messageID: string) => void;
    userTyping: (channelID: string, userID: string) => void;
};

export type InterServerEvents = {
    ping: () => void;
};
  
export type SocketData = {
    
};