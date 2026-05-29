/* ========================================
   MHNK Police Department - Navigation (Tab Switching)
   ======================================== */

function switchPage(page) {
    state.currentPage = page;

    // Update nav tabs
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (tab.getAttribute('data-page') === page) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    }

    // Update pages - ใช้ visibility แทน display เพื่อคงตำแหน่ง
    var pages = document.querySelectorAll('.page-content');
    for (var i = 0; i < pages.length; i++) {
        var pg = pages[i];
        if (pg.id === 'page-' + page) {
            pg.classList.add('active');
            pg.style.visibility = 'visible';
            pg.style.position = 'relative';
        } else {
            pg.classList.remove('active');
            pg.style.visibility = 'hidden';
            pg.style.position = 'absolute';
            pg.style.top = '0';
            pg.style.left = '0';
            pg.style.width = '100%';
        }
    }

    // Search bar: เปลี่ยน placeholder ตามแท็บ
    var searchInput = document.getElementById('searchInput');
    var searchSection = document.querySelector('.search-section');
    if (searchInput) {
        if (page === 'roster') {
            searchInput.placeholder = 'ค้นหาเจ้าหน้าที่...';
        } else if (page === 'rules') {
            searchInput.placeholder = 'ค้นหากฎหมาย...';
        } else if (page === 'fines') {
            searchInput.placeholder = 'ค้นหาค่าปรับ...';
        } else if (page === 'schedule') {
            searchInput.placeholder = 'ค้นหาเจ้าหน้าที่...';
        }
    }
    if (searchSection) {
        if (page === 'roster' || page === 'rules' || page === 'fines') {
            searchSection.style.opacity = '1';
            searchSection.style.pointerEvents = 'auto';
        } else {
            searchSection.style.opacity = '0';
            searchSection.style.pointerEvents = 'none';
        }
    }
}