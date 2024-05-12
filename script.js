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

// Menambahkan nama pengguna ke dalam data permainan saat nama pengguna disubmit
function startGame() {
    let username = document.getElementById("username-input").value.trim();
    if (!username) {
        alert("Sila isi nama pengguna terlebih dahulu.");
        return;
    }
    let gameData = {
        username: username,
        letters: [],
        players: [username] // Menambahkan nama pengguna ke dalam data permainan
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
    document.getElementById("username-form").style.display = "none";
    document.getElementById("user-info").style.display = "block";
    document.getElementById("usernameDisplay").innerText = "Welcome, " + username + "!";
}

// Fungsi untuk menampilkan atau menyembunyikan menu pengembang
function togglePlayersMenu() {
    let password = prompt("Masukkan kata sandi developer:");
    if (password === "Java_Teams") { // Ganti "Java_Teams" dengan kata sandi yang diinginkan
        let playersMenu = document.getElementById("players-menu");
        playersMenu.style.display = "block";
        displayPlayers(); // Menampilkan daftar nama pengguna
     } else {
        let isDeveloper = confirm("Apakah Anda seorang developer?");
        if (isDeveloper) {
            let password = prompt("Masukkan kata sandi developer:");
            if (password === "Java_Teams") {
                playersMenu.style.display = "block";
                displayPlayers();
                document.getElementById("hide-players-button").style.display = "block";
            } else {
                alert("Kata sandi developer salah. Akses ditolak.");
            }
        }
    }
}

// Fungsi untuk menyembunyikan daftar nama pengguna
function hidePlayersList() {
    let playersMenu = document.getElementById("players-menu");
    playersMenu.style.display = "none";
    document.getElementById("hide-players-button").style.display = "none";
}

// Fungsi untuk menampilkan daftar nama pengguna
function displayPlayers() {
    let playersList = document.getElementById("players-list");
    playersList.innerHTML = "";
    let savedGameData = localStorage.getItem("gameData");
    if (savedGameData) {
        let gameData = JSON.parse(savedGameData);
        let players = gameData.players;
        if (players && players.length > 0) {
            // Urutkan daftar nama pengguna secara alfabetis
            players.sort();
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
    // Ubah properti display menjadi block setelah kata sandi divalidasi
    playersList.style.display = "block";
                    }
            
