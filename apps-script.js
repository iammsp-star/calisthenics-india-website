/**
 * Master Calisthenics India - Website Form Handler
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Clear any existing code and paste this entire script.
 * 4. Click 'Deploy' > 'New deployment'.
 * 5. Select type: 'Web app'.
 * 6. Set Description: 'MCI Form Handler'.
 * 7. Set 'Execute as': 'Me'.
 * 8. Set 'Who has access': 'Anyone'. (Crucial for website to send data)
 * 9. Click 'Deploy' and copy the 'Web App URL'.
 */

function doPost(e) {
    try {
        // 1. Get the active sheet
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // 2. Parse the incoming JSON data
        // The website will send a JSON string payload
        var rawData = e.postData.contents;
        var data = JSON.parse(rawData);

        // 3. Prepare the row data
        // Add timestamp as the first column
        var row = [
            new Date(),                // Timestamp
            data.name || '',           // Name
            data.phone || '',          // WhatsApp Number
            data.date || '',           // Trial Date
            data.session || '',        // Session Time
            data.offerSelected ? 'Yes' : 'No' // One Week Offer Interested?
        ];

        // 4. Append to sheet
        sheet.appendRow(row);

        // 5. Return success JSON
        return ContentService.createTextOutput(JSON.stringify({
            'result': 'success',
            'row': row
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error JSON
        return ContentService.createTextOutput(JSON.stringify({
            'result': 'error',
            'error': error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Initial Setup Helper (Run this once manually if you want headers)
function setupSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Trial Date', 'Session Time', 'Interested in Offer']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
}
