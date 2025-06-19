document.querySelector('#send-request').addEventListener('click', () => {
  sendGARequest();
})

const apiUrl = "http://localhost:3000";

async function sendGARequest() {
  const inputTime = document.getElementById('input-time');
  const inputGen = document.getElementById('input-generations');

  let stopType;
  if (!inputTime.classList.contains('hidden')) {
    stopType = 'time';
  } else if (!inputGen.classList.contains('hidden')) {
    stopType = 'generations';
  } else {
    alert('Выберите тип остановки: Время или Поколения');
    return;
  }

  let minVal, maxVal, generationsCount, timeOfWork;

  if (stopType === 'time') {
    const inputs = inputTime.querySelectorAll('input');
    minVal = Number(inputs[0].value);
    maxVal = Number(inputs[1].value);
    generationsCount = Number(inputs[2].value);
    timeOfWork = Number(inputs[3].value);
  } else {
    const inputs = inputGen.querySelectorAll('input');
    minVal = Number(inputs[0].value);
    maxVal = Number(inputs[1].value);
    generationsCount = Number(inputs[2].value);
    timeOfWork = NaN;
  }

  if (isNaN(minVal) || isNaN(maxVal)) {
    alert('Введите корректные минимальное и максимальное значения диапазона');
    return;
  }

  if (stopType === 'time' && (isNaN(timeOfWork) || timeOfWork <= 0)) {
    alert('Введите корректное время работы в секундах');
    return;
  }

  if (stopType === 'generations' && (isNaN(generationsCount) || generationsCount <= 0)) {
    alert('Введите корректное количество поколений');
    return;
  }

  const funcInput = document.getElementById('display').value.trim();
  const taskType = 'max';
  const cacheNum = 20;

  const userData = {
    range: [minVal, maxVal],
    stopType,
    customFunction: funcInput || undefined,
    taskType,
    cacheNum,
    generationsCount: stopType === 'generations' ? generationsCount : NaN,
    timeOfWork: stopType === 'time' ? timeOfWork : NaN,
  };

  try {
    const response = await fetch(`${apiUrl}/api/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      alert('Ошибка сервера: ' + response.statusText);
      return;
    }

    const result = await response.json();

    const outputArea = document.querySelector('textarea[name="ga_output"]');
    if (result.message) {
      outputArea.value = result.message;
    } else {
      outputArea.value = JSON.stringify(result, null, 2);
    }

  } catch (error) {
    alert('Ошибка запроса: ' + error.message);
  }
}
