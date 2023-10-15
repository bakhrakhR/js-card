//check name
const userName = document.getElementById('fname');
userName.addEventListener('input', function () {
    if (userName.validity.patternMismatch) {
        userName.classList.add('error');
    } else {
        userName.classList.remove('error')
    }
})

//card number check
const inputCardNumber = document.querySelector('#cardNumber');

inputCardNumber.addEventListener('keypress', function (evt) {
    if (evt.keyCode < 48 || evt.keyCode > 57) evt.preventDefault();
});

inputCardNumber.addEventListener("input", () => inputCardNumber.value = formatNumber(inputCardNumber.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
}, "");

inputCardNumber.addEventListener('input', function () {
    const firstDig = this.value.charAt(0);
    switch (firstDig) {
        case '4':
            inputCardNumber.style.backgroundImage = "url(./image/visa.png)";
            return 'Visa';
        case '3':
            inputCardNumber.style.backgroundImage = "url(./image/amex.png)";
            return 'Amex';
        case '5':
            inputCardNumber.style.backgroundImage = "url(./image/mastercard.png)";
            return 'Mastercard';
        default:
            inputCardNumber.style.backgroundImage = "url(./image/bank.png)";
            return 'bank';
    }
})


// check card cvv
const cvv = document.getElementById('cvv');
cvv.addEventListener('blur', () => validateCVV());

function validateCVV() {
    const cvvValue = cvv.value;
    if (cvvValue.length < 3) {
        cvv.classList.add('error');
    } else {
        cvv.classList.remove('error');
    }
}

// check expiry
const inputExp = document.getElementById('exp');

inputExp.addEventListener('change', function (event) {
    const inputValue = event.target.value;
    const formattedValue = transformInputValue(inputValue);
    event.target.value = formattedValue;

    validateDate(formattedValue);
});

function validateDate(date) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() - 2000;

    const inputMonth = +date.slice(0, 2);
    const inputYear = +date.slice(3, 5);

    const isMonthValid = inputMonth >= 1 && inputMonth <= 12;
    const isYearValid = inputYear >= currentYear;

    if (isMonthValid && isYearValid) {
        if (inputYear === currentYear) {
            if (inputMonth >= currentMonth) {
                inputExp.classList.remove('error');
            } else {
                inputExp.classList.add('error');
            }
        } else {
            inputExp.classList.remove('error');
        }
    } else {
        inputExp.classList.add('error');
    }
}

function transformInputValue(value) {
    if (/\d{2}/.test(value)) {
        return value.replace(/(\d{2})/, '$1/');
    }
    return value;
}


//check discount

const inputDiscCode = document.getElementById('discountCode');
const applyBtn = document.getElementById('apply');
inputDiscCode.addEventListener('input', () => {
    if (inputDiscCode.value.length !== 13) {
        inputDiscCode.classList.add('error');
        applyBtn.setAttribute("disabled", "true");
    } else {
        let partDisc1 = inputDiscCode.value.slice(0, 8);
        let partDisc2 = inputDiscCode.value.slice(8, 10);
        let partDisc3 = inputDiscCode.value.slice(10, 13);
        inputDiscCode.classList.remove('error');

        inputDiscCode.value = `${partDisc1}-${partDisc2}-${partDisc3}`;
        applyBtn.removeAttribute("disabled");
    };
}
)
applyBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

//validation
document.addEventListener('DOMContentLoaded', function () {
    let submitButton = document.getElementById('submit');

    function checkErrorClass() {
        let hasErrorClass = document.getElementsByClassName('error').length > 0;
        submitButton.disabled = hasErrorClass;
    }

    checkErrorClass();

    document.addEventListener('input', checkErrorClass);

    submitButton.disabled = !document.getElementsByClassName('error').length;
});

