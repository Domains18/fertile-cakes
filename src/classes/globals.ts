import dotenv from 'dotenv';

dotenv.config();

//types & interfaces


interface GlobalVariables {
    port: number;
    jwtSecret: string;
    jwtExpiration: number;
    databaseUrl: string;
    corsOrigin: string;
}


class requireEnvironmentVariables {
    private globals: GlobalVariables;

    constructor() {
        this.globals = {
            port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
            jwtSecret: process.env.JWT_SECRET,
            jwtExpiration: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : 3600,
            databaseUrl: process.env.DATABASE_URL,
            corsOrigin: process.env.CORS_ORIGIN || '*'
        };

        this.checkEnvironmentVariables();
    }
    private checkEnvironmentVariables() {
        for (const [key, value] of Object.entries(this.globals)) {
            if (!value) {
                throw new Error(`Environment variable ${key} is missing`);
            }
        }
    }

    public getGlobals() {
        return this.globals;
    }

    public getPort() {
        return this.globals.port;
    }
    public getJwtSecret() {
        return this.globals.jwtSecret;
    }
    public getJwtExpiration() {
        return this.globals.jwtExpiration;
    }
    public getDatabaseUrl() {
        return this.globals.databaseUrl;
    }
    public getCorsOrigin() {
        return this.globals.corsOrigin;
    }
}


export default new requireEnvironmentVariables();