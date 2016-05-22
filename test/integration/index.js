import Redis from 'ioredis';
import Promise from 'bluebird';
import { expect } from 'chai';
import { install as pdel } from 'redis-pdel';
import { install as hmsetex } from '../../lib';

describe('integration', () => {
  const keyPrefix = 'hmsetex:test:';
  const redis = new Redis({ keyPrefix });
  pdel(redis);
  hmsetex(redis);

  beforeEach(async () => {
    await redis.pdel('*');

    const res = await redis.hmsetex('testhash', 1, 'foo', 'bar', 'baz', 'baq');
    expect(res).to.equal('OK');
  });

  after(async () => {
    await redis.disconnect();
  });

  it('should not have expired yet', async () => {
    await Promise.delay(100);

    const res = await redis
      .multi()
      .hget('testhash', 'foo')
      .hget('testhash', 'baz')
      .pttl('testhash')
      .exec();

    expect(res[0][1]).to.equal('bar');
    expect(res[1][1]).to.equal('baq');
    expect(res[2][1]).to.be.lessThan(1000).and.greaterThan(500);
  });

  it('should have expired yet', async function() {
    this.slow(1100);

    await Promise.delay(1000);
    const res = await redis
      .multi()
      .hget('testhash', 'foo')
      .hget('testhash', 'baz')
      .pttl('testhash')
      .exec();

    expect(res[0][1]).to.equal(null);
    expect(res[1][1]).to.equal(null);
    expect(res[2][1]).to.be.lessThan(0);
  });
});
