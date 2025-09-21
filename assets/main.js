// reload section
window.addEventListener("load", () => {
  const overlay = document.getElementById("reloadOverlay");

  // Disable scroll during overlay
  document.body.style.overflow = "hidden";

  // Wait 3s then fade out overlay
  setTimeout(() => {
    overlay.classList.add("fade-out");

    setTimeout(() => {
      overlay.remove(); // Remove overlay from DOM
      document.body.style.overflow = "auto";

      // ✅ Enable main effects (hero, navbar, etc.)
      document.body.classList.add("ready");

      // Example: Hero scroll fade effect
      window.addEventListener("scroll", () => {
        const heroContent = document.getElementById("heroContent");
        if (window.scrollY > 200) {
          heroContent.classList.add("removed");
        } else {
          heroContent.classList.remove("removed");
        }
      });

    }, 700); // match fade transition
  }, 3000); // overlay duration
});

// Reload animation end

// animated text
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["UI/UX DESIGNER", "GRAPHIC DESIGNER", "BRANDING SPECIALIST", "MOTION GRAPHICS DESIGNER"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// text dissapeared hero sec 
  window.addEventListener('scroll', function () {
    const heroContent = document.getElementById('heroContent');
    const scrollY = window.scrollY;

    if (scrollY > 500) {
      heroContent.classList.add('removed');
    } else {
      heroContent.classList.remove('removed');
    }
  });
// background raining hero sec

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
let planets = [];

class Star {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
  draw() {
    ctx.fillStyle = "rgba(0, 200, 255, 0.8)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00c6ff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update(scrollY) {
    this.y += this.speed + scrollY * 0.002; // scroll makes stars drift
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

class Planet {
  constructor(radius, size, speed, color) {
    this.radius = radius;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
  }
  draw() {
    let x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
    let y = canvas.height / 2 + Math.sin(this.angle) * this.radius;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update(scrollY) {
    this.angle += this.speed + scrollY * 0.00000001; // scroll influences orbit speed
    this.draw();
  }
}

// Init stars + planets
function init() {
  stars = [];
  planets = [];

  for (let i = 0; i < 150; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, Math.random() * 0.5 + 0.2));
  }

  planets.push(new Planet(80, 8, 0.01, "#ffcc00"));  // yellow
  planets.push(new Planet(150, 12, 0.008, "#00ffcc")); // teal
  planets.push(new Planet(220, 6, 0.006, "#ff0066"));  // pink
}
init();

let scrollY = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => star.update(scrollY));
  planets.forEach(planet => planet.update(scrollY));

  requestAnimationFrame(animate);
}
animate();

// Prevent browser from remembering scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Smooth transition back to hero on refresh/load
window.addEventListener('load', function () {
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // reset after scroll so other instant jumps aren't forced smooth
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 1000);
  }, 100);
});

//navbar
// Scroll & navbar shrink
window.addEventListener('scroll', function () {
  const heroContent = document.getElementById('heroContent');
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY;

  // Hero content fade/slide
  if (scrollY > 500) {
    heroContent.classList.add('removed');
  } else {
    heroContent.classList.remove('removed');
  }

  // Navbar shrink effect
  if (scrollY > 100) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// Close mobile navbar on link click + reload on Home
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const navbarToggler = document.querySelector('.navbar-collapse');
    if (navbarToggler.classList.contains('show')) {
      new bootstrap.Collapse(navbarToggler).hide();
    }

    // Reload the page if "Home" is clicked
    if (link.textContent.trim().toLowerCase() === "home") {
      e.preventDefault(); 
      location.href = location.origin + location.pathname; 
    }
  });
});

// navbar end


// Count-up function
function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const speed = 150; // lower = faster
  let count = 0;

  function updateCounter() {
    const increment = target / speed;
    count += increment;

    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  }

  updateCounter();
}

// Trigger animation on scroll
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const counter = entry.target;

    if (entry.isIntersecting) {
      // Start counting up
      animateCounter(counter);
    } else {
      // Reset to 0 when out of view
      counter.innerText = '0';
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});


// for page animation 
  AOS.init({
     
    once: false // set to true if you want the animation only once
  });


  //carousel projects 

  document.addEventListener("DOMContentLoaded", function () {
  let itemsPerSlide = window.innerWidth < 720 ? 1 : 3;
  let currentIndex = 0;
  const carouselInner = document.getElementById("carouselInner");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function getVisibleItems(){
    return Array.from(document.querySelectorAll(".multi-carousel-item")).filter(i=>i.style.display!=="none");
  }
  function updateConfig(){ itemsPerSlide = window.innerWidth < 720 ? 1 : 3; }
  function updateCarousel(){
    const offset = (currentIndex * -100) / itemsPerSlide;
    carouselInner.style.transform = `translateX(${offset}%)`;
    document.querySelectorAll(".multi-carousel-item").forEach((item,i)=>{
      item.classList.toggle("", i >= currentIndex && i < currentIndex+itemsPerSlide);
    });
  }

  function next(){
    const visibleItems = getVisibleItems();
    const totalItems = visibleItems.length;
    currentIndex++;
    if(currentIndex > totalItems - itemsPerSlide){ currentIndex = 0; } // loop
    updateCarousel();
  }
  function prev(){
    const visibleItems = getVisibleItems();
    const totalItems = visibleItems.length;
    currentIndex--;
    if(currentIndex < 0){ currentIndex = totalItems - itemsPerSlide; } // loop back
    updateCarousel();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
      filterBtns.forEach(b=>b.classList.remove("btn-dark"));
      filterBtns.forEach(b=>b.classList.add("btn-outline-dark"));
      btn.classList.add("btn-dark");
      btn.classList.remove("btn-outline-dark");
      const filter=btn.getAttribute("data-filter");
      document.querySelectorAll(".multi-carousel-item").forEach(item=>{
        if(filter==="all" || item.dataset.category===filter){ item.style.display="block"; }
        else{ item.style.display="none"; }
      });
      currentIndex=0;
      updateCarousel();
    });
  });

  updateCarousel();
  window.addEventListener("resize",()=>{ updateConfig(); updateCarousel(); });
});


  // emoji hi
  