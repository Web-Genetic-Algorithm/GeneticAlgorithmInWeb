
const display = document.getElementById('display');

function append(value) {
  if (display.value === '0') {
    display.value = value;
  } else {
    display.value += value;
  }
}


function clearDisplay() {
  display.value = '0';
}


function calculate() {
  try {
    display.value = eval(display.value
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/√/g, 'Math.sqrt')
      .replace(/ln/g, 'Math.log')
      .replace(/log/g, 'Math.log10')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/EXP/g, 'Math.exp')
    );
  } catch {
    display.value = 'Ошибка';
  }
}
