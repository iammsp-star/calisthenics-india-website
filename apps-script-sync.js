// --- CONFIGURATION ---
const SUPABASE_URL = 'https://wimbijqrhpsqipubbapp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbWJpanFyaHBzcWlwdWJiYXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzIyOTMsImV4cCI6MjA4NTYwODI5M30.b8yJbJowclipg9nvbECHBVlYw_scINixRJAYlP98OkE';
// ---------------------

function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('MCI Admin')
        .addItem('Sync Members to Website', 'syncMembersToSupabase')
        .addToUi();
}

function formatDateForDB(dateObj) {
    if (!dateObj || dateObj === '') return null;
    if (dateObj instanceof Date) {
        return Utilities.formatDate(dateObj, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    // If string, try to parse or return as is (assuming DD-MM-YYYY in sheet)
    // Simple heuristic: if includes '/', replace with '-' and reverse? 
    // Better: assume valid Date object from Sheet
    return null;
}

function syncMembersToSupabase() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0]; // Row 1 is headers
    const rows = data.slice(1); // Row 2+ is data

    // Mapping based on column index
    // 0: Sr.No
    // 1: Name -> name
    // 2: Date of joining -> membership_start
    // 3: Duration
    // 4: Date of maturity -> membership_expiry
    // 5: Phone -> phone
    // 6: renew Date of maturity

    const payload = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const name = row[1];
        if (!name || name === '') continue; // Skip empty rows

        // Clean Phone
        let phone = row[5] ? String(row[5]).trim() : '0000000000';
        if (phone === '') phone = '0000000000';

        // Dates
        let start = formatDateForDB(row[2]);
        let expiry = formatDateForDB(row[4]);

        // Fallbacks
        if (!start) start = new Date().toISOString().split('T')[0]; // Today
        if (!expiry) {
            // Default +1 month logic could go here, or just same as start
            expiry = start;
        }

        payload.push({
            name: name.toString().trim(),
            phone: phone,
            program_type: 'Group Batch', // Default
            membership_start: start,
            membership_expiry: expiry
        });
    }

    // 1. DELETE existing records (Optional: ensures clean sync)
    // Or simpler: Upsert. But upsert needs a unique key. 'id' is generated. 'phone' isn't unique.
    // Strategy: Delete all and re-insert is safest for full sync.

    // Batch delete is hard via REST without a WHERE. 
    // Easier: 
    // POST /rest/v1/members?on_conflict=phone (if unique) - No.

    // Step 1: Delete all rows (Wait, this is dangerous if sheet is empty).
    if (payload.length === 0) {
        SpreadsheetApp.getUi().alert('No data found to sync!');
        return;
    }

    // Send Data
    const options = {
        method: 'post',
        contentType: 'application/json',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY,
            'Prefer': 'return=minimal' // Don't return all inserted rows
        },
        payload: JSON.stringify(payload)
    };

    // We can't easily "replace" via REST without DELETE first.
    // DELETE request: DELETE /rest/v1/members?id=neq.0 (Delete all where ID is not 0, basically all)
    const deleteOptions = {
        method: 'delete',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY
        }
    };

    // Execute Delete
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/members?id=neq.00000000-0000-0000-0000-000000000000', deleteOptions);

    // Execute Insert
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/members', options);

    SpreadsheetApp.getUi().alert('Sync Complete! Website updated.');
}
