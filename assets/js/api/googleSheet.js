/* ========================================
   MHNK Police Department - Google Sheets API
   ======================================== */

function fetchFromSheet() {
    return new Promise(function(resolve) {
        // Use CSV export for fresh data (no cache)
        var url = 'https://docs.google.com/spreadsheets/d/' + CONFIG.sheetId + '/gviz/tq?tqx=out:csv&tq&sheet=' + CONFIG.sheetName + '&_t=' + Date.now();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status !== 200) { resolve(null); return; }
            try {
                var csv = xhr.responseText;
                var lines = csv.split('\n');
                if (lines.length < 2) { resolve(null); return; }
                var officers = [];
                // Skip header row (index 0)
                for (var i = 1; i < lines.length; i++) {
                    var line = lines[i].trim();
                    if (!line) continue;
                    var cells = parseCSVLine(line);
                    if (cells.length < 7) continue;
                    // C=2 (code), D=3 (name), F=5 (rank), G=6 (cases), O=14..U=20 (schedule), V=21 (total)
                    var code = (cells[2] || '').replace(/^"|"$/g, '').trim();
                    var name = (cells[3] || '').replace(/^"|"$/g, '').trim();
                    var rank = (cells[5] || '').replace(/^"|"$/g, '').trim();
                    var cases = (cells[6] || '0').replace(/^"|"$/g, '').trim();
                    if (!name) continue;
                    var schedule = [];
                    for (var s = 14; s < 21; s++) {
                        var val = cells[s] || '';
                        schedule.push(val.replace(/^"|"$/g, '').trim());
                    }
                    var scheduleTotal = cells[21] ? cells[21].replace(/^"|"$/g, '').trim() : '';
                    officers.push({ code: code, name: name, rank: rank, cases: cases, schedule: schedule, scheduleTotal: scheduleTotal });
                }
                resolve(officers);
            } catch(e) { resolve(null); }
        };
        xhr.onerror = function() { resolve(null); };
        xhr.timeout = 10000;
        xhr.ontimeout = function() { resolve(null); };
        xhr.send();
    });
}

function parseCSVLine(line) {
    var result = [];
    var current = '';
    var inQuotes = false;
    for (var i = 0; i < line.length; i++) {
        var ch = line[i];
        if (inQuotes) {
            if (ch === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                current += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                result.push(current);
                current = '';
            } else {
                current += ch;
            }
        }
    }
    result.push(current);
    return result;
}
