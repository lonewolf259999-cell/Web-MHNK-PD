const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SHEET_ID = '1WjK5FkKr6C_X6isFgIIf_3VUlEOhgA2NCxfbKalcQOs';
const SHEET_NAME = 'NamePD';

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
};

function fetchSheetData() {
    return new Promise((resolve, reject) => {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    // Remove /*O_o*/ prefix
                    const cleaned = data.replace(/\/\*O_o\*\//, '').trim();
                    
                    // Extract JSON object: find first { and last }
                    const firstBrace = cleaned.indexOf('{');
                    const lastBrace = cleaned.lastIndexOf('}');
                    if (firstBrace === -1 || lastBrace === -1) throw new Error('No JSON found');
                    
                    const jsonStr = cleaned.substring(firstBrace, lastBrace + 1);
                    const json = JSON.parse(jsonStr);
                    const rows = json.table.rows;
                    const officers = [];

                    for (const row of rows) {
                        if (!row.c) continue;
                        const cells = row.c;
                        const name = cells[3] ? (cells[3].v || '') : '';
                        const code = cells[2] ? (cells[2].v || '') : '';
                        const rank = cells[5] ? (cells[5].v || '') : '';
                        const cases = cells[6] ? (cells[6].v || '') : '0';

                        if (name) {
                            officers.push({ code, name, rank, cases });
                        }
                    }

                    console.log(`Loaded ${officers.length} officers from sheet`);
                    resolve(officers);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.url === '/api/officers') {
        try {
            const officers = await fetchSheetData();
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(officers));
        } catch (err) {
            console.error('Fetch error:', err.message);
            const fallback = [
                { "code": "00", "name": "00 [MHNK-PD] Baigapow MooKrob", "rank": "ผู้บัญชาการ", "cases": "" }
            ];
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(fallback));
        }
        return;
    }

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
            return;
        }

        res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`🚔 MHNK Police Website running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   เปิดใน browser แล้วใช้งานได้เลย!`);
});