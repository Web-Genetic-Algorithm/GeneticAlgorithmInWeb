document.querySelector('#send-request').addEventListener('click', () => {
  sendGARequest();
})

//const apiUrl = "http://stud-learn.usm.md:3000";
  const apiUrl = "http://localhost:3000";  
let jobID = NaN;

let gotResp = false;
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
  console.log(userData);
  /*
  try {
    const response = await fetch(`${apiUrl}/api/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    */

fetch(`${apiUrl}/api/optimize`, {
  method: 'POST',               // Метод запроса
  headers: {
    'Content-Type': 'application/json' // Тип передаваемых данных
  },
  body: JSON.stringify(userData)   // Преобразуем объект в JSON-строку
})
.then(response => response.json())
.then(result => {
  console.log('Успешно отправлено:', result);
  jobID = result.jobId;
})
.catch(error => {
  console.error('Ошибка при отправке:', error);
});

}
/*

const resultResponse = await fetch(`/api/optimize/result/${jobId}`);
if (!resultResponse.ok) {
  outputArea.value = "Ошибка при получении результата: " + resultResponse.statusText;
  return;
}

*/
let pollingIntervalId;


function startPolling() {
  if (gotResp) return;

  pollingIntervalId = setInterval(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/optimize/result/${jobID}`);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Обновлённые данные:', result);

      if (result.status === "done" && result.id) {
        gotResp = true;
        clearInterval(pollingIntervalId); // Остановить опрос
        console.log('Опрос завершён. Получен ID:', result.id);
      }

    } catch (error) {
      console.error('Ошибка при опросе сервера:', error);
    }
  }, 1000); // каждые 1 сек
}
startPolling();
