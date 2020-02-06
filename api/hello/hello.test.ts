import { hello } from './handler';

// beforeAll(async () => {
//   await connect({});
// });

describe('Hello', () => {
  test('Check hello', async () => {
    const res = await hello({});
    expect(res).toBe('Hello Node.js');
  });
});
