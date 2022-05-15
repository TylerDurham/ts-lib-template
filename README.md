# ts-lib-template

My preferred TypeScript Library project scaffolding.

## Things 'n Stuff

* [Cross-Spawn], because I run ```exec``` for many of my [Gulp] tasks and I switch between Linux, Mac, and Windows - a lot.
* [Dotenv] for configuration.
    * Includes sample ```.env``` file that can safely be checked into Git.
* [Gulp] for build automation.
* [Mocha] and [Chai] for testing.
    * Includes sample test rigs, including my logging approach ([Mocha] totally hijacks the ```this``` keyword).
* [TypeScript], just 'cause.
* [Webpack], if I need it.

## Getting Started

``` bash
# Install dependencies. Gulp POSTINSTALL task will finish setup.
npm install --silent 
```
### Gulp Tasks

```
gulp --tasks
```
### .ENV Files

I always keep my ```.env``` out of git, but I always forget what I need to put in my ```.env``` when I first load the project from Git. My solution is to check in a ```sample.env``` with real keys but safe psuedo-values. 

During the ```postInstall``` [Gulp] task, I copy the ```sample.env``` to ```.env```. This gives me a starting point that I can use to toggle my memory on what keys/values are needed for my app to run.

[Chai]: https://www.chaijs.com/
[Dotenv]: https://www.npmjs.com/package/dotenv
[Gulp]: https://gulpjs.com/
[Mocha]: https://mochajs.org/
[TypeScript]: https://www.typescriptlang.org/
[Webpack]: https://webpack.js.org/
[Cross-Spawn]: https://www.npmjs.com/package/cross-spawn
