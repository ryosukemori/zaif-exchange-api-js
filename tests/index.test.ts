import { hello } from '../src/index';

test('plus', () => {
  expect(hello()).toBe(2);
});
