import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

/*
  PERSONALISE THIS FILE:
  - Edit the planet messages and gift text below.
  - The site works without photos; all planets and the space scene are generated in 3D.
*/

const destinations = [
  {
    name: "The Moon", kicker: "DESTINATION 01 · THE BEGINNING",
    subtitle: "Every great journey starts with one small step.",
    caption: "LUNAR OUTPOST · 384,400 KM",
    message: "Hey Madhuraa! Welcome to your little universe. I wanted to make something that feels as special as all the memories we've collected. This is only the beginning.",
    giftTitle: "Your first little surprise",
    giftText: "If I could put one thing inside this gift box, it would be a reminder that you are appreciated more than words can explain. Keep smiling, keep shining, and never stop being wonderfully you.",
    colors: ["#e8e8ef","#8d9ab7","#39445f"], glow: "rgba(177,194,255,.25)"
  },
  {
    name: "Friendship Planet", kicker: "DESTINATION 02 · OUR CHAOTIC CORNER",
    subtitle: "The best memories are the ones we never planned.",
    caption: "FRIENDSHIP ORBIT · GOOD TIMES ONLY",
    message: "Some conversations become memories, some silly moments become stories, and some people make even an ordinary day feel special. Thank you for being one of those people.",
    giftTitle: "A pocketful of happy moments",
    giftText: "Your digital gift: a lifetime supply of random laughs, dramatic storytelling, unexpected adventures, and someone cheering for you in every new chapter.",
    colors: ["#ffc4e3","#bd75bd","#623f91"], glow: "rgba(255,139,218,.25)"
  },
  {
    name: "Treasure Planet", kicker: "DESTINATION 03 · HIDDEN IN PLAIN SIGHT",
    subtitle: "Little things. Big feelings. Priceless memories.",
    caption: "TREASURE VAULT · UNLOCKED WITH A SMILE",
    message: "Not every treasure has to sparkle. Sometimes it is a random message, a shared joke, a silly photo we wish we had taken, or a moment that still makes us smile.",
    giftTitle: "The invisible treasure chest",
    giftText: "Inside this chest: patience for your tough days, extra courage for your big dreams, laughter for the boring days, and a reminder that you deserve beautiful things.",
    colors: ["#ffe5a1","#d89c50","#80513e"], glow: "rgba(255,202,110,.27)"
  },
  {
    name: "Dream Planet", kicker: "DESTINATION 04 · TO INFINITY",
    subtitle: "Your next chapter is going to be amazing.",
    caption: "FUTURE STATION · INFINITE POSSIBILITIES",
    message: "I hope the future brings you opportunities that excite you, people who value you, and countless reasons to feel proud of yourself. Keep going after the things that make your heart feel alive.",
    giftTitle: "A wish for your future",
    giftText: "May your plans become progress, your efforts become achievements, and your dreams become stories you one day tell with a huge smile. You have so much ahead of you.",
    colors: ["#a9e6ff","#5d93d0","#39417e"], glow: "rgba(93,179,255,.28)"
  },
  {
    name: "Secret Planet", kicker: "DESTINATION 05 · JUST BETWEEN US",
    subtitle: "A little corner of the universe, made just to remind you how precious you are.",
    caption: "SECRET GALAXY · HEART ACCESS ONLY",
    message: "You made it to the secret planet, Pandaa. This is the last stop on our journey, and I saved the most important words for here. Take a breath, open your little gift, and read it slowly. 💜",
    giftTitle: "A letter from my heart, Pandaa",
    giftText: "Happy Birthday, Pandaa. 💜 I wish I could pause time for a moment, just so you could see yourself through the eyes of the people who are lucky enough to know you. Maybe then you would understand how much happiness your presence can bring, even on days when you don't realise it.I hope life is gentle with your heart. I hope the dreams you quietly carry find their way to you. I hope every tear you ever shed is followed by a reason to smile, every difficult day teaches you how strong you are, and every new morning brings a little more hope than the one before.And when the world feels too heavy, please remember this: you do not have to be perfect, strong, cheerful, or okay all the time to be worthy of love and kindness. You are enough exactly as you are. Never let a bad day make you forget that.Thank you for the laughs, the little moments, and for being someone whose existence makes this world a little more beautiful. I may not be able to give you every beautiful thing life has to offer, but I will always wish those things for you with all my heart.So here's my birthday wish: may you grow into the happiest version of yourself, may your eyes shine with excitement for the life ahead, and may you look back one day and realise that so many beautiful things were waiting for you all along. Keep smiling, Pandaa. The world is lucky to have you in it.Happy Birthday, my favourite human. Keep shining. Always. ✨💜",
    colors: ["#c6b4ff","#7553b8","#29245c"], glow: "rgba(163,127,255,.3)"
  }
  
];


