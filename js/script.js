
// Theme toggle with persistence
(function themeInit(){
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if(saved === "light"){ root.classList.add("light"); }
})();

document.getElementById("themeToggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
});

// Mobile nav
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
navToggle?.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const onScroll = () => {
  const h = window.innerHeight || document.documentElement.clientHeight;
  for(const el of reveals){
    const rect = el.getBoundingClientRect();
    if(rect.top < h - 60){ el.classList.add("visible"); }
  }
};
window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

// Contact form validation (client-side only demo)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  // Basic validation
  if(name.length < 2){ return showStatus("Please enter your full name.", true); }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ return showStatus("Please enter a valid email.", true); }
  if(message.length < 10){ return showStatus("Message should be at least 10 characters.", true); }

  // Simulate success
  showStatus("Thanks! Your message has been queued. (Demo only)", false);
  form.reset();
});

function showStatus(msg, isError){
  if(!status) return;
  status.textContent = msg;
  status.style.color = isError ? "#ff6b6b" : "var(--accent-2)";
  status.style.marginLeft = "8px";
}
