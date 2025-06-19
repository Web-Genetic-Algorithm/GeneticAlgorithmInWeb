// Находим поле ввода
const display = document.getElementById('display');

// Добавить значение в строку
function append(value) {
  if (display.value === '0') {
    display.value = value;
  } else {
    display.value += value;
  }
}

// Очистить строку
function clearDisplay() {
  display.value = '0';
}

// Вычислить результат
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