let currentIndex = 0;
let revealed = new Set();
let soundEnabled = false;
let audioContext = null;

const $ = id => document.getElementById(id);
const earthScreen = $("earthScreen"), travelScreen = $("travelScreen"), planetScreen = $("planetScreen");
const giftModal = $("giftModal"), finalModal = $("finalModal");

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}
function playTone(freq=440, duration=.13, type="sine") {
  if (!soundEnabled) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator(), gain = audioContext.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.08, audioContext.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + duration);
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + duration + .02);
  } catch(e) {}
}
function setScreen(screen) {
  [earthScreen, travelScreen, planetScreen].forEach(el => el.classList.remove("active"));
  screen.classList.add("active");
}
function renderPlanet(index) {
  currentIndex = index;
  const p = destinations[index];
  $("journeyStatus").textContent = `MISSION CONTROL · ${p.name.toUpperCase()}`;
  $("destinationCount").textContent = `${String(index+1).padStart(2,"0")} / 05 DESTINATIONS`;
  $("planetKicker").textContent = p.kicker;
  $("planetName").textContent = p.name;
  $("planetSubtitle").textContent = p.subtitle;
  $("planetCaption").textContent = p.caption;
  $("planetMessage").textContent = p.message;
  $("journeyProgress").style.width = `${((index+1)/destinations.length)*100}%`;
  const planet = $("planetVisual");
  planet.dataset.world = String(index);
  planet.style.background = `radial-gradient(circle at 32% 28%, ${p.colors[0]}, ${p.colors[1]} 32%, ${p.colors[2]} 76%)`;
  planet.style.boxShadow = `inset -35px -20px 55px rgba(0,0,0,.65), 0 0 75px ${p.glow}`;
  $("revealBtn").querySelector("span").textContent = revealed.has(index) ? "Open your surprise again" : "Reveal your surprise";
  $("unlockNote").textContent = index === destinations.length-1
    ? "You've reached the final destination. Your universe is complete."
    : revealed.has(index) ? "Surprise discovered! The next destination is now unlocked." : "Reveal your surprise to unlock the next destination.";
  $("memoryGalaxy").classList.toggle("hidden", index !== destinations.length-1);
  renderNav();
}
function renderNav() {
  const nav = $("planetNav"); nav.innerHTML = "";
  destinations.forEach((p,i) => {
    const btn = document.createElement("button");
    btn.textContent = `${String(i+1).padStart(2,"0")} · ${p.name.toUpperCase()}`;
    btn.className = i === currentIndex ? "current" : "";
    btn.disabled = i > currentIndex || (i === currentIndex+1 && !revealed.has(currentIndex));
    btn.addEventListener("click", () => { if(i <= currentIndex) { renderPlanet(i); playTone(520); } });
    nav.appendChild(btn);
  });
}
function openModal(el) { el.classList.add("open"); playTone(660,.18); }
function closeModal(el) { el.classList.remove("open"); }
function revealGift() {
  const p = destinations[currentIndex];
  $("giftTitle").textContent = p.giftTitle;
  $("giftText").textContent = p.giftText;
  revealed.add(currentIndex);
  $("revealBtn").querySelector("span").textContent = "Open your surprise again";
  $("unlockNote").textContent = currentIndex === destinations.length-1 ? "The final surprise is yours. Thank you for travelling through this universe." : "Surprise discovered! Your next flight is ready.";
  $("nextPlanetBtn").classList.toggle("hidden", currentIndex === destinations.length-1);
  renderNav();
  openModal(giftModal);
  if(currentIndex === destinations.length-1) {
    $("memoryGalaxy").classList.remove("hidden");
    setTimeout(() => $("memoryGalaxy").scrollIntoView({behavior:"smooth",block:"start"}), 450);
    setTimeout(() => openModal(finalModal), 1200);
  } else showToast("Surprise discovered · Next planet unlocked ✨");
}
function launchJourney() {
  $("journeyStatus").textContent = "MISSION CONTROL · LAUNCH IN PROGRESS";
  setScreen(travelScreen);
  $("travelTitle").textContent = "Leaving everything familiar...";
  $("travelText").textContent = "The stars are getting closer. Our story is just getting started.";
  $("travelHint").textContent = "IGNITION · FLIGHT PATH LOCKED";
  $("travelProgress").style.width = "100%";
  playTone(160,.35,"sawtooth"); setTimeout(()=>playTone(220,.4,"sawtooth"),250);
  setTimeout(() => {
    $("travelTitle").textContent = "A soft landing on the Moon.";
    $("travelText").textContent = "One small step into a universe full of memories.";
    $("travelHint").textContent = "LANDING SEQUENCE COMPLETE";
    playTone(520,.22);
  }, 3600);
  setTimeout(() => { setScreen(planetScreen); renderPlanet(0); showToast("Welcome to the Moon, Pandaa 🌙"); }, 5200);
}
function travelToNext() {
  const next = currentIndex + 1;
  if(next >= destinations.length || !revealed.has(currentIndex)) return;
  setScreen(travelScreen);
  $("journeyStatus").textContent = `MISSION CONTROL · EN ROUTE TO ${destinations[next].name.toUpperCase()}`;
  $("travelTitle").textContent = `Next stop: ${destinations[next].name}`;
  $("travelText").textContent = "Buckle up. There's another little piece of our story waiting.";
  $("travelHint").textContent = "INTERPLANETARY FLIGHT IN PROGRESS";
  $("travelProgress").style.width = "0%";
  requestAnimationFrame(() => $("travelProgress").style.width = "100%");
  playTone(190,.25,"sawtooth");
  setTimeout(() => { setScreen(planetScreen); renderPlanet(next); showToast(`${destinations[next].name} unlocked ✨`); playTone(620,.2); }, 4200);
}
$("launchBtn").addEventListener("click", launchJourney);
$("revealBtn").addEventListener("click", revealGift);
$("nextPlanetBtn").addEventListener("click", travelToNext);
$("musicToggle").addEventListener("click", async () => {
  const audio = $("memoryAudio"), button = $("musicToggle"), status = $("musicStatus");
  try {
    if (audio.paused) { await audio.play(); button.textContent = "Ⅱ Pause our song"; status.textContent = "Playing · stay for a little while"; $("memoryGalaxy").querySelector(".memory-music").classList.add("playing"); }
    else { audio.pause(); button.textContent = "▶ Play our song"; status.textContent = "A song to keep this moment close"; $("memoryGalaxy").querySelector(".memory-music").classList.remove("playing"); }
  } catch (error) { status.textContent = "Add your audio file at assets/our-song.mp3 to play music"; showToast("Add your song file to the assets folder 🎵"); }
});
$("memoryAudio").addEventListener("ended", () => { $("musicToggle").textContent = "▶ Play our song"; $("memoryGalaxy").querySelector(".memory-music").classList.remove("playing"); });
$("soundToggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  $("soundToggle").querySelector("span").textContent = soundEnabled ? "Sound on" : "Sound off";
  $("soundToggle").style.borderColor = soundEnabled ? "rgba(245,201,120,.6)" : "";
  playTone(520);
});
document.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", () => closeModal($(btn.dataset.close))));
[ giftModal, finalModal ].forEach(modal => modal.addEventListener("click", e => { if(e.target === modal) closeModal(modal); }));

