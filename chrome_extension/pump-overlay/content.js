console.log('init');
document.body.insertAdjacentHTML(
  'beforeend',
  `<div id="my-overlay">
    Send your DMs here
    <form id="my-form">
      <input type="text" id="my-input">
      <input type="submit" value="Pump it">
    </form>
  </div>`
);
document.querySelector('#my-overlay').style.cssText =
  'position: fixed; bottom: 0px; left: 0px; right:0; background: white; border: 1px solid black; padding: 10px;z-index: 999999;';

// WebSocket connection setup
const webSocket = new WebSocket('wss://play.savannah.haus/wss/');

webSocket.onopen = function(event) {
  console.log("Connection established");
};

webSocket.onerror = function(error) {
  console.error("WebSocket Error: ", error);
};

webSocket.onmessage = function(event) {
  try {
    // Parse the JSON data received
    const jsonData = JSON.parse(event.data);

    // Extract a specific field from the JSON. Replace 'yourFieldNameHere' with the actual field name
    const fieldValue = jsonData.meter_increment;
    
    // Generate a new div element with the field value as its text content
    var newDiv = document.createElement('div');
    newDiv.textContent = fieldValue;
    newDiv.style.cssText = `
      position: fixed;
      top: ${Math.floor(Math.random() * 60) + 20}%;
      right:0;
      transform: translateX(-50%);
      animation: float 10s ease-in-out forwards;
    `;

    // Add the new div to the body
    document.body.appendChild(newDiv);

    // Define the keyframes for the "float" animation if not already defined
    if (!document.querySelector('#float-animation-style')) {
      var style = document.createElement('style');
      style.id = 'float-animation-style';
      style.innerHTML = `
        @keyframes float {
          0% { right: -20px; }
          100% { right: 100%; }
        }
      `;
      document.head.appendChild(style);
    }
  } catch (e) {
    console.error("Error parsing JSON or updating input:", e);
  }
};

webSocket.onclose = function(event) {
  console.log("WebSocket connection closed");
};

document.querySelector('#my-form').addEventListener('submit', function (event) {
  console.log('test x');
  event.preventDefault();
  var inputValue = document.querySelector('#my-input').value;

  // Prepare the data to send to the server
  const postData = {
    Content: inputValue,
    UserName: "My User",
    Source: "telegram"
  };

  // Send the data to the server
  fetch('https://dm-nu.vercel.app/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });

  var randomTop = Math.floor(Math.random() * 60) + 20;

  var newDiv = document.createElement('div');
  newDiv.textContent = inputValue;
  newDiv.style.cssText = `
    position: fixed;
    top: ${randomTop}%;
    right:0;
    transform: translateX(-50%);
    animation: float 10s ease-in-out forwards;
  `;

  // Add the new div to the body
  document.body.appendChild(newDiv);

  // Define the keyframes for the "float" animation
  var style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0% { right: -20px; }
      100% { right: 100%; }
    }
  `;
  document.head.appendChild(style);
});
