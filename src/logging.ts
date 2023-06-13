/* eslint-disable @typescript-eslint/no-explicit-any */
export class SpreadsheetLogger {
  private spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  private eventLogSheet = 'Sheet1';
  private doorLockSheetJa = 'Door Lock';
  private hubSheetJa = 'Hub';

  constructor(spreadsheetId: string) {
    this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  }

  public appendEventLog(jsonData: any) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sheet = this.spreadsheet.getSheetByName(this.eventLogSheet)!;

    // Push top
    sheet.getRange('2:2').insertCells(SpreadsheetApp.Dimension.ROWS);

    // Insert data at top
    sheet.getRange(2, 1).setValue(new Date().toLocaleString('ja-JP'));
    sheet.getRange(2, 2).setValue(JSON.stringify(jsonData));
    sheet.getRange(2, 3).setValue(jsonData.context.deviceMac);
    sheet.getRange(2, 4).setValue(jsonData.context.timeOfSample);

    // Data never goes beyond 1000 lines
    sheet.deleteRow(1000);
    return;
  }

  public updateLockerState(jsonData: any) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sheet = this.spreadsheet.getSheetByName(this.doorLockSheetJa)!;

    sheet.getRange(2, 2).setValue(jsonData.context.lockState);
    sheet.getRange(2, 3).setValue(jsonData.context.battery);
    sheet.getRange(2, 4).setValue(jsonData.context.timeOfSample);
    return;
  }

  public updateHubState(jsonData: any) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sheet = this.spreadsheet.getSheetByName(this.hubSheetJa)!;

    sheet.getRange(2, 2).setValue(jsonData.context.temperature);
    sheet.getRange(2, 3).setValue(jsonData.context.humidity);
    sheet.getRange(2, 4).setValue(jsonData.context.lightLevel);
    sheet.getRange(2, 5).setValue(jsonData.context.timeOfSample);
    return;
  }
}
