require('dotenv').config()

/**
 * 基本設定
 */
class Configure {
  static BASIC_ENDPOINT: string = 'https://api.zaif.jp/api/'

  // APIエンドポイント
  endpoint: string = Configure.BASIC_ENDPOINT
  // APIキー
  key: string | null = null
  // APIシークレット
  secret: string | null = null
  // API呼び出し回数(毎秒)
  callPerSeconds: number = 10

  private static _instance: Configure

  private constructor(configure: IConfigure) {
    this.setConfig(configure)
  }

  public static getInstance(): Configure {
    return this._instance ? this._instance : new Configure({})
  }

  public setConfig(configure: IConfigure) {
    this.endpoint = configure.endpoint ? configure.endpoint :
      process.env.ENDPOINT ? process.env.ENDPOINT : Configure.BASIC_ENDPOINT

    this.key = configure.key ? configure.key :
      process.env.KEY ? process.env.KEY : null

    this.secret = configure.secret ? configure.secret :
      process.env.SECRET ? process.env.SECRET : null

    const callPerSeconds = configure.callPerSeconds ? configure.callPerSeconds : Number(process.env.CALLPERSECONDS)
    this.callPerSeconds = callPerSeconds >= 10 ? callPerSeconds : 10
  }
}

export interface IConfigure {
  endpoint?: string
  key?: string
  secret?: string
  callPerSeconds?: number
}


export default Configure.getInstance()
