const del = require('del');
// Makes spawning easier across platforms
const spawn = require("cross-spawn").sync;      
const { series, src, dest } = require('gulp');
const rename = require('gulp-rename');
// Lot of info we can re-use from tsconfig.json
const tscConfig = require('./tsconfig.json');  
// My favorite console colors 
const { magentaBright, blueBright, greenBright, yellowBright } = require('ansi-colors');
const path = require('path');

/**
 * Formats an array args for console output.
 * @param {*} args The array of args to format.
 * @returns The formatted array of args.
 */
const f_args = (args) => (args.join) ? magentaBright(`[${args.join("] [")}]`) : magentaBright(args);   // format command args in console.

/**
 * Formats a command for console output.
 * @param {*} cmd The command to format.
 * @returns The formatted command.
 */
const f_cmd = (cmd) => greenBright(path.basename(cmd));

/**
 * Configuration for each Gulp task.
 */
const TASK_CONFIG = {
    CLEAN: {
        paths: [
            tscConfig.compilerOptions.outDir,
            ".nyc_output",
            "coverage",
            "lib"
        ]
    },
    TEST: {
        command: './node_modules/.bin/mocha',
        args: ['--config', './tests/.mocharc.json']
    },
    BUNDLE: {
        command: './node_modules/.bin/webpack-cli'
    },
    COVERAGE: {
        command: './node_modules/.bin/nyc',
        args: ['gulp', 'test']
    },
    COMPILE: {
        command: './node_modules/.bin/tsc',
        paths: tscConfig.include
    },
    SPAWN: {
        stdio: 'inherit'
    }
}

/**
 * TASK BUNDLE
 * Bundles the project output.
 * @param {*} done A callback that let's Gulp know we are finished.
 */
const bundleTask = (done) => {
    const { SPAWN: OPTIONS, BUNDLE: { command } } = TASK_CONFIG
    const result = spawn(command, OPTIONS);
    done();
}

bundleTask.description = `Bundles (using ${f_cmd(TASK_CONFIG.BUNDLE.command)}) the build output at ${f_args(TASK_CONFIG.COMPILE.paths)} and drops the bundle at ${f_args("./lib")}.`
exports.bundle = bundleTask;

/**
 * TASK CLEAN
 * Cleans project aftifacts that will not be pushed to Git.
 * @returns A Promise.
 */
const cleanTask = () => {
    const { paths } = TASK_CONFIG.CLEAN;
    return del(paths);
}

cleanTask.description = `Cleans the project output directories at ${f_args(TASK_CONFIG.CLEAN.paths)}.`
exports.clean = cleanTask;

/**
 * TASK COVERAGE
 * Runs code coverage on the project.
 * @param {*} done A callback that let's Gulp know we are finished.
 */
const coverageTask = (done) => {
    const { SPAWN: OPTIONS, COVERAGE: { command, args } } = TASK_CONFIG;
    const result = spawn(command, args, OPTIONS);
    done();
}

coverageTask.description = `Runs code coverage (${f_cmd(TASK_CONFIG.COVERAGE.command)}) over the (${f_cmd(TASK_CONFIG.TEST.command)}) test outputs.`
exports.coverage = coverageTask;

/**
 * TASK COMPILE
 * Compiles the project
 * @param {*} done A callback that let's Gulp know we are finished.
 */
const compileTask = (done) => {
    const { SPAWN: OPTIONS, COMPILE: { command } } = TASK_CONFIG;
    const result = spawn(command, OPTIONS);
    done();
}

compileTask.description = `Compiles the project source files at ${f_args(TASK_CONFIG.COMPILE.paths)}.`;
exports.compile = compileTask;

/**
 * TASK TEST
 * Tests the project.
 * @param {*} done A callback that let's Gulp know we are finished.
 */
const testTask = (done) => {
    const { SPAWN: OPTIONS, TEST: { command, args } } = TASK_CONFIG;
    const result = spawn(command, args, OPTIONS);
    done();
}

testTask.description = `Runs test program ${f_cmd(TASK_CONFIG.TEST.command)} ${f_args(TASK_CONFIG.TEST.args)}.`
exports.test = testTask;

/**
 * TASK BUILD
 * Builds the project.
 */
const buildTask = series([cleanTask, compileTask, bundleTask]);

buildTask.description = `Cleans and compiles the project.`
exports.build = buildTask;

/**
 * TASK POSTINSTALL
 * Fires after the project is first installed (npm install).
 * @param {*} done A callback that let's Gulp know we are finished.
 */
const postInstallTask = (done) => {
    src(`sample.env`)
        .pipe(rename('.env'))
        .pipe(dest('.'));

        done();
}

postInstallTask.description = "Fires after the project is installed (npm install)."
exports.postInstall = postInstallTask;