const dateformat = require('dateformat');
import crypto from 'crypto'
import axios from 'axios'
import configure from './configure'

interface ICalledInfo {
  // 対象APIメソッド
  method: string
  // 前回呼び出し時刻
  calledAt?: Date
  // 呼び出し間隔(ms)
  intervalTime: number
}

interface IPostData {
  method: string
}

/**
 * 通信制御
 */
class Connection {

  private calledInfos: Array<ICalledInfo> = []

  private static _instance: Connection

  private constructor() {

  }

  public static getInstance(): Connection {
    return this._instance ? this._instance : new Connection()
  }

  public async get(url: string, params: Object = {}) {
    this.setCallIntervalInfo('get', 100)
    return await this.connect('get', { method: 'get', url: configure.endpoint + url, params })
  }

  public async post(url: string, data: IPostData, interval: number = 1000, options: any = {}) {
    this.setCallIntervalInfo(data.method, interval)

    const sign = this.createSign(data)
    const config = {
      method: 'post',
      url: configure.endpoint + url,
      data: sign.params,
      headers: {
        key: configure.key,
        sign: sign.sign,
      },
      ...options
    }
    return await this.connect(data.method, config)
  }

  private createSign(data: Object) {
    const params = new URLSearchParams()
    Object.entries(data).forEach(v => {
      params.append(v[0], v[1])
    })

    // create nonce
    const nonce = dateformat(new Date(), 'yyyymmdd.HHMMssL')

    params.append('nonce', nonce.toString())

    if (configure.secret === null) {
      throw Error('シークレットキーが設定されていない')
    }

    const hmac = crypto.createHmac('sha512', configure.secret || '')
    hmac.update(params.toString())

    return {
      nonce,
      sign: hmac.digest('hex'),
      params
    }
  }

  /**
   * 通信する
   * @param method
   */
  private async connect(method: string, config: any) {
    // 呼び出し頻度の制御
    await this.waitElapsedTime(method)

    let res
    try {
      res = await axios(config)
      console.log(dateformat(new Date, 'yyyy-mm-dd HH:MM:ss'), `[api] ${method}`)

      if (res.status !== 200) {
        throw new Error(res.statusText)
      }

      if (res.data.error) {
        throw new Error(res.data.error)
      }

      if (config.method === 'post' && res.data.success !== 1) {
        throw new Error()
      }

      return res
    }
    catch (err) {
      throw new Error(err)
    }
  }

  /**
   * 呼び出し間隔情報を作成・更新する
   */
  private setCallIntervalInfo(method: string, intervalTime: number) {

    const index = this.calledInfos.findIndex(v => v.method === method)
    if (index === -1) {
      this.calledInfos.push({
        method,
        intervalTime
      })
    }
    else {
      this.calledInfos[index].intervalTime = intervalTime
    }
  }

  /**
   * 設定されたコール間隔かどうか
   */
  private async waitElapsedTime(method: string) {
    const calledInfo = this.calledInfos.find(v => v.method = method)

    if (calledInfo === undefined) {
      throw new Error('呼び出し時間間隔が正しく設定されていない')
    }

    const at = calledInfo.calledAt || new Date(0)
    const now = new Date()

    // インターバルOK
    if ((now.getTime() - at.getTime()) >= calledInfo.intervalTime) {
      calledInfo.calledAt = now
      return true
    }

    // インターバル残り秒数を待機する
    const interval: number = calledInfo.intervalTime - (now.getTime() - at.getTime())
    await new Promise((resolve) => setTimeout(resolve, interval));

    calledInfo.calledAt = new Date()
    return true
  }
}



export default Connection.getInstance()
