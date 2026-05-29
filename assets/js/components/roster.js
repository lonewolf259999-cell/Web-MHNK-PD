/* ========================================
   MHNK Police Department - Roster Components
   ======================================== */

function renderTop20() {
    var sorted = state.officers.slice().sort(function(a, b) { return getCaseNum(b) - getCaseNum(a); });
    var top = sorted.slice(0, CONFIG.maxTopList);
    if (top.length === 0) { DOM.topList.innerHTML = '<div class="top-empty">ไม่มีข้อมูล</div>'; return; }
    var html = '';
    for (var i = 0; i < top.length; i++) {
        var o = top[i];
        html += '<div class="top-item"><div class="top-rank">' + (i + 1) + '</div><div class="top-info"><div class="top-name">' + escapeHtml(o.name) + '</div><div class="top-rank-label">' + escapeHtml(o.rank || '-') + '</div></div><div class="top-cases">' + getCaseNum(o) + '</div></div>';
    }
    DOM.topList.innerHTML = html;
}

function renderOfficers(officers) {
    if (!officers || officers.length === 0) {
        DOM.grid.innerHTML = '<div class="no-results"><div class="icon">&#128373;</div><h3>ไม่พบเจ้าหน้าที่</h3><p>ลองค้นหาด้วยชื่อหรือยศอื่น</p></div>';
        return;
    }
    var html = '';
    for (var i = 0; i < officers.length; i++) {
        var o = officers[i];
        var displayNum = o.code || extractOfficerCode(o.name) || '';
        var rankClass = getRankClass(o.rank);
        var cases = getCaseNum(o);
        html += '<div class="officer-card"><div class="card-top"><div class="officer-avatar">' + escapeHtml(displayNum) + '</div><span class="rank-badge ' + rankClass + '">' + escapeHtml(o.rank || '-') + '</span></div><div class="officer-id">' + (displayNum ? '#' + escapeHtml(displayNum) : '') + '</div><div class="officer-name">' + escapeHtml(o.name) + '</div><div class="card-footer"><div class="cases-count">เคส <strong>' + cases + '</strong></div><div class="status-dot"></div></div></div>';
    }
    DOM.grid.innerHTML = html;
}

function setDataAndRender(officers) {
    state.officers = officers;
    state.filteredOfficers = filterOfficers(state.searchQuery);
    DOM.totalCount.textContent = officers.length;
    DOM.totalBadge.textContent = officers.length;
    DOM.resultCount.textContent = state.filteredOfficers.length;
    renderOfficers(state.filteredOfficers);
    renderTop20();
    renderSchedule();
}