class SlotMachine {
    constructor() {
        this.symbols = ['🍒', '7️⃣', '💎', '🍀', '🔔'];
        this.coinCount = 100;
        this.betAmount = 10;
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];
        this.spinButton = document.getElementById('spinButton');
        this.coinDisplay = document.getElementById('coinCount');
        
        this.spinSound = document.getElementById('spinSound');
        this.winSound = document.getElementById('winSound');
        this.loseSound = document.getElementById('loseSound');

        this.spinButton.addEventListener('click', () => this.spin());
    }

    spin() {
        if (this.coinCount < this.betAmount) {
            alert('Pas assez de pièces !');
            return;
        }

        this.spinSound.play();
        this.spinButton.disabled = true;
        this.coinCount -= this.betAmount;
        this.updateCoinDisplay();

        this.reels.forEach(reel => {
            reel.style.transform = 'translateY(-100%)';
            reel.style.opacity = '0';
        });

        setTimeout(() => {
            const results = this.reels.map(() => 
                this.symbols[Math.floor(Math.random() * this.symbols.length)]
            );

            this.reels.forEach((reel, index) => {
                reel.textContent = results[index];
                reel.style.transform = 'translateY(0)';
                reel.style.opacity = '1';
            });

            this.checkWin(results);
            this.spinButton.disabled = false;
        }, 1000);
    }

    checkWin(results) {
        const uniqueResults = new Set(results);
        
        if (uniqueResults.size === 1) {
            // All symbols match - big win
            this.coinCount += this.betAmount * 5;
            this.winSound.play();
        } else if (uniqueResults.size === 2) {
            // Partial match - small win
            this.coinCount += this.betAmount * 2;
            this.winSound.play();
        } else {
            // No match - lose
            this.loseSound.play();
        }

        this.updateCoinDisplay();
    }

    updateCoinDisplay() {
        this.coinDisplay.textContent = this.coinCount;
        
        if (this.coinCount <= 0) {
            alert('Perdu ! Vous n\'avez plus de pièces.');
            this.resetGame();
        }
    }

    resetGame() {
        this.coinCount = 100;
        this.updateCoinDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SlotMachine();
});