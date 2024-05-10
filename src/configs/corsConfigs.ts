import cors from 'cors';



export const corsConfigs = {
    origin: process.env.CORS_ORIGIN || '*',
    optionsSuccessStatus: 200
}
