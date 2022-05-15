import config from './common/config';
import * as colors from 'ansi-colors';
import * as pkg from '../package.json';

const sayHello = (name: string) => {
    return `${colors.magentaBright.bold('Hello')}, ${colors.bgBlueBright.bold(name)}!`
}

console.log("\n" + sayHello(pkg.name) + "\n");

export { sayHello }