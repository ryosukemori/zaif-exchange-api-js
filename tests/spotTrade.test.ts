import * as Zaif from '../src/index'
import Types from '../src/@types'
// import configure from '../src/lib/configure'
// import connection from '../src/lib/connection'

test('spotTrade-getAccountMyInfo', async () => {
  let res: Types.AccountMyInfo = await Zaif.SpotTrade.getAccountMyInfo()
  expect(typeof res.funds.BCH).toBe('number')
  expect(res.trade_count).toBeUndefined()

  res = await Zaif.SpotTrade.getAccountMyInfo(1)
  expect(typeof res.funds.BCH).toBe('number')
  expect(typeof res.trade_count).toBe('number')
})

test('spotTrade-getChatMyInfo', async () => {
  const res: Types.ChatMyInfo = await Zaif.SpotTrade.getChatMyInfo()
  expect(typeof res.ranking_nickname).toBe('string')
})


test('spotTrade-getIdMyInfo', async () => {
  const res: Types.IdMyInfo = await Zaif.SpotTrade.getIdMyInfo()
  expect(typeof res.user.id).toBe('number')
  console.log(res)
})

test('spotTrade-getTradeHistory', async () => {
  jest.setTimeout(15000);
  let res: Types.TradeHistory = await Zaif.SpotTrade.getTradeHistory()
  expect(typeof res).toBe('object')

  const currency = {
    base: 'xem',
    quote: 'jpy'
  }
  res = await Zaif.SpotTrade.getTradeHistory({ currency })
  expect(typeof res).toBe('object')
})

test('spotTrade-getUncommittedOrderList', async () => {
  let res: Types.UncommittedOrderList = await Zaif.SpotTrade.getUncommittedOrderList()
  expect(typeof res).toBe('object')

  const currency = {
    base: 'xem',
    quote: 'jpy'
  }
  res = await Zaif.SpotTrade.getUncommittedOrderList({ currency })
  expect(typeof res).toBe('object')
})

test('spotTrade-getUncommittedOrderListAll', async () => {
  const res: Types.UncommittedOrderListIsTokenBoth = await Zaif.SpotTrade.getUncommittedOrderListAll()
  expect(typeof res.token_active_orders).toBe('object')
})

test('spotTrade-order', async () => {
  const options: Types.OrderParams = {
    currency: {
      base: 'xem',
      quote: 'jpy'
    },
    price: 1000000,
    amount: 1,
    limit: 80,
    comment: 'comment test'
  }
  const res: Types.Order = await Zaif.SpotTrade.order('ask', options)
  expect(typeof res.order_id).toBe('number')
})

test('spotTrade-cancel', async () => {
  const orderOptions: Types.OrderParams = {
    currency: {
      base: 'xem',
      quote: 'jpy'
    },
    price: 1000000,
    amount: 1,
    limit: 80,
    comment: 'comment test'
  }
  const orderRes: Types.Order = await Zaif.SpotTrade.order('ask', orderOptions)

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const options: Types.CancelParams = {
    currency: {
      base: 'xem',
      quote: 'jpy'
    },
    order_id: orderRes.order_id
  }
  const res: Types.Cancel = await Zaif.SpotTrade.cancel(options)
  expect(res.order_id).toBe(orderRes.order_id)
})

test('spotTrade-getDepositHistory', async () => {
  jest.setTimeout(15000);
  let res = await Zaif.SpotTrade.getDepositHistory()

  expect(typeof res).toBe('object')

  const data: any = {
    currency: 'jpy',
    from: 0,
    count: 3,
    from_id: 0,
    end_id: 999999,
    order: "ASC",
    since: new Date(0),
    end: new Date()
  }
  res = await Zaif.SpotTrade.getDepositHistory(data)
  expect(Object.keys(res).length).toBe(3)
})

test('spotTrade-getWithdrawHistory', async () => {
  jest.setTimeout(15000);
  let res = await Zaif.SpotTrade.getWithdrawHistory()

  expect(typeof res).toBe('object')

  const data: any = {
    currency: 'jpy',
    from: 0,
    count: 3,
    from_id: 0,
    end_id: 999999,
    order: "ASC",
    since: new Date(0),
    end: new Date()
  }
  res = await Zaif.SpotTrade.getWithdrawHistory(data)
  expect(Object.keys(res).length).toBe(3)
})
