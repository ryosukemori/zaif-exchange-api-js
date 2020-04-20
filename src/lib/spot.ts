import Connection from './connection'

const params = {
  endpoint: {
    currency: '1/currencies',
    pair: '1/currency_pairs',
    last: '1/last_price',
    ticker: '1/ticker',
    trades: '1/trades',
    board: '1/depth',
  },
}

/**
 * 単体の通貨情報を取得します
 * @param name : 通貨の3文字名
 * @return 通貨情報オブジェクト
 */
export const getCurrency = async (name: string = 'btc'): Promise<any | null> => {
  const res = await Connection.get(`${params.endpoint.currency}/${name}`)

  return res.data.length > 0 ? res.data[0] : null
}

/**
 * すべての通貨情報を取得します
 * @return 通貨情報オブジェクトの配列
 */
export const getCurrencyAll = async (): Promise<Array<any>> => {
  const res = await Connection.get(`${params.endpoint.currency}/all`)
  return res.data
}

/**
 * 単体のペア情報を取得します
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return ペア情報オブジェクト
 */
export const getPair = async (base: string = 'btc', quote: string = 'jpy'): Promise<any | null> => {
  const pair = `${base}_${quote}`
  const res = await Connection.get(`${params.endpoint.pair}/${pair}`)

  return res.data.length > 0 ? res.data[0] : null
}

/**
 * ペア情報をすべて取得します
 * @return ペア情報オブジェクトの配列
 */
export const getPairAll = async (): Promise<Array<any>> => {
  const res = await Connection.get(`${params.endpoint.pair}/all`)
  return res.data
}

/**
 * 現在の終値を取得
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return 現在終値
 */
export const getLastPrice = async (base: string = 'btc', quote: string = 'jpy'): Promise<number> => {
  const pair = `${base}_${quote}`
  const res = await Connection.get(`${params.endpoint.last}/${pair}`)

  if (res.data.error) {
    throw new Error(res.data.error)
  }

  return Number(res.data.last_price)
}

/**
 * ティッカーを取得
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return ティッカー情報オブジェクト
 */
export const getTicker = async (base: string = 'btc', quote: string = 'jpy'): Promise<any> => {
  const pair = `${base}_${quote}`
  const res = await Connection.get(`${params.endpoint.ticker}/${pair}`)

  if (res.data.error) {
    throw new Error(res.data.error)
  }

  return res.data
}

/**
 *
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return 全ユーザーの取引履歴のオブジェクト配列
 */
export const getTradeHistories = async (base: string = 'btc', quote: string = 'jpy'): Promise<Array<any>> => {
  const pair = `${base}_${quote}`
  const res = await Connection.get(`${params.endpoint.trades}/${pair}`)

  if (res.data.error) {
    throw new Error(res.data.error)
  }

  return res.data
}

/**
 *
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return 板情報の取得
 */
export const getBoard = async (base: string = 'btc', quote: string = 'jpy'): Promise<IBoard> => {
  const pair = `${base}_${quote}`
  const res = await Connection.get(`${params.endpoint.board}/${pair}`)

  if (res.data.error) {
    throw new Error(res.data.error)
  }

  const asks = res.data.asks.map((item: Array<number>): IBoardChild => {
    return {
      price: item[0],
      amount: item[1],
    }
  })

  const bids = res.data.asks.map((item: Array<number>): IBoardChild => {
    return {
      price: item[0],
      amount: item[1],
    }
  })

  return { asks, bids }
}

/**
 *
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return Ask板情報の取得
 */
export const getBoardAsks = async (base: string = 'btc', quote: string = 'jpy'): Promise<Array<IBoardChild>> => {
  const res = await getBoard(base, quote)

  return res.asks
}

/**
 *
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return Bids板情報の取得
 */
export const getBoardBids = async (base: string = 'btc', quote: string = 'jpy'): Promise<Array<IBoardChild>> => {
  const res = await getBoard(base, quote)

  return res.bids
}

export interface IBoard {
  asks: Array<IBoardChild>
  bids: Array<IBoardChild>
}

export interface IBoardChild {
  price: number
  amount: number
}
