export class LineMessenging {
  private headers: GoogleAppsScript.URL_Fetch.HttpHeaders;
  private pushEndpoint = "https://api.line.me/v2/bot/message/push";
  private replyEndpoint = "https://api.line.me/v2/bot/message/reply";

  constructor(apiToken: string) {
    this.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + apiToken,
    };
  }

  pushMessage(userId: string, message: string) {
    const messages = {
      headers: this.headers,
      to: userId,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    };

    UrlFetchApp.fetch(this.pushEndpoint, {
      headers: this.headers,
      payload: JSON.stringify(messages),
    });
  }

  replyMessage(text: string, token: string) {
    const message = {
      replyToken: token,
      messages: [
        {
          type: "text",
          text: text,
        },
      ],
    };
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: this.headers,
      payload: JSON.stringify(message),
    };
    UrlFetchApp.fetch(this.replyEndpoint, options);
  }
}

export class JoinApp {
  private joinappApiKey: string;
  private baseUrl =
    "https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush";

  constructor(apiKey: string) {
    this.joinappApiKey = apiKey;
  }

  sendPush(deviceId: string, title: string, text: string) {
    const url = `${this.baseUrl}?apikey=${this.joinappApiKey}&deviceId=${deviceId}&title=${title}&text=${text}`;
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "get",
    };
    return UrlFetchApp.fetch(url, options);
  }
}
