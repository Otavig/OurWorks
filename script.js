console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		nextBgImageEl.classList.remove("next--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("next--card");
			nextCardEl.classList.add("current--card");

			currentBgImageEl.classList.add("previous--image");
			previousBgImageEl.classList.add("next--image");
			nextBgImageEl.classList.add("current--image");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("previous--card");

			currentBgImageEl.classList.add("next--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("previous--image");
		}
	}

	updateMouseLightColor();
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? nextInfoEl.querySelectorAll(".text")
		: previousInfoEl.querySelectorAll(".text"),
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			previousInfoEl.classList.add("next--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("previous--info");
			previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});

	// Add click event to the current card
	currentCardEl.addEventListener("click", (e) => {
		e.preventDefault();
		const link = currentCardEl.querySelector('.card__link');
		if (link) {
			exitAnimation(link.getAttribute('href'));
		}
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);

	// Modify the smoke particle creation
	for (p = 0; p < 50; p++) { // Reduced number of particles
		var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
		particle.position.set(
			Math.random() * window.innerWidth - window.innerWidth / 2,
			Math.random() * 100 - 150, // Concentrate particles at the bottom
			Math.random() * 1000 - 100
		);
		particle.rotation.z = Math.random() * 360;
		particle.scale.set(0.5, 0.5, 0.5); // Make particles smaller
		scene.add(particle);
		smokeParticles.push(particle);
	}

}

function evolveSmoke() {
	var sp = smokeParticles.length;
	while(sp--) {
		smokeParticles[sp].rotation.z += (delta * 0.2); // Slower rotation
		smokeParticles[sp].position.y += delta * 5; // Slow upward movement

		// Reset particle position when it goes too high
		if (smokeParticles[sp].position.y > 100) {
			smokeParticles[sp].position.y = Math.random() * 100 - 150;
		}
	}
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0.8,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();

// Mouse light effect
const mouseLight = document.querySelector('.mouse-light');
let mouseLightVisible = false;

function updateMouseLightColor() {
	const currentCard = cardsContainerEl.querySelector(".current--card");
	const cardImage = currentCard.querySelector(".card__image");
	const backgroundColor = window.getComputedStyle(cardImage).backgroundColor;
	
	// Extract RGB values
	const rgbMatch = backgroundColor.match(/\d+/g);
	if (rgbMatch) {
		const [r, g, b] = rgbMatch.map(Number);
		// Create a slightly more visible version of the color
		const lightColor = `rgba(${r}, ${g}, ${b}, 0.2)`; // Increased from 0.05 to 0.1
		mouseLight.style.background = `radial-gradient(circle, ${lightColor} 0%, rgba(255,255,255,0) 70%)`;
	}
}

document.addEventListener('mousemove', (e) => {
	if (!mouseLightVisible) {
		mouseLight.style.opacity = '1';
		mouseLightVisible = true;
	}
	
	gsap.to(mouseLight, {
		duration: 0.3,
		left: e.clientX - 150,
		top: e.clientY - 150,
		ease: 'power2.out'
	});
});

document.addEventListener('mouseleave', () => {
	mouseLight.style.opacity = '0';
	mouseLightVisible = false;
});

// Call updateMouseLightColor initially to set the correct color
updateMouseLightColor();

// Add this function to handle the card exit animation
function exitAnimation(url) {
	const cards = cardsContainerEl.children;
	const texts = cardInfosContainerEl.querySelectorAll('.text');
	const buttons = document.querySelectorAll('.cardList__btn');

	gsap.timeline()
		.to(buttons, {
		duration: 0.2,
		opacity: 0,
		pointerEvents: 'none'
	})
		.to(texts, {
		duration: 0.4,
		stagger: 0.1,
		opacity: 0,
		translateY: '-40px'
	})
		.to(cards, {
		duration: 0.5,
		stagger: {
			ease: 'power4.inOut',
			from: 'center',
			amount: 0.1
		},
		'--card-translateY-offset': '100vh'
	})
		.to('.app__bg', {
		duration: 0.4,
		opacity: 0
	})
		.call(() => window.location.href = url);
}

document.addEventListener('DOMContentLoaded', function() {
	const darkModeToggle = document.getElementById('darkModeToggle');
	const body = document.body;
	const lightModeSound = document.getElementById('lightModeSound');
	const darkModeSound = document.getElementById('darkModeSound');

	darkModeToggle.addEventListener('click', () => {
		document.body.classList.toggle('dark-mode');
		
		if (document.body.classList.contains('dark-mode')) {
			darkModeSound.play();
		} else {
			lightModeSound.play();
		}
	});

	darkModeToggle.addEventListener('click', function() {
		// Add transition class for animation
		body.classList.add('theme-transition');
		
		// Get the current icon
		const icon = darkModeToggle.querySelector('i');
		const currentIcon = icon.className;
		const newIcon = body.classList.contains('light-mode') ? 'fas fa-moon' : 'fas fa-sun';
		
		// Start rotation and icon change
		icon.style.transition = 'transform 0.5s ease';
		icon.style.transform = 'rotate(360deg)';
		
		// Change icon halfway through the rotation
		setTimeout(() => {
			icon.className = newIcon;
		}, 250);
		
		// Toggle light mode and reset rotation after animation
		setTimeout(() => {
			body.classList.toggle('light-mode');
			
			// Reset rotation
			icon.style.transition = 'none';
			icon.style.transform = 'rotate(0deg)';
		}, 500);
		
		// Remove transition class after animation completes
		setTimeout(() => {
			body.classList.remove('theme-transition');
		}, 1000);
	});

	function updateDarkModeIcon() {
		const icon = darkModeToggle.querySelector('i');
		if (body.classList.contains('light-mode')) {
			icon.className = 'fas fa-sun';
		} else {
			icon.className = 'fas fa-moon';
		}
	}
});

// Smoke effect
const canvas = document.getElementById('smokeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.radius = Math.random() * 2 + 1;
        this.speedY = -Math.random() * 0.5 - 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.opacity < 0.2) {
            this.opacity += 0.001;
        }
        if (this.y < canvas.height - 100) {
            this.y = canvas.height + Math.random() * 200;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateSmoke() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateSmoke);
}

animateSmoke();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});