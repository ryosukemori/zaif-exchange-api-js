export type ZaifApiResponse<T> = {
  success: 1
  return: T
}

export type Pairs = {
  jpy: number
  btc: number
  xem: number
  mona: number
  BCH: number
  ETH: number
  FSCC: number
  ZAIF: number
  [key: string]: number
}

export type AccountMyInfoResponse = {
  funds: Pairs
  deposit: Pairs
  rights: {
    info: 0 | 1
    trade: 0 | 1
    widthdraw: 0 | 1
    personal_info: 0 | 1
    id_info: 0 | 1
  }
  trade_count?: number
  open_orders: number
  server_time: number
}

export type ErrorResponse = {
  success: 0
  return: string
}
