// ===================================
// LOCARB TRANSLATION MANAGER
// Complete translation system with modal and branch support
// ===================================

class TranslationManager {
  constructor() {
    this.currentLang = localStorage.getItem("language") || "en";
    this.translations = translations; // Uses the translations object from translations.js
    this.branchData = {}; // Will store branch data based on language
    this.init();
  }

  init() {
    // Apply saved language on load
    this.applyLanguage(this.currentLang);
    this.updateButtonText();
    this.setupBranchTranslations();
    this.attachBranchChangeListener();
  }

  setupBranchTranslations() {
    const lang = this.currentLang;
    const t = this.translations[lang];

    // Create language-specific branch data
    this.branchData = {
      subah: {
        name: t.branches.subah.name,
        address: t.branches.subah.address,
        phone: "+965 6555 8200",
        phoneLink: "tel:+96565558200",
        mapImage: "images/subahalsalemmap.jpg",
        googleMapsUrl:
          "https://www.google.com/maps/place/LoCarb+-+%D9%84%D9%88%D9%83%D8%A7%D8%B1%D8%A8%E2%80%AD/@29.2632101,48.0798998,17z/data=!4m6!3m5!1s0x3fcf75a6cb1d1ec9:0x8e47c596dfe29d23!8m2!3d29.2632054!4d48.0824747!16s%2Fg%2F11j09zjbbp?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
      },
      mahbulah: {
        name: t.branches.mahbulah.name,
        address: t.branches.mahbulah.address,
        phone: "+965 6555 8017",
        phoneLink: "tel:+96565558017",
        mapImage: "images/mahbulahmap.jpg",
        googleMapsUrl: "https://maps.google.com/?q=Mahbulah+Kuwait",
      },
      jabriya: {
        name: t.branches.jabriya.name,
        address: t.branches.jabriya.address,
        phone: "+965 6555 8202",
        phoneLink: "tel:+96565558202",
        mapImage: "images/jabriyahmap.jpg",
        googleMapsUrl:
          "https://www.google.com/maps/place/LoCarb+jabriyah+-+%D9%84%D9%88%D9%83%D8%A7%D8%B1%D8%A8+%D8%A7%D9%84%D8%AC%D8%A7%D8%A8%D8%B1%D9%8A%D8%A9%E2%80%AD/@29.3205426,48.0163998,17z/data=!4m6!3m5!1s0x3fcf9d38e356c631:0xff2af36a72d717d4!8m2!3d29.3205426!4d48.0163998!16s%2Fg%2F11qbskkpm7?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
      },
    };
  }

  attachBranchChangeListener() {
    const branchSelector = document.getElementById("branchSelector");
    if (!branchSelector) return;

    branchSelector.addEventListener("change", () => {
      this.updateBranchInfo(branchSelector.value);
    });

    // Update on initial load with default selection
    this.updateBranchInfo(branchSelector.value);
  }

  updateBranchInfo(branchValue) {
    const t = this.translations[this.currentLang];
    const selectedBranch = this.branchData[branchValue];
    const branchInfo = document.getElementById("branchInfo");
    const mapImage = document.getElementById("mapImage");
    const mapLink = document.getElementById("mapLink");

    if (!selectedBranch || !branchInfo) return;

    // Update branch info with translated labels
    branchInfo.innerHTML = `
            <p><strong>${selectedBranch.name}</strong></p>
            <p>${selectedBranch.address}</p>
            <p>${t.branches.phone} <a href="${selectedBranch.phoneLink}">${selectedBranch.phone}</a></p>
            <p>${t.branches.address} <a href="${selectedBranch.googleMapsUrl}" target="_blank" rel="noopener noreferrer">${t.branches.viewMap}</a></p>
        `;

    if (mapImage) {
      mapImage.src = selectedBranch.mapImage;
      mapImage.alt = `Map of ${selectedBranch.name}`;
    }

    if (mapLink) {
      mapLink.href = selectedBranch.googleMapsUrl;
    }
  }

