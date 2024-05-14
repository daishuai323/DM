console.log('init');
document.body.insertAdjacentHTML(
  'beforeend',
  `<div id="my-overlay">
    This is an overlay
    <form id="my-form">
      <input type="text" id="my-input">
      <input type="submit" value="Submit">
    </form>
  </div>`
);
document.querySelector('#my-overlay').style.cssText =
  'position: fixed; bottom: 0px; left: 0px; right:0; background: white; border: 1px solid black; padding: 10px;z-index: 999999;';

document.querySelector('#my-form').addEventListener('submit', function (event) {
  console.log('test x');
  event.preventDefault();
  var inputValue = document.querySelector('#my-input').value;
  var randomTop = Math.floor(Math.random() * 60) + 20;

  var newDiv = document.createElement('div');
  newDiv.textContent = inputValue;
  newDiv.style.cssText = `
    position: fixed;
    top: ${randomTop}%;
    right:0;
    transform: translateX(-50%);
    animation: float 5s ease-in-out forwards;
  `;

  // Add the new div to the body
  document.body.appendChild(newDiv);

  // Define the keyframes for the "float" animation
  var style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0% { left: -20px; }
      100% { left: 100%; }
    }
  `;
  document.head.appendChild(style);
});
