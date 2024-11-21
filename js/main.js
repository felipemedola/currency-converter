import { fetchExchangeRate } from './api.js';

const amountInput = document.getElementById('amountInput');
const currencyFrom = document.getElementById('currencyFrom');
const currencyTo = document.getElementById('currencyTo');
const convertButton = document.getElementById('convertButton');
const conversionResult = document.getElementById('conversionResult');
const conversionImg = document.getElementById('conversionImg');

const currencyFlags = {
    USD: "img/logo-usa.png",
    BRL: "img/logo-brasil.png"
};

function updateCurrencyImage() {
    const selectedCurrency = currencyTo.value;
    const newImgSrc = currencyFlags[selectedCurrency]; 
    conversionImg.src = newImgSrc;
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value)


    if (isNaN(amount) || amount <= 0) {
        conversionResult.textContent = 'Por favor, insira um valor válido.';
        return;
    }

    const from = currencyFrom.value;
    const to = currencyTo.value;

    if (from === to) {
        conversionResult.textContent = 'Selecione moedas diferentes para converter.';
        return;
    }

    const exchangeRate = await fetchExchangeRate(from, to);

    if (exchangeRate) {
        const convertedAmount = amount * exchangeRate;
        conversionResult.textContent = `${to === 'USD' ? '$' : 'R$'} ${convertedAmount.toFixed(2)}`;

    } else {
        conversionResult.textContent = 'Erro ao obter a cotação. Tente novamente mais tarde.';
    }
}

currencyTo.addEventListener("change", updateCurrencyImage);
convertButton.addEventListener('click', convertCurrency);