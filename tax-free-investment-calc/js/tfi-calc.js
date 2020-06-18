// calculate function
function calculateInvestment(lumpMonth, lumpAmount, debitMonth, debitAmount) {

    // array for tax year calculations
    var taxYear = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    var taxYearLumpMonthId = taxYear.indexOf(lumpMonth);
    var taxYearLumpMonthNo = taxYearLumpMonthId + 1;
    var taxYearDebitMonthId = taxYear.indexOf(debitMonth);
    var taxYearDebitMonthNo = taxYearDebitMonthId + 1;
    var inputDebitMonthsLeft = 12 - taxYearDebitMonthId;

    // months after lump investment
    var taxYearLeft = [];
    var monthsAfterLump = -1;
    for (var i = taxYearLumpMonthNo; i <= 12; i++) {
        taxYearLeft.push(i);
        monthsAfterLump++;
    };

    // return
    var totalContributions
    var earliestDebit

    // conditional calculations based in user input
    var nextTaxYear = false;
    if (monthsAfterLump == 0 || lumpAmount >= 30000 || (lumpAmount + debitAmount > 30000)) {
        totalContributions = lumpAmount;
        earliestDebit = 0; //0; //'Next Tax Year (3)';
        //alert('null');
        nextTaxYear = ' (Next Tax Year)';
    } else if (debitAmount == 0) {
        totalContributions = lumpAmount;
        earliestDebit = 12 - monthsAfterLump; //LM + 1
    } else {
        var monthsToMaxRough = (30000 - lumpAmount) / debitAmount;
        var monthsToMax = Math.floor(monthsToMaxRough);
        if (monthsToMax <= monthsAfterLump) {
            earliestDebit = 12 - monthsToMax;
            totalContributions = lumpAmount + (debitAmount * inputDebitMonthsLeft);
        } else {
            earliestDebit = 12 - monthsAfterLump;
            totalContributions = lumpAmount + (debitAmount * inputDebitMonthsLeft);
        }
    };

    if (totalContributions > 30000) {
        document.getElementById('total-contributions').style.color = 'red';
    } else {
        document.getElementById('total-contributions').style.color = 'black';
    };

    // adjust array for user value
    earliestDebitAdjusted = taxYear[earliestDebit];
    console.log('earliestDebitAdjusted ' + earliestDebitAdjusted);

    var outputObj = {
        TotalContributions: parseFloat(totalContributions),
        EarliestPermissibleDebitOrderStartMonth: earliestDebitAdjusted
    };

    // object to page
    function outputDisplay(contribution,month) {
        document.getElementById('total-contributions').innerHTML = 'Total Contributions This Tax Year: R ' + contribution;
        if (nextTaxYear !== false) { 
            document.getElementById('earliest-month').innerHTML = 'Earliest Permissible Debit Start Month: ' + month + '' + nextTaxYear;
        } else {
            document.getElementById('earliest-month').innerHTML = 'Earliest Permissible Debit Start Month: ' + month;
        };
        document.getElementById('result').style.display = 'block';
    };
    outputDisplay(outputObj.TotalContributions,outputObj.EarliestPermissibleDebitOrderStartMonth);
}; // calculate function

function getInput() {
    LumpSumInvestmentMonth = parseInt(document.getElementById('lump-month').value);
    LumpSumInvestmentAmount = parseFloat(document.getElementById('lump-amount').value);
    DebitOrderStartMonth = parseInt(document.getElementById('debit-month').value);
    DebitOrderAmount = parseFloat(document.getElementById('debit-amount').value);
};

document.getElementById('btn').addEventListener('click', function(event) {
    document.getElementById('earliest-month').style.color = 'black';
    getInput();
    var inputError = false;
    var errorDisplay = document.getElementById('input-error');
    errorDisplay.style.display = 'none';
    
    // max amount exceeded message
    if (LumpSumInvestmentAmount > 30000) {
        inputError = 'Maximum Lump Sum Investment Amount exceeded.<br />Please enter 30000 or less.';
    } else if (DebitOrderAmount > 2500) {
        inputError = 'Maximum Debit Amount exceeded, <br />please enter 2500 or less.';
    };
    if (inputError !== false) {
        errorDisplay.innerHTML = inputError;
        errorDisplay.style.display = 'block';
    } else {
        calculateInvestment(LumpSumInvestmentMonth, LumpSumInvestmentAmount, DebitOrderStartMonth, DebitOrderAmount);
    };
});