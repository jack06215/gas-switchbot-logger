import { HmacSHA256, enc } from 'crypto-js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SwitchBot {
  private token: string;
  private secret: string;
  private baseUrl = 'https://api.switch-bot.com/v1.1';

  constructor(token: string, secret: string) {
    this.token = token;
    this.secret = secret;
  }

  createSignature() {
    const ts = Date.now().toString();
    const nonce = Utilities.getUuid();

    const combinedMessage = this.token + ts + nonce;
    const hashedSign = this.newHashedSign(combinedMessage);
    const headers = {
      Authorization: this.token,
      sign: hashedSign,
      nonce: nonce,
      t: ts,
    };

    return headers;
  }

  newHashedSign(message: string) {
    const hashedMessage = HmacSHA256(message, this.secret);
    const signature = enc.Base64.stringify(hashedMessage);

    return signature;
  }

  getDeviceStatus(deviceId: string) {
    const url = `${this.baseUrl}/devices/${deviceId}/status`;
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      headers: this.createSignature(),
    };
    return UrlFetchApp.fetch(url, options).getContentText();
  }
}
