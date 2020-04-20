import * as Zaif from '../src/index'

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
