// --- EMAILJS CONFIG (PUBLIC KEY for init) ---
const EMAILJS_PUBLIC_KEY = "Ha2dEbjQwcwRSHArr";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize EmailJS
  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Footer year
  const footerText = document.getElementById("footer-text");
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.textContent = `© ${year} Yashwanth M A. All rights reserved.`;
  }

  // Navbar scroll behavior / active section
  const navbar = document.getElementById("navbar");
  const navLinks = Array.from(
    document.querySelectorAll(".nav-link")
  );
  const mobileLinks = Array.from(
    document.querySelectorAll(".mobile-link")
  );
  const sections = ["home", "about", "skills", "experience", "education", "projects", "contact"];

  function setActiveSection(sectionId) {
    navLinks.forEach((btn) => {
      const target = btn.getAttribute("data-target");
      if (target === sectionId) {
        btn.classList.add("text-blue-600", "nav-active");
        btn.classList.remove("text-[#4F4F4F]");
      } else {
        btn.classList.remove("text-blue-600", "nav-active");
        if (target !== "home") {
          btn.classList.add("text-[#4F4F4F]");
        }
      }
    });

    mobileLinks.forEach((btn) => {
      const target = btn.getAttribute("data-target");
      if (target === sectionId) {
        btn.classList.add("text-blue-600");
        btn.classList.remove("text-[#4F4F4F]");
      } else {
        btn.classList.remove("text-blue-600");
        if (target !== "home") {
          btn.classList.add("text-[#4F4F4F]");
        }
      }
    });
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add(
          "bg-white/90",
          "backdrop-blur-md",
          "border-b",
          "border-gray-200",
          "shadow-sm"
        );
      } else {
        navbar.classList.remove(
          "bg-white/90",
          "backdrop-blur-md",
          "border-b",
          "border-gray-200",
          "shadow-sm"
        );
      }
    }

    // Active section detection
    const scrollPosition = scrollY + 200;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (top <= scrollPosition && top + height > scrollPosition) {
        setActiveSection(id);
        break;
      }
    }

    // Scroll progress
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Smooth scroll for nav buttons
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const brandName = document.getElementById("brand-name");
  if (brandName) {
    brandName.addEventListener("click", () => scrollToSection("home"));
  }

  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) {
        scrollToSection(target);
      }
    });
  });

  mobileLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) {
        scrollToSection(target);
      }
      closeMobileMenu();
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  let mobileOpen = false;

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("open");
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    mobileOpen = true;
    if (mobileToggle) {
      mobileToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      window.lucide && window.lucide.createIcons();
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    mobileMenu.style.maxHeight = "0";
    mobileOpen = false;
    if (mobileToggle) {
      mobileToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      window.lucide && window.lucide.createIcons();
    }
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      if (mobileOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Fade-on-scroll using IntersectionObserver
  const fadeEls = document.querySelectorAll(".fade-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  fadeEls.forEach((el) => observer.observe(el));

  // --- CONTACT FORM EMAILJS INTEGRATION ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent page reload

      const btn = document.getElementById("submit-btn");
      const originalText = btn ? btn.innerHTML : null;
      if (btn) {
        btn.innerHTML = "Sending...";
      }

      // Use EXACT call as requested
      emailjs
        .sendForm(
          "service_mr778uc",
          "template_chschgl",
          "#contact-form"
        )
        .then(
          () => {
            if (btn && originalText) {
              btn.innerHTML = originalText;
            }
            alert("Message sent successfully!");
            contactForm.reset();
          },
          () => {
            if (btn && originalText) {
              btn.innerHTML = originalText;
            }
            alert("Failed to send message. Try again.");
          }
        );
    });
  }
});
