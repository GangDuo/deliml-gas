function main() {
    var prop = PropertiesService.getScriptProperties().getProperties();

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(prop.TBL_NAME);
    var rows = sheet.getDataRange().getValues();

    var tmpl = HtmlService.createTemplateFromFile('message');
    
    rows.slice(1).forEach(columns => {
      console.log(columns[1]);
      GmailApp.sendEmail(columns[1], "test", 'HTMLメールが表示できません。', {
        from: prop.MSG_FROM,
        noReply: true,
        htmlBody: tmpl.evaluate().getContent(),
      });
    });  
}
