/* ========================================
   MHNK Police Department - PD Helpers
   ======================================== */

function getRankClass(rank) {
    if (!rank) return 'rank-low';
    var high = ['ผู้บัญชาการ', 'รองผู้บัญชาการ', 'ผู้กำกับ', 'ผู้กอง', 'สารวัตร'];
    var mid = ['ร้อยตำรวจเอก', 'ร้อยตำรวจโท', 'ร้อยตำรวจตรี', 'นายดาบ', 'จ่าสิบตำรวจ'];
    var t = rank.toLowerCase();
    if (high.some(function(r) { return t.includes(r); })) return 'rank-high';
    if (mid.some(function(r) { return t.includes(r); })) return 'rank-medium';
    return 'rank-low';
}