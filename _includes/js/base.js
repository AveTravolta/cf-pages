//<![CDATA[
    window.onload = function runScript() {
        if (document.getElementById("domainName")) {
          document.getElementById("domainName").innerHTML = window.location.hostname;
        }
      };
      
      // Dark Mode Toggle Functionality
      const toggleButton = document.createElement('button');
      toggleButton.textContent = 'Toggle Dark Mode';
      toggleButton.style.position = 'absolute';
      toggleButton.style.top = '20px';
      toggleButton.style.right = '20px';
      toggleButton.style.padding = '10px';
      toggleButton.style.backgroundColor = '#FF4C4C';
      toggleButton.style.border = 'none';
      toggleButton.style.color = '#fff';
      toggleButton.style.cursor = 'pointer';
      document.body.appendChild(toggleButton);
      
      toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
      });
      
      // Rest of your existing code
      const stackContainer = document.querySelector('.stack-container');
      const cardNodes = document.querySelectorAll('.card-container');
      const perspecNodes = document.querySelectorAll('.perspec');
      const perspec = document.querySelector('.perspec');
      const card = document.querySelector('.card');
      
      let counter = stackContainer.children.length;
      
      // Function to generate random number
      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
      // After tilt animation, fire the explode animation
      card.addEventListener('animationend', function () {
        perspecNodes.forEach(function (elem, index) {
          elem.classList.add('explode');
        });
      });
      
      // After explode animation do a bunch of stuff
      perspec.addEventListener('animationend', function (e) {
        if (e.animationName === 'explode') {
          cardNodes.forEach(function (elem, index) {
            // Add hover animation class
            elem.classList.add('pokeup');
      
            // Add event listener to throw card on click
            elem.addEventListener('click', function () {
              let updown = [800, -800];
              let randomY = updown[Math.floor(Math.random() * updown.length)];
              let randomX = Math.floor(Math.random() * 1000) - 1000;
              elem.style.transform =
                `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
              elem.style.transition = "transform 1s ease, opacity 2s";
              elem.style.opacity = "0";
              counter--;
              if (counter === 0) {
                stackContainer.style.width = "0";
                stackContainer.style.height = "0";
              }
            });
      
            // Generate random number of lines of code between 4 and 10 and add to each card
            let numLines = randomIntFromInterval(5, 10);
      
            // Loop through the lines and add them to the DOM
            for (let index = 0; index < numLines; index++) {
              let lineLength = randomIntFromInterval(25, 97);
              var node = document.createElement("li");
              node.classList.add('node-' + index);
              elem.querySelector('.code ul').appendChild(node).setAttribute('style',
                '--linelength: ' + lineLength + '%;');
      
              // Draw lines of code 1 by 1
              if (index == 0) {
                elem.querySelector('.code ul .node-' + index).classList.add('writeLine');
              } else {
                elem.querySelector('.code ul .node-' + (index - 1)).addEventListener(
                  'animationend',
                  function (e) {
                    elem.querySelector('.code ul .node-' + index).classList.add(
                      'writeLine');
                  });
              }
            }
          });
        }
      });
      //]]>
