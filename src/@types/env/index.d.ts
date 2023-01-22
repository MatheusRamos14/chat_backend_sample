declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENVIRONMENT: string;
            SERVER_PORT: number;
            SOCKET_PORT: number;
            SECRET: string;
            DATABASE_URL: string;
        }
    }
}

export { }