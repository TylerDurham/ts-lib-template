import { bgBlueBright, blueBright, magentaBright } from 'ansi-colors';
import { expect } from 'chai';
import { sayHello } from '../src/index';
import * as logger from './lib/logger';

const LOGENTRY = logger.create(`START`);
const log = (msg: string | object) => logger.log(LOGENTRY, msg);
const debug = (msg: object) => logger.debug(LOGENTRY, msg);
const error = (msg: string | object) => logger.error(LOGENTRY, msg);
const warn = (msg: string | object) => logger.warn(LOGENTRY, msg);


describe(`Tests the project setup. You can delete this after project initialization, or add "skip" to test.`, function () {
    afterEach(() => {
        // Flush logging buffer after every test!
        logger.flush(LOGENTRY);
    });

    it(`Tests the index module.`, function (done) {
        const expected = `${magentaBright.bold('Hello')}, ${bgBlueBright.bold('World')}!`

        log(`Testing ${expected}`);
        warn(`Testing ${expected}`);
        error(`Testing ${expected}`);

        expect(sayHello('World'), "Expected return value from sayHello() did not equal actual return value.").to.have.deep.equals(expected);

        done();
    });
});