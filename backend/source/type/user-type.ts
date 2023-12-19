export type Friends = Record<string, {
    lastVisit: Date;
    channel: string;
}>;

export type UserSettings = {
    darkMode: boolean;
};
