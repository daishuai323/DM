(function () {
  // Ensure the script can be re-executed by removing existing elements and listeners
  const existingOverlay = document.getElementById('word-cloud-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // List of words for the word cloud
  let words = [
    'Blockchain',
    'Bitcoin',
    'Ethereum',
    'Ripple',
    'Litecoin',
    'Cardano',
    'Polkadot',
    'Dogecoin',
    'Shiba',
    'Solana',
    'Terra',
    'Avalanche',
    'Binance',
    'Coinbase',
    'Kraken',
    'Gemini',
    'DeFi',
    'NFT',
    'Metaverse',
    'Web3',
  ];

  // Colors array
  let colors = ['white', 'yellow', 'green'];

  // Create the overlay element
  let overlay = document.createElement('div');
  overlay.id = 'word-cloud-overlay';
  document.getElementById('tv-chart-container').appendChild(overlay);

  // Style the overlay to cover the entire screen
  // overlay.style.position = 'fixed';
  // overlay.style.top = '0';
  // overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '10000';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.overflow = 'hidden';

  // Function to randomize style and initiate animation
  function randomizeStyle(element, word) {
    const fontSize = Math.random() * (24 - 16) + 16; // Random font size between 16px and 24px
    const verticalPos = Math.random() * 50 + 10;
    const horizontalStartPos = Math.random() * 100; // Random horizontal start position beyond 100%
    const colorIndex = Math.floor(Math.random() * 3); // Random color index
    const transitionTime = Math.floor(Math.random() * 10 + 10); // Random transition time between 10s and 20s
    element.style.fontSize = `${fontSize}px`;
    element.style.color = colors[colorIndex];
    element.style.position = 'absolute';
    element.style.whiteSpace = 'nowrap';
    element.innerText = word;
    element.style.top = `${verticalPos}vh`;
    element.style.right = `-${horizontalStartPos}%`; // Start offscreen to the right with randomization
    console.log(`Word: ${word}, Start Pos: -${horizontalStartPos}%`);
    // Animation

    element.style.transition = `right ${transitionTime}s linear`;
    setTimeout(() => {
      element.style.right = '100%'; // End offscreen to the left
    }, 100); // Start moving shortly after rendering
  }

  // Add words to the overlay with random styles and animation
  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    randomizeStyle(wordSpan, word);
    overlay.appendChild(wordSpan);

    if (index === words.length - 1) {
      wordSpan.addEventListener('transitionend', () => {
        setTimeout(() => overlay.remove(), 500); // Wait half a second before removing the overlay to ensure the last animation completes
      });
    }
  });
})();
