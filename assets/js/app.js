/* ========================================
   MHNK Police Department - Entry Point
   ======================================== */

function init() {
    DOM.grid = document.getElementById('officerGrid');
    DOM.topList = document.getElementById('topList');
    DOM.searchInput = document.getElementById('searchInput');
    DOM.clearBtn = document.getElementById('clearBtn');
    DOM.resultCount = document.getElementById('resultCount');
    DOM.totalCount = document.getElementById('totalCount');
    DOM.totalBadge = document.getElementById('totalBadge');

    // Tab switching — ต้องทำงานก่อนเสมอ
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            var page = this.getAttribute('data-page');
            if (page) switchPage(page);
        });
    }

    // Search events
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', function() {
            state.searchQuery = DOM.searchInput.value;
            if (state.currentPage === 'roster') {
                applyFilter();
            } else if (state.currentPage === 'rules') {
                renderRules(state.searchQuery);
            } else if (state.currentPage === 'fines') {
                renderFines(state.searchQuery);
            }
            if (DOM.clearBtn) DOM.clearBtn.classList.toggle('visible', state.searchQuery.length > 0);
        });
    }

    if (DOM.clearBtn) {
        DOM.clearBtn.addEventListener('click', function() {
            DOM.searchInput.value = '';
            state.searchQuery = '';
            DOM.clearBtn.classList.remove('visible');
            if (state.currentPage === 'roster') {
                applyFilter();
            } else if (state.currentPage === 'rules') {
                renderRules('');
            } else if (state.currentPage === 'fines') {
                renderFines('');
            }
            DOM.searchInput.focus();
        });
    }

    // Load data (try Google Sheets, fallback to embedded)
    if (DOM.grid) {
        DOM.grid.innerHTML = '<div class="loading-container"><div class="loader"></div><div class="loading-text">กำลังโหลด...</div></div>';
    }

    fetchFromSheet().then(function(sheetOfficers) {
        if (sheetOfficers && sheetOfficers.length > 0) {
            setDataAndRender(sheetOfficers);
        } else {
            var embedded = (typeof EMBEDDED_OFFICERS !== 'undefined') ? EMBEDDED_OFFICERS : null;
            if (embedded && embedded.length > 0) { setDataAndRender(embedded); }
            else { setDataAndRender([]); }
        }
    }).catch(function() {
        var embedded = (typeof EMBEDDED_OFFICERS !== 'undefined') ? EMBEDDED_OFFICERS : null;
        if (embedded && embedded.length > 0) { setDataAndRender(embedded); }
        else { setDataAndRender([]); }
    });

    // Render rules
    try { renderRules(); } catch(e) { console.error('renderRules error:', e); }

    // Render fines
    try { renderFines(); } catch(e) { console.error('renderFines error:', e); }
}

// DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}