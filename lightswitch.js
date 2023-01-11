const switchContainer = document.createElement('div');
const toggleSwitchInput = document.createElement('input');
const toggleSwitchSlider = document.createElement('slider');
const toggleSwitchLabel = document.createElement('label');

switchContainer.classList.add('switch-container');
toggleSwitchInput.type = 'checkbox';
toggleSwitchInput.id = 'toggle-switch';
toggleSwitchSlider.classList.add('slider');
toggleSwitchLabel.classList.add('switch');

toggleSwitchLabel.append(toggleSwitchInput, toggleSwitchSlider);
switchContainer.append(toggleSwitchLabel);
document.body.append(switchContainer);

document.head.insertAdjacentHTML("beforeend", `
  <style>
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    
    .switch-container {
      justify-content: center;
      display: flex;
    }
    
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: #2196F3;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    }
  </style>
`);

const section = document.querySelector('body');

toggleSwitchInput.addEventListener('change', () => {
  localStorage.setItem('dark-mode', localStorage.getItem('dark-mode') === 'true' ? 'false' : 'true');
  const section = document.querySelector('body');
  recurseChildren(section, function (section) {
    const style = window.getComputedStyle(section);
    section.style.color = rgbSwitch(style.color);
    section.style.backgroundColor = rgbSwitch(style.backgroundColor);
  });
});

function rgbSwitch(c) {
  const r = c.match(/\d+/g).map(x => 255 - x)
  if (r.length == 4 && r[r.length - 1] == 255) return c
  return `rgb(${r.join(', ')})`
}

function recurseChildren(section, callback) {
  callback(section);
  for (const child of section.children) {
    recurseChildren(child, callback);
  }
}

window.addEventListener("load", function() {
  recurseChildren(section, function (section) {
    const style = window.getComputedStyle(section);
    section.style.color = style.color;
    section.style.backgroundColor = style.backgroundColor;
  });
  if (localStorage.getItem('dark-mode') === 'true') {
    toggleSwitchInput.checked = true;
    const section = document.querySelector('body');
    recurseChildren(section, function (section) {
      const style = window.getComputedStyle(section);
      section.style.color = rgbSwitch(style.color);
      section.style.backgroundColor = rgbSwitch(style.backgroundColor);
    });
  }
})
