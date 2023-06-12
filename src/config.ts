/**
 * Environment variables
 */
class EnvironmentInit {
  lineApiToken = '';
  tmxCommanderLineUserId = '';
  samsungSmartThingsToken = '';
  tmuxBackendToken = '';
  joinAppToken = '';
  joinHtcDeviceId = '';
  joinFold3DeviceId = '';
  logSpreadsheetId = '';
  switchbotToken = '';
  switchbotSecret = '';

  constructor() {
    try {
      this.tmxCommanderLineUserId =
        PropertiesService.getScriptProperties().getProperty(
          'TMUX_COMMANDER_LINE_USER_ID'
        ) ?? '';
      this.tmuxBackendToken =
        PropertiesService.getScriptProperties().getProperty(
          'TMUX_BACKEND_TOKEN'
        ) ?? '';
      this.lineApiToken =
        PropertiesService.getScriptProperties().getProperty('LINE_API_TOKEN') ??
        '';
      this.samsungSmartThingsToken =
        PropertiesService.getScriptProperties().getProperty(
          'SAMSUNG_SMARTTHINGS_TOKEN'
        ) ?? '';
      this.joinAppToken =
        PropertiesService.getScriptProperties().getProperty('JOIN_APP_TOKEN') ??
        '';
      this.joinHtcDeviceId =
        PropertiesService.getScriptProperties().getProperty(
          'JOIN_HTC_DEVICE_ID'
        ) ?? '';
      this.joinFold3DeviceId =
        PropertiesService.getScriptProperties().getProperty(
          'JOIN_FOLD3_DEVICE_ID'
        ) ?? '';
      this.logSpreadsheetId =
        PropertiesService.getScriptProperties().getProperty(
          'LOG_SPREADSHEET_ID'
        ) ?? '';
      this.switchbotToken =
        PropertiesService.getScriptProperties().getProperty(
          'SWITCHBOT_TOKEN'
        ) ?? '';
      this.switchbotSecret =
        PropertiesService.getScriptProperties().getProperty(
          'SWITCHBOT_SECRET'
        ) ?? '';
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
