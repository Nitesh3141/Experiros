/* ═══════════════════════════════════════════════════════════
   EXPERIORS – main.js
═══════════════════════════════════════════════════════════ */

'use strict';

// ── Specifications Data (from specifications.csv) ──────────
const SPECS = {
    Harmony: {
        Flooring: ['Floor Tiles up to 4ft', 'Stone Polymer Composite Flooring', 'Laminated Wooden Flooring'],
        'Counter Top': ['Granite Counter Tops'],
        'Wall Cladding': ['Wall Tiles up to 4ft', 'Granite Dado'],
        'False Ceiling': ['Gypsum Ceiling'],
        'Wall Paint': ['Harmony Emulsion Paint', 'Harmony Emulsion Plus Paint'],
        'Ceiling Paint': ['Tractor Emulsion Paint', 'Harmony Emulsion Paint'],
        'Designer Wall Finish': ['Wallpaper', 'Texture Paint', 'Molding Works'],
        Kitchen: ['Ply Kitchen Laminate Finish', 'HDHMR Kitchen Laminate Finish'],
        Wardrobe: ['Ply Wardrobe Laminate Finish', 'HDHMR Wardrobe Laminate Finish'],
        'TV Unit': ['TV Unit'],
        Doors: ['Paint Doors'],
        Furniture: ['Laminate Finish'],
        Electrical: ['Philips/Jaquar PVC Panel Lights+Anchor Switches', 'Somany/Cera Fittings'],
        'Bathroom Fittings': ['Somany/Cera Fittings']
    },
    Majesty: {
        Flooring: ['Floor Tiles >4ft', 'Indian Marble Flooring', 'Engineered Wooden Flooring'],
        'Counter Top': ['Nano Counter Tops'],
        'Wall Cladding': ['Wall Tiles 4ft to 6ft', 'Nano Dado'],
        'False Ceiling': ['POP Ceiling', 'Louvers Ceiling'],
        'Wall Paint': ['Royale Emulsion/Matt Paint (Washable)'],
        'Ceiling Paint': ['Harmony Emulsion Plus Paint'],
        'Designer Wall Finish': ['Laminate Panelling', 'Louvers Panelling', 'CnC Panelling'],
        Kitchen: ['HDHMR Kitchen Acrylic Finish', 'HDHMR Kitchen Veneer Finish'],
        Wardrobe: ['HDHMR Wardrobe Acrylic Finish', 'HDHMR Wardrobe Glass Shutters Finish'],
        'TV Unit': ['TV Unit'],
        Doors: ['Laminate Doors'],
        Furniture: ['Acrylic/Glass Finish'],
        Electrical: ['Philips/Jaquar COB Lights+Le Grand Switches', 'Philips/Jaquar Metal Panel Lights+Schneider Switches'],
        'Bathroom Fittings': ['Jaquar Fittings']
    },
    Elysium: {
        Flooring: ['Italian Marble Flooring', 'Solid Wooden Flooring'],
        'Counter Top': ['Quartz Counter Tops'],
        'Wall Cladding': ['Wall Tiles > 6ft', 'Quartz Dado'],
        'False Ceiling': ['Wooden Ceiling'],
        'Wall Paint': ['Royale Shyne Paint (Lusture)'],
        'Ceiling Paint': ['Royale Shyne Paint (Lusture)'],
        'Designer Wall Finish': ['PU Panelling', 'Glass Panelling'],
        Kitchen: ['HDHMR Kitchen PU Finish'],
        Wardrobe: ['HDHMR Wardrobe CnC PU Finish'],
        'TV Unit': ['TV Unit'],
        Doors: ['PU Doors'],
        Furniture: ['PU Finish'],
        Electrical: ['Philips/Jaquar Sensor Lights+Automation Switches'],
        'Bathroom Fittings': ['Kohler/Grohe Fittings']
    }
};

// Pricing per sqft (₹)
const PRICING = {
    Harmony: { min: 1800, max: 2500 },
    Majesty: { min: 2500, max: 3800 },
    Elysium: { min: 4000, max: 6500 }
};
const RENOVATION_MULTIPLIER = 0.6;

// Default FAQ data
const DEFAULT_FAQS = [
    { q: "How do I get started with Experiors?", a: "You can begin by exploring our portfolio and sharing basic details of your home, such as floor plan, size, and requirements. Based on this, we provide a preliminary estimate to help you understand the expected investment range." },
    { q: "Is the preliminary estimate free?", a: "Yes. The preliminary estimate is provided without any obligation. It helps you evaluate budget feasibility before proceeding further." },
    { q: "Why is there a ₹1,000 token deposit?", a: "The fully refundable ₹1,000 token deposit confirms serious intent to proceed with consultation and detailed estimation. It allows us to initiate structured discussions and allocate time for requirement analysis." },
    { q: "Is the ₹1,000 deposit refundable?", a: "Yes. The amount is refundable as per the terms shared during registration. It is collected purely to ensure structured engagement." },
    { q: "What happens during the consultation meeting?", a: "During the consultation, we understand your lifestyle, storage needs, aesthetic preferences, functional expectations, and budget comfort. This discussion forms the foundation for scope definition and detailed estimation." },
    { q: "How is the detailed estimate prepared?", a: "The detailed estimate is created based on your finalized requirements after consultation. It includes scope inclusions, material specifications, execution elements, and overall project investment — ensuring complete transparency." },
    { q: "Are there any hidden costs?", a: "No. Our estimates are comprehensive and clearly outline what is included in the scope. Any additional requests beyond the agreed scope are discussed and approved separately." },
    { q: "When is the agreement signed?", a: "The agreement is formalized after you review and approve the detailed estimate. It outlines the finalized scope, timelines, payment milestones, and quality standards." },
    { q: "Do you provide design revisions?", a: "Yes. During the design development stage, you can review the concepts and provide feedback. Revisions are incorporated before final approval." },
    { q: "How long does the entire process take?", a: "Project timelines vary depending on scope, size, and complexity. A defined timeline is shared in the agreement stage, and we strictly adhere to committed delivery schedules." },
    { q: "Will I receive project updates during execution?", a: "Yes. We provide regular progress updates and ensure disciplined project management to maintain transparency throughout execution." },
    { q: "Do you handle both design and construction?", a: "Yes. Experiors is an integrated design-and-build firm. We manage the entire journey — from concept and design development to execution and final handover." },
    { q: "Do you work only on residential projects?", a: "While we specialize in premium residential interiors, we also undertake select commercial interior projects aligned with our quality and execution standards." },
    { q: "What makes Experiors different from other interior firms?", a: "Our differentiation lies in: Transparent costing, Structured process flow, Defined timelines, Integrated design and execution, and Accountability at every stage. We don’t just design spaces — we deliver promises." }
];

