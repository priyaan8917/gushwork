// ─── Image Carousel with Zoom Preview ───────────────────────────────────────

const images = [
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800",
    "https://images.unsplash.com/photo-1581093588401-22e1b0b1e6d0?w=800",
    "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800"
];

let currentIndex = 0;
let isZooming = false;

function setActiveSlide(index) {
    currentIndex = index;
    const mainImage = document.getElementById("mainImage");
    mainImage.style.opacity = "0";
    mainImage.style.transform = "scale(1.03)";
    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.style.opacity = "1";
        mainImage.style.transform = "scale(1)";
    }, 200);
    document.querySelectorAll(".thumbnails img").forEach((thumb, i) => {
        thumb.classList.toggle("active", i === currentIndex);
    });
}

function changeImage(img) {
    setActiveSlide(parseInt(img.getAttribute("data-index")));
}

function nextImage() { setActiveSlide((currentIndex + 1) % images.length); }
function prevImage() { setActiveSlide((currentIndex - 1 + images.length) % images.length); }

// ─── Zoom Preview on Hover ───────────────────────────────────────────────────

function initZoom() {
    const slider = document.querySelector(".slider");
    const mainImage = document.getElementById("mainImage");

    const zoomLens = document.createElement("div");
    zoomLens.id = "zoomLens";
    slider.appendChild(zoomLens);

    const zoomPreview = document.createElement("div");
    zoomPreview.id = "zoomPreview";
    zoomPreview.innerHTML = '<div id="zoomPreviewInner"></div>';
    slider.appendChild(zoomPreview);

    const zoomFactor = 2.5;

    function updateZoom(e) {
        const rect = mainImage.getBoundingClientRect();
        let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        const lensW = rect.width / zoomFactor;
        const lensH = rect.height / zoomFactor;
        let lensX = Math.max(0, Math.min(x - lensW / 2, rect.width - lensW));
        let lensY = Math.max(0, Math.min(y - lensH / 2, rect.height - lensH));
        zoomLens.style.left = lensX + "px";
        zoomLens.style.top = lensY + "px";
        zoomLens.style.width = lensW + "px";
        zoomLens.style.height = lensH + "px";
        const inner = document.getElementById("zoomPreviewInner");
        inner.style.backgroundImage = `url(${mainImage.src})`;
        inner.style.backgroundSize = `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`;
        inner.style.backgroundPosition = `-${lensX * zoomFactor}px -${lensY * zoomFactor}px`;
    }

    mainImage.addEventListener("mouseenter", () => {
        isZooming = true;
        zoomLens.style.opacity = "1";
        zoomPreview.style.opacity = "1";
        zoomPreview.style.transform = "scale(1)";
    });
    mainImage.addEventListener("mouseleave", () => {
        isZooming = false;
        zoomLens.style.opacity = "0";
        zoomPreview.style.opacity = "0";
        zoomPreview.style.transform = "scale(0.97)";
    });
    mainImage.addEventListener("mousemove", updateZoom);
}

// ─── Thumbnail Zoom Pill ─────────────────────────────────────────────────────

function initThumbnailZoom() {
    document.querySelectorAll(".thumbnails img").forEach((thumb, i) => {
        const pill = document.createElement("div");
        pill.className = "thumb-zoom-pill";
        const pillImg = document.createElement("img");
        pillImg.src = images[i];
        pill.appendChild(pillImg);
        thumb.parentNode.insertBefore(pill, thumb.nextSibling);
        thumb.addEventListener("mouseenter", () => pill.classList.add("visible"));
        thumb.addEventListener("mouseleave", () => pill.classList.remove("visible"));
    });
}

// ─── Initialize Thumbnails ───────────────────────────────────────────────────

