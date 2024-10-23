import { PaddleObj } from './PaddleObj.js';

level = 0;

const paddle = new PaddleObj();
const counter = document.getElementById('count');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const levelSection = document.querySelector('.level');


// Update the display
function updateCount() {
    // get count and amount
    let count = paddle.levels[level].count
    let amount = paddle.levels[level].amount

    // update count display
    counter.textContent = minimizeNotation(count * amount);
    // update count record
    paddle.incrementCount(amount);
}

function updateLevel() {
    // Update the level window
    document.getElementById('level').textContent = minimizeNotation(level);
}

// slick chat GPT function for readability
function minimizeNotation(num) {
    const suffixes = ['', 'k', 'M', 'B', 'T']; // Suffixes for thousand, million, billion, etc.
    let suffixIndex = 0;

    // Divide num by 1000 until it's below 1000, and track how many times we divide
    while (num >= 1000 && suffixIndex < suffixes.length - 1) {
        num /= 1000;
        suffixIndex++;
    }

    // Format the number to a maximum of three significant digits
    let formattedNum = num.toFixed(2); // Initially keep 2 decimal places

    // Remove unnecessary .00 or .X0 (like 2.50 -> 2.5)
    if (formattedNum.endsWith('00')) {
        formattedNum = formattedNum.slice(0, -3); // Remove ".00"
    } else if (formattedNum.endsWith('0')) {
        formattedNum = formattedNum.slice(0, -1); // Remove trailing zero
    }

    return formattedNum + suffixes[suffixIndex];
}




// Increment button event
incrementBtn.addEventListener('click', function() {
    count++;
    updateCount();
});

// Decrement button event
decrementBtn.addEventListener('click', function() {
    count--;
    updateCount();
});

// Change level function
levelSection.addEventListener('click', (e) => {
    const sectionWidth = levelSection.offsetWidth;
    const clickX = e.clientX;

    if (clickX < sectionWidth / 2) {
        console.log('Left side clicked');
        decrementLevel(); // Call function for left side (decrement)
    } else {
        console.log('Right side clicked');
        incrementLevel(); // Call function for right side (increment)
    }
});