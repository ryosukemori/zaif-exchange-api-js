import * as Zaif from '../src/index'
// import configure from '../src/lib/configure'
// import connection from '../src/lib/connection'

test('spotTrade-getAccountMyInfo', async () => {
  let res = await Zaif.SpotTrade.getAccountMyInfo()
  expect(typeof res.funds.BCH).toBe('number')
  expect(res.trade_count).toBeUndefined()

  res = await Zaif.SpotTrade.getAccountMyInfo(1)
  expect(typeof res.funds.BCH).toBe('number')
  expect(typeof res.trade_count).toBe('number')
})

test('spotTrade-getChatMyInfo', async () => {
  const res = await Zaif.SpotTrade.getChatMyInfo()
  expect(typeof res.ranking_nickname).toBe('string')
})


test('spotTrade-getIdMyInfo', async () => {
  const res = await Zaif.SpotTrade.getIdMyInfo()
  expect(typeof res.user.id).toBe('number')
})

test('spotTrade-getTradeHistory', async () => {
  const res = await Zaif.SpotTrade.getTradeHistory()
  expect(res.success).toBe(1)

  // Todo: パラメータ指定テスト
})
