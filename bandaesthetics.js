// ---- Simple dataset of bands. Add more to customize ----
      const BAND_DB = {
        "The Smiths": {
          name: "The Smiths",
          desc: "Poetic and quietly dramatic! You notice details others overlook. You carry bittersweet humor like a vintage scarf.",
          palette: ["#6b8b5a", "#d6c3a5", "#f5efe6", "#3a3a3f"],
          song: "How Soon Is Now?",
          quote:
            '"I am human and I need to be loved just like everybody else does."',
          link: "https://open.spotify.com/track/0k9OZAf8nNZo9vFRV3v21c",
        },
        "The Beatles": {
          name: "The Beatles",
          desc: "Warm, curious, and endlessly inventive. You love melodies that stick and stories that feel both simple and true.",
          palette: ["#ffdf6b", "#e86f45", "#ffffff", "#2c2c2c"],
          song: "Here Comes The Sun",
          quote: '"Here comes the sun and I say it\'s alright."',
          link: "https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2",
        },
        Queen: {
          name: "Queen",
          desc: "Bold, theatrical, and larger than life! You love drama, flair, and unforgettable moments. Creativity flows effortlessly in your soul.",
          palette: ["#f5e300", "#e60012", "#1a1a1a", "#ffffff"], // gold, red, black, white
          song: "Bohemian Rhapsody",
          quote:
            '"Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality"',
          link: "https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J",
        },
        Radiohead: {
          name: "Radiohead",
          desc: "Curious, a little haunted, and always searching for new angles. You like mood, texture, and questions without easy answers.",
          palette: ["#0b1017", "#2b3a42", "#9aa6ae", "#d6dbe1"],
          song: "Jigsaw Falling Into Place",
          quote:
            '"I never really got there I just pretended that I had. Words are blunt instruments.."',
          link: "https://open.spotify.com/track/0c6xIDDpzE81m2q797ordA",
        },
        Nirvana: {
          name: "Nirvana",
          desc: "Bold, restless, and honest! You prefer raw emotion over polish. You carry a quiet defiance and love rooms that echo.",
          palette: ["#0d0d0d", "#a6a6a6", "#b23a3a", "#f5f5f5"],
          song: "Smells Like Teen Spirit",
          quote: "Come as you are.",
          link: "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T",
        },
        "Cigarettes After Sex": {
          name: "Cigarettes After Sex",
          desc: "Dreamy, nocturnal, and tender. You speak softly but feel deeply, and you like the world drenched in low light.",
          palette: ["#0a0a0c", "#bfbfc7", "#f7f7f9", "#6f6f73"],
          song: "Apocalypse",
          quote: '"Come out and haunt me, I know you want me."',
          link: "https://open.spotify.com/track/6flbG3Vjc5cHfQzHq9yIuD",
        },

        "The Neighbourhood": {
          name: "The Neighbourhood",
          desc: "Sleek, cinematic, and a bit mysterious. You like contrasts and cool textures, a rainy street at night feels like home.",
          palette: ["#0f1114", "#6b6f7a", "#c9cdd6", "#f6f6f8"],
          song: "Afraid",
          quote:
            "When I wake up, I'm afraid Somebody else might take my place When I wake up, I'm afraid Somebody else might end up being me",
          link: "https://open.spotify.com/track/6w0Gk42FQYECz8Uw5rW2BB",
        },
        "The Cranberries": {
          name: "The Cranberries",
          desc: "Dreamy, nostalgic, and emotional. You feel deeply, notice small details, and have a poetic soul that resonates with quiet beauty.",
          palette: ["#c97b8f", "#f2e6f0", "#6f6f6f", "#2b2b2b"], // dusty rose, soft lilac, grey, dark grey
          song: "Linger",
          quote: "\"And I'm in so deep You know I'm such a fool for you.\"",
          link: "https://open.spotify.com/track/7A1ZlF92rD8yFJFLjKn0we",
        },

        "One Direction": {
          name: "One Direction",
          desc: "Playful, youthful, and charming! You love fun, catchy vibes, and a sense of camaraderie with your friends.",
          palette: ["#f7c3c3", "#8ccfff", "#ffffff", "#555555"], // soft pink, light blue, white, grey
          song: "What Makes You Beautiful",
          quote: '"Baby you light up my world like nobody else."',
          link: "https://open.spotify.com/track/6wD9G3nXvn0Q9fG1GVjvUl",
        },

        BoA: {
          name: "BoA",
          desc: "Energetic, elegant, and versatile! You shine in rhythm, enjoy exploring new styles, and are always pushing boundaries creatively.",
          palette: ["#ffcc00", "#ff66cc", "#000000", "#ffffff"], // gold, pink, black, white
          song: "Fool",
          quote:
            '"Now I see the world as an ancient place, as a smiling face. I can choose to be what I want to be if I choose to be."',
          link: "https://open.spotify.com/track/2jwUjIPhG3ogTbIq8sB7p6",
        },
      };

      // DOM refs
      const bandInput = document.getElementById("bandInput");
      const showBtn = document.getElementById("showBtn");
      const suggestions = document.getElementById("suggestions");
      const datalist = document.getElementById("bands");
      const resultCard = document.getElementById("resultCard");
      const empty = document.getElementById("empty");
      const bandName = document.getElementById("bandName");
      const bandMeta = document.getElementById("bandMeta");
      const bandDesc = document.getElementById("bandDesc");
      const paletteEl = document.getElementById("palette");
      const copyBtn = document.getElementById("copyBtn");
      const saveBtn = document.getElementById("saveBtn");
      const savedList = document.getElementById("savedList");

      // populate datalist and suggestions
      const bandNames = Object.keys(BAND_DB);
      bandNames.forEach((name) => {
        const opt = document.createElement("option");
        opt.value = name;
        datalist.appendChild(opt);
        const chip = document.createElement("button");
        chip.className = "chip";
        chip.textContent = name;
        chip.addEventListener("click", () => showBand(name));
        suggestions.appendChild(chip);
      });

      // show a band's mood
      function showBand(name) {
        const data = BAND_DB[name];
        if (!data) return showNotFound(name);
        // update UI
        bandName.textContent = data.name;
        bandMeta.innerHTML = `<a href="${data.link}" target="_blank">${data.song}</a> · ${data.quote}`;

        bandDesc.textContent = data.desc;
        paletteEl.innerHTML = "";
        data.palette.forEach((c) => {
          const s = document.createElement("div");
          s.className = "swatch";
          s.style.background = c;
          paletteEl.appendChild(s);
        });
        // colorize background subtly
        document.querySelector(
          ".app"
        ).style.boxShadow = `0 18px 60px ${hexToRgba(data.palette[0], 0.25)}`;
        resultCard.style.display = "";
        empty.style.display = "none";
        resultCard.classList.remove("result-appear");
        void resultCard.offsetWidth; // restart animation
        resultCard.classList.add("result-appear");
        // store last result in hash for sharing
        history.replaceState(null, "", "#" + encodeURIComponent(name));
      }

      // fallback for unknown band
      function showNotFound(name) {
        bandName.textContent = name || "Unknown band";
        bandMeta.textContent = "No prebuilt mood — try another.";
        bandDesc.textContent = `No profile found for “${name}”.`;
        paletteEl.innerHTML = "";
        resultCard.style.display = "";
        empty.style.display = "none";
      }

      // button
      showBtn.addEventListener("click", () => {
        const v = bandInput.value.trim();
        if (!v) return;
        showBand(v);
      });

      // copy share text
      copyBtn.addEventListener("click", () => {
        const text = `${bandName.textContent} — ${bandDesc.textContent}\nSong: ${bandMeta.textContent}`;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        });
      });

      function renderSaved() {
        savedList.innerHTML = "";
        const store = JSON.parse(
          localStorage.getItem("stereomood.saved") || "[]"
        );
        store.forEach((name) => {
          const chip = document.createElement("button");
          chip.className = "chip";
          chip.textContent = name;
          chip.addEventListener("click", () => showBand(name));
          savedList.appendChild(chip);
        });
      }
      renderSaved();

      // helper to convert hex to rgba
      function hexToRgba(hex, alpha) {
        try {
          hex = hex.replace("#", "");
          if (hex.length === 3)
            hex = hex
              .split("")
              .map((c) => c + c)
              .join("");
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          return `rgba(${r},${g},${b},${alpha})`;
        } catch (e) {
          return `rgba(0,0,0,${alpha})`;
        }
      }

      // init from hash
      (function initFromHash() {
        const name = decodeURIComponent(location.hash.replace("#", ""));
        if (name) showBand(name);
      })();

      // keyboard: enter triggers
      bandInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          showBtn.click();
        }
      });