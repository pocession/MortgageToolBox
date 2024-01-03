
var projectedLowExchangeRate = [33.019476, 32.733171, 32.292004, 32.105310, 31.933638, 31.773857]
var projectedHighExchangeRate = [35.475105, 35.759649, 35.994239, 36.200764, 36.387458, 36.559130]
var currentExchangeRate = 34.66

// Function to get input value by ID
function getInputValue(id) {
    return parseFloat(document.getElementById(id).value);
}

// Initiate an object to host element IDs
const ELEMENT_ID = {
    interestTaiwan: 'interestTaiwan',
    interestEurope: 'interestEurope',
    taxRateEurope: 'taxRateEurope',
    interestEuropeAdjustedWithTax: 'interestEuropeAdjustedWithTax:',
    loanAmountEuros:'loanAmountEuros',
    mortgageYears: 'mortgageYears',
    wireFee: 'wireFee',
}

// Function to calculate monthly and total payment
function calculateMonthlyAndTotalPayment(loanAmount, monthlyInterestRate, totalMonth) {
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonth));
    const totalPayment = monthlyPayment * totalMonth;
    return { monthlyPayment, totalPayment };
}

function calculateSavings() {
    // Get input values
    const interestTaiwan = getInputValue(ELEMENT_ID['interestTaiwan']);
    const interestEurope = getInputValue(ELEMENT_ID['interestEurope']);
    const loanAmountEuros = getInputValue(ELEMENT_ID['loanAmountEuros']);
    const mortgageYears = getInputValue(ELEMENT_ID['mortgageYears']);
    const totalMonth = mortgageYears * 12;
    const monthlyInterestRateTaiwan = interestTaiwan / 100 / 12;
    const taxRateEurope = getInputValue(ELEMENT_ID['taxRateEurope']);
    const interestEuropeAdjustedWithTax = interestEurope * (100 - taxRateEurope) * 0.01;
    const monthlyInterestRateEuroAdjustedWithTax = interestEuropeAdjustedWithTax / 100 / 12;
    const wireFee = getInputValue(ELEMENT_ID['wireFee']);

    if (!isNaN(interestTaiwan) && !isNaN(interestEurope) && !isNaN(loanAmountEuros) && !isNaN(mortgageYears)) {
    
        // Calculate total payment with Taiwanese interest rate
        const PaymentTaiwan = calculateMonthlyAndTotalPayment(
            loanAmountEuros,
            monthlyInterestRateTaiwan,
            totalMonth
        );

        // Calculate total payment with European interest rate
        const PaymentEuro = calculateMonthlyAndTotalPayment(
            loanAmountEuros,
            monthlyInterestRateEuroAdjustedWithTax,
            totalMonth
        );

        // Get the result
        const monthlyPaymentTaiwan = PaymentTaiwan['monthlyPayment'];
        const monthlyPaymentEuro = PaymentEuro['monthlyPayment'];
        const totalPaymentEuro = PaymentEuro['totalPayment'];

        const monthlySavings = (monthlyPaymentEuro - monthlyPaymentTaiwan - wireFee).toFixed(2)
        const totalSavings = (monthlySavings * totalMonth).toFixed(2)
        const monthlyPaymentEuroPlusWiring = (monthlyPaymentEuro + wireFee).toFixed(2)
        const totalPaymentEuroPlusWiringFee = (totalPaymentEuro + wireFee * totalMonth).toFixed(2)

        document.getElementById('monthlySaving').innerHTML = monthlySavings + " Euro";
        document.getElementById('totalSaving').innerHTML = totalSavings + " Euro";
        document.getElementById('monthlyPayment').innerHTML = monthlyPaymentEuroPlusWiring + " Euro";
        document.getElementById('totalPayment').innerHTML = totalPaymentEuroPlusWiringFee + " Euro";
    } else {
        document.getElementById('savingsResult').innerHTML = "Please enter valid values.";
    }

    // Show the flash message after calculating savings
    showFlashMessage();
}