// ── Helpers ────────────────────────────────────────────────
function fmt(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
}
function getAdminData(key, def) {
    try { return JSON.parse(localStorage.getItem('exp_' + key)) || def; }
    catch { return def; }
}

// ══════════════════════════════════════════════════════════
// PAGE ROUTER (hash-based SPA)
// ══════════════════════════════════════════════════════════
(function initRouter() {
    const pages = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    function showPage(hash) {
        // Strip leading '#', default to 'home'
        const id = (hash || '').replace(/^#/, '') || 'home';
        let matched = false;
        pages.forEach(page => {
            if (page.id === id) {
                page.classList.add('active');
                matched = true;
            } else {
                page.classList.remove('active');
            }
        });
        // If hash didn't match any section, show home
        if (!matched) {
            const home = document.getElementById('home');
            if (home) home.classList.add('active');
        }
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
        });
        // Scroll to top of viewport
        window.scrollTo(0, 0);
    }

    // Navigate on hash change (covers nav links, footer links, back/forward)
    window.addEventListener('hashchange', () => showPage(location.hash));

    // Initial load
    showPage(location.hash);
})();

// ══════════════════════════════════════════════════════════
// NAVBAR (hamburger menu only)
// ══════════════════════════════════════════════════════════
(function initNavbar() {
    const hamburger = document.getElementById('navHamburger');
    const navLinksEl = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
    // Close mobile menu on link click
    navLinksEl.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinksEl.classList.remove('open'));
    });
})();

// ══════════════════════════════════════════════════════════
// HERO SLIDESHOW
// ══════════════════════════════════════════════════════════
(function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    let current = 0;
    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }
    setInterval(nextSlide, 5000);
})();


(function initGallery() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = document.querySelectorAll('.gallery-item');
    let currentItems = [...items];
    let lightboxIdx = 0;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const proj = btn.dataset.project;
            items.forEach(item => {
                if (proj === 'all' || item.dataset.project === proj) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            currentItems = [...items].filter(i => !i.classList.contains('hidden'));
        });
    });

    // Lightbox
    const lb = document.getElementById('lightbox');
    const lbBackdrop = document.getElementById('lightboxBackdrop');
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');

    function openLightbox(idx) {
        lightboxIdx = idx;
        const item = currentItems[idx];
        lbImg.src = item.querySelector('img').src;
        lbCaption.textContent = item.dataset.project;
        lb.classList.add('active');
        lbBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        lb.classList.remove('active');
        lbBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    function showLightbox(dir) {
        lightboxIdx = (lightboxIdx + dir + currentItems.length) % currentItems.length;
        openLightbox(lightboxIdx);
    }

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            currentItems = [...items].filter(it => !it.classList.contains('hidden'));
            const idx = currentItems.indexOf(item);
            openLightbox(idx >= 0 ? idx : 0);
        });
    });
    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => showLightbox(-1));
    lbNext.addEventListener('click', () => showLightbox(1));
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showLightbox(-1);
        if (e.key === 'ArrowRight') showLightbox(1);
    });
})();

// ══════════════════════════════════════════════════════════
// TESTIMONIALS CAROUSEL
// ══════════════════════════════════════════════════════════
(function initCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prev = document.getElementById('carouselPrev');
    const next = document.getElementById('carouselNext');
    const dotsEl = document.getElementById('carouselDots');
    const cards = track.querySelectorAll('.testimonial-card');
    let current = 0;
    let autoTimer;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
    });

    function goTo(idx) {
        current = (idx + cards.length) % cards.length;
        const cardW = cards[0].offsetWidth + 24; // gap
        track.style.transform = `translateX(-${current * cardW}px)`;
        dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) =>
            d.classList.toggle('active', i === current));
        resetAuto();
    }
    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));
    resetAuto();
})();

