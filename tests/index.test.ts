import * as Zaif from '../src/index'
import configure from '../src/lib/configure'
import connection from '../src/lib/connection'

test('spot-call', async () => {
  let res
  res = await Zaif.Spot.getCurrency()
  expect(res.name).toBe('btc')

  res = await Zaif.Spot.getCurrencyAll()
  expect(res).toBeInstanceOf(Array)

  res = await Zaif.Spot.getPair()
  expect(res.name).toBe('BTC/JPY')

  res = await Zaif.Spot.getPairAll()
  expect(res).toBeInstanceOf(Array)
})

test('called-limit-over', async () => {
  configure.setConfig({ callPerSeconds: 1 })
  jest.setTimeout(10000);

  for (let i = 0; i < 5; i++) {
    await Zaif.Spot.getCurrency()
  }
  expect(configure.callPerSeconds).toBe(1)
  expect(connection.calledLimitOver).toBeGreaterThanOrEqual(4)
})
