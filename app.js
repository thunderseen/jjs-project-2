/* =========================================================================
   Jayed Jaman Seen — Silky GSAP + Real Rigged 3D GLB + Multi-Layer Engine
   - GSAP 3 + ScrollTrigger Masked Text Reveals (Zero Jumpy Pop-Ins!)
   - Three.js GLTFLoader Rigged 3D Character (Head Bone Tracks Cursor + Wave!)
   - Smooth 3D Orbiting Tech Constellation Ring
   - Multi-Layer Studio Tabs + Live Device Lab + Dual Resume + Admin Panel
   ========================================================================= */

(() => {
  const STORE_KEY = "jayed_3d_portfolio_cfg_v1";

  function loadConfig() {
    const base = structuredClone(window.PORTFOLIO_CONFIG || {});
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (saved && saved.profile) {
        return { ...base, profile: { ...base.profile, ...saved.profile } };
      }
    } catch {}
    return base;
  }

  let CFG = loadConfig();

  const ORBIT_SKILLS = [
    { code: "WP", name: "WordPress", detail: "Core CMS, Child Themes & Site Management", accent: "#2dd4bf" },
    { code: "EL", name: "Elementor", detail: "Custom Responsive & Editorial Layouts", accent: "#fbbf24" },
    { code: "WOO", name: "WooCommerce", detail: "E-Commerce Catalogs, Cart UX & Checkout", accent: "#34d399" },
    { code: "SEO", name: "Rank Math SEO", detail: "On-Page Optimization, Schema & Speed", accent: "#f59e0b" },
    { code: "AI", name: "AI Workflows", detail: "ChatGPT, Claude, Gemini, Copilot & Codex", accent: "#2dd4bf" },
    { code: "SEM", name: "SEMrush & Ahrefs", detail: "Keyword Audits & Competitor Gap Analysis", accent: "#fbbf24" },
    { code: "GA4", name: "GA4 & GSC", detail: "Analytics Tracking & Search Console Ops", accent: "#34d399" },
    { code: "JS", name: "JavaScript & 3D", detail: "Interactive Frontend & Three.js WebGL", accent: "#facc15" },
    { code: "UI", name: "HTML5 & CSS3", detail: "Clean Semantic Markup & Responsive UI", accent: "#2dd4bf" },
    { code: "Ps", name: "Photoshop", detail: "Commercial Visuals & Brand Retouching", accent: "#fbbf24" },
    { code: "Ai", name: "Illustrator", detail: "Logos, Monograms & Promotional Graphics", accent: "#f59e0b" },
    { code: "ADS", name: "Meta Suite", detail: "Social Strategy, Ads & B2B/B2C Lead Gen", accent: "#34d399" }
  ];

  const ESTIMATOR_PRESETS = {
    "wp-business": {
      title: "WordPress Business / Portfolio Site",
      baseDays: 3,
      daysPerUnit: 0.45,
      items: [
        "WordPress installation, security hardening & speed caching",
        "Custom responsive pages crafted in Elementor / Gutenberg",
        "Phone, tablet & desktop QA + WhatsApp / lead forms",
        "Clear handover walkthrough for effortless self-editing"
      ]
    },
    "woocommerce": {
      title: "WooCommerce Online Store",
      baseDays: 5,
      daysPerUnit: 0.55,
      items: [
        "Complete WooCommerce storefront & product catalog setup",
        "Custom product cards, slide-out cart & checkout UX",
        "Payment gateway, shipping zones & order notifications",
        "Mobile conversion & Core Web Vitals optimization"
      ]
    },
    "ai-webapp": {
      title: "AI-Assisted Web App / Custom Portal",
      baseDays: 5,
      daysPerUnit: 0.55,
      items: [
        "Custom interactive web portal architecture & modern UI",
        "AI-assisted workflow logic & dynamic data handling",
        "Cross-browser responsive layout & interactive QA",
        "Cloud deployment (Render / GitHub Pages) & documentation"
      ]
    },
    "seo-leadgen": {
      title: "Keyword Research, SEO & B2B Lead Gen",
      baseDays: 2,
      daysPerUnit: 0.35,
      items: [
        "Profitable keyword research & search-intent mapping",
        "Competitor gap audit & page-level SEO blueprint",
        "On-page Rank Math SEO, Search Console & GA4 setup",
        "Verified B2B/B2C prospect list ready for outreach"
      ]
    }
  };

  /* -------------------- 1. APPLY EDITABLE CONFIG TO DOM -------------------- */
  function applyProfileToDOM() {
    const p = CFG.profile;
    document.getElementById("hero-greeting").textContent = p.greeting || "Hello, I'm";
    document.getElementById("hero-first").textContent = p.firstName || "JAYED";
    document.getElementById("hero-last").textContent = p.lastName || "JAMAN SEEN";
    document.getElementById("hero-role").innerHTML = p.role.includes("AI")
      ? p.role.replace(/(AI[^<]*)/i, '<span class="gold-accent">$1</span>')
      : p.role;

    document.getElementById("copy-header-email").textContent = p.email;
    document.getElementById("about-body").textContent = p.aboutBody;
    document.getElementById("contact-email-text").textContent = p.email;
    document.getElementById("contact-email-link").href = `mailto:${p.email}`;
    document.getElementById("contact-wa-link").href = `https://wa.me/${p.whatsapp}?text=Hi%20Jayed%2C%20I%20saw%20your%203D%20portfolio.`;
    document.getElementById("about-wa-link").href = `https://wa.me/${p.whatsapp}?text=Hi%20Jayed%2C%20I%20saw%20your%203D%20portfolio.`;
    document.getElementById("about-fiverr-link").href = p.fiverr;
    document.getElementById("contact-fiverr-link").href = p.fiverr;
    document.getElementById("sig-name").textContent = `${p.firstName} ${p.lastName}`;
    document.getElementById("sig-role").textContent = p.role;
  }

  /* -------------------- 2. GLOBAL MOUSE & TOAST -------------------- */
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, nx: 0, ny: 0 };
  const smooth = { x: window.innerWidth / 2, y: window.innerHeight / 2, nx: 0, ny: 0 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.nx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ny = (e.clientY / window.innerHeight) * 2 - 1;
  });

  let toastTimer = null;
  function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  async function copyText(text, label) {
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    showToast(label || "Copied!");
  }

  function initCursor() {
    const aura = document.getElementById("mouse-aura");
    const ring = document.getElementById("cursor-ring");
    const dot = document.getElementById("cursor-dot");
    const auraPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener("mousemove", () => {
      if (aura) aura.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
      if (dot) dot.style.opacity = "1";
    }, { once: true });

    const hoverSel = "a, button, .bracket-card, .work-preview-box, .contact-icon-row, input, label";
    document.addEventListener("mouseover", (e) => { if (e.target.closest(hoverSel)) ring?.classList.add("is-hover"); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest(hoverSel)) ring?.classList.remove("is-hover"); });

    function loop() {
      smooth.x += (mouse.x - smooth.x) * 0.16;
      smooth.y += (mouse.y - smooth.y) * 0.16;
      auraPos.x += (mouse.x - auraPos.x) * 0.08;
      auraPos.y += (mouse.y - auraPos.y) * 0.08;

      if (aura) aura.style.transform = `translate3d(${auraPos.x - 280}px, ${auraPos.y - 280}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${smooth.x - 20}px, ${smooth.y - 20}px, 0)`;
      if (dot) dot.style.transform = `translate3d(${mouse.x - 3}px, ${mouse.y - 3}px, 0)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* -------------------- 3. ULTRA-SMOOTH LENIS SCROLL + SILKY GSAP TEXT BLOOM -------------------- */
  let lenisInstance = null;

  function initSmoothScrollAndGSAP() {
    // 1. Lenis butter-smooth inertial wheel scrolling synced to GSAP ticker
    if (typeof Lenis !== "undefined") {
      lenisInstance = new Lenis({
        duration: 1.35,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4
      });

      if (typeof ScrollTrigger !== "undefined") {
        lenisInstance.on("scroll", ScrollTrigger.update);
      }

      if (typeof gsap !== "undefined") {
        gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(t) { lenisInstance.raf(t); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      }

      // Smooth anchor navigation via Lenis
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const id = anchor.getAttribute("href");
          const target = id && id.length > 1 ? document.querySelector(id) : null;
          if (target) {
            e.preventDefault();
            lenisInstance.scrollTo(target, { offset: -64, duration: 1.3 });
          }
        });
      });
    }

    if (typeof gsap === "undefined") return;
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    // 2. Crisp, silky Hero entrance
    gsap.from(".hero-anim", {
      y: 18,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "transform"
    });

    // 3. Responsive, non-delayed scroll reveals (smooth and immediate as content enters)
    document.querySelectorAll(".gsap-line").forEach((el) => {
      gsap.from(el, {
        y: 16,
        opacity: 0,
        duration: 0.68,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          toggleActions: "play none none none"
        }
      });
    });

    document.querySelectorAll(".gsap-fade").forEach((el) => {
      gsap.from(el, {
        y: 14,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  /* -------------------- 4. BORDERLESS REAL 3D .GLB SCULPTURE / AVATAR LOADER -------------------- */
  let glbScene = null, glbModel = null, glbPivot = null, glbMixer = null, glbActions = {}, glbHeadBone = null, glbNeckBone = null, glbRendererInited = false;
  let glbSpinOffset = 0;

  function createStudioPBRMaterial() {
    // Luxury dark brushed-obsidian metallic finish that catches Emerald-Teal & Gold rim lights like a gallery statue
    return new THREE.MeshStandardMaterial({
      color: 0x1c2229,
      metalness: 0.72,
      roughness: 0.28
    });
  }

  function loadGLBAvatar(url) {
    const stillImg = document.getElementById("avatar-still-img");
    const canvas = document.getElementById("glb-avatar-canvas");
    const status = document.getElementById("glb-status");

    if (!url || typeof THREE === "undefined" || typeof THREE.GLTFLoader === "undefined") {
      stillImg?.classList.remove("hidden");
      canvas?.classList.add("hidden");
      if (status) status.classList.add("hidden");
      return;
    }

    stillImg?.classList.add("hidden");
    canvas?.classList.remove("hidden");
    if (!glbRendererInited) initGLBRenderer();

    if (status) {
      status.textContent = "Loading 3D Sculpture...";
      status.classList.remove("hidden");
    }

    const loader = new THREE.GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        if (glbPivot && glbModel) glbPivot.remove(glbModel);
        glbModel = gltf.scene;
        glbHeadBone = null;
        glbNeckBone = null;
        glbActions = {};

        const box = new THREE.Box3().setFromObject(glbModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.95 / maxDim;
        glbModel.scale.setScalar(scale);
        glbModel.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

        const studioMat = createStudioPBRMaterial();

        glbModel.traverse((obj) => {
          if (obj.isBone) {
            const n = obj.name.toLowerCase();
            if (!glbHeadBone && (n === "head" || n.includes("mixamorighead") || n.includes("head_4"))) {
              glbHeadBone = obj;
            } else if (!glbNeckBone && n.includes("neck")) {
              glbNeckBone = obj;
            }
          }
          if (obj.isMesh && obj.geometry) {
            // Compute smooth vertex normals for raw sculpted meshes that lack NORMAL attribute
            if (!obj.geometry.attributes.normal) {
              obj.geometry.computeVertexNormals();
            }
            // Apply luxury studio PBR shader if the mesh has no image texture or vertex colors
            const hasTex = obj.material && (obj.material.map || obj.geometry.attributes.color);
            if (!hasTex) {
              obj.material = studioMat;
            }
          }
        });

        glbPivot.add(glbModel);

        if (gltf.animations && gltf.animations.length) {
          glbMixer = new THREE.AnimationMixer(glbModel);
          gltf.animations.forEach((clip) => {
            glbActions[clip.name.toLowerCase()] = glbMixer.clipAction(clip);
          });
          const idle = glbActions["idle"] || glbActions[Object.keys(glbActions)[0]];
          if (idle) idle.play();
        }

        if (status) status.classList.add("hidden");
      },
      undefined,
      () => {
        stillImg?.classList.remove("hidden");
        canvas?.classList.add("hidden");
        if (status) status.classList.add("hidden");
        showToast("Could not load .GLB — showing borderless portrait.");
      }
    );
  }

  function initGLBRenderer() {
    if (glbRendererInited || typeof THREE === "undefined") return;
    const canvas = document.getElementById("glb-avatar-canvas");
    if (!canvas) return;
    glbRendererInited = true;

    glbScene = new THREE.Scene();
    glbPivot = new THREE.Group();
    glbScene.add(glbPivot);

    const w = canvas.clientWidth || 490;
    const h = canvas.clientHeight || 490;
    const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
    camera.position.set(0, 0.05, 5.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    window.addEventListener("resize", () => {
      const nw = canvas.clientWidth || 490;
      const nh = canvas.clientHeight || 490;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    });

    // Museum-grade 4-point lighting (Soft Front Key + Emerald Left Rim + Burnished Gold Right Rim + Top Hair Light)
    glbScene.add(new THREE.HemisphereLight(0xdffbf7, 0x050608, 0.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(0.8, 2.8, 4.5);
    glbScene.add(keyLight);

    const rimEmerald = new THREE.PointLight(0x2dd4bf, 4.2, 18);
    rimEmerald.position.set(-3.6, 1.2, 1.4);
    glbScene.add(rimEmerald);

    const rimGold = new THREE.PointLight(0xfbbf24, 3.8, 18);
    rimGold.position.set(3.6, 0.8, 1.4);
    glbScene.add(rimGold);

    const backRim = new THREE.DirectionalLight(0x5eead4, 1.1);
    backRim.position.set(0, 3.2, -4.0);
    glbScene.add(backRim);

    // Smooth 360° drag-to-spin interaction
    let dragging = false, prevX = 0;
    canvas.addEventListener("pointerdown", (e) => { dragging = true; prevX = e.clientX; });
    window.addEventListener("pointerup", () => { dragging = false; });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      glbSpinOffset += (e.clientX - prevX) * 0.012;
      prevX = e.clientX;
    });

    // Pause WebGL rendering whenever #about is scrolled off-screen for locked 60-120 FPS page scrolling!
    let glbInView = true;
    const visObserver = new IntersectionObserver((entries) => {
      glbInView = entries[0]?.isIntersecting ?? true;
    }, { rootMargin: "200px 0px" });
    visObserver.observe(canvas);

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!glbInView) return;
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      if (glbMixer) glbMixer.update(dt);
      if (!dragging) glbSpinOffset *= 0.96;

      if (glbPivot && glbModel) {
        // Real 3D mouse-tracking rotation (zero distortion!) + subtle floating breath
        const targetY = smooth.nx * 0.48 + glbSpinOffset;
        const targetX = smooth.ny * 0.22;
        glbPivot.rotation.y += (targetY - glbPivot.rotation.y) * 0.08;
        glbPivot.rotation.x += (targetX - glbPivot.rotation.x) * 0.08;
        glbPivot.position.y = Math.sin(t * 1.4) * 0.06;

        if (glbHeadBone) {
          glbHeadBone.rotation.y += (smooth.nx * 0.45 - glbHeadBone.rotation.y) * 0.14;
          glbHeadBone.rotation.x += (smooth.ny * 0.24 - glbHeadBone.rotation.x) * 0.14;
        }
        if (glbNeckBone) {
          glbNeckBone.rotation.y += (smooth.nx * 0.16 - glbNeckBone.rotation.y) * 0.1;
        }
      }

      renderer.render(glbScene, camera);
    }
    animate();
  }

  function initGLBStage() {
    loadGLBAvatar(CFG.profile.avatarGlb || "");
  }

  /* -------------------- 5. SMOOTH 3D ORBITING TECH CONSTELLATION -------------------- */
  function createOrbTexture(skill) {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext("2d");

    const g = ctx.createLinearGradient(0, 0, 512, 256);
    g.addColorStop(0, "#0b1116");
    g.addColorStop(0.5, "#111921");
    g.addColorStop(1, "#090d11");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = skill.accent;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 40); ctx.lineTo(512, 40);
    ctx.moveTo(0, 216); ctx.lineTo(512, 216);
    ctx.stroke();
    ctx.globalAlpha = 1;

    [128, 384].forEach((cx) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, 128, 66, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(5, 7, 10, 0.9)";
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = skill.accent;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 44px 'Geist', 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(skill.code, cx, 118);

      ctx.fillStyle = skill.accent;
      ctx.font = "600 16px 'JetBrains Mono', monospace";
      ctx.fillText(skill.name.toUpperCase().slice(0, 12), cx, 158);
      ctx.restore();
    });

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }

  function initTechOrbitConstellation() {
    if (typeof THREE === "undefined") return;
    const canvas = document.getElementById("techstack-orbit-canvas");
    const statusLabel = document.getElementById("orbit-status-label");
    const legend = document.getElementById("orbit-legend");
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 2, 0.1, 100);
    camera.position.set(0, 3.5, 13.8);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resize() {
      const w = canvas.clientWidth || 1000;
      const h = canvas.clientHeight || 460;
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 20 : w < 1024 ? 16 : 13.4;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener("resize", resize);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(4, 8, 9);
    scene.add(key);

    const leftTeal = new THREE.PointLight(0x2dd4bf, 2.4, 30);
    leftTeal.position.set(-9, 2, 5);
    scene.add(leftTeal);

    const rightGold = new THREE.PointLight(0xfbbf24, 2.2, 30);
    rightGold.position.set(9, 1, 5);
    scene.add(rightGold);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = 0.24;
    scene.add(orbitGroup);

    const coreMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, 1),
      new THREE.MeshStandardMaterial({ color: 0x0c1618, emissive: 0x14b8a6, emissiveIntensity: 0.35, wireframe: true })
    );
    orbitGroup.add(coreMesh);

    const innerCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.45, roughness: 0.2, metalness: 0.8 })
    );
    orbitGroup.add(innerCore);

    const ringOuter = new THREE.Mesh(
      new THREE.TorusGeometry(5.6, 0.022, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.42 })
    );
    ringOuter.rotation.x = Math.PI / 2;
    orbitGroup.add(ringOuter);

    const ringInner = new THREE.Mesh(
      new THREE.TorusGeometry(3.8, 0.018, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.32 })
    );
    ringInner.rotation.x = Math.PI / 2;
    orbitGroup.add(ringInner);

    const radius = 5.6;
    const sphereGeo = new THREE.SphereGeometry(0.84, 36, 36);
    const nodes = [];

    ORBIT_SKILLS.forEach((skill, i) => {
      const angle = (i / ORBIT_SKILLS.length) * Math.PI * 2;
      const mat = new THREE.MeshStandardMaterial({
        map: createOrbTexture(skill),
        roughness: 0.2,
        metalness: 0.38,
        emissive: new THREE.Color(skill.accent),
        emissiveIntensity: 0.08
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(Math.cos(angle) * radius, Math.sin(i * 1.1) * 0.35, Math.sin(angle) * radius);
      mesh.userData = { skill, index: i, baseAngle: angle };
      orbitGroup.add(mesh);
      nodes.push(mesh);
    });

    if (legend) {
      legend.innerHTML = ORBIT_SKILLS.map((s, idx) =>
        `<button type="button" class="orbit-chip" data-orbit-idx="${idx}">${s.name}</button>`
      ).join("");
    }

    let focusedIdx = -1, targetOrbitAngle = 0, currentOrbitAngle = 0, dragging = false, lastX = 0, dragVel = 0;

    function selectSkill(idx) {
      focusedIdx = idx;
      const skill = ORBIT_SKILLS[idx];
      if (!skill) return;
      targetOrbitAngle = Math.PI / 2 - nodes[idx].userData.baseAngle;
      if (statusLabel) statusLabel.textContent = `${skill.name} — ${skill.detail}`;
      legend?.querySelectorAll(".orbit-chip").forEach((c, i) => c.classList.toggle("active", i === idx));
    }

    legend?.querySelectorAll(".orbit-chip").forEach((chip) => {
      chip.addEventListener("click", () => selectSkill(Number(chip.dataset.orbitIdx)));
    });

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2(-99, -99);
    let hoveredNode = null;

    canvas.addEventListener("pointerdown", (e) => { dragging = true; focusedIdx = -1; lastX = e.clientX; });
    window.addEventListener("pointerup", () => { dragging = false; });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (dragging) {
        dragVel = (e.clientX - lastX) * 0.0055;
        targetOrbitAngle += dragVel;
        lastX = e.clientX;
        return;
      }
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodes);
      hoveredNode = hits.length ? hits[0].object : null;
      if (hoveredNode && statusLabel) {
        const { name, detail } = hoveredNode.userData.skill;
        statusLabel.textContent = `${name} — ${detail}`;
        legend?.querySelectorAll(".orbit-chip").forEach((c, i) => c.classList.toggle("active", i === hoveredNode.userData.index));
      } else if (focusedIdx === -1 && statusLabel) {
        statusLabel.textContent = "Hover any orbiting 3D node · Drag horizontally to rotate the ring";
        legend?.querySelectorAll(".orbit-chip").forEach((c) => c.classList.remove("active"));
      }
    });

    canvas.addEventListener("pointerleave", () => { hoveredNode = null; });

    const clock = new THREE.Clock();
    function animate() {
      const t = clock.getElapsedTime();
      if (!dragging && !hoveredNode && focusedIdx === -1) {
        targetOrbitAngle += 0.0032 + dragVel;
        dragVel *= 0.94;
      }
      currentOrbitAngle += (targetOrbitAngle - currentOrbitAngle) * 0.07;
      orbitGroup.rotation.y = currentOrbitAngle;
      coreMesh.rotation.y = -t * 0.45;
      coreMesh.rotation.x = t * 0.25;
      innerCore.rotation.y = t * 0.85;

      for (const n of nodes) {
        const isHot = n === hoveredNode || n.userData.index === focusedIdx;
        const sc = isHot ? 1.28 : 1.0;
        n.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.12);
        n.material.emissiveIntensity += ((isHot ? 0.42 : 0.08) - n.material.emissiveIntensity) * 0.12;
        n.rotation.y = -currentOrbitAngle - Math.PI / 2 + Math.sin(t * 0.8 + n.userData.index) * 0.16;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* -------------------- 6. MULTI-LAYER STUDIO TABS & WORK GALLERY -------------------- */
  function initMultiLayerTabs() {
    document.querySelectorAll("[data-layer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.layer;
        document.querySelectorAll("[data-layer]").forEach((b) => {
          const on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", String(on));
        });
        document.querySelectorAll(".layer-panel").forEach((panel) => {
          const on = panel.id === `layer-${target}`;
          panel.classList.toggle("active", on);
          if (on && typeof gsap !== "undefined") {
            gsap.fromTo(panel, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
          }
        });
      });
    });

    document.getElementById("jump-estimator-btn")?.addEventListener("click", () => {
      document.querySelector('[data-layer="packages"]')?.click();
      document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function renderWorkGallery() {
    const track = document.getElementById("work-track");
    if (!track) return;
    const list = CFG.projects || [];
    track.innerHTML = list.map((p, index) => `
      <article class="work-col ${index % 2 === 1 ? "alt-order" : ""}">
        <div class="work-col-meta">
          <div class="work-num-row">
            <span class="work-num">${p.num}</span>
            <span class="work-cat">${p.cat}</span>
          </div>
          <h3>${p.title}</h3>
          <div class="work-tools-label">Tools and features</div>
          <p class="work-tools-text">${p.tools}</p>
        </div>

        <div class="work-preview-box ${p.previewClass}" data-open-project="${p.id}" role="button" tabindex="0" aria-label="Preview ${p.title}">
          <div class="work-preview-top">
            <span>${p.previewTag}</span>
            <span>${p.demoUrl ? "LIVE DEMO" : "CASE"}</span>
          </div>
          <div class="work-preview-title">${p.previewHeading}</div>
          <div class="work-preview-foot">
            <span>${p.previewFoot}</span>
            <span>${p.cta}</span>
          </div>
        </div>
      </article>
    `).join("");

    track.querySelectorAll("[data-open-project]").forEach((box) => {
      const openHandler = () => {
        const proj = list.find((p) => p.id === box.dataset.openProject);
        if (!proj) return;
        if (proj.demoUrl) {
          document.getElementById("demo-modal-title").textContent = proj.title;
          document.getElementById("demo-iframe").src = proj.demoUrl;
          document.getElementById("demo-open-ext").href = proj.externalUrl;
          openModal("demo-modal");
        } else {
          window.open(proj.externalUrl, "_blank", "noopener,noreferrer");
        }
      };
      box.addEventListener("click", openHandler);
      box.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openHandler(); } });
    });

    document.getElementById("work-prev")?.addEventListener("click", () => track.scrollBy({ left: -400, behavior: "smooth" }));
    document.getElementById("work-next")?.addEventListener("click", () => track.scrollBy({ left: 400, behavior: "smooth" }));
  }

  /* -------------------- 7. ESTIMATOR, RESUME & ADMIN PANEL -------------------- */
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("open");
    if (id === "demo-modal") document.getElementById("demo-iframe").src = "about:blank";
    document.body.style.overflow = "";
  }

  let estService = "wp-business";
  function updateEstimator() {
    const preset = ESTIMATOR_PRESETS[estService];
    const units = Number(document.getElementById("est-units")?.value || 5);
    const addSeo = document.getElementById("addon-seo")?.checked;
    const addLeads = document.getElementById("addon-leads")?.checked;
    const addAi = document.getElementById("addon-ai")?.checked;
    const addMulti = document.getElementById("addon-multi")?.checked;

    let extra = 0;
    const list = [...preset.items];
    if (addSeo) { extra += 1; list.push("Keyword Research & Rank Math Technical SEO"); }
    if (addLeads) { extra += 1; list.push("Targeted B2B/B2C Verified Prospect List"); }
    if (addAi) { extra += 0.5; list.push("AI Copy & Custom Visual Brand Assets"); }
    if (addMulti) { extra += 1.5; list.push("Multilingual / Membership (CPT & ACF)"); }

    const minD = Math.max(2, Math.round(preset.baseDays + units * preset.daysPerUnit + extra));
    const days = `${minD}–${minD + 2} Days`;

    document.getElementById("est-units-val").textContent = `${units} Units`;
    document.getElementById("est-out-title").textContent = preset.title;
    document.getElementById("est-out-days").textContent = days;
    document.getElementById("est-out-list").innerHTML = list.map((x) => `<li>${x}</li>`).join("");

    return `Hi Jayed! Project scope from your 3D Portfolio:\n• Service: ${preset.title}\n• Scope: ${units} Units/Pages\n• Estimated Turnaround: ${days}\n• Deliverables:\n${list.map((i) => `  - ${i}`).join("\n")}`;
  }

  const ATS_TEXT = `JAYED JAMAN SEEN
WordPress Web Developer & AI Tools Specialist
Barishal, Bangladesh (Remote Worldwide, GMT+6)
Email: thunderseen@gmail.com | WhatsApp: Available via portfolio link
Fiverr: https://www.fiverr.com/jayedjaman_seen?public_mode=true | GitHub: https://github.com/JJSEEN | LinkedIn: https://www.linkedin.com/in/jayed-jaman-seen-b540b8334/

SUMMARY
WordPress & WooCommerce developer and B.Sc. CSE undergraduate pairing responsive front-end craft with practical AI workflows (ChatGPT, Claude, Gemini, GitHub Copilot, OpenAI Codex) and technical SEO (Rank Math, SEMrush, Ahrefs, GA4, GSC). IELTS Band 6.5 (CEFR B2) & DET 90/160.

EXPERIENCE
- WordPress Web Developer & AI Tools Specialist | Freelance / Fiverr (2025 – Present, Remote)
  * Build responsive WordPress & WooCommerce sites using Elementor, Gutenberg, child themes, CPT & ACF.
  * Combine keyword research, Rank Math SEO, and B2B/B2C lead generation with AI-assisted workflows.
  * Independently built and deployed Automated Student ID Card Web App on Render (student-id-portal-1.onrender.com).
- Social Media & Digital Marketing Specialist | M/S Munni Trading & Co. / The Chanachur Factory (May 2021 – Present, Barishal)
  * Manage social strategy, content calendars, commercial photography/videography, promotional graphics, and digital lead generation.

CERTIFICATIONS & TRAINING
- Artificial Intelligence for Professionals (2026) — Bangladesh Computer Council (BCC), ICT Division, Barishal
- Freelancing & ICT Skills Development, 600 Hours, 8th Batch (Oct–Dec 2026, In Progress) — DYD Barishal, Elected 1st-Month Class Representative (CR)

EDUCATION
- B.Sc. in Computer Science & Engineering — Trust University, Barishal (In Progress)
- HSC (Science) — Government Syed Hatem Ali College, Barishal (2020 · GPA 5.00/5.00)
- SSC (Science) — Shahid Abdur Rab Serniyabad Govt. Secondary School (2018 · GPA 4.61/5.00)

LANGUAGES & HONORS
- Languages: Bengali (Native), English (IELTS Academic 6.5 / CEFR B2, DET 90/160)
- Honors: 1st-Month CR (DYD 2026), Best Volunteer Award (Lal Sabuj Society 2019), National Archery Competitor U-16 (2016), Student Cabinet Member`;

  let cvFormat = "visual";
  function renderResume() {
    const sheet = document.getElementById("cv-sheet");
    if (!sheet) return;
    const term = (document.getElementById("cv-search")?.value || "").trim();

    let html = cvFormat === "visual" ? `
      <div class="cv-visual-head">
        <img src="assets/jayed-black.jpg" alt="Jayed Jaman Seen" class="cv-photo" />
        <div>
          <h2 style="font-size:1.45rem;color:#0f172a;">${CFG.profile.firstName} ${CFG.profile.lastName}</h2>
          <div style="color:#0f766e;font-weight:600;font-size:0.9rem;">${CFG.profile.role}</div>
          <div style="font-size:0.78rem;color:#475569;margin-top:3px;">${CFG.profile.location} · ${CFG.profile.email} · IELTS 6.5</div>
        </div>
      </div>
      <div class="cv-grid">
        <div>
          <div class="cv-block"><h3>Profile</h3><p>${CFG.profile.aboutBody}</p></div>
          <div class="cv-block">
            <h3>Experience</h3>
            <p><strong>WordPress Web Developer &amp; AI Tools Specialist</strong> — Freelance / Fiverr (2025 – Present)</p>
            <ul>
              <li>Build responsive WordPress &amp; WooCommerce sites with Elementor, Gutenberg, child themes, CPT &amp; ACF.</li>
              <li>Combine keyword research, Rank Math SEO, GA4/GSC setup, and verified B2B/B2C lead lists.</li>
              <li>Built &amp; deployed Student ID Card Web App on Render (student-id-portal-1.onrender.com).</li>
            </ul>
            <p style="margin-top:8px;"><strong>Social Media &amp; Digital Marketing Specialist</strong> — M/S Munni Trading &amp; Co. (May 2021 – Present)</p>
            <ul><li>Manage social strategy, Meta Business Suite, commercial photo/video, and brand graphics.</li></ul>
          </div>
          <div class="cv-block">
            <h3>Verified Certifications</h3>
            <ul>
              <li><strong>Artificial Intelligence for Professionals (2026)</strong> — Bangladesh Computer Council (BCC)</li>
              <li><strong>600-Hr Freelancing &amp; ICT (Oct–Dec 2026)</strong> — DYD Barishal (1st-Month CR)</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="cv-block"><h3>Core Stack</h3><p>WordPress, Elementor, Gutenberg, WooCommerce, CPT/ACF, Rank Math SEO, SEMrush, Ahrefs, GA4, GSC, ChatGPT, Claude, Gemini, GitHub Copilot, OpenAI Codex, Photoshop, Illustrator, Premiere Pro, Meta Ads.</p></div>
          <div class="cv-block">
            <h3>Education</h3>
            <ul>
              <li><strong>B.Sc. CSE</strong> — Trust University, Barishal (In Progress)</li>
              <li><strong>HSC Science (2020)</strong> — Govt. Syed Hatem Ali College · GPA 5.00</li>
              <li><strong>SSC Science (2018)</strong> — SARS Govt. School · GPA 4.61</li>
            </ul>
          </div>
          <div class="cv-block">
            <h3>Languages &amp; Honors</h3>
            <ul>
              <li>English: IELTS Academic 6.5 (CEFR B2) · DET 90/160</li>
              <li>Bengali: Native</li>
              <li>1st-Month CR (DYD) · Best Volunteer (2019) · National Archery U-16 (2016)</li>
            </ul>
          </div>
        </div>
      </div>
    ` : `<pre style="white-space:pre-wrap;font-family:'Inter',sans-serif;font-size:0.84rem;line-height:1.6;color:#0f172a;">${ATS_TEXT}</pre>`;

    if (term) {
      const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(new RegExp(`(${esc})(?![^<]*>)`, "gi"), "<mark>$1</mark>");
    }
    sheet.innerHTML = html;
  }

  function initAdminPanel() {
    const lockScreen = document.getElementById("admin-lock-screen");
    const editor = document.getElementById("admin-editor-body");
    const pinInput = document.getElementById("admin-pin-input");
    const pinErr = document.getElementById("admin-pin-err");

    function populateAdminForm() {
      const p = CFG.profile;
      document.getElementById("adm-first").value = p.firstName || "";
      document.getElementById("adm-last").value = p.lastName || "";
      document.getElementById("adm-role").value = p.role || "";
      document.getElementById("adm-email").value = p.email || "";
      document.getElementById("adm-wa").value = p.whatsapp || "";
      document.getElementById("adm-bio").value = p.aboutBody || "";
      document.getElementById("adm-glb").value = p.avatarGlb || "assets/mascot.glb";
    }

    function unlock() {
      const expected = String(CFG.adminPin || "2026");
      if (pinInput.value.trim() === expected) {
        pinErr.textContent = "";
        lockScreen.classList.add("hidden");
        editor.classList.remove("hidden");
        populateAdminForm();
      } else {
        pinErr.textContent = "Incorrect PIN. Default PIN is 2026.";
      }
    }

    document.getElementById("open-admin-btn")?.addEventListener("click", () => openModal("admin-modal"));
    document.getElementById("admin-unlock-btn")?.addEventListener("click", unlock);
    pinInput?.addEventListener("keydown", (e) => { if (e.key === "Enter") unlock(); });

    // Shortcut Ctrl+Shift+A opens Admin Panel
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        openModal("admin-modal");
      }
    });

    // Live preview local .GLB file right inside Three.js!
    document.getElementById("adm-glb-file")?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const blobUrl = URL.createObjectURL(file);
      loadGLBAvatar(blobUrl);
      showToast(`Loaded local 3D model: ${file.name}`);
    });

    document.getElementById("adm-save-btn")?.addEventListener("click", () => {
      CFG.profile.firstName = document.getElementById("adm-first").value.trim() || CFG.profile.firstName;
      CFG.profile.lastName = document.getElementById("adm-last").value.trim() || CFG.profile.lastName;
      CFG.profile.role = document.getElementById("adm-role").value.trim() || CFG.profile.role;
      CFG.profile.email = document.getElementById("adm-email").value.trim() || CFG.profile.email;
      CFG.profile.whatsapp = document.getElementById("adm-wa").value.trim() || CFG.profile.whatsapp;
      CFG.profile.aboutBody = document.getElementById("adm-bio").value.trim() || CFG.profile.aboutBody;
      const newGlb = document.getElementById("adm-glb").value.trim();
      if (newGlb && newGlb !== CFG.profile.avatarGlb) {
        CFG.profile.avatarGlb = newGlb;
        loadGLBAvatar(newGlb);
      }
      localStorage.setItem(STORE_KEY, JSON.stringify({ profile: CFG.profile }));
      applyProfileToDOM();
      showToast("Saved live! Click Export to save for GitHub Pages.");
    });

    document.getElementById("adm-export-btn")?.addEventListener("click", () => {
      const content = `window.PORTFOLIO_CONFIG = ${JSON.stringify(CFG, null, 2)};\n`;
      const blob = new Blob([content], { type: "application/javascript" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "portfolio-config.js";
      a.click();
      showToast("Downloaded updated portfolio-config.js!");
    });

    document.getElementById("adm-reset-btn")?.addEventListener("click", () => {
      localStorage.removeItem(STORE_KEY);
      CFG = loadConfig();
      applyProfileToDOM();
      populateAdminForm();
      loadGLBAvatar(CFG.profile.avatarGlb || "assets/mascot.glb");
      showToast("Restored default settings.");
    });
  }

  function initUI() {
    document.getElementById("year").textContent = new Date().getFullYear();

    // Mobile nav toggle
    const nav = document.getElementById("header-nav");
    const mBtn = document.getElementById("mobile-menu-btn");
    mBtn?.addEventListener("click", () => {
      const open = nav?.classList.toggle("open");
      mBtn.setAttribute("aria-expanded", String(open));
    });
    nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

    document.getElementById("copy-header-email")?.addEventListener("click", () => {
      copyText(CFG.profile.email, `Email copied: ${CFG.profile.email}`);
    });

    document.querySelectorAll("[data-bracket-card]").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        document.querySelectorAll("[data-bracket-card]").forEach((c) => c.classList.toggle("active", c === card));
      });
    });

    ["open-resume-modal", "open-resume-footer"].forEach((id) => {
      document.getElementById(id)?.addEventListener("click", () => { renderResume(); openModal("resume-modal"); });
    });

    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
    });
    document.querySelectorAll(".modal-backdrop").forEach((bg) => {
      bg.addEventListener("click", (e) => { if (e.target === bg) closeModal(bg.id); });
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") ["demo-modal", "resume-modal", "admin-modal"].forEach(closeModal);
    });

    document.querySelectorAll("[data-vp]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-vp]").forEach((b) => b.classList.toggle("active", b === btn));
        document.getElementById("demo-iframe").className = `demo-frame vp-${btn.dataset.vp}`;
      });
    });

    // Estimator bindings
    document.querySelectorAll("[data-service]").forEach((btn) => {
      btn.addEventListener("click", () => {
        estService = btn.dataset.service;
        document.querySelectorAll("[data-service]").forEach((b) => b.classList.toggle("active", b === btn));
        updateEstimator();
      });
    });
    document.querySelectorAll("[data-est-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        estService = btn.dataset.estPreset;
        document.querySelectorAll("[data-service]").forEach((b) => b.classList.toggle("active", b.dataset.service === estService));
        document.getElementById("est-units").value = btn.dataset.estUnits || "5";
        updateEstimator();
      });
    });
    ["est-units", "addon-seo", "addon-leads", "addon-ai", "addon-multi"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateEstimator);
      document.getElementById(id)?.addEventListener("change", updateEstimator);
    });
    document.getElementById("est-copy-btn")?.addEventListener("click", () => copyText(updateEstimator(), "Scope brief copied!"));
    document.getElementById("est-fiverr-btn")?.addEventListener("click", () => copyText(updateEstimator(), "Scope copied — paste on Fiverr!"));
    document.getElementById("est-wa-btn")?.addEventListener("click", () => {
      window.open(`https://wa.me/${CFG.profile.whatsapp}?text=${encodeURIComponent(updateEstimator())}`, "_blank", "noopener,noreferrer");
    });

    // Resume bindings
    document.querySelectorAll("[data-cv-fmt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        cvFormat = btn.dataset.cvFmt;
        document.querySelectorAll("[data-cv-fmt]").forEach((b) => b.classList.toggle("active", b === btn));
        renderResume();
      });
    });
    document.getElementById("cv-search")?.addEventListener("input", renderResume);
    document.getElementById("copy-ats-btn")?.addEventListener("click", () => copyText(ATS_TEXT, "Full ATS resume copied!"));
    document.getElementById("print-cv-btn")?.addEventListener("click", () => { renderResume(); window.print(); });
  }

  /* -------------------- BOOT -------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyProfileToDOM();
    initCursor();
    initSmoothScrollAndGSAP();
    initMultiLayerTabs();
    renderWorkGallery();
    updateEstimator();
    initAdminPanel();
    initUI();
  });
})();