// ══════════════════════════════════════════════════════════
// FAQ ACCORDION
// ══════════════════════════════════════════════════════════
(function initFAQ() {
    const container = document.getElementById('faqAccordion');
    const faqs = getAdminData('faqs', DEFAULT_FAQS);

    faqs.forEach((faq, i) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
      <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${i}">
        <span>${i + 1}. ${faq.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" id="faq-ans-${i}" role="region">
        <p>${faq.a}</p>
      </div>`;
        container.appendChild(item);

        item.querySelector('.faq-question').addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            container.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('open');
                el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('open');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
            }
        });
    });
})();

// ══════════════════════════════════════════════════════════
// QUICK ESTIMATE
// ══════════════════════════════════════════════════════════
(function initQuickEstimate() {
    const form = document.getElementById('quickEstimateForm');
    const result = document.getElementById('quickEstimateResult');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const area = parseFloat(document.getElementById('qe-area').value);
        const worktype = document.getElementById('qe-worktype').value;
        const category = document.getElementById('qe-category').value;
        if (!area || !worktype || !category) return;

        const p = PRICING[category];
        const mult = worktype === 'renovation' ? RENOVATION_MULTIPLIER : 1;
        const minVal = area * p.min * mult;
        const maxVal = area * p.max * mult;

        document.getElementById('qeMin').textContent = fmt(minVal);
        document.getElementById('qeMax').textContent = fmt(maxVal);
        document.getElementById('qeSliderMin').textContent = fmt(minVal);
        document.getElementById('qeSliderMax').textContent = fmt(maxVal);
        result.style.display = 'block';
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    document.getElementById('qeSaveBtn')?.addEventListener('click', () => {
        const saved = getAdminData('saved_estimates', []);
        saved.push({
            type: 'Quick',
            date: new Date().toLocaleDateString('en-IN'),
            area: document.getElementById('qe-area').value,
            category: document.getElementById('qe-category').value,
            min: document.getElementById('qeMin').textContent,
            max: document.getElementById('qeMax').textContent
        });
        localStorage.setItem('exp_saved_estimates', JSON.stringify(saved));
        alert('Estimate saved!');
    });

    document.getElementById('qeBookBtn')?.addEventListener('click', () => {
        // Auto-save estimate to client profile if logged in
        const session = JSON.parse(localStorage.getItem('exp_session') || 'null');
        if (session) {
            const min = document.getElementById('qeMin')?.textContent;
            const max = document.getElementById('qeMax')?.textContent;
            if (min && max && min !== '') {
                saveEstimateForClient(session.mobile, {
                    type: 'Quick',
                    category: document.getElementById('qe-category')?.value || '',
                    area: document.getElementById('qe-area')?.value || '',
                    min, max,
                    date: new Date().toLocaleDateString('en-IN')
                });
            }
        }
        // Navigate to Estimate page and switch to Detailed tab
        location.hash = '#estimate';
        setTimeout(() => document.getElementById('tabDetailed').click(), 50);
    });
    document.getElementById('getDetailedLink')?.addEventListener('click', e => {
        e.preventDefault();
        location.hash = '#estimate';
        setTimeout(() => document.getElementById('tabDetailed').click(), 50);
    });
})();

// ══════════════════════════════════════════════════════════
// ESTIMATE TABS
// ══════════════════════════════════════════════════════════
document.querySelectorAll('.estimate-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.estimate-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.estimate-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)).classList.add('active');
    });
});

// ══════════════════════════════════════════════════════════
// DETAILED ESTIMATE
// ══════════════════════════════════════════════════════════
(function initDetailedEstimate() {
    let emailOtp, mobileOtp, houseData = {}, selectedCategory = '';

    function showStep(n) {
        for (let i = 1; i <= 6; i++) {
            const el = document.getElementById('detStep' + i);
            if (el) el.style.display = i === n ? 'block' : 'none';
        }
    }

    // Step 1: Registration
    document.getElementById('detRegForm').addEventListener('submit', e => {
        e.preventDefault();
        emailOtp = String(Math.floor(100000 + Math.random() * 900000));
        mobileOtp = String(Math.floor(100000 + Math.random() * 900000));
        document.getElementById('demoEmailOtp').textContent = emailOtp;
        document.getElementById('demoMobileOtp').textContent = mobileOtp;
        showStep(2);
    });

    // Step 2: OTP
    document.getElementById('otpForm').addEventListener('submit', e => {
        e.preventDefault();
        const eo = document.getElementById('otp-email').value.trim();
        const mo = document.getElementById('otp-mobile').value.trim();
        if (eo !== emailOtp || mo !== mobileOtp) {
            alert('Incorrect OTP. Please check the demo codes shown above.');
            return;
        }
        showStep(3);
    });

    // Step 3: Payment
    document.getElementById('payNowBtn').addEventListener('click', () => {
        showStep(4);
    });

    // Step 4: House Details
    document.getElementById('houseDetailsForm').addEventListener('submit', e => {
        e.preventDefault();
        const catEl = document.querySelector('input[name="hd-cat"]:checked');
        if (!catEl) { alert('Please select an Interior Category.'); return; }
        selectedCategory = catEl.value;
        houseData = {
            area: parseFloat(document.getElementById('hd-area').value),
            worktype: document.getElementById('hd-worktype').value,
            bedrooms: parseInt(document.getElementById('hd-bedrooms').value) || 2,
            bathrooms: parseInt(document.getElementById('hd-bathrooms').value) || 2,
            balconies: parseInt(document.getElementById('hd-balconies').value) || 0,
            kidsroom: document.getElementById('hd-kidsroom').checked,
            mandir: document.getElementById('hd-mandir').checked,
            study: document.getElementById('hd-study').checked,
            category: selectedCategory
        };
        buildRoomSpecs();
        showStep(5);
    });

    // Floor plan preview
    document.getElementById('hd-floorplan').addEventListener('change', function () {
        const preview = document.getElementById('floorplanPreview');
        preview.innerHTML = '';
        if (this.files[0] && this.files[0].type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(this.files[0]);
            preview.appendChild(img);
        }
    });

    // ── Spec applicability rules ──────────────────────────────
    function getApplicableSpecs(room) {
        const r = room.toLowerCase();
        const isBathroom = r.includes('bathroom');
        const isBedroom = r.includes('bedroom') || r.includes("kid's room") || r.includes('kids room');
        const isKitchen = r.includes('kitchen');

        return function (type) {
            const t = type.toLowerCase();
            if (t.includes('bathroom fitting')) return isBathroom;
            if (t.includes('wardrobe')) return isBedroom;
            if (t.includes('tv unit')) return isBedroom;
            if (t.includes('counter top')) return isKitchen;
            if (t.includes('door')) return isBathroom;
            if (t.includes('designer wall finish') || t.includes('false ceiling'))
                return !isKitchen && !isBathroom;
            return true; // applicable everywhere by default
        };
    }

    function buildRoomSpecs() {
        const container = document.getElementById('roomSpecsContainer');
        container.innerHTML = '';
        const rooms = buildRoomList();
        const specTypes = Object.keys(SPECS[selectedCategory]);

        // ── Scroll-arrow wrapper ──────────────────────────────
        const wrapper = document.createElement('div');
        wrapper.className = 'spec-matrix-wrapper';

        const btnLeft = document.createElement('button');
        btnLeft.className = 'spec-scroll-btn spec-scroll-left';
        btnLeft.innerHTML = '&#8592;';
        btnLeft.setAttribute('aria-label', 'Scroll left');

        const btnRight = document.createElement('button');
        btnRight.className = 'spec-scroll-btn spec-scroll-right';
        btnRight.innerHTML = '&#8594;';
        btnRight.setAttribute('aria-label', 'Scroll right');

        // ── Matrix ────────────────────────────────────────────
        const matrix = document.createElement('div');
        matrix.className = 'spec-matrix';

        // Left: spec label column
        const labelCol = document.createElement('div');
        labelCol.className = 'spec-label-col';

        const cornerCell = document.createElement('div');
        cornerCell.className = 'spec-label-cell spec-corner';
        cornerCell.textContent = 'Specification';
        labelCol.appendChild(cornerCell);

        specTypes.forEach((type, ti) => {
            const cell = document.createElement('div');
            cell.className = 'spec-label-cell';
            cell.dataset.row = ti;
            cell.textContent = type;
            labelCol.appendChild(cell);
        });
        matrix.appendChild(labelCol);

        // Right: scrollable rooms area
        const roomsArea = document.createElement('div');
        roomsArea.className = 'spec-rooms-area';

        rooms.forEach((room, ri) => {
            const col = document.createElement('div');
            col.className = 'spec-room-col';
            col.dataset.room = room;

            const isApplicable = getApplicableSpecs(room);

            // Room header cell
            const headerCell = document.createElement('div');
            headerCell.className = 'spec-room-header-cell';
            headerCell.innerHTML = `<span>${room}</span>`;
            if (room.startsWith('Bedroom') && ri > 0) {
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-spec-btn';
                copyBtn.textContent = '↑ Copy Bed 1';
                copyBtn.addEventListener('click', () => {
                    const fromRoom = rooms[0];
                    specTypes.forEach(type => {
                        const fromActive = matrix.querySelector(
                            `.spec-btn[data-room="${fromRoom}"][data-type="${type}"].active`
                        );
                        if (fromActive) {
                            matrix.querySelectorAll(`.spec-btn[data-room="${room}"][data-type="${type}"]`)
                                .forEach(b => b.classList.remove('active'));
                            const match = matrix.querySelector(
                                `.spec-btn[data-room="${room}"][data-type="${type}"][data-value="${fromActive.dataset.value}"]`
                            );
                            if (match) match.classList.add('active');
                        }
                    });
                });
                headerCell.appendChild(copyBtn);
            }
            col.appendChild(headerCell);

            // One cell per spec type
            specTypes.forEach((type, ti) => {
                const cell = document.createElement('div');
                cell.className = 'spec-room-cell';
                cell.dataset.row = ti;

                if (!isApplicable(type)) {
                    // Not applicable — show greyed placeholder
                    cell.classList.add('spec-room-cell--na');
                    cell.innerHTML = '<span class="spec-na-label">N/A</span>';
                } else {
                    const btnGroup = document.createElement('div');
                    btnGroup.className = 'spec-btn-group';

                    SPECS[selectedCategory][type].forEach((opt, oi) => {
                        const btn = document.createElement('button');
                        btn.className = 'spec-btn';
                        btn.textContent = opt;
                        btn.dataset.room = room;
                        btn.dataset.type = type;
                        btn.dataset.value = opt;
                        if (oi === 0) btn.classList.add('active'); // default: first option selected
                        btn.addEventListener('click', () => {
                            btnGroup.querySelectorAll('.spec-btn').forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                        });
                        btnGroup.appendChild(btn);
                    });

                    cell.appendChild(btnGroup);
                }

                col.appendChild(cell);
            });

            roomsArea.appendChild(col);
        });

        matrix.appendChild(roomsArea);
        wrapper.appendChild(btnLeft);
        wrapper.appendChild(matrix);
        wrapper.appendChild(btnRight);
        container.appendChild(wrapper);

        // ── Scroll arrow handlers ─────────────────────────────
        const SCROLL_STEP = 240;
        btnLeft.addEventListener('click', () => roomsArea.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' }));
        btnRight.addEventListener('click', () => roomsArea.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' }));

        function updateArrows() {
            btnLeft.disabled = roomsArea.scrollLeft <= 0;
            btnRight.disabled = roomsArea.scrollLeft + roomsArea.clientWidth >= roomsArea.scrollWidth - 1;
        }
        roomsArea.addEventListener('scroll', updateArrows);
        updateArrows();

        // ── Equalise row heights after render ─────────────────
        requestAnimationFrame(() => {
            // 1. Equalise header row (corner cell vs room header cells)
            const headerCells = roomsArea.querySelectorAll('.spec-room-header-cell');
            let maxHeaderH = 0;
            headerCells.forEach(c => { c.style.height = ''; maxHeaderH = Math.max(maxHeaderH, c.offsetHeight); });
            headerCells.forEach(c => { c.style.height = maxHeaderH + 'px'; });
            cornerCell.style.height = maxHeaderH + 'px';

            // 2. Equalise spec row heights
            const firstCol = roomsArea.querySelector('.spec-room-col');
            if (!firstCol) return;
            const refCells = firstCol.querySelectorAll('.spec-room-cell');
            const labelCells = labelCol.querySelectorAll('.spec-label-cell:not(.spec-corner)');

            refCells.forEach((refCell, i) => {
                const allCells = roomsArea.querySelectorAll(`.spec-room-cell[data-row="${i}"]`);
                let maxH = 0;
                allCells.forEach(c => { c.style.height = ''; maxH = Math.max(maxH, c.offsetHeight); });
                allCells.forEach(c => { c.style.height = maxH + 'px'; });
                if (labelCells[i]) labelCells[i].style.height = maxH + 'px';
            });
        });
    }





    function buildRoomList() {
        const rooms = ['Living Room', 'Dining Room', 'Kitchen'];
        for (let i = 1; i <= houseData.bedrooms; i++) rooms.push('Bedroom ' + i);
        if (houseData.kidsroom) rooms.push("Kid's Room");
        if (houseData.mandir) rooms.push('Mandir / Pooja Unit');
        if (houseData.study) rooms.push('Study Room');
        return rooms;
    }

    // Step 5: Calculate
    document.getElementById('detCalcEstimate').addEventListener('click', () => {
        const p = PRICING[selectedCategory];
        const mult = houseData.worktype === 'renovation' ? RENOVATION_MULTIPLIER : 1;
        const minV = houseData.area * p.min * mult;
        const maxV = houseData.area * p.max * mult;

        const rooms = buildRoomList();
        const roomRows = rooms.map(r => {
            const share = (houseData.area / rooms.length);
            return `<tr><td>${r}</td><td>${Math.round(share)} sqft</td><td>${fmt(share * p.min * mult)}</td><td>${fmt(share * p.max * mult)}</td></tr>`;
        }).join('');

        document.getElementById('detailedEstimateResult').innerHTML = `
      <p style="color:#aaa;font-size:0.88rem;margin-bottom:1rem;">Category: <strong style="color:var(--orange)">${selectedCategory}</strong> | Area: <strong style="color:var(--orange)">${houseData.area} sqft</strong></p>
      <table class="det-result-table">
        <thead><tr><th>Room</th><th>Area</th><th>Min Estimate</th><th>Max Estimate</th></tr></thead>
        <tbody>${roomRows}</tbody>
      </table>
      <div class="det-result-total">Total Range: ${fmt(minV)} – ${fmt(maxV)}</div>
      <p style="color:#888;font-size:0.8rem;margin-top:0.75rem;">* Indicative estimate. Final cost depends on material selections and site conditions.</p>`;
        showStep(6);
        document.getElementById('detStep6').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('detSaveEstimate').addEventListener('click', () => {
        const session = JSON.parse(localStorage.getItem('exp_session') || 'null');
        if (!session) {
            alert('Please login to save your estimate.');
            return;
        }
        const p = PRICING[selectedCategory];
        const mult = houseData.worktype === 'renovation' ? RENOVATION_MULTIPLIER : 1;
        saveEstimateForClient(session.mobile, {
            type: 'Detailed',
            category: selectedCategory,
            area: houseData.area,
            min: fmt(houseData.area * p.min * mult),
            max: fmt(houseData.area * p.max * mult),
            date: new Date().toLocaleDateString('en-IN')
        });
        alert('Estimate saved to your profile!');
    });

    document.getElementById('detBookMeetingBtn').addEventListener('click', () => {
        location.hash = '#contact';
    });

    document.getElementById('detDownloadBtn').addEventListener('click', () => {
        window.print();
    });
})();

// ══════════════════════════════════════════════════════════
// MEETING CALENDAR
// ══════════════════════════════════════════════════════════
(function initCalendar() {
    const calGrid = document.getElementById('calGrid');
    const calMonthYear = document.getElementById('calMonthYear');
    const calPrev = document.getElementById('calPrev');
    const calNext = document.getElementById('calNext');
    const slotPicker = document.getElementById('slotPicker');
    const slotsGrid = document.getElementById('slotsGrid');
    const slotDateLbl = document.getElementById('slotDateLabel');
    const bookingConf = document.getElementById('bookingConfirmation');
    const bookingText = document.getElementById('bookingConfirmText');
    const bookAnotherBtn = document.getElementById('bookAnotherBtn');

    const SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let viewDate = new Date();
    let selectedDate = null;
    let selectedSlot = null;

    function getHolidays() { return getAdminData('holidays', []); }
    function getBookedSlots(dateStr) { return getAdminData('booked_' + dateStr, []); }

    function renderCalendar() {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const minDate = new Date(today); minDate.setDate(minDate.getDate() + 7);
        const holidays = getHolidays();
        const y = viewDate.getFullYear(), m = viewDate.getMonth();
        calMonthYear.textContent = `${MONTHS[m]} ${y}`;
        calGrid.innerHTML = '';

        const firstDay = new Date(y, m, 1).getDay();
        const daysInMonth = new Date(y, m + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'cal-day empty';
            calGrid.appendChild(empty);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(y, m, d);
            const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const cell = document.createElement('button');
            cell.className = 'cal-day';
            cell.textContent = d;

            const isToday = dateObj.getTime() === today.getTime();
            const isPast = dateObj < minDate;
            const isHoliday = holidays.includes(dateStr);
            const isSunday = dateObj.getDay() === 0;

            if (isToday) cell.classList.add('today');
            if (isPast || isHoliday || isSunday) {
                cell.classList.add('disabled');
                cell.disabled = true;
            } else {
                cell.classList.add('available');
                cell.addEventListener('click', () => selectDate(dateStr, dateObj));
            }
            if (isHoliday) cell.classList.add('holiday');
            calGrid.appendChild(cell);
        }
    }

    function selectDate(dateStr, dateObj) {
        selectedDate = dateStr;
        selectedSlot = null;
        slotDateLbl.textContent = dateObj.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        const booked = getBookedSlots(dateStr);
        slotsGrid.innerHTML = '';
        SLOTS.forEach(slot => {
            const btn = document.createElement('button');
            btn.className = 'slot-btn' + (booked.includes(slot) ? ' slot-booked' : '');
            btn.textContent = slot;
            btn.disabled = booked.includes(slot);
            btn.addEventListener('click', () => {
                slotsGrid.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('slot-selected'));
                btn.classList.add('slot-selected');
                selectedSlot = slot;
                confirmBooking(dateStr, slot);
            });
            slotsGrid.appendChild(btn);
        });
        slotPicker.style.display = 'block';
        bookingConf.style.display = 'none';
    }

    function confirmBooking(dateStr, slot) {
        // Save booking
        const booked = getBookedSlots(dateStr);
        booked.push(slot);
        localStorage.setItem('exp_booked_' + dateStr, JSON.stringify(booked));
        slotPicker.style.display = 'none';
        bookingText.textContent = `Your meeting is requested for ${slotDateLbl.textContent} at ${slot}. We'll confirm within 24 hours.`;
        bookingConf.style.display = 'block';
    }

    bookAnotherBtn.addEventListener('click', () => {
        bookingConf.style.display = 'none';
        slotPicker.style.display = 'none';
        selectedDate = null;
    });

    calPrev.addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() - 1);
        renderCalendar();
    });
    calNext.addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
})();

