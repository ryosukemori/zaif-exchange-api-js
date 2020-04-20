import * as Zaif from '../src/index'
import configure from '../src/lib/configure'
import connection from '../src/lib/connection'

test('spot-call', async () => {
  jest.setTimeout(30000);
  let res
  res = await Zaif.Spot.getCurrency()
  expect(res.name).toBe('btc')

  res = await Zaif.Spot.getCurrencyAll()
  expect(res).toBeInstanceOf(Array)

  res = await Zaif.Spot.getPair()
  expect(res.name).toBe('BTC/JPY')

  res = await Zaif.Spot.getPairAll()
  expect(res).toBeInstanceOf(Array)

  res = await Zaif.Spot.getLastPrice()
  expect(typeof res).toBe('number')

  res = await Zaif.Spot.getTicker()
  expect(typeof res.volume).toBe('number')

  res = await Zaif.Spot.getTradeHistories()
  expect(res).toBeInstanceOf(Array)
  expect(typeof res[0].price).toBe('number')

  res = await Zaif.Spot.getBoard()
  expect(res).toBeInstanceOf(Object)
  expect(res.asks).toBeInstanceOf(Array)
  expect(typeof res.asks[0].price).toBe('number')
  expect(typeof res.asks[0].amount).toBe('number')
  expect(res.bids).toBeInstanceOf(Array)
  expect(typeof res.bids[0].price).toBe('number')
  expect(typeof res.bids[0].amount).toBe('number')

  res = await Zaif.Spot.getBoardAsks()
  expect(typeof res[0].price).toBe('number')
  expect(typeof res[0].amount).toBe('number')

  res = await Zaif.Spot.getBoardBids()
  expect(typeof res[0].price).toBe('number')
  expect(typeof res[0].amount).toBe('number')

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
