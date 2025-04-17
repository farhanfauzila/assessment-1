// Tunggu hingga dokumen sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Periksa apakah kita berada di halaman game
    if(document.getElementById('guess-input')) {
        startNewGame();
    }
});

// Fungsi untuk menghasilkan angka acak antara min dan max (inklusif)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk memulai permainan baru
function startNewGame() {
    console.log("Game dimulai!");
    // Menggunakan closure untuk menyimpan angka target
    let targetNumber = getRandomNumber(1, 100);
    console.log("Angka target: " + targetNumber); // Untuk debugging
    let attempts = 0;
    let gameOver = false;
    let score = 100;
    let guessHistory = [];
    
    // Mengakses elemen-elemen DOM
    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const feedback = document.getElementById('feedback');
    const historyList = document.getElementById('history-list');
    const scoreDisplay = document.getElementById('score');
    const attemptsDisplay = document.getElementById('attempts');
    const resetBtn = document.getElementById('reset-btn');
    
    // Periksa apakah semua elemen ditemukan
    if(!guessInput || !guessBtn || !feedback || !historyList || !scoreDisplay || !attemptsDisplay || !resetBtn) {
        console.error("Beberapa elemen DOM tidak ditemukan!");
        return;
    }
    
    // Menampilkan skor dan percobaan awal
    scoreDisplay.textContent = score;
    attemptsDisplay.textContent = attempts;
    
    // Reset tampilan
    feedback.textContent = 'Tebak angka antara 1-100!';
    feedback.className = 'feedback';
    historyList.innerHTML = '';
    guessInput.value = '';
    guessInput.focus();
    
    // Fungsi untuk memproses tebakan
    function processGuess() {
        if (gameOver) return;
        
        const guess = parseInt(guessInput.value);
        console.log("Tebakan: " + guess); // Untuk debugging
        
        // Validasi input
        if (isNaN(guess) || guess < 1 || guess > 100) {
            feedback.textContent = 'Masukkan angka valid antara 1 dan 100!';
            feedback.className = 'feedback';
            return;
        }
        
        // Menambah jumlah percobaan
        attempts++;
        attemptsDisplay.textContent = attempts;
        
        // Mengurangi skor untuk setiap tebakan
        score = Math.max(0, score - 5);
        scoreDisplay.textContent = score;
        
        // Perbandingan dengan angka target
        let result;
        if (guess < targetNumber) {
            result = 'terlalu rendah';
            feedback.textContent = `${guess} terlalu rendah!`;
            feedback.className = 'feedback too-low';
        } else if (guess > targetNumber) {
            result = 'terlalu tinggi';
            feedback.textContent = `${guess} terlalu tinggi!`;
            feedback.className = 'feedback too-high';
        } else {
            result = 'benar';
            feedback.textContent = `Selamat! ${guess} adalah angka yang benar!`;
            feedback.className = 'feedback correct';
            gameOver = true;
            // Bonus skor untuk jawaban benar
            score += 20;
            scoreDisplay.textContent = score;
        }
        
        // Menyimpan tebakan ke dalam riwayat
        guessHistory.push({ number: guess, result });
        updateHistory();
        
        // Reset input
        guessInput.value = '';
        guessInput.focus();
    }
    
    // Fungsi untuk memperbarui riwayat tebakan
    function updateHistory() {
        historyList.innerHTML = '';
        
        // Higher-order function: menggunakan forEach untuk merender setiap item riwayat
        guessHistory.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>Tebakan #${index + 1}: ${item.number}</span>
                <span class="attempt-${item.result === 'terlalu tinggi' ? 'high' : item.result === 'terlalu rendah' ? 'low' : 'correct'}">
                    ${item.result}
                </span>
            `;
            historyList.appendChild(li);
        });
    }
    
    // Event listener untuk tombol tebak
    guessBtn.addEventListener('click', processGuess);
    console.log("Event listener untuk tombol tebak ditambahkan");
    
    // Event listener untuk input (enter key)
    guessInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            processGuess();
        }
    });
    console.log("Event listener untuk input ditambahkan");
    
    // Event listener untuk tombol reset
    resetBtn.addEventListener('click', function() {
        startNewGame();
    });
    console.log("Event listener untuk tombol reset ditambahkan");
}