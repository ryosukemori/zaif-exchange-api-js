import Axios from 'axios'
import Configure from './configure'

const params = {
  endpoint: {
    currency: `${Configure.endpoint}1/currencies`,
    pair: `${Configure.endpoint}1/currency_pairs`
  },
}

/**
 * 単体の通貨情報を取得します
 * @param name : 通貨の3文字名
 * @return 通貨情報オブジェクト
 */
export const getCurrency = async (name: string = 'btc'): Promise<any | null> => {
  const ret = await Axios.get(`${params.endpoint.currency}/${name}`)
  if (ret.status !== 200) {
    throw new Error(ret.statusText)
  }

  return ret.data.length > 0 ? ret.data[0] : null
}

/**
 * すべての通貨情報を取得します
 * @return 通貨情報オブジェクトの配列
 */
export const getCurrencyAll = async (): Promise<Array<any>> => {
  const ret = await Axios.get(`${params.endpoint.currency}/all`)
  if (ret.status !== 200) {
    throw new Error(ret.statusText)
  }
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
  const ret = await Axios.get(`${params.endpoint.pair}/${pair}`)
  if (ret.status !== 200) {
    throw new Error(ret.statusText)
  }
  return ret.data.length > 0 ? ret.data[0] : null
}

/**
 * ペア情報をすべて取得します
 * @return ペア情報オブジェクトの配列
 */
export const getPairAll = async (): Promise<Array<any>> => {
  const ret = await Axios.get(`${params.endpoint.pair}/all`)
  if (ret.status !== 200) {
    throw new Error(ret.statusText)
  }
  return ret.data
}
