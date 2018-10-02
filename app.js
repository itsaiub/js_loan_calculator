/* jshint esversion:6  */
// Listen for submit

const calculateResults = (e) => {

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
    // show results
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Clear Input
    amount.value = '';
    interest.value = '';
    years.value = '';
  } else {
    showError('Please, Check your numbers.');
  }
};

const showError = (err) => {
  // hide loader
  document.getElementById('loading').style.display = 'none';
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Create Div
  const errDiv = document.createElement('div');
  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add Class
  errDiv.className = 'alert alert-danger';
  // create text node and append to div
  errDiv.appendChild(document.createTextNode(err));
  // insert error above heading
  card.insertBefore(errDiv, heading);
  // Clear error after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

document.getElementById('loan-form').addEventListener('submit', (e) => {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});