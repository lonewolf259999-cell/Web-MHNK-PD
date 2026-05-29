/* ========================================
   MHNK Police Department - Schedule Component
   ======================================== */

function renderSchedule() {
    var container = document.getElementById('scheduleContainer');
    if (!container) return;

    var days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสฯ', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
    var html = '<div class="schedule-table-wrap"><table class="schedule-table">';

    // Header: ชื่อคอลัมน์ภาษาไทย
    html += '<thead><tr><th class="sched-name-col">ชื่อเจ้าหน้าที่</th>';
    for (var d2 = 0; d2 < days.length; d2++) {
        html += '<th>' + days[d2] + '</th>';
    }
    html += '<th>รวม</th></tr></thead><tbody>';

    for (var i = 0; i < state.officers.length; i++) {
        var o = state.officers[i];
        var schedule = o.schedule || [];
        var total = o.scheduleTotal || '';

        html += '<tr>';
        html += '<td class="sched-name-cell">' + escapeHtml(o.name) + '</td>';
        for (var s2 = 0; s2 < 7; s2++) {
            var cell = schedule[s2] || '';
            var cellClass = cell ? 'sched-cell-filled' : 'sched-cell-empty';
            html += '<td class="' + cellClass + '">' + escapeHtml(cell || '-') + '</td>';
        }
        html += '<td class="sched-cell-total">' + escapeHtml(total || '-') + '</td>';
        html += '</tr>';
    }

    html += '</tbody></table></div>';
    container.innerHTML = html;
}