  switchLanguage() {
    // Toggle between English and Arabic
    this.currentLang = this.currentLang === "en" ? "ar" : "en";
    localStorage.setItem("language", this.currentLang);
    this.applyLanguage(this.currentLang);
    this.updateButtonText();
  }

  updateButtonText() {
    const langBtn = document.getElementById("langToggle");
    if (langBtn) {
      langBtn.textContent = this.currentLang === "en" ? "العربية" : "English";
    }
  }

  applyLanguage(lang) {
    const t = this.translations[lang];

    // Set document direction
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);

    // Update body font family for Arabic
    if (lang === "ar") {
      document.body.style.fontFamily = "'Tajawal', 'Arial', sans-serif";
    } else {
      document.body.style.fontFamily = "'Georgia', serif";
    }

    // Navigation
    this.updateNav(t.nav);

    // Hero Section
    this.updateHero(t.hero);

    // Mission Section
    this.updateMission(t.mission);

    // Download Section
    this.updateDownload(t.download);

    // About Section
    this.updateAbout(t.about);

    // Services Section
    this.updateServices(t.services);

    // Suppliers Section
    this.updateSuppliers(t.suppliers);

    // Goals Section
    this.updateGoals(t.goals);

    // Branches Section - UPDATED
    this.updateBranchesSection(t.branches);

    // Assets Section
    this.updateAssets(t.assets);

    // Contact Section
    this.updateContact(t.contact);

    // Footer
    this.updateFooter(t.footer);

    // Update branch data for new language
    this.setupBranchTranslations();

    // Refresh branch info display
    const branchSelector = document.getElementById("branchSelector");
    if (branchSelector) {
      this.updateBranchInfo(branchSelector.value);
    }

