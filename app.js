// Mobile menu
const nav = document.querySelector("#nav");
const menu = document.querySelector("#menu");

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "×" : "☰";
});

// Close menu after clicking a link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "☰";
  });
});

// Light and dark theme
const theme = document.querySelector("#theme");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  theme.textContent = dark ? "☾" : "☼";

  try {
    localStorage.setItem(
      "alex-portfolio-theme",
      dark ? "dark" : "light"
    );
  } catch (error) {
    // Theme still works if localStorage is unavailable
  }
}

theme.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});

// Restore saved theme
try {
  if (localStorage.getItem("alex-portfolio-theme") === "dark") {
    setTheme(true);
  }
} catch (error) {
  // Use the default light theme
}

// Reveal animations on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// Back-to-top button
const up = document.querySelector("#up");

window.addEventListener("scroll", () => {
  up.classList.toggle("show", window.scrollY > 450);
});

up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Automatically update the footer year
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Contact form: prepare an email
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(
    "Portfolio message from " + name
  );

  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\n" + message
  );

  // Replace this address with your own email
  window.location.href =
    "mailto:hello@example.com?subject=" +
    subject +
    "&body=" +
    body;
});

// Highlight the active navigation section
const sections = [
  ...document.querySelectorAll("main section[id]")
];

const links = [
  ...nav.querySelectorAll("a")
];

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") ===
              "#" + entry.target.id
          );
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach((section) => {
  activeObserver.observe(section);
});