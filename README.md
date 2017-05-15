# redis-hmsetex

[![Greenkeeper badge](https://badges.greenkeeper.io/perrin4869/redis-hmsetex.svg)](https://greenkeeper.io/)

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> hmsetex lua command for redis clients

## hmsetex redis command

Sets the value of a hash key and updates the expire date at the same time.

```
HMSETEX key 1 firstname walter lastname white
```

In the example above, key `key` expires in 1 second.

## Install

```
$ npm install --save redis-hmsetex
```

## Usage

The easiest usecase is to use with [https://github.com/luin/ioredis](ioredis) as follows:

```js
const Redis = require('ioredis');
const redis = new Redis();
require('redis-hmsetex').install(redis);
```

Additionally, the necessary information is exported:

```js
const Redis = require('ioredis');
const { name, lua, numberOfKeys } = require('hmsetex');
const redis = new Redis();
redis.defineCommand(name, { lua, numberOfKeys });
```

Then, just run like any other command:

```js
redis.hmsetex('some_key', 1, 'firstname', 'walter', 'lastname', 'white');
setTimeout(() => redis.hgetall('somekey'), 1100); // At this point, null is returned
```

## Tests

There are unit tests and integration tests. Needs Node 6+ to run. The integration tests require redis to be installed.

```bash
npm test:unit
npm test:integration
npm test # run both tests
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/redis-hmsetex/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/redis-hmsetex

[npm-badge]: https://img.shields.io/npm/v/redis-hmsetex.svg?style=flat-square
[npm]: https://www.npmjs.org/package/redis-hmsetex

[dependency-status-badge]: https://david-dm.org/perrin4869/redis-hmsetex.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/redis-hmsetex

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/redis-hmsetex/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/redis-hmsetex#info=devDependencies
