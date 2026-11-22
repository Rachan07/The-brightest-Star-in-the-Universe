# Panda Universe — Rocket Journey

A cinematic, responsive birthday experience that starts with a rocket launch from Earth to the Moon, then unlocks five destinations in sequence. Each destination has a personal message, a digital surprise, and a shared-memory timeline.

## Run it

1. Extract the ZIP file.
2. Open the `Panda_Universe_Rocket_Journey` folder in Visual Studio Code.
3. Install the **Live Server** extension if you do not already have it.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Keep an internet connection on: Three.js and Google Fonts are loaded from CDNs.

Do not open `index.html` by double-clicking it; use Live Server so the JavaScript module can load correctly.

## Personalise the messages and memories

Open `app.js`.

- Edit the `destinations` array to change each planet's message, gift title, and gift text.
- Edit the `memories` array to add real dates, inside jokes, college moments, trips, conversations, and other memories you both share.
- No personal photos are required. The starfield and planet visuals are generated in the browser.

## Journey logic

- The first launch takes the visitor from Earth to the Moon.
- The visitor must reveal the surprise on the current planet to unlock the next planet.
- The five destinations are Moon, Friendship Planet, Treasure Planet, Dream Planet, and Secret Planet.
- The memory timeline can be opened from every destination.
- The sound button enables small synthesized interface tones. It is off by default.

## Files

- `index.html` — page structure and modals
- `style.css` — responsive cinematic interface
- `app.js` — launch sequence, unlock progression, messages, gifts, timeline, and Three.js starfield


## Final planet: music and photo memories

Put your chosen song at `assets/our-song.mp3`. Add three photos named `assets/photos/memory-1.jpg`, `memory-2.jpg`, and `memory-3.jpg`. Edit the card headings and captions in `index.html` for your real memories. Music begins only after the visitor presses Play because browsers block unexpected autoplay. Update the image paths if you use different filenames or extensions.

The opening page is now a distinct welcome/launch experience. Planets have layered atmosphere, surface texture, lighting/shadow and slow floating/orbital movement. Motion respects reduced-motion accessibility settings.
