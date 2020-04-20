import Connection from './connection'

const params = {
  endpoint: {
    currency: `1/currencies`,
    pair: `1/currency_pairs`
  },
}

/**
 * 単体の通貨情報を取得します
 * @param name : 通貨の3文字名
 * @return 通貨情報オブジェクト
 */
export const getCurrency = async (name: string = 'btc'): Promise<any | null> => {
  const ret = await Connection.get(`${params.endpoint.currency}/${name}`)

  return ret.data.length > 0 ? ret.data[0] : null
}

/**
 * すべての通貨情報を取得します
 * @return 通貨情報オブジェクトの配列
 */
export const getCurrencyAll = async (): Promise<Array<any>> => {
  const ret = await Connection.get(`${params.endpoint.currency}/all`)
  return ret.data
}

/**
 * 単体のペア情報を取得します
 * @param base 基準通貨
 * @param quote ペア指定通貨
 * @return ペア情報オブジェクト
 */
export const getPair = async (base: string = 'btc', quote: string = 'jpy'): Promise<any | null> => {
  const pair = `${base}_${quote}`
  const ret = await Connection.get(`${params.endpoint.pair}/${pair}`)

  return ret.data.length > 0 ? ret.data[0] : null
}

/**
 * ペア情報をすべて取得します
 * @return ペア情報オブジェクトの配列
 */
export const getPairAll = async (): Promise<Array<any>> => {
  const ret = await Connection.get(`${params.endpoint.pair}/all`)
  return ret.data
}
