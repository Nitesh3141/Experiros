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
    { q: 'What services do you offer?', a: 'We offer end-to-end interior design and construction services for residential and commercial spaces, including design consultation, material selection, civil work, carpentry, electrical, plumbing, painting, and handover — all under one roof.' },
    { q: 'What services are not in your scope?', a: 'We do not undertake structural changes, external façade work, landscaping, or civil construction beyond the interior scope. We also do not supply loose furniture unless specifically contracted.' },
    { q: 'How is the payment schedule structured?', a: 'Payments are milestone-based: typically 10% at agreement, 40% at material procurement, 30% during execution, 15% at near-completion, and 5% at final handover. Exact milestones are defined in the project agreement.' },
    { q: 'Is the advance payment refundable?', a: 'The ₹1,000 registration deposit is fully refundable if we are unable to meaningfully engage with your project. Project advance payments follow the terms defined in the signed agreement.' },
    { q: 'How long will the project take?', a: 'Typical timelines range from 45–90 days depending on project size, scope, and category. A detailed timeline is shared at the agreement stage.' },
    { q: 'How will I receive project updates on a daily basis?', a: 'You will receive daily photo/video updates via WhatsApp from your dedicated Site Supervisor. A weekly summary call with your Project Manager is also scheduled.' },
    { q: 'How are design revisions handled?', a: 'We offer up to 3 design revision rounds at no extra cost. Additional revisions beyond this are charged at a nominal fee, agreed upon in advance.' },
    { q: 'How do we verify material authenticity?', a: 'All materials are sourced from authorized dealers and come with manufacturer warranties. You are welcome to visit our material yard or accompany our team for procurement.' },
    { q: 'Can we get our own material?', a: 'Yes, you may supply certain materials. However, Experiors will not be responsible for quality, warranty, or delays arising from client-supplied materials.' },
    { q: 'Do I get a Point of Contact (SPOC) for my project?', a: 'Absolutely. Every project is assigned a dedicated Project Manager who is your single point of contact from design to handover.' },
    { q: 'How can I add extra work during execution?', a: 'Additional scope can be added via a formal Change Order, which includes revised cost and timeline. No extra work is executed without written approval.' },
    { q: 'How often can I meet with a designer?', a: 'You can schedule meetings with your designer at any stage. Typically, 2–3 design meetings are held before finalization, and additional meetings can be arranged as needed.' },
    { q: 'Who will take approvals from the society RWA?', a: 'We assist you in preparing the necessary documents and drawings for RWA submission. However, the formal application and approval process is the client\'s responsibility.' },
    { q: 'How are disputes handled?', a: 'All disputes are first addressed through mutual discussion. If unresolved, they are escalated to our senior management. Our agreements include a formal dispute resolution clause.' },
    { q: 'Can I cancel the project midway?', a: 'Yes, with written notice. Cancellation charges apply based on work completed and materials procured. Details are specified in the project agreement.' },
    { q: 'Can I pause the project midway?', a: 'Projects can be paused for up to 30 days with prior notice. Extended pauses may attract remobilization charges and revised timelines.' },
    { q: 'Are there any hidden charges?', a: 'No. We pride ourselves on complete cost transparency. All costs are itemized in the estimate and agreement. Any changes to scope are documented via Change Orders before execution.' },
    { q: 'How will I get ₹1,000 back if I cancel the project?', a: 'If we are unable to meaningfully engage with your project, the ₹1,000 deposit is refunded within 7 working days to the original payment method.' },
    { q: 'Can I select some elements from Majesty and some from Harmony?', a: 'No. To maintain design coherence and quality standards, all rooms must use specifications from a single category. Mixing categories across rooms is not permitted.' },
    { q: 'Is there any late handover penalty?', a: 'Yes. If Experiors delays handover beyond the agreed date (excluding client-caused delays or force majeure), a penalty as defined in the agreement is applicable.' },
    { q: 'Is there a handover checklist?', a: 'Yes. A comprehensive handover checklist is shared with you before the final walkthrough. All items must be signed off before keys are handed over.' },
    { q: 'Why do you ask for payment for booking an appointment?', a: 'The ₹1,000 deposit ensures we engage only with serious clients, allowing us to dedicate quality time and resources to each project. It is fully refundable.' },
    { q: 'Is the payment refundable?', a: 'Yes, the ₹1,000 registration deposit is fully refundable if we cannot meaningfully engage with your project.' },
    { q: 'How many days will interior work in my house take?', a: 'Depending on the size and scope, interior work typically takes 45–90 days. A detailed project schedule is shared at the agreement stage.' },
    { q: 'Can I hire my own designer?', a: 'You may work with an external designer for concept and drawings. However, Experiors\' in-house team will be responsible for execution, and design coordination will be managed through us.' },
    { q: 'Do you offer any warranty on your work?', a: 'Yes. We offer a 1-year workmanship warranty on all executed work. Material warranties are as per the respective manufacturer\'s terms.' },
    { q: 'Why should I choose Experiors?', a: 'Experiors combines aesthetic excellence with operational integrity. We offer transparent pricing, dedicated project management, OTP-verified client onboarding, and a track record of delivering premium interiors on time and on budget across 7 cities.' }
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
// NAVBAR
// ══════════════════════════════════════════════════════════
(function initNavbar() {
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link[data-section]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.35 });
    sections.forEach(s => observer.observe(s));
})();

// ══════════════════════════════════════════════════════════
// GALLERY
// ══════════════════════════════════════════════════════════
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
        // Switch to Detailed Estimate tab
        document.getElementById('tabDetailed').click();
        document.getElementById('estimate').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('getDetailedLink')?.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('tabDetailed').click();
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
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
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
        document.getElementById('estimate').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('authExploreBtn').addEventListener('click', () => {
        closeModal();
    });

})();

