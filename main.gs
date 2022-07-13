function main() {
    var prop = PropertiesService.getScriptProperties().getProperties();

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(prop.TBL_NAME);
    var rows = sheet.getDataRange().getValues();
    var fields = rows[0];
    var tmpl = HtmlService.createTemplateFromFile('message');

    rows.slice(1).forEach(columns => {
      fields.forEach((v, i) => tmpl[v] = columns[i]);
      GmailApp.sendEmail(columns[1], prop.SUBJECT, 'HTMLメールが表示できません。', {
        from: prop.MSG_FROM,
        noReply: true,
        htmlBody: tmpl.evaluate().getContent(),
      });
    });  
}
