import * as Zaif from '../src/index'
test('spot-getCurrency', async () => {
  let res = await Zaif.Spot.getCurrency()
  expect(res.name).toBe('btc')

  res = await Zaif.Spot.getCurrency('xem')
  expect(res.name).toBe('xem')
})

test('spot-err-getCurrency', async () => {
  const res = await Zaif.Spot.getCurrency('aaa')
  expect(res).toBeNull()
  // await expect(Zaif.Spot.getCurrency('aaa')).rejects.toThrow(Error)
})

test('spot-getCurrencyAll', async () => {
  const res = await Zaif.Spot.getCurrencyAll()

  expect(res.length).toBeGreaterThanOrEqual(2)

  expect(res.find(v => v.name === 'btc')).not.toBeUndefined()
})

test('spot-getPair', async () => {
  let res = await Zaif.Spot.getPair()
  expect(res.currency_pair).toBe('btc_jpy')

  res = await Zaif.Spot.getPair('xem', 'jpy')
  expect(res.currency_pair).toBe('xem_jpy')
})

test('spot-err-getPair', async () => {
  const res = await Zaif.Spot.getPair('btc', 'aaa')
  expect(res).toBeNull()
})

test('spot-getPairAll', async () => {
  const res = await Zaif.Spot.getPairAll()
  expect(res.length).toBeGreaterThanOrEqual(2)

  expect(res.find(v => v.name === 'BTC/JPY')).not.toBeUndefined()
})

test('spot-getLastPrice', async () => {
  let res = await Zaif.Spot.getLastPrice()
  expect(typeof res).toBe('number')

  res = await Zaif.Spot.getLastPrice('xem', 'jpy')
  expect(typeof res).toBe('number')
})

test('spot-err-getLastPrice', async () => {
  await expect(Zaif.Spot.getLastPrice('btc', 'aaa')).rejects.toThrow('unsupported currency_pair')
})

test('spot-getTicker', async () => {
  let res = await Zaif.Spot.getTicker()
  expect(typeof res.last).toBe('number')

  res = await Zaif.Spot.getTicker('xem', 'jpy')
  expect(typeof res.last).toBe('number')
})

test('spot-err-getTicker', async () => {
  await expect(Zaif.Spot.getTicker('btc', 'aaa')).rejects.toThrow('unsupported currency_pair')
})

test('spot-getTradeHistories', async () => {
  let res = await Zaif.Spot.getTradeHistories()
  expect(res.length).toBeGreaterThanOrEqual(2)
  expect(typeof res[0].amount).toBe('number')

  res = await Zaif.Spot.getTradeHistories('xem', 'jpy')
  expect(res.length).toBeGreaterThanOrEqual(2)
  expect(typeof res[0].amount).toBe('number')
})

test('spot-getTradeHistories', async () => {
  await expect(Zaif.Spot.getTradeHistories('btc', 'aaa')).rejects.toThrow('unsupported currency_pair')
})

test('spot-getBoard', async () => {
  let res = await Zaif.Spot.getBoard()

  expect(res.asks.length).toBeGreaterThan(2)
  expect(typeof res.asks[0].price).toBe('number')
  expect(typeof res.asks[0].amount).toBe('number')

  expect(res.bids.length).toBeGreaterThan(2)
  expect(typeof res.bids[0].price).toBe('number')
  expect(typeof res.bids[0].amount).toBe('number')

  res = await Zaif.Spot.getBoard('xem', 'jpy')
  expect(res.asks.length).toBeGreaterThan(2)
  expect(typeof res.asks[0].price).toBe('number')
  expect(typeof res.asks[0].amount).toBe('number')

  expect(res.bids.length).toBeGreaterThan(2)
  expect(typeof res.bids[0].price).toBe('number')
  expect(typeof res.bids[0].amount).toBe('number')
})

test('spot-getBoardAsks', async () => {
  let res = await Zaif.Spot.getBoardAsks()

  expect(res.length).toBeGreaterThan(2)
  expect(typeof res[0].price).toBe('number')
  expect(typeof res[0].amount).toBe('number')

  res = await Zaif.Spot.getBoardAsks('xem', 'jpy')
  expect(typeof res[0].price).toBe('number')
  expect(typeof res[0].amount).toBe('number')
})

test('spot-getBoardBids', async () => {
  let res = await Zaif.Spot.getBoardBids()

  expect(res.length).toBeGreaterThan(2)
  expect(typeof res[0].price).toBe('number')
  expect(typeof res[0].amount).toBe('number')

  res = await Zaif.Spot.getBoardBids('xem', 'jpy')
  expect(typeof res[0].price).toBe('number')
  expect(typeof res[0].amount).toBe('number')
})

