const assert = require('assert');
const supertest = require('supertest');

describe('test所有预期接口', () => {
  let app = require('../../src/app');

  before(async () => {
    await app.run();
    app.shttp = supertest(app);
  });
  after(() => {

  });
  it('get /test/string', async () => {
    const { text } = await app.shttp.get('/test/string');
    assert.strictEqual(text, 'Hello World');
  });
  it('get /test/json', async () => {
    const { body } = await app.shttp.get('/test/json');
    assert.deepStrictEqual(body, { key: 'value' });
  });
  it('get /test/image', async () => {
    const { FileBuffer } = app.stream;
    const buff = await FileBuffer(app.shttp.get('/test/image'));
    assert.strictEqual(buff.length, 821);
  });
  it('get /test/download', async () => {
    const { FileBuffer } = app.stream;
    let buff = await FileBuffer(app.shttp.get('/test/download'));
    assert.strictEqual(buff.length, 821);
  });
  it('post /test/upload', async () => {
    const { body: res } = await app.shttp.post('/test/upload').attach('test', './static/logo.jpg');
    assert.equal(typeof res.test == 'string', true);
  });
  it('get /test/req-paging', async () => {
    const { body } = await app.shttp.get('/test/req-paging');
    assert.deepStrictEqual(body, { limit: 20, offset: 0, page: 1, where: {} });
  });
  it('get /test/res-paginator', async () => {
    const { body } = await app.shttp.get('/test/res-paginator');
    assert.deepStrictEqual(body, { rdata: [], state: 'success', message: '', ecode: 0 });
  });
  it('get /test/res-success', async () => {
    const { body } = await app.shttp.get('/test/res-success');
    assert.deepStrictEqual(body, { state: 'success', ecode: 0, message: '' });
  });
  it('get /test/res-fail', async () => {
    const { body } = await app.shttp.get('/test/res-fail');
    assert.deepStrictEqual(body, { state: 'fail', ecode: -1, message: '' });
  });
  it('get /test/res-error', async () => {
    const { body } = await app.shttp.get('/test/res-error');
    assert.equal(body.state, 'fail');
    assert.equal(body.ecode, '101030');
  });
  it('get /test/put', async () => {
    const { body } = await app.shttp.put('/test/put').send({ key: 'value' });
    assert.deepStrictEqual(body, { key: 'value' });
  });
  it('get /test/get', async () => {
    const { body } = await app.shttp.get('/test/get?key=value');
    assert.deepStrictEqual(body, { key: 'value' });
  });
  it('get /test/ip-info', async () => {
    const { body } = await app.shttp.get('/test/ip-info');
    assert.strictEqual(body['x-forwarded-for'], '');
    assert.strictEqual(body['ip'], '::ffff:127.0.0.1');
    assert.strictEqual(body['ips'], '[]');
    assert.strictEqual(body['remoteAddress'], '::ffff:127.0.0.1');
  });
  it('get /test/excel', async () => {
    const { body: pages } = await app.shttp.get('/test/excel');
    assert.deepStrictEqual(pages, [
      { name: 'test1', data: [{ c1: 123, c2: 'abc' }, { c1: 456, c2: 'edf' }] }
    ]);
  });
  it('post /test/excel', async () => {
    const { text } = await app.shttp.post('/test/excel').send([{ name: 'test', header: ['c1', 'c2'], data: [{ c1: 123, c2: 'abc' }, { c1: 456, c2: 'edf' }] }]);
    assert(typeof text === 'string');
  });
  it('post /test/base64-encode', async () => {
    const { text } = await app.shttp.post('/test/base64-encode').send({ string: 'test' });
    // test => dGVzdA==
    assert.strictEqual(text, 'dGVzdA==');
  });
  it('post /test/base64-decode', async () => {
    const { text } = await app.shttp.post('/test/base64-decode').send({ string: 'dGVzdA==' });
    // dGVzdA== => test
    assert.strictEqual(text, 'test');
  });
});