function initThumbnails() {
    const thumbsContainer = document.querySelector(".thumbnails");
    thumbsContainer.innerHTML = "";
    images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Product view ${i + 1}`;
        img.setAttribute("data-index", i);
        img.onclick = () => changeImage(img);
        if (i === 0) img.classList.add("active");
        thumbsContainer.appendChild(img);
    });
}

// ─── Industry Slider ─────────────────────────────────────────────────────────

function scrollIndustries(direction) {
    const slider = document.getElementById("industrySlider");
    slider.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
}

// ─── DOMContentLoaded ────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                    other.querySelector('span').textContent = '▼';
                }
            });
            item.classList.toggle('active');
            item.querySelector('span').textContent = item.classList.contains('active') ? '▲' : '▼';
        });
    });

    // Process Tabs
    const tabs = document.querySelectorAll('.tab');
    const processContent = document.getElementById('process-content');
    const processData = {
        'raw-material': { title: 'High-Grade Raw Material Selection', text: 'We use only premium PE100 grade raw materials with optimal molecular weight distribution, ensuring superior mechanical properties and long-term performance.', points: ['Virgin PE100 grade material','Optimal molecular weight distribution','Advanced UV stabilizers and antioxidants','Consistent material properties'] },
        'extrusion': { title: 'Advanced Extrusion Process', text: 'State-of-the-art extrusion lines with precise temperature control ensure uniform wall thickness and optimal material properties throughout the pipe.', points: ['Computer-controlled extrusion parameters','Multi-zone heating system','Consistent melt flow rate','Automated process monitoring'] },
        'cooling': { title: 'Controlled Cooling System', text: 'Gradual cooling process prevents internal stresses and ensures dimensional stability of the pipes.', points: ['Multi-stage cooling tanks','Temperature-controlled water systems','Uniform cooling rate','Stress-free pipe structure'] },
        'sizing': { title: 'Precision Sizing & Calibration', text: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness.', points: ['Vacuum calibration system','Precise diameter control','Uniform wall thickness','Smooth internal and external surfaces'] },
        'quality': { title: 'Rigorous Quality Control', text: 'Every pipe undergoes comprehensive testing to ensure compliance with international standards.', points: ['Hydrostatic pressure testing','Dimensional verification','Material property testing','Visual inspection systems'] },
        'marking': { title: 'Clear Product Marking', text: 'Permanent marking with all essential information for easy identification and traceability.', points: ['Production date and batch number','Pressure rating and SDR','Standard compliance marks','Company branding'] },
        'cutting': { title: 'Precision Cutting', text: 'Automated cutting systems ensure accurate pipe lengths with clean, perpendicular cuts.', points: ['Planetary saw cutting','Burr-free cut edges','Custom length options','Minimal material waste'] },
        'packaging': { title: 'Secure Packaging & Storage', text: 'Proper packaging and storage methods protect pipes during transportation and storage.', points: ['UV-resistant wrapping','Secure bundling systems','End cap protection','Proper stacking guidelines'] }
    };
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const data = processData[tab.getAttribute('data-process')];
            if (data) {
                processContent.innerHTML = `<div class="process-box"><div class="process-text"><h3>${data.title}</h3><p>${data.text}</p><ul>${data.points.map(p=>`<li>${p}</li>`).join('')}</ul></div><div class="process-img"><img src="images/frame3.jpg" alt="${data.title}"></div></div>`;
            }
        });
    });

    // Init Carousel
    initThumbnails();
    initZoom();
    initThumbnailZoom();
    document.getElementById("mainImage").src = images[0];
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Form Validation
document.querySelectorAll('.form').forEach(form => {
    const button = form.querySelector('button');
    if (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const inputs = form.querySelectorAll('input[required]');
            let valid = true;
            inputs.forEach(input => {
                input.style.borderColor = input.value.trim() ? '#e2e8f0' : '#ef4444';
                if (!input.value.trim()) valid = false;
            });
            if (valid) {
                alert('Thank you for your interest! We will contact you soon.');
                form.querySelectorAll('input').forEach(input => input.value = '');
            }
        });
    }
});

// Auto-play
setInterval(() => { if (!isZooming) nextImage(); }, 5000);
