/* ========================================
   MHNK Police Department - Helpers
   ======================================== */

function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function extractOfficerCode(name) {
    if (!name) return '';
    var match = name.match(/^(\d+)/);
    return match ? match[1] : '';
}

function getCaseNum(o) {
    var c = o.cases || '0';
    var num = parseInt(c.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
}