// Three.js starfield: procedural, so no image assets are required.
const canvas = $("space");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, .1, 1000);
camera.position.z = 45;
const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth, window.innerHeight);
const starGeometry = new THREE.BufferGeometry();
const starCount = 1700;
const positions = new Float32Array(starCount*3);
for(let i=0;i<starCount;i++){
  positions[i*3]=(Math.random()-.5)*170;
  positions[i*3+1]=(Math.random()-.5)*110;
  positions[i*3+2]=(Math.random()-.5)*100;
}
starGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
const stars = new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xcbd6ff,size:.12,transparent:true,opacity:.8}));
scene.add(stars);
const dustGeometry = new THREE.BufferGeometry(), dustPos = new Float32Array(450*3);
for(let i=0;i<450;i++){dustPos[i*3]=(Math.random()-.5)*130;dustPos[i*3+1]=(Math.random()-.5)*80;dustPos[i*3+2]=(Math.random()-.5)*70;}
dustGeometry.setAttribute("position",new THREE.BufferAttribute(dustPos,3));
const dust = new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:0x8f83cf,size:.22,transparent:true,opacity:.35}));
scene.add(dust);
const ambient = new THREE.AmbientLight(0x7181c0, .65); scene.add(ambient);
const light = new THREE.PointLight(0xf4cf91,1.5,100); light.position.set(8,8,20); scene.add(light);
function animate(){
  requestAnimationFrame(animate);
  stars.rotation.y += .00012; stars.rotation.x += .00004;
  dust.rotation.y -= .00018;
  renderer.render(scene,camera);
}
animate();
window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
