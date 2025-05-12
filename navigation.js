function switchToCalculator(calculatorId) {
  const calculators = document.querySelectorAll('.calculator-container');
  calculators.forEach(calc => calc.style.display = 'none');
  
  const selectedCalc = document.getElementById(calculatorId);
  if (selectedCalc) {
    selectedCalc.style.display = 'block';
  }

  // Update active tab
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[data-target="${calculatorId}"]`).classList.add('active');
}