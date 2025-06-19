
document.querySelectorAll('.symbol-btn').forEach(button => {
  button.addEventListener('click', () => {
    const text = button.textContent.trim();
  
    navigator.clipboard.writeText(text).then(() => {
      console.log(`Символ "${text}" скопирован!`);
    }).catch(err => {
      console.error('Ошибка копирования: ', err);
    });
  });
});
