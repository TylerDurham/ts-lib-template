import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    SAMPLE_KEY_1: process.env.SAMPLE_KEY_1,
    SAMPLE_KEY_2: process.env.SAMPLE_KEY_2
}

export default config;