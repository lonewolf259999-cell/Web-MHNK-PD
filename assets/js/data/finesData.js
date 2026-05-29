/* ========================================
   MHNK Police Department - Fines Data (Updated)
   ======================================== */

var FINES_DATA = [
    {
        title: "⚖️ อัตราค่าปรับและเวลาจำคุก",
        fines: [
            { description: "ปูน", amount: "1,500 บาท / 5 นาที" },
            { description: "น้ำมัน", amount: "2,000 บาท / 5 นาที" },
            { description: "Red (แคป)", amount: "3,000 บาท / 10 นาที" },
            { description: "Blue (แคป), Yellow (แคป)", amount: "1,500 บาท / 5 นาที" },
            { description: "เงินแดง", amount: "x25 บาท / 0 นาที" },
            { description: "ประกันตัว", amount: "500 บาท / 1 นาที" },
            { description: "หลบหนีการจับกุม", amount: "2,000 บาท / 5 นาที" },
            { description: "หลบหนีหลังการจับกุม (อยู่ระหว่างทำคดี)", amount: "20,000 บาท / 30 นาที" },
            { description: "หลบหนีออกนอกเมือง - ขึ้นเขา", amount: "10,000 บาท / 15 นาที" },
            { description: "หลบหนีลงน้ำ (ว่ายน้ำ)", amount: "x25 บาท / 0 นาที" },
            { description: "ช่วยเหลือผู้ต้องหาในการหลบหนี", amount: "20,000 บาท / 10 นาที" },
            { description: "สมรู้ร่วมคิด (ไม่มีของกลาง)", amount: "1,500 บาท / 5 นาที" },
            { description: "ปิดบังใบหน้า (หน้ากาก, หมวกกันน็อค)", amount: "2,000 บาท / 5 นาที" },
            { description: "ทำลายหลักฐาน (กรณีไม่มีของกลาง)", amount: "10,000 บาท / 5 นาที" },
            { description: "พื้นที่สุ่มเสี่ยง", amount: "2,000 บาท / 5 นาที" },
            { description: "ยัดสิ่งผิดกฎหมายผู้อื่นโดยเจตนา", amount: "20,000 บาท / 5 นาที" },
            { description: "ขัดคำสั่ง / ขัดขวางการทำงานเจ้าหน้าที่", amount: "10,000 บาท / 5 นาที" },
            { description: "หมิ่นประมาท, ข่มขู่, พูดไม่ให้เกียรติ", amount: "100,000 บาท / 10 นาที" }
        ]
    },
    {
        title: "🔴 คดีแดง (Red Case)",
        fines: [
            { description: "ทำลายทรัพย์สินราชการ", amount: "50,000 บาท / 5 นาที" },
            { description: "ทำร้ายร่างกายหน่วยงาน (อายุความ 40 นาที)", amount: "100,000 บาท / 10 นาที" },
            { description: "ก่อเหตุวุ่นวาย/ทะเลาะวิวาทในสถานที่หน่วยงาน", amount: "200,000 บาท / 10 นาที" },
            { description: "ทะเลาะวิวาทในที่คุมขัง", amount: "50,000 บาท / 5 นาที" },
            { description: "ทะเลาะวิวาท", amount: "10,000 บาท / 5 นาที" },
            { description: "หลบหนี/ช่วยเหลือออกจากที่คุมขัง", amount: "50,000 บาท / 5 นาที" },
            { description: "บุกรุกสถานพินิจ (คุกใหญ่)", amount: "50,000 บาท / 5 นาที" },
            { description: "ลักทรัพย์", amount: "100,000 บาท / 10 นาที" }
        ]
    }
];

function renderFines(query) {
    var container = document.getElementById('finesContainer');
    if (!container) return;
    var html = '';
    var q = (query || '').toLowerCase();
    for (var g = 0; g < FINES_DATA.length; g++) {
        var group = FINES_DATA[g];
        var matchedFines = [];
        for (var r = 0; r < group.fines.length; r++) {
            var desc = group.fines[r].description.toLowerCase();
            var amt = group.fines[r].amount.toLowerCase();
            if (!q || desc.includes(q) || amt.includes(q)) {
                matchedFines.push(group.fines[r]);
            }
        }
        if (q && matchedFines.length === 0) continue;
        html += '<div class="rule-group"><h3>' + escapeHtml(group.title) + '</h3><div class="rule-list">';
        for (var r2 = 0; r2 < matchedFines.length; r2++) {
            html += '<div class="rule-item fine-item">' +
                '<span class="rule-num">' + (r2 + 1) + '.</span>' +
                '<span class="rule-text">' + escapeHtml(matchedFines[r2].description) + '</span>' +
                '<span class="fine-amount">' + escapeHtml(matchedFines[r2].amount) + '</span>' +
                '</div>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html || '<div class="no-results"><p>ไม่พบค่าปรับที่ค้นหา</p></div>';
}