function calculateProjection() {

    // Get input values
    const interestTaiwan = getInputValue(ELEMENT_ID['interestTaiwan'])
    const interestEurope = getInputValue(ELEMENT_ID['interestEurope']);
    const loanAmountEuros = getInputValue(ELEMENT_ID['loanAmountEuros']);
    const mortgageYears = getInputValue(ELEMENT_ID['mortgageYears']);
    const totalMonth = mortgageYears * 12;
    const taxRateEurope = getInputValue(ELEMENT_ID['taxRateEurope']);
    const interestEuropeAdjustedWithTax = interestEurope * (100 - taxRateEurope) * 0.01;
    const monthlyInterestRateEuroAdjustedWithTax = interestEuropeAdjustedWithTax / 100 / 12;
    const wireFee = getInputValue(ELEMENT_ID['wireFee']);
    
    if (!isNaN(interestTaiwan) && !isNaN(interestEurope) && !isNaN(loanAmountEuros) && !isNaN(mortgageYears)) {
           // Calculate total payment with European interest rate
           const PaymentEuro = calculateMonthlyAndTotalPayment(
            loanAmountEuros,
            monthlyInterestRateEuroAdjustedWithTax,
            totalMonth
        );
        
        const monthlyPaymentEuro = PaymentEuro['monthlyPayment']
        const monthlyPaymentEuroPlusWiring = (monthlyPaymentEuro + wireFee).toFixed(2);

        document.getElementById('firstExchangeRate').innerHTML = projectedLowExchangeRate[0].toFixed(2) + " - " + projectedHighExchangeRate[0].toFixed(2);
        document.getElementById('secondExchangeRate').innerHTML = projectedLowExchangeRate[1].toFixed(2) + " - " + projectedHighExchangeRate[1].toFixed(2);
        document.getElementById('thirdExchangeRate').innerHTML = projectedLowExchangeRate[2].toFixed(2) + " - " + projectedHighExchangeRate[2].toFixed(2);
        document.getElementById('fourthExchangeRate').innerHTML = projectedLowExchangeRate[3].toFixed(2) + " - " + projectedHighExchangeRate[3].toFixed(2);
        document.getElementById('fifthExchangeRate').innerHTML = projectedLowExchangeRate[4].toFixed(2) + " - " + projectedHighExchangeRate[4].toFixed(2);
        document.getElementById('sixthExchangeRate').innerHTML = projectedLowExchangeRate[5].toFixed(2) + " - " + projectedHighExchangeRate[5].toFixed(2);

        document.getElementById('firstProjectedPayment').innerHTML = (projectedLowExchangeRate[0] * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('secondProjectedPayment').innerHTML = (projectedLowExchangeRate[1] * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[1] * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('thirdProjectedPayment').innerHTML = (projectedLowExchangeRate[2] * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[2] * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('fourthProjectedPayment').innerHTML = (projectedLowExchangeRate[3] * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[3] * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('fifthProjectedPayment').innerHTML = (projectedLowExchangeRate[4] * monthlyPaymentEuroPlusWiring).toFixed(2) + "  - " + (projectedHighExchangeRate[4] * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('sixthProjectedPayment').innerHTML = (projectedLowExchangeRate[5] * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[5] * monthlyPaymentEuroPlusWiring).toFixed(2)

        document.getElementById('firstProjectedLoss').innerHTML = (projectedLowExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('secondProjectedLoss').innerHTML = (projectedLowExchangeRate[1] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('thirdProjectedLoss').innerHTML = (projectedLowExchangeRate[2] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('fourthProjectedLoss').innerHTML = (projectedLowExchangeRate[3] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('fifthProjectedLoss').innerHTML = (projectedLowExchangeRate[4] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2)
        document.getElementById('sixthProjectedLoss').innerHTML = (projectedLowExchangeRate[5] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2) + " - " + (projectedHighExchangeRate[0] * monthlyPaymentEuroPlusWiring - currentExchangeRate * monthlyPaymentEuroPlusWiring).toFixed(2)

    } else {
        document.getElementById('firstExchangeRate').innerHTML = "Please enter valid values.";
    }

    // Show the flash message after calculating the projected loss
    showFlashMessageProjection();
}

function showFlashMessage() {
    var flashMessage = document.getElementById('flashMessage');
    flashMessage.style.display = 'block';
}

function showFlashMessageProjection() {
    var flashMessage = document.getElementById('flashMessageProjection');
    flashMessage.style.display = 'block';
}

function closeFlashMessage() {
    var flashMessage = document.getElementById('flashMessage');
    flashMessage.style.display = 'none';
}

// Function to get and update the visitor count
function updateVisitorCount() {
    // Check if the count is stored in localStorage
    let count = localStorage.getItem('visitorCount');

    // If count is not available, initialize it to 0
    if (count === null) {
        count = 0;
    } else {
        // If count is available, parse it as an integer
        count = parseInt(count);
    }

    // Increment the count for the current visit
    count++;

    // Update the count in localStorage
    localStorage.setItem('visitorCount', count);

    // Display the count on the webpage
    document.getElementById('count').textContent = count;
}

// Call the updateVisitorCount function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateVisitorCount();
});
