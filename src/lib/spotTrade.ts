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
  const res = await Connection.post(params.endpoint, data, 1000)
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
export const getTradeHistory = async (options: ITradeHistory = {
  from: 0,
  count: 1000,
  from_id: 0,
  order: 'DESC',
  currency: {
    base: 'btc',
    quote: 'jpy'
  },
  is_token: false
}) => {

  const data: any = {
    method: 'trade_history',
    from: options.from,
    count: options.count,
    from_id: options.from_id,
    order: options.order,
    currency_pair: options.currency ? `${options.currency.base}_${options.currency.quote}` : 'btc_jpy',
    is_token: options.is_token
  }
  if (options.end_id) data.end_id = options.end_id
  if (options.since) data.since = Math.floor(options.since.getTime() / 1000)
  if (options.end) data.end = Math.floor(options.end.getTime() / 1000)

  const res = await Connection.post(params.endpoint, data)
  return res.data
}

type Sort = 'ASC' | 'DESC'

export interface ITradeHistory {
  from: number
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
