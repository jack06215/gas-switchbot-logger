/**
 * Environment variables
 */
class EnvironmentInit {
  lineApiToken = '';
  tmxCmderLineUserId = '';
  smartThingsToken = '';
  tmuxBkndToken = '';
  joinAppToken = '';
  joinHtcDeviceId = '';
  joinFold3DeviceId = '';
  logSpreadsheetId = '';
  switchbotToken = '';
  switchbotSecret = '';

  constructor() {
    try {
      const props = PropertiesService.getScriptProperties();

      this.tmxCmderLineUserId = props.getProperty('TMUX_COMMANDER_LINE_USER_ID') ?? '';
      this.tmuxBkndToken = props.getProperty('TMUX_BACKEND_TOKEN') ?? '';
      this.lineApiToken = props.getProperty('LINE_API_TOKEN') ?? '';
      this.smartThingsToken = props.getProperty('SAMSUNG_SMARTTHINGS_TOKEN') ?? '';
      this.joinAppToken = props.getProperty('JOIN_APP_TOKEN') ?? '';
      this.joinHtcDeviceId = props.getProperty('JOIN_HTC_DEVICE_ID') ?? '';
      this.joinFold3DeviceId = props.getProperty('JOIN_FOLD3_DEVICE_ID') ?? '';
      this.logSpreadsheetId = props.getProperty('LOG_SPREADSHEET_ID') ?? '';
      this.switchbotToken = props.getProperty('SWITCHBOT_TOKEN') ?? '';
      this.switchbotSecret = props.getProperty('SWITCHBOT_SECRET') ?? '';
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`"Missing environment variable(s)": ${e.message}`);
      } else {
        throw new Error('Missing environment variable(s)');
      }
    }
  }
}

export const env = new EnvironmentInit();
