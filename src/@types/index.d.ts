import { AxiosResponse } from 'axios'

export type ZaifApiResponse<T> = AxiosResponse<{
  success: 1
  return: T
}>

type Sort = 'ASC' | 'DESC'
type Action = 'bid' | 'ask'
type ActionWithBoth = Action | 'both'

export type Balance = {
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

export type AccountMyInfo = {
  funds: Balance
  deposit: Balance
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

export type ChatMyInfo = {
  ranking_nickname: string
  icon_path: string
}

export type IdMyInfo = {
  user: {
    id: number
    email: string
    name: string
    kana: string
    certified: boolean
  }
}

export type TradeHistoryParams = {
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

export type TradeHistory = {
  [key: number]: {
    currency_pair: string
    action: Action
    amount: number
    price: number
    fee: number
    your_action: ActionWithBoth
    bonus: number
    timestamp: Date
    comment: string
  }
}

export type UncommittedOrderListParams = {
  currency?: {
    base: string
    quote: string
  }
  is_token?: boolean
}

export type UncommittedOrderListAllParams = {
  is_token?: boolean
}

export type UncommittedOrder = {
  currency_pair: string
  action: Action
  amount: number
  price: number
  timestamp: Date
  comment: string
}

export type UncommittedOrderList = {
  [key: number]: UncommittedOrder
}

export type UncommittedOrderListIsTokenBoth = {
  active_orders: {
    [key: number]: UncommittedOrder
  }
  token_active_orders: UncommittedOrder
}

export type OrderParams = {
  currency: {
    base: string;
    quote: string;
  };
  price: number;
  amount: number;
  limit?: number;
  comment?: string;
}

export type Order = {
  received: number
  remains: number
  order_id: number
  funds: Balance
}

export type CancelParams = {
  order_id: number;
  currency: {
    base: string;
    quote: string;
  };
  is_token?: boolean;
}

export type Cancel = {
  order_id: number
  funds: Balance
}

export type ErrorResponse = {
  success: 0
  return: string
}
