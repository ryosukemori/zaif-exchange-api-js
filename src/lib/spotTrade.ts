import Connection from './connection'

const params = {
  endpoint: 'tapi'
}

/**
 *
 * 自身の口座取引情報を取得します
 * @param level 1=取引回数を取得する
 */
export const getAccountMyInfo = async (level: number = 0) => {
  const data = {
    method: level ? 'get_info' : 'get_info2',
  }
  const res = await Connection.post(params.endpoint, data)
  return res.data.return
}

/**
 * 自身のチャットで利用されるユーザ情報を取得します
 */
export const getChatMyInfo = async () => {
  const data = {
    method: 'get_personal_info'
  }
  const res = await Connection.post(params.endpoint, data)
  return res.data.return
}

/**
 * 自身のユーザ情報を取得します
 */
export const getIdMyInfo = async () => {
  const data = {
    method: 'get_id_info'
  }
  const res = await Connection.post(params.endpoint, data)
  return res.data.return
}

/**
 *
 * 自身の現物取引情報を取得します
 * @param options ITradeHistory
 */
export const getTradeHistory = async (options: ITradeHistory = {}) => {

  const data: any = {
    method: 'trade_history',
    from: options.from || 0,
    count: options.count || 1000,
    from_id: options.from_id || 0,
    order: options.order || 'DESC',
    currency_pair: options.currency ? `${options.currency.base}_${options.currency.quote}` : 'btc_jpy',
    is_token: options.is_token || false
  }
  if (options.end_id) data.end_id = options.end_id
  if (options.since) data.since = Math.floor(options.since.getTime() / 1000)
  if (options.end) data.end = Math.floor(options.end.getTime() / 1000)

  const res = await Connection.post(params.endpoint, data, 5000)
  return res.data.return
}

/**
 * 特定通過ペアの未約定注文一覧の取得
 * @param options.currency_pair 通貨ペア({base,quote})
 * @param options.is_token トークンかどうか
 */
export const getUncommittedOrderList = async (options: IUncommittedOrderList = {}) => {

  const data: any = {
    method: 'active_orders',
    currency_pair: options.currency ? `${options.currency.base}_${options.currency.quote}` : 'zaif_jpy',
    is_token: options.is_token || false,
    is_token_both: false,
  }

  const res = await Connection.post(params.endpoint, data, 500)
  return res.data.return
}

/**
 * 未約定注文一覧をすべて取得
 * @param options.is_token [指定なし]:すべて [true]:トークン [false]:主要通貨
 */
export const getUncommittedOrderListAll = async (options: IUncommittedOrderListAll = {}) => {
  const data: any = {
    method: 'active_orders',
    is_token_both: true,
  }

  if (options.is_token) data.is_token = options.is_token

  const res = await Connection.post(params.endpoint, data, 500)
  return res.data.return
}

/**
 * 取引注文を実行する
 */
export const order = async (action: Action, options: IOrder) => {
  let actionCode: string

  if (action === 'buy') {
    actionCode = 'bid'
  }
  else if (action === 'sell') {
    actionCode = 'ask'
  }
  else {
    throw new Error(`アクションは 'buy'(買い) もしくは 'sell'(売り)を指定する`)
  }

  const data: any = {
    method: 'trade',
    currency_pair: `${options.currency.base}_${options.currency.quote}`,
    action: actionCode,
    price: options.price,
    amount: options.amount,
  }
  if (options.limit) data.limit = options.limit
  if (options.comment) data.comment = options.comment

  const res = await Connection.post(params.endpoint, data, 1112)
  return res.data.return
}

/**
 * 注文の取消しを実行する
 * @param options
 */
export const cancel = async (options: ICancel) => {
  const data: any = {
    method: 'cancel_order',
    order_id: options.order_id,
    currency_pair: `${options.currency.base}_${options.currency.quote}`
  }
  if (options.is_token) data.is_token = options.is_token

  const res = await Connection.post(params.endpoint, data, 1112)
  return res.data.return
}

export const withdraw = async (options: IWithdraw) => {
  const data: any = {
    method: 'withdraw',
    ...options
  }

  console.log(data)

  const res = await Connection.post(params.endpoint, data)
  return res.data.return
}

export const getDepositHistory = async (options: IDepositHistory = {}) => {
  const data: any = {
    method: 'deposit_history',
    currency: options.currency ? options.currency : 'btc'
  }
  if (options.count) data.count = options.count
  if (options.order) data.order = options.order
  if (options.from) data.from = options.from
  if (options.from_id) data.from_id = options.from_id
  if (options.end_id) data.end_id = options.end_id
  if (options.since) data.since = Math.floor(options.since.getTime() / 1000)
  if (options.end) data.end = Math.floor(options.end.getTime() / 1000)

  const res = await Connection.post(params.endpoint, data, 6000)
  return res.data.return
}

export const getWithdrawHistory = async (options: IDepositHistory = {}) => {
  const data: any = {
    method: 'withdraw_history',
    currency: options.currency ? options.currency : 'btc'
  }
  if (options.count) data.count = options.count
  if (options.order) data.order = options.order
  if (options.from) data.from = options.from
  if (options.from_id) data.from_id = options.from_id
  if (options.end_id) data.end_id = options.end_id
  if (options.since) data.since = Math.floor(options.since.getTime() / 1000)
  if (options.end) data.end = Math.floor(options.end.getTime() / 1000)

  const res = await Connection.post(params.endpoint, data, 6000)
  return res.data.return
}


type Sort = 'ASC' | 'DESC'
type Action = 'buy' | 'sell'

export interface ITradeHistory {
  from?: number
  count?: number
  from_id?: number
  end_id?: number
  order?: Sort
  since?: Date
  end?: Date
  currency?: {
    base: string
    quote: string
  }
  is_token?: Boolean
}

export interface IUncommittedOrderList {
  currency?: {
    base: string
    quote: string
  }
  is_token?: boolean
}

export interface IUncommittedOrderListAll {
  is_token?: boolean
}

export interface IOrder {
  currency: {
    base: string
    quote: string
  }
  price: number
  amount: number
  limit?: number
  comment?: string
}

export interface ICancel {
  order_id: number,
  currency: {
    base: string
    quote: string
  }
  is_token?: boolean
}

export interface IWithdraw {
  currency: string
  address: string
  message?: string
  amount: number
  opt_fee?: number
}

export interface IDepositHistory {
  currency?: string
  from?: number
  count?: number
  from_id?: number
  end_id?: number
  order?: Sort
  since?: Date
  end?: Date
}
