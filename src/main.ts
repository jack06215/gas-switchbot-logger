/* eslint-disable */
import { env } from './config';
import { SpreadsheetLogger } from './logging';
import { LineMessenging } from './messaging';
import { SwitchBot } from './switchbot';

const SWITCHBOT_DEVICE = {
  doorLock: 'CA198CE18F1D',
  hub: 'F1A0181CCC28',
};

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const json = JSON.parse(e.postData.contents);
  const switchbot = new SwitchBot(env.switchbotToken, env.switchbotSecret);
  const messenger = new LineMessenging(env.lineApiToken);
  const logger = new SpreadsheetLogger(env.logSpreadsheetId);

  if (Object.values(SWITCHBOT_DEVICE).includes(json.context.deviceMac)) {
    logger.appendEventLog(json);
  }

  // Update locker state
  if (json.context.deviceMac === SWITCHBOT_DEVICE.doorLock) {
    logger.updateLockerState(json);
    messenger.pushMessage(env.tmxCmderLineUserId, `${json.context.deviceMac} is ${json.context.lockState}`);
  }

  // Update Hub 2 state
  if (json.context.deviceMac === SWITCHBOT_DEVICE.hub) {
    logger.updateHubState(json);
  }

  // Return OK response
  const output = ContentService.createTextOutput(switchbot.getDeviceStatus(SWITCHBOT_DEVICE.hub));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

(global as any).doPost = doPost;
