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
    generationsCount = NaN;
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

  const userData = {
    range: [minVal, maxVal],
    stopType: stopType,
    customFunction: funcInput || undefined,
    taskType: 'max',
    cacheNum: 20,
    generationsCount: stopType === 'generations' ? generationsCount : NaN,
    timeOfWork: stopType === 'time' ? timeOfWork : NaN
  };

  const outputArea = document.querySelector('textarea[name="ga_output"]');
  outputArea.value = "Отправка задачи на сервер...";

  try {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      outputArea.value = "Ошибка при отправке задачи: " + response.statusText;
      return;
    }

    const { jobId } = await response.json();
    outputArea.value = "Задача отправлена. Ожидание результата...";

    let maxAttempts = stopType === 'generations' ? Math.ceil(generationsCount / 2) : 40;
    let attempt = 0;

    while (attempt < maxAttempts) {
      attempt++;
      outputArea.value = `Ожидание... Попытка ${attempt}`;

      const resultResponse = await fetch(`/api/optimize/result/${jobId}`);
      if (!resultResponse.ok) {
        outputArea.value = "Ошибка при получении результата: " + resultResponse.statusText;
        return;
      }

      const resultData = await resultResponse.json();

      if (resultData.status === 'done') {
        outputArea.value = `Задача выполнена успешно. Значение оптимума: ${resultData.result}`;
        return;
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    outputArea.value = "Превышено максимальное количество попыток ожидания результата.";

  } catch (error) {
    outputArea.value = "Ошибка: " + error.message;
  }
}
