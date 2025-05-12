function calculateAmountPerGrid() {
  const totalUsdt = parseFloat(document.getElementById('totalUsdt').value);
  const gridCount = parseInt(document.getElementById('gridCount').value);
  
  if (totalUsdt && gridCount) {
    const amountPerGrid = totalUsdt / gridCount;
    document.getElementById('amountPerGrid').textContent = amountPerGrid.toFixed(2);
  } else {
    document.getElementById('amountPerGrid').textContent = '0.00';
  }
}

// Add event listeners to update amount per grid immediately
document.getElementById('totalUsdt').addEventListener('input', calculateAmountPerGrid);
document.getElementById('gridCount').addEventListener('input', calculateAmountPerGrid);

function calculateGridPoints() {
  const totalUsdt = parseFloat(document.getElementById('totalUsdt').value);
  const gridCount = parseInt(document.getElementById('gridCount').value);
  const currentPrice = parseFloat(document.getElementById('currentPrice').value);
  const dropPercent = parseFloat(document.getElementById('dropPercent').value);
  const risePercent = parseFloat(document.getElementById('risePercent').value);

  if (!totalUsdt || !gridCount || !currentPrice || !dropPercent || !risePercent) {
    alert('请填写所有必要字段');
    return;
  }

  const amountPerGrid = totalUsdt / gridCount;
  
  // Generate buy grid points
  const buyGrids = [];
  let totalTokens = 0;
  
  for (let i = 0; i < gridCount; i++) {
    const dropMultiplier = 1 - (dropPercent * (i + 1) / 100);
    const price = currentPrice * dropMultiplier;
    const tokens = amountPerGrid / price;
    totalTokens += tokens;
    
    buyGrids.push({
      level: i + 1,
      price: price.toFixed(4),
      usdt: amountPerGrid.toFixed(2),
      tokens: tokens.toFixed(4)
    });
  }

  // Generate sell grid points
  const sellGrids = [];
  const tokensPerGrid = totalTokens / gridCount;
  
  for (let i = 0; i < gridCount; i++) {
    const riseMultiplier = 1 + (risePercent * (i + 1) / 100);
    const price = currentPrice * riseMultiplier;
    const usdt = tokensPerGrid * price;
    
    sellGrids.push({
      level: i + 1,
      price: price.toFixed(4),
      tokens: tokensPerGrid.toFixed(4),
      usdt: usdt.toFixed(2)
    });
  }

  displayGridResults(buyGrids, sellGrids);
}

function displayGridResults(buyGrids, sellGrids) {
  const buyTableBody = document.getElementById('buyGridBody');
  const sellTableBody = document.getElementById('sellGridBody');

  // Clear previous results
  buyTableBody.innerHTML = '';
  sellTableBody.innerHTML = '';

  // Display buy grids
  buyGrids.forEach(grid => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${grid.level}</td>
      <td>${grid.price}</td>
      <td>${grid.usdt}</td>
      <td>${grid.tokens}</td>
    `;
    buyTableBody.appendChild(row);
  });

  // Display sell grids
  sellGrids.forEach(grid => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${grid.level}</td>
      <td>${grid.price}</td>
      <td>${grid.tokens}</td>
      <td>${grid.usdt}</td>
    `;
    sellTableBody.appendChild(row);
  });
}

function resetGridCalculator() {
  document.getElementById('totalUsdt').value = '';
  document.getElementById('gridCount').value = '';
  document.getElementById('currentPrice').value = '';
  document.getElementById('dropPercent').value = '';
  document.getElementById('risePercent').value = '';
  document.getElementById('amountPerGrid').textContent = '0.00';
  
  document.getElementById('buyGridBody').innerHTML = '';
  document.getElementById('sellGridBody').innerHTML = '';
}