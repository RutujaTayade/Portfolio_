// ── Toggle hamburger menu ──────────────────────────────────
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ── Custom Cursor ──────────────────────────────────────────
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  requestAnimationFrame(animateCursor);
})();

document.addEventListener("mouseleave", () => (cursor.style.opacity = "0"));
document.addEventListener("mouseenter", () => (cursor.style.opacity = "1"));
document.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-50%,-50%) scale(0.75)";
});
document.addEventListener("mouseup", () => {
  cursor.style.transform = "translate(-50%,-50%) scale(1)";
});

// ── Dancing Name Letters ───────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const profileTitle = document.querySelector("#profile .title");
  if (!profileTitle) return;

  const fullName = profileTitle.textContent.trim();
  const parts = fullName.split(" ");
  if (parts.length < 2) return;

  // Wrap each letter in a span with index variable
  function wrapLetters(word, className) {
    const letters = [...word]
      .map((ch, i) => `<span class="hero-letter" style="--i:${i}">${ch}</span>`)
      .join("");
    return `<span class="${className}">${letters}</span>`;
  }

  profileTitle.innerHTML =
    wrapLetters(parts[0], "hero-first-name") +
    "<br>" +
    wrapLetters(parts[1], "hero-last-name");

  // Attach dance behavior to a name group
  function attachDance(groupEl) {
    if (!groupEl) return;
    const letters = groupEl.querySelectorAll(".hero-letter");

    groupEl.addEventListener("mouseenter", () => {
      groupEl.classList.add("hovered");
      letters.forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove("dancing");
          // force reflow so animation restarts
          void el.offsetWidth;
          el.classList.add("dancing");
        }, i * 45);
      });
      cursor.classList.add("enlarged");
    });

    groupEl.addEventListener("mouseleave", () => {
      groupEl.classList.remove("hovered");
      letters.forEach((el) => {
        el.classList.remove("dancing");
        el.classList.remove("letter-pop");
      });
      cursor.classList.remove("enlarged");
    });

    // Individual letter pop on direct hover
    letters.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.classList.remove("letter-pop");
        void el.offsetWidth; // force reflow restart
        el.classList.add("letter-pop");
      });
      el.addEventListener("mouseleave", () => {
        el.classList.remove("letter-pop");
      });
    });
  }

  attachDance(profileTitle.querySelector(".hero-first-name"));
  attachDance(profileTitle.querySelector(".hero-last-name"));
});
