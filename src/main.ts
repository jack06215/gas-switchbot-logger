/* eslint-disable */
import { env } from './config';
import { SpreadsheetLogger } from './logging';
import { LineMessenging } from './messaging';
import { SwitchBot } from './switchbot';

const DEVICE_WATCHLIST = [
  'CA198CE18F1D', // Door Lock
  'F1A0181CCC28', // Hub 2
];

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const json = JSON.parse(e.postData.contents);
  const switchbot = new SwitchBot(env.switchbotToken, env.switchbotSecret);
  const messenger = new LineMessenging(env.lineApiToken);
  const logger = new SpreadsheetLogger(env.logSpreadsheetId);

  if (DEVICE_WATCHLIST.includes(json.context.deviceMac)) {
    logger.appendEventLog(json);
  }

  // Update locker state
  if (json.context.deviceMac === DEVICE_WATCHLIST[0]) {
    logger.updateLockerState(json);
    messenger.pushMessage(
      env.tmxCommanderLineUserId,
      `${json.context.deviceMac} is ${json.context.lockState}`
    );
  }

  // Update Hub 2 state
  if (json.context.deviceMac === DEVICE_WATCHLIST[1]) {
    logger.updateHubState(json);
  }

  // Return OK response
  const output = ContentService.createTextOutput(
    switchbot.getDeviceStatus(DEVICE_WATCHLIST[1])
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

(global as any).doPost = doPost;
