import config from './common/config';
import * as colors from 'ansi-colors';

const sayHello = (name: string) => {
    return `${colors.magentaBright.bold('Hello')}, ${colors.bgBlueBright.bold(name)}!`
}

export { sayHello }