fetch('http://localhost:3000/api/quotations/rfq/cmq285d9d0000vb2we75vvur6')
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
