import axios from 'axios'
import configure from './configure'

/**
 * 通信制御
 */
class Connection {
  /**
   * 呼び出し回数が上限を超えた回数
   */
  public calledLimitOver: number = 0

  private calledPerSeconds: number = 0
  private beforeKeyTime: Date = new Date()

  private static _instance: Connection

  private constructor() {

  }

  public static getInstance(): Connection {
    return this._instance ? this._instance : new Connection()
  }

  public async get(url: string, params: Object = {}) {
    return await this.connect({ method: 'get', url: configure.endpoint + url, params })
  }

  /**
   * 通信する
   * @param method
   */
  private async connect(config: Object) {
    // 呼び出し頻度の制御
    await this.waitElapsedTime()

    let res
    try {
      res = await axios(config)

      if (res.status !== 200) {
        throw new Error(res.statusText)
      }
      this.calledPerSeconds++

      return res
    }
    catch (err) {
      throw new Error(err)
    }
  }

  /**
   * 設定された秒間コール数範囲内かどうか
   */
  private async waitElapsedTime() {
    // 最大秒間呼び出し回数に満たない場合
    if (this.calledPerSeconds < configure.callPerSeconds) return true

    // 最大秒間呼び出し回数を超えている場合、経過時間をチェックする
    const now = new Date()
    const diffMilliSeconds = now.getTime() - this.beforeKeyTime.getTime()

    // 1秒を超えていた場合はキータイムをリセット
    if (diffMilliSeconds > 1000) {
      this.calledPerSeconds = 0
      this.beforeKeyTime = now

      return true
    }

    // 1秒以内の場合は残り秒数を待機する
    await new Promise((resolve) => setTimeout(resolve, 1000 - diffMilliSeconds));

    this.calledPerSeconds = 0
    this.beforeKeyTime = new Date()
    this.calledLimitOver++

    return true
  }
}



export default Connection.getInstance()
