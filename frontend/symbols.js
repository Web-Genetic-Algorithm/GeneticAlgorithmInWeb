
// Находим все кнопки с классом 'symbol-btn'
document.querySelectorAll('.symbol-btn').forEach(button => {
  button.addEventListener('click', () => {
    const text = button.textContent.trim();
    // Копируем текст в буфер обмена
    navigator.clipboard.writeText(text).then(() => {
      console.log(`Символ "${text}" скопирован!`);
    }).catch(err => {
      console.error('Ошибка копирования: ', err);
    });
  });
});
