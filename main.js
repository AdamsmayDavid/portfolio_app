// Portfolio filter
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter items
      items.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});

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


// background raining hero sec

const canvas = document.getElementById("rain");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let drops = [];

  class Drop {
    constructor(x, y, length, speed) {
      this.x = x;
      this.y = y;
      this.length = length;
      this.speed = speed;
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.strokeStyle = "#00c6ff"; // tech blue glow
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = " #00c6ff";
      ctx.stroke();
    }
    update() {
      this.y += this.speed;
      if (this.y > canvas.height) {
        this.y = -this.length;
        this.x = Math.random() * canvas.width;
      }
      this.draw();
    }
  }

  function init() {
    drops = [];
    for (let i = 0; i < 150; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let length = Math.random() * 20 + 10;
      let speed = Math.random() * 5 + 2;
      drops.push(new Drop(x, y, length, speed));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let drop of drops) {
      drop.update();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();


   // for navbar
  //     var nav = document.querySelector('nav');

  //   window.addEventListener('scroll', function () {
  //       if(window.pageYOffset > 100) {
  //          nav.classList.add('bg-dark',  'shadow');

  //      } else {
  //           nav.classList.remove('bg-dark', 'shadow');
  //     }
  // });

  var nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
        // nav.style.backgroundColor = '#161831;';
        nav.classList.add('bg-dark','shadow'); // Keep the shadow if needed
    } else {
        // nav.style.backgroundColor = 'transparent'; // Or whatever the default color is
        nav.classList.remove('bg-dark','shadow');
    }
});


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


  