import { expect } from 'chai';
import config from '../../src/common/config';
import * as logger from '../lib/logger'

const LOGENTRY = logger.create(`CONFIG`);
const log = (msg: string | object) => logger.log(LOGENTRY, msg);
const debug = (msg: object) => logger.debug(LOGENTRY, msg);
const error = (msg: string | object) => logger.error(LOGENTRY, msg);
const warn = (msg: string | object) => logger.warn(LOGENTRY, msg);

describe(`Tests the project setup. You can delete this after project initialization, or add "skip" to test.`, function() {

    afterEach(() => {
        // Flush logging buffer after every test!
        logger.flush(LOGENTRY);
    });

    it(`Tests the config module.`, (done) => {
        const expected = {
            SAMPLE_KEY_1: "First ENV Variable",
            SAMPLE_KEY_2: "Second ENV Variable"
        }

        log(`Testing ${expected}`);
        debug(expected);
        warn(`Testing ${expected}`);
        error(`Testing ${expected}`);

        expect(config, "Expected configuration did not equal actual configuration.").to.have.deep.equals(expected);

        done();
    });
});