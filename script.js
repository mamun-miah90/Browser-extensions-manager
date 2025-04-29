const extensions = [
    { id: 1, name: "DevLens", logo: "assets/images/logo-devlens.svg", desc: "Quickly inspect page layouts and visualize element boundaries.", active: true },
    { id: 2, name: "StyleSpy",logo: "assets/images/logo-style-spy.svg",  desc: "Instantly analyze and copy CSS from any webpage element.", active: true },
    { id: 3, name: "JSONWizard",logo: "assets/images/logo-json-wizard.svg",  desc: "Formats, validates, and prettifies JSON responses in-browser.", active: true },
    { id: 4, name: "TabMaster Pro", logo: "assets/images/logo-tab-master-pro.svg", desc: "Organizes browser tabs into groups and sessions.", active: true },
    { id: 5, name: "Markup Notes",logo: "assets/images/logo-markup-notes.svg",  desc: "Enables annotation and notes directly onto webpages for collaborative debugging.", active: true },
    { id: 6, name: "Palette Picker",logo: "assets/images/logo-palette-picker.svg",  desc: "Instantly extracts color palettes from any webpage.", active: true },
    { id: 7, name: "LinkChecker", logo: "assets/images/logo-link-checker.svg", desc: "Scans and highlights broken links on any page.", active: true },
    { id: 8, name: "ConsolePlus",logo: "assets/images/logo-console-plus.svg",  desc: "Enhanced developer console with advanced filtering and logging.", active: true },
    { id: 9, name: "GridGuides",logo: "assets/images/logo-grid-guides.svg",  desc: "Overlay customizable grids and alignment guides on any webpage.", active: false },
    { id: 10, name: "SpeedBoost", logo: "assets/images/logo-speed-boost.svg", desc: "Optimizes browser resource usage to accelerate page loading.", active: false },
    { id: 11, name: "ViewportBuddy", logo: "assets/images/logo-viewport-buddy.svg", desc: "Simulates various screen resolutions directly within the browser.", active: false },
    { id: 12, name: "DOM Snapshot",logo: "assets/images/logo-dom-snapshot.svg",  desc: "Capture and export DOM structures quickly.", active: false }
  ];

  const extensionsList = document.getElementById("extensions-list");
  const filterButtons = document.querySelectorAll(".filter-btn");






  function renderExtensions(filter = "all") {
    extensionsList.innerHTML = "";
    const filtered = extensions.filter(ext => {
      return filter === "all" || (filter === "active" ? ext.active : !ext.active);
    });

    filtered.forEach(ext => {
      const card = document.createElement("div");
      card.className = "extension-card";
      card.innerHTML = `
       <div class ="card-header">
        <img src="${ext.logo}" alt="${ext.name}" class="extension-image" />
            <div class="card-desc">
                <h3>${ext.name}</h3>
                <p>${ext.desc}</p>
            </div>
            
       </div>
        <div class="actions">
          <button class="remove-btn" data-id="${ext.id}">Remove</button>
          <label class="switch">
            <input type="checkbox" class="toggle-btn" data-id="${ext.id}" ${ext.active ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      `;
      extensionsList.appendChild(card);
    });
  }

  extensionsList.addEventListener("click", e => {
    if(e.target.classList.contains("remove-btn")){
        const id = parseInt(e.target.getAttribute("data-id"));
        const index = extensions.findIndex(ext => ext.id === id)
        if(index !== -1)
        {
            const confirmDelete = confirm(`Are you sure you want to remove this "${extensions[index].name} extension?"`)
            if(confirmDelete)
            {
                extensions.splice(index,1);
                renderExtensions(document.querySelector(".filter-btn.active").dataset.filter);
            }
            
        }
    }
  });


  extensionsList.addEventListener("change", e => {
    if (e.target.classList.contains("toggle-btn")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const ext = extensions.find(ext => ext.id === id);
      if (ext) {
        ext.active = !ext.active;
        renderExtensions(document.querySelector(".filter-btn.active").dataset.filter);
      }
    }
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderExtensions(btn.dataset.filter);
    });
  });



  // Changing moon and sun icon according to themes

  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  
    const isDark = document.body.classList.contains("dark-theme");
  
    themeIcon.src = isDark
      ? "./assets/images/icon-sun.svg"
      : "./assets/images/icon-moon.svg";
  });
  




   // Initial render
   renderExtensions();