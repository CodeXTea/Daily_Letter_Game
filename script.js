let letters = [];
let maxLetters = 20;
let forbiddenWords = ["KATA_KESAT_1", "KATA_KESAT_2", "KATA_KESAT_3"];

function addLetter() {
    let input = document.getElementById("input-letter").value.trim().toUpperCase();
    if (input.length !== 1 || !isValidInput(input)) {
        alert("Input tidak sah. Sila masukkan satu huruf, nombor, atau jenis yang dibenarkan.");
        return;
    }

    let today = new Date().toLocaleDateString();
    let existingLetter = letters.find(item => item.input === input && item.date === today);

    if (existingLetter) {
        alert("Anda sudah menulis pada hari ini.");
        return;
    }

    if (letters.length >= maxLetters) {
        alert("Anda telah mencapai had maksimum yang boleh ditulis.");
        return;
    }

    if (isForbiddenWord(input)) {
        if (confirm("Kata kesat telah dideteksi. Anda ingin melanjutkan?")) {
            addLetterWithWarning(input, today);
        }
    } else {
        addLetterWithWarning(input, today);
    }

    document.getElementById("save-button").style.display = "block";
}

function addLetterWithWarning(input, today) {
    letters.push({ input: input, date: today, time: new Date().toLocaleTimeString() });
    displayLetters();
}

function displayLetters() {
    let lettersDisplay = document.getElementById("letters-display");
    lettersDisplay.innerHTML = "";
    letters.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.input} (${item.date}, ${item.time})`;
        lettersDisplay.appendChild(li);
    });
}

function isValidInput(input) {
    if (/^[A-Z]$/.test(input)) {
        return true;
    }
    if (/^\d$/.test(input)) {
        return true;
    }
    if (/^[&☆■♤♡°♧]$/.test(input)) {
        return true;
    }
    if (input === " ") {
        return true;
    }
    return false;
}

function isForbiddenWord(input) {
    return forbiddenWords.includes(input);
}

function saveGame() {
    let username = document.getElementById("username-input").value.trim();
    let gameData = {
        username: username,
        letters: letters
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
    alert("Permainan disimpan.");
    document.getElementById("save-button").style.display = "none";
}

function startGame() {
    let username = document.getElementById("username-input").value.trim();
    if (!username) {
        alert("Sila isi nama pengguna terlebih dahulu.");
        return;
    }
    document.getElementById("username-form").style.display = "none";
    document.getElementById("user-info").style.display = "block";
    document.getElementById("usernameDisplay").innerText = "Welcome, " + username + "!";
}

function backToUsername() {
    let backButton = document.getElementById("backToUsername");
    if (backButton.hasAttribute("data-developer")) {
        document.getElementById("username-form").style.display = "block";
        document.getElementById("user-info").style.display = "none";
        document.getElementById("username-input").value = "";
    } else {
        alert("Hanya Developer yang dapat menggunakan tombol ini.");
    }
}
window.onload = function() {
    let savedGameData = localStorage.getItem("gameData");
    if (savedGameData) {
        let gameData = JSON.parse(savedGameData);
        document.getElementById("username-input").value = gameData.username;
        letters = gameData.letters;
        displayLetters();
        
        // Tampilkan formulir nama pengguna jika belum disubmit
        if (!gameData.username) {
            document.getElementById("username-form").style.display = "block";
        } else {
            document.getElementById("username-form").style.display = "none";
            document.getElementById("user-info").style.display = "block";
            document.getElementById("usernameDisplay").innerText = "Welcome, " + gameData.username + "!";
        }
        
        // Tampilkan tombol simpan permainan jika permainan sudah dimulai
        document.getElementById("save-button").style.display = "block";
    }
};

function togglePlayersMenu() {
    let playersMenu = document.getElementById("players-menu");
    if (playersMenu.style.display === "none") {
        playersMenu.style.display = "block";
    } else {
        playersMenu.style.display = "none";
    }
}

function checkPassword() {
    let password = document.getElementById("password-input").value.trim();
    // Periksa apakah kata sandi sesuai dengan yang diinginkan
    if (password === "Java_Teams") {
        displayPlayers();
    } else {
        alert("Kata sandi salah. Akses ditolak.");
    }
}

function displayPlayers() {
    let playersList = document.getElementById("players-list");
    playersList.innerHTML = "";
    // Ambil data pengguna dari localStorage
    let savedGameData = localStorage.getItem("gameData");
    if (savedGameData) {
        let gameData = JSON.parse(savedGameData);
        let players = gameData.players;
        if (players && players.length > 0) {
            // Tampilkan nama-nama pengguna yang sudah dimasukkan sebelumnya
            players.forEach(player => {
                let playerDiv = document.createElement("div");
                playerDiv.textContent = player;
                playersList.appendChild(playerDiv);
            });
        } else {
            playersList.textContent = "Belum ada nama pengguna yang tersimpan.";
        }
    } else {
        playersList.textContent = "Belum ada nama pengguna yang tersimpan.";
    }
}