    // UPDATE MODAL DATA
    this.updateModalData();
  }

  updateBranchesSection(branches) {
    const section = document.querySelector(".branches-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const mapDesc = section.querySelector(".map-description");

    if (title) title.textContent = branches.title;
    if (mapDesc) mapDesc.textContent = branches.mapDesc;

    // Update branch selector options with translated names
    const selector = document.getElementById("branchSelector");
    if (selector) {
      selector.options[0].textContent = branches.subah.name;
      selector.options[1].textContent = branches.mahbulah.name;
      selector.options[2].textContent = branches.jabriya.name;

      // Update select attributes
      selector.title = branches.selectBranch;
      selector.setAttribute("aria-label", branches.selectBranch);
    }

    // Update label if it exists
    const label = section.querySelector('label[for="branchSelector"]');
    if (label) {
      label.textContent = branches.selectBranch;
    }
  }

  updateModalData() {
    const lang = this.currentLang;
    const t = this.translations[lang];

    // Update the global modalData object with translated content
    if (typeof window.modalData !== "undefined") {
      window.modalData = {
        about: {
          title: t.modals.about.title,
          image: "images/meal2.jpg",
          content: t.modals.about.content,
        },
        balanced: {
          title: t.modals.balanced.title,
          image: "images/meal3.jpg",
          content: t.modals.balanced.content,
        },
        farm: {
          title: t.modals.farm.title,
          image: "images/meal1.jpg",
          content: t.modals.farm.content,
        },
        vision: {
          title: t.modals.vision.title,
          image: "images/meal4.jpg",
          content: t.modals.vision.content,
        },
      };
    }

    // If a modal is currently open, refresh it
    const modalOverlay = document.getElementById("modalOverlay");
    if (modalOverlay && modalOverlay.classList.contains("active")) {
      const lastCardType = sessionStorage.getItem("lastOpenedModal");
      if (lastCardType) {
        this.openModal(lastCardType);
      }
    }
  }

  openModal(cardType) {
    const data = window.modalData[cardType];
    if (!data) return;

    const modalContent = document.getElementById("modalContent");
    const modalOverlay = document.getElementById("modalOverlay");

    const imageHTML = data.image
      ? `<img src="${data.image}" alt="${data.title}">`
      : `<div class="placeholder-circle">Image unavailable</div>`;

    modalContent.innerHTML = `
            <div class="modal-content-inner">
                <div class="modal-image">
                    ${imageHTML}
                </div>
                <div class="modal-text">
                    <h2>${data.title}</h2>
                    ${data.content}
                </div>
            </div>
        `;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    sessionStorage.setItem("lastOpenedModal", cardType);
  }

  updateNav(nav) {
    const navLinks = document.querySelectorAll(".nav-links a");
    const links = [
      "home",
      "about",
      "app",
      "branches",
      "goals",
      "suppliers",
      "services",
      "contact",
    ];

    navLinks.forEach((link, index) => {
      if (links[index] && nav[links[index]]) {
        link.textContent = nav[links[index]];
      }
    });
  }

  updateHero(hero) {
    const title = document.querySelector(".hero-content h1");
    const downloadBtn = document.querySelector(".hero-buttons .btn-primary");
    const orderBtn = document.querySelector(".hero-buttons .btn-outline");

    if (title) title.innerHTML = hero.title;
    if (downloadBtn) downloadBtn.textContent = hero.downloadApp;
    if (orderBtn) orderBtn.textContent = hero.orderNow;
  }

  updateMission(mission) {
    const items = document.querySelectorAll(".mission-item");
    const keys = ["item1", "item2", "item3", "item4"];

    items.forEach((item, index) => {
      const key = keys[index];
      const title = item.querySelector("h3");
      const desc = item.querySelector("p");

      if (title && mission[`${key}Title`]) {
        title.textContent = mission[`${key}Title`];
      }
      if (desc && mission[`${key}Desc`]) {
        desc.textContent = mission[`${key}Desc`];
      }
    });
  }

  updateDownload(download) {
    const section = document.querySelector(".download-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const desc = section.querySelector("p");

    if (title) title.textContent = download.title;
    if (desc) desc.textContent = download.description;
  }

  updateAbout(about) {
    const section = document.querySelector(".about-section");
    if (!section) return;

    const title = section.querySelector("h2");
    if (title) title.textContent = about.title;

    const cards = section.querySelectorAll(".meal-card");
    const keys = ["card1", "card2", "card3"];

    cards.forEach((card, index) => {
      const key = keys[index];
      const cardTitle = card.querySelector("h3");
      const cardDesc = card.querySelector("p");
      const readMoreBtn = card.querySelector(".read-more-btn");

      if (cardTitle && about[`${key}Title`]) {
        cardTitle.textContent = about[`${key}Title`];
      }
      if (cardDesc && about[`${key}Desc`]) {
        cardDesc.textContent = about[`${key}Desc`];
      }
      if (readMoreBtn) {
        readMoreBtn.textContent = about.readMore;
      }
    });
  }

  updateServices(services) {
    const section = document.querySelector(".logistics-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const subtitle = section.querySelector(".section-header p");

    if (title) title.textContent = services.title;
    if (subtitle) subtitle.textContent = services.subtitle;

    const items = section.querySelectorAll(".logistics-item");
    const serviceKeys = [
      "deliveroo",
      "media",
      "talabat",
      "deliverect",
      "ordable",
      "foodics",
    ];

    items.forEach((item, index) => {
      if (index < 6) {
        const desc = item.querySelector("p");
        const key = serviceKeys[index];
        if (desc && services[key]) {
          desc.textContent = services[key];
        }
      }
    });
  }

  updateSuppliers(suppliers) {
    const section = document.querySelector(".suppliers-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const subtitle = section.querySelector(".section-header p");

    if (title) title.textContent = suppliers.title;
    if (subtitle) subtitle.textContent = suppliers.subtitle;

    const items = section.querySelectorAll(".supplier-item h3");
    const supplierKeys = [
      "alyasra",
      "proteins",
      "natmed",
      "azzad",
      "truevalue",
      "Bayariq",
      "jana",
    ];

    items.forEach((item, index) => {
      const key = supplierKeys[index];
      if (suppliers[key]) {
        item.textContent = suppliers[key];
      }
    });
  }

  updateGoals(goals) {
    const section = document.querySelector(".vision-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const cardTitle = section.querySelector(".vision-text h3");
    const cardDesc = section.querySelector(".vision-text p");
    const readMoreBtn = section.querySelector(".read-more-btn");

    if (title) title.textContent = goals.title;
    if (cardTitle) cardTitle.textContent = goals.cardTitle;
    if (cardDesc) cardDesc.textContent = goals.cardDesc;
    if (readMoreBtn) readMoreBtn.textContent = goals.readMore;
  }

  updateAssets(assets) {
    const section = document.querySelector(".assets-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const subtitle = section.querySelector(".section-header p");

    if (title) title.textContent = assets.title;
    if (subtitle) subtitle.textContent = assets.subtitle;

    const cards = section.querySelectorAll(".asset-card");
    const assetKeys = [
      "asset1",
      "asset2",
      "asset3",
      "asset4",
      "asset5",
      "asset6",
      "asset7",
      "asset8",
    ];

    cards.forEach((card, index) => {
      const key = assetKeys[index];
      const cardTitle = card.querySelector("h3");
      const cardDesc = card.querySelector("p");
      const badge = card.querySelector(".asset-badge");

      if (cardTitle && assets[`${key}Title`]) {
        cardTitle.textContent = assets[`${key}Title`];
      }
      if (cardDesc && assets[`${key}Desc`]) {
        cardDesc.textContent = assets[`${key}Desc`];
      }
      if (badge && assets[`${key}Badge`]) {
        badge.textContent = assets[`${key}Badge`];
      }
    });
  }

  updateContact(contact) {
    const section = document.querySelector(".contact-section");
    if (!section) return;

    const title = section.querySelector("h2");
    const followUs = section.querySelector("h3");

    if (title) title.textContent = contact.title;
    if (followUs) followUs.textContent = contact.followUs;

    // Update contact icon labels
    const contactLinks = section.querySelectorAll(".contact-icon-link");
    if (contactLinks[0]) {
      contactLinks[0].setAttribute("aria-label", contact.phone);
    }
    if (contactLinks[1]) {
      contactLinks[1].setAttribute("aria-label", contact.whatsapp);
    }

    // Update social icon labels
    const socialLinks = section.querySelectorAll(".social-icon-link");
    if (socialLinks[0]) {
      socialLinks[0].setAttribute("aria-label", contact.instagram);
    }
    if (socialLinks[1]) {
      socialLinks[1].setAttribute("aria-label", contact.tiktok);
    }
  }

  updateFooter(footer) {
    const footerSection = document.querySelector(".footer");
    if (!footerSection) return;

    const description = footerSection.querySelector(".footer-section p");
    const headers = footerSection.querySelectorAll(".footer-section h4");

    if (description) description.textContent = footer.description;

    if (headers[0]) headers[0].textContent = footer.quickLinks;
    if (headers[1]) headers[1].textContent = footer.contact;
    if (headers[2]) headers[2].textContent = footer.followUs;

    // Update footer link text
    const footerLinks = footerSection.querySelectorAll(".footer-section ul li a");
    const linkTexts = ["home", "about", "app", "contact", "services", "suppliers", "assets"];
    const t = this.translations[this.currentLang];

    footerLinks.forEach((link, index) => {
        const key = linkTexts[index];
        if (key && t.nav[key]) {
            link.textContent = t.nav[key];
        }
    });

    // Update footer social links text
    const socialLinksFooter = footerSection.querySelectorAll(".social-links a");
    if (socialLinksFooter[0]) {
        socialLinksFooter[0].textContent = footer.instagram;
    }
    if (socialLinksFooter[1]) {
        socialLinksFooter[1].textContent = footer.tiktok;
    }

    // Update contact section links if they exist
    const contactLinksFooter = footerSection.querySelectorAll(".footer-section ul li a");
    // Find phone and whatsapp links by href pattern
    contactLinksFooter.forEach(link => {
        if (link.href.includes("tel:")) {
            link.textContent = footer.phone;
        } else if (link.href.includes("wa.me")) {
            link.textContent = footer.whatsApp;
        }
    });
}
}

// Make it globally available
window.TranslationManager = TranslationManager;