// ══════════════════════════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════════════════════════
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('contactSuccess').style.display = 'block';
    this.reset();
    setTimeout(() => { document.getElementById('contactSuccess').style.display = 'none'; }, 5000);
});

// ── Global helper: save estimate to client record ──────────
function saveEstimateForClient(mobile, estimate) {
    try {
        const key = 'exp_estimates_' + mobile;
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        list.unshift(estimate); // newest first
        localStorage.setItem(key, JSON.stringify(list));
    } catch (e) { /* silent */ }
}

// ══════════════════════════════════════════════════════════
// ESTIMATE GENERATION (Quick & Detailed)
// ══════════════════════════════════════════════════════════
(function initEstimates() {
    const quickForm = document.getElementById('quickEstimateForm');
    const quickResult = document.getElementById('quickEstimateResult');

    if (quickForm) {
        quickForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const area = parseFloat(document.getElementById('qe-area').value);
            const workType = document.getElementById('qe-worktype').value;
            const category = document.getElementById('qe-category').value;

            if (!area || !workType || !category) return;

            const basePricing = PRICING[category];
            let min = area * basePricing.min;
            let max = area * basePricing.max;

            if (workType === 'renovation') {
                min *= RENOVATION_MULTIPLIER;
                max *= RENOVATION_MULTIPLIER;
            }

            // Show results
            document.getElementById('qeMin').textContent = fmt(min);
            document.getElementById('qeMax').textContent = fmt(max);
            document.getElementById('qeSliderMin').textContent = fmt(min);
            document.getElementById('qeSliderMax').textContent = fmt(max);

            // Update slider position (midpoint as demo)
            const slider = document.getElementById('qeSlider');
            const avg = (min + max) / 2;
            const percent = Math.min(100, (avg / 10000000) * 100); // Scale 0 to 1CR
            slider.value = percent;

            quickResult.style.display = 'block';
            quickForm.style.display = 'none';
        });
    }

    // Detailed - Renovation Items Toggle
    const workTypeSelect = document.getElementById('hd-worktype');
    const renoWrap = document.getElementById('renovationItemsWrap');
    if (workTypeSelect && renoWrap) {
        workTypeSelect.addEventListener('change', function () {
            renoWrap.style.display = this.value === 'renovation' ? 'block' : 'none';
        });
    }

    // Toggle Detailed Estimate Panels
    // DETAILED ESTIMATE FLOW
    const detRegForm = document.getElementById('detRegForm');
    const otpForm = document.getElementById('otpForm');
    const payNowBtn = document.getElementById('payNowBtn');
    const houseDetailsForm = document.getElementById('houseDetailsForm');
    const roomSpecsContainer = document.getElementById('roomSpecsContainer');
    const detCalcBtn = document.getElementById('detCalcEstimate');

    let currentDetailedData = {};
    let emailOtp = '', mobileOtp = '';

    function showDetStep(n) {
        document.querySelectorAll('.detailed-step').forEach((s, idx) => {
            s.style.display = (idx + 1 === n) ? 'block' : 'none';
        });
    }

    // Step 1: RegGate
    if (detRegForm) {
        detRegForm.addEventListener('submit', function (e) {
            e.preventDefault();
            emailOtp = genOtp();
            mobileOtp = genOtp();
            document.getElementById('demoEmailOtp').textContent = emailOtp;
            document.getElementById('demoMobileOtp').textContent = mobileOtp;
            showDetStep(2);
        });
    }

    // Step 2: OTP Verify
    if (otpForm) {
        otpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const eo = document.getElementById('otp-email').value.trim();
            const mo = document.getElementById('otp-mobile').value.trim();
            if (eo === emailOtp && mo === mobileOtp) {
                showDetStep(3);
            } else {
                alert('Invalid OTPs. Please check the demo codes.');
            }
        });
    }

    // Step 3: Payment
    if (payNowBtn) {
        payNowBtn.addEventListener('click', () => {
            showDetStep(4);
        });
    }

    // Step 4: House Details
    if (houseDetailsForm) {
        houseDetailsForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const area = parseFloat(document.getElementById('hd-area').value);
            const bedrooms = parseInt(document.getElementById('hd-bedrooms').value);
            const bathrooms = parseInt(document.getElementById('hd-bathrooms').value);
            const balconies = parseInt(document.getElementById('hd-balconies').value);
            const cat = document.querySelector('input[name="hd-cat"]:checked').value;

            currentDetailedData = {
                area,
                bedrooms,
                bathrooms,
                balconies,
                category: cat,
                kidsRoom: document.getElementById('hd-kidsroom').checked,
                mandir: document.getElementById('hd-mandir').checked,
                study: document.getElementById('hd-study').checked,
                workType: document.getElementById('hd-worktype').value
            };

            generateRoomMatrix();
            showDetStep(5);
        });
    }

    // Step 5: Room Spec Matrix
    function generateRoomMatrix() {
        const cat = currentDetailedData.category;
        const specs = SPECS[cat];
        let html = '';

        const rooms = ['Living Room', 'Dining Room', 'Kitchen'];
        for (let i = 1; i <= currentDetailedData.bedrooms; i++) {
            rooms.push(i === 1 ? 'Master Bedroom' : `Bedroom ${i}`);
        }
        for (let i = 1; i <= currentDetailedData.bathrooms; i++) {
            rooms.push(i === 1 ? 'Master Bathroom' : `Bathroom ${i}`);
        }
        if (currentDetailedData.kidsRoom) rooms.push("Kid's Room");
        if (currentDetailedData.study) rooms.push("Study Room");
        if (currentDetailedData.mandir) rooms.push("Mandir / Pooja Unit");

        rooms.forEach((room, rIdx) => {
            html += `<div class="room-spec-card" data-room="${room}">
                <h4>${room}</h4>
                <div class="spec-grid">`;

            for (const [group, options] of Object.entries(specs)) {
                // Applicability Rules
                const isBath = room.toLowerCase().includes('bathroom');
                const isBed = room.toLowerCase().includes('bedroom') || room.toLowerCase().includes('kids');
                const isKitchen = room.toLowerCase().includes('kitchen');

                if (group === 'Bathroom Fittings' && !isBath) continue;
                if (group === 'Wardrobe' && !isBed) continue;
                if (group === 'TV Unit' && !isBed && !room.includes('Living')) continue;
                if (group === 'Counter Top' && !isKitchen) continue;
                if ((group === 'Designer Wall Finish' || group === 'False Ceiling') && (isKitchen || isBath)) continue;
                if (group === 'Doors' && !isBath) continue;

                html += `<div class="spec-item">
                    <label>${group}</label>
                    <select class="room-spec-select" data-group="${group}">
                        ${options.map(o => `<option>${o}</option>`).join('')}
                    </select>
                </div>`;
            }

            html += `</div>`;
            if (room.includes('Bedroom') && room !== 'Master Bedroom') {
                html += `<button type="button" class="btn btn-outline btn-sm copy-btn" onclick="copyMasterSpecs(this)">Copy from Master Bed</button>`;
            }
            html += `</div>`;
        });

        roomSpecsContainer.innerHTML = html;
    }

    window.copyMasterSpecs = function (btn) {
        const master = document.querySelector('.room-spec-card[data-room="Master Bedroom"]');
        if (!master) return;
        const current = btn.closest('.room-spec-card');
        const masterSelects = master.querySelectorAll('select');
        const currentSelects = current.querySelectorAll('select');
        masterSelects.forEach((ms, i) => {
            if (currentSelects[i]) currentSelects[i].value = ms.value;
        });
    };

    // Step 6: Calculation
    if (detCalcBtn) {
        detCalcBtn.addEventListener('click', () => {
            const area = currentDetailedData.area;
            const cat = currentDetailedData.category;
            const base = PRICING[cat];

            let totalMin = area * base.min;
            let totalMax = area * base.max;

            if (currentDetailedData.workType === 'renovation') {
                totalMin *= RENOVATION_MULTIPLIER;
                totalMax *= RENOVATION_MULTIPLIER;
            }

            const resEl = document.getElementById('detailedEstimateResult');
            resEl.innerHTML = `
                <div class="estimate-result-summary">
                    <div class="res-item"><span>Category:</span> <strong>${cat}</strong></div>
                    <div class="res-item"><span>Area:</span> <strong>${area} sq ft</strong></div>
                    <div class="res-item"><span>Package Range:</span> <strong>${fmt(base.min)} – ${fmt(base.max)} /sqft</strong></div>
                    <hr/>
                    <div class="res-total">
                        <p>Estimated Total Investment Range:</p>
                        <h3>${fmt(totalMin)} – ${fmt(totalMax)}</h3>
                    </div>
                </div>
            `;
            showDetStep(6);
        });
    }
})();

