function calculate() {
  try {
    let expr = display.value;
    expr = expr.replace(/(\d+|\([^()]+\))!/g, 'factorial($1)');
    expr = expr
      .replace(/π/g, `(${Math.PI})`)
      .replace(/e/g, `(${Math.E})`)
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/EXP/g, 'Math.exp(')
      .replace(/%/g, '*0.01')
      .replace(/x/g, '0')
      .replace(/f\(x\)/g, '0');

    display.value = new Function('factorial', `return ${expr}`)(factorial);
  } catch {
    display.value = 'Ошибка';
  }
}
