/* ========================================
   MHNK Police Department - Global State
   ======================================== */

var state = {
    officers: [],
    filteredOfficers: [],
    searchQuery: '',
    currentPage: 'roster'
};

function filterOfficers(query) {
    if (!query.trim()) return state.officers;
    var q = query.trim().toLowerCase();
    return state.officers.filter(function(o) {
        return o.name.toLowerCase().includes(q) ||
               o.rank.toLowerCase().includes(q) ||
               o.code.toLowerCase().includes(q);
    });
}

function applyFilter() {
    var filtered = filterOfficers(state.searchQuery);
    state.filteredOfficers = filtered;
    renderOfficers(filtered);
    DOM.resultCount.textContent = filtered.length;
    renderTop20();
}