// ══════════════════════════════════════════════════════════
// CLIENT AUTH (Login / Register)
// ══════════════════════════════════════════════════════════
(function initClientAuth() {
    const backdrop = document.getElementById('authModalBackdrop');
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('authModalClose');
    const loginIcon = document.querySelector('.nav-login-icon');
    const errEl = document.getElementById('authError');

    // Views
    const views = {
        mobile: document.getElementById('authViewMobile'),
        loginOtp: document.getElementById('authViewLoginOtp'),
        register: document.getElementById('authViewRegister'),
        registerOtp: document.getElementById('authViewRegisterOtp'),
        loggedIn: document.getElementById('authViewLoggedIn'),
    };

    let currentOtp = '';
    let pendingRegData = {};

    // ── Helpers ──────────────────────────────────────────────
    function getClients() {
        try { return JSON.parse(localStorage.getItem('exp_clients')) || {}; }
        catch { return {}; }
    }
    function saveClients(clients) {
        localStorage.setItem('exp_clients', JSON.stringify(clients));
    }
    function getSession() {
        try { return JSON.parse(localStorage.getItem('exp_session')) || null; }
        catch { return null; }
    }
    function saveSession(client) {
        localStorage.setItem('exp_session', JSON.stringify(client));
    }
    function clearSession() {
        localStorage.removeItem('exp_session');
    }
    function normMobile(m) {
        return m.replace(/\D/g, '').slice(-10); // last 10 digits
    }
    function genOtp() {
        return String(Math.floor(100000 + Math.random() * 900000));
    }
    function showView(name) {
        Object.values(views).forEach(v => v.classList.remove('active'));
        views[name].classList.add('active');
        errEl.textContent = '';
    }
    function showError(msg) { errEl.textContent = msg; }

    // ── Open / Close ──────────────────────────────────────────
    function renderEstimates(mobile) {
        const list = document.getElementById('authEstimatesList');
        const countEl = document.getElementById('authEstimatesCount');
        try {
            const estimates = JSON.parse(localStorage.getItem('exp_estimates_' + mobile) || '[]');
            countEl.textContent = estimates.length;
            if (estimates.length === 0) {
                list.innerHTML = '<p class="auth-estimates-empty">No estimates saved yet.<br/><a href="#estimate">Get an estimate →</a></p>';
                return;
            }
            list.innerHTML = estimates.map(e => `
                <div class="auth-estimate-card">
                    <div class="est-type">${e.type} Estimate</div>
                    <div class="est-range">${e.min} – ${e.max}</div>
                    <div class="est-meta">${e.category} · ${e.area} sqft · ${e.date}</div>
                </div>`).join('');
        } catch { list.innerHTML = ''; }
    }

    function openModal() {
        const session = getSession();
        if (session) {
            showView('loggedIn');
            document.getElementById('authWelcomeName').textContent = `Welcome, ${session.name}!`;
            document.getElementById('authWelcomeSub').textContent = `Logged in as ${session.mobile}`;
            renderEstimates(session.mobile);
        } else {
            showView('mobile');
            document.getElementById('auth-mobile').value = '';
        }
        modal.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    loginIcon.addEventListener('click', e => { e.preventDefault(); openModal(); });
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // ── Update icon state ─────────────────────────────────────
    function refreshIconState() {
        if (getSession()) {
            loginIcon.classList.add('logged-in');
            loginIcon.title = 'My Account';
        } else {
            loginIcon.classList.remove('logged-in');
            loginIcon.title = 'Client Login';
        }
    }
    refreshIconState();

    // ── View 1: Mobile entry ──────────────────────────────────
    document.getElementById('authMobileNext').addEventListener('click', () => {
        const raw = document.getElementById('auth-mobile').value.trim();
        const mobile = normMobile(raw);
        if (mobile.length < 10) { showError('Please enter a valid 10-digit mobile number.'); return; }

        const clients = getClients();
        if (clients[mobile]) {
            // Registered → OTP login
            currentOtp = genOtp();
            document.getElementById('loginOtpDemo').textContent = `Demo OTP: ${currentOtp}`;
            showView('loginOtp');
            document.getElementById('auth-login-otp').value = '';
        } else {
            // Not registered → prompt register
            showView('register');
            document.getElementById('reg-mobile').value = raw;
            document.getElementById('reg-name').value = '';
            document.getElementById('reg-email').value = '';
        }
    });

    // ── View 2: Login OTP verify ──────────────────────────────
    document.getElementById('authVerifyLoginOtp').addEventListener('click', () => {
        const entered = document.getElementById('auth-login-otp').value.trim();
        if (entered !== currentOtp) { showError('Incorrect OTP. Please try again.'); return; }

        const raw = document.getElementById('auth-mobile').value.trim();
        const mobile = normMobile(raw);
        const client = getClients()[mobile];
        saveSession(client);
        refreshIconState();
        showView('loggedIn');
        document.getElementById('authWelcomeName').textContent = `Welcome back, ${client.name}!`;
        document.getElementById('authWelcomeSub').textContent = `Logged in as ${mobile}`;
    });

    document.getElementById('backToMobile').addEventListener('click', e => {
        e.preventDefault(); showView('mobile');
    });

    // ── View 3: Register form ─────────────────────────────────
    document.getElementById('authSendRegOtp').addEventListener('click', () => {
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const raw = document.getElementById('reg-mobile').value.trim();
        const mobile = normMobile(raw);

        if (!name) { showError('Please enter your full name.'); return; }
        if (!email || !email.includes('@')) { showError('Please enter a valid email address.'); return; }
        if (mobile.length < 10) { showError('Please enter a valid 10-digit mobile number.'); return; }

        const clients = getClients();
        if (clients[mobile]) { showError('This mobile is already registered. Please login instead.'); return; }

        pendingRegData = { name, email, mobile };
        currentOtp = genOtp();
        document.getElementById('regOtpDemo').textContent = `Demo OTP: ${currentOtp}`;
        showView('registerOtp');
        document.getElementById('auth-reg-otp').value = '';
    });

    document.getElementById('goToRegister').addEventListener('click', e => {
        e.preventDefault(); showView('register');
    });
    document.getElementById('goToLogin').addEventListener('click', e => {
        e.preventDefault(); showView('mobile');
    });

    // ── View 4: Register OTP verify ───────────────────────────
    document.getElementById('authVerifyRegOtp').addEventListener('click', () => {
        const entered = document.getElementById('auth-reg-otp').value.trim();
        if (entered !== currentOtp) { showError('Incorrect OTP. Please try again.'); return; }

        const clients = getClients();
        clients[pendingRegData.mobile] = {
            name: pendingRegData.name,
            email: pendingRegData.email,
            mobile: pendingRegData.mobile,
            joinedOn: new Date().toLocaleDateString('en-IN')
        };
        saveClients(clients);
        saveSession(clients[pendingRegData.mobile]);
        refreshIconState();
        showView('loggedIn');
        document.getElementById('authWelcomeName').textContent = `Welcome, ${pendingRegData.name}!`;
        document.getElementById('authWelcomeSub').textContent = `Account created for ${pendingRegData.mobile}`;
    });

    document.getElementById('backToRegister').addEventListener('click', e => {
        e.preventDefault(); showView('register');
    });

    // ── View 5: Actions ───────────────────────────────────────
    document.getElementById('authGoEstimateBtn').addEventListener('click', () => {
        closeModal();
        location.hash = '#estimate';
    });

    document.getElementById('authExploreBtn').addEventListener('click', () => {
        closeModal();
    });

})();

// ══════════════════════════════════════════════════════════
// BOOKING GATE MODAL (hero "Book a Meeting" button)
// ══════════════════════════════════════════════════════════
(function initBookingGate() {
    const modal = document.getElementById('bookingGateModal');
    if (!modal) return;

    const closeBtn = document.getElementById('bgateClose');
    const panel1 = document.getElementById('bgatePanel1');
    const panel2 = document.getElementById('bgatePanel2');
    const panel3 = document.getElementById('bgatePanel3');
    const step1Ind = document.getElementById('bgateStep1Ind');
    const step2Ind = document.getElementById('bgateStep2Ind');
    const step3Ind = document.getElementById('bgateStep3Ind');
    const regForm = document.getElementById('bgateRegForm');
    const otpForm = document.getElementById('bgateOtpForm');
    const payBtn = document.getElementById('bgatePayBtn');
    const err1 = document.getElementById('bgateError1');
    const err2 = document.getElementById('bgateError2');

    let emailOtp = '', mobileOtp = '';

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        showPanel(1);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showPanel(n) {
        panel1.style.display = n === 1 ? 'block' : 'none';
        panel2.style.display = n === 2 ? 'block' : 'none';
        panel3.style.display = n === 3 ? 'block' : 'none';
        [step1Ind, step2Ind, step3Ind].forEach((el, i) => {
            el.classList.remove('active', 'done');
            if (i + 1 < n) el.classList.add('done');
            if (i + 1 === n) el.classList.add('active');
        });
    }

    // Open via hero button
    const heroBtn = document.getElementById('heroBookMeetingBtn');
    if (heroBtn) heroBtn.addEventListener('click', openModal);

    // Close button & backdrop click
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
    });

    // Step 1 → 2: Registration
    regForm.addEventListener('submit', e => {
        e.preventDefault();
        err1.textContent = '';
        const name = document.getElementById('bg-name').value.trim();
        const email = document.getElementById('bg-email').value.trim();
        const mobile = document.getElementById('bg-mobile').value.trim();
        const city = document.getElementById('bg-city').value;
        if (!name || !email || !mobile || !city) {
            err1.textContent = 'Please fill in all required fields.';
            return;
        }
        emailOtp = String(Math.floor(100000 + Math.random() * 900000));
        mobileOtp = String(Math.floor(100000 + Math.random() * 900000));
        document.getElementById('bgDemoEmail').textContent = emailOtp;
        document.getElementById('bgDemoMobile').textContent = mobileOtp;
        showPanel(2);
    });

    // Step 2 → 3: OTP Verification
    otpForm.addEventListener('submit', e => {
        e.preventDefault();
        err2.textContent = '';
        const eo = document.getElementById('bg-otp-email').value.trim();
        const mo = document.getElementById('bg-otp-mobile').value.trim();
        if (eo !== emailOtp || mo !== mobileOtp) {
            err2.textContent = 'Incorrect OTP. Check the demo codes shown above.';
            return;
        }
        showPanel(3);
    });

    // Step 3: Payment → close & scroll to calendar
    payBtn.addEventListener('click', () => {
        closeModal();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
})();


