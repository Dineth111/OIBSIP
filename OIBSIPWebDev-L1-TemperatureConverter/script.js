/**
 * ============================================================================
 * Temperature Converter Website - JavaScript Logic
 * ----------------------------------------------------------------------------
 * Developed for: Oasis Infobyte Summer Internship Program (OIBSIP)
 * Track: Web Development & Designing - Level 1, Task 3
 * Author: Dineth
 * ============================================================================
 */

// Wait until the DOM content is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------------------
    // 1. DOM Element Selection
    // ------------------------------------------------------------------------
    const tempForm = document.getElementById('tempForm');
    const tempInput = document.getElementById('tempInput');
    const unitSelect = document.getElementById('unitSelect');
    const convertBtn = document.getElementById('convertBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');
    
    const resultsContainer = document.getElementById('resultsContainer');
    const valCelsius = document.getElementById('valCelsius');
    const valFahrenheit = document.getElementById('valFahrenheit');
    const valKelvin = document.getElementById('valKelvin');
    const formulaText = document.getElementById('formulaText');

    const cardCelsius = document.getElementById('cardCelsius');
    const cardFahrenheit = document.getElementById('cardFahrenheit');
    const cardKelvin = document.getElementById('cardKelvin');

    const badgeCelsius = document.getElementById('badgeCelsius');
    const badgeFahrenheit = document.getElementById('badgeFahrenheit');
    const badgeKelvin = document.getElementById('badgeKelvin');

    // ------------------------------------------------------------------------
    // 2. Constants & Absolute Zero Thresholds
    // ------------------------------------------------------------------------
    // Absolute zero is the lowest possible physical temperature where matter contains no heat energy.
    const ABSOLUTE_ZERO = {
        celsius: -273.15,
        fahrenheit: -459.67,
        kelvin: 0
    };

    // ------------------------------------------------------------------------
    // 3. Conversion Formulas (Core Mathematical Functions)
    // ------------------------------------------------------------------------

    /**
     * Converts a Celsius temperature to Fahrenheit and Kelvin.
     * Formulas:
     * - Celsius to Fahrenheit: (C × 9/5) + 32
     * - Celsius to Kelvin: C + 273.15
     */
    function convertFromCelsius(celsius) {
        const fahrenheit = (celsius * 9 / 5) + 32;
        const kelvin = celsius + 273.15;
        
        const formulaExplanation = `
            <p>• <strong>Celsius to Fahrenheit:</strong> (${celsius}°C × 9/5) + 32 = <strong>${formatNumber(fahrenheit)}°F</strong></p>
            <p>• <strong>Celsius to Kelvin:</strong> ${celsius}°C + 273.15 = <strong>${formatNumber(kelvin)} K</strong></p>
        `;

        return { celsius, fahrenheit, kelvin, formulaExplanation };
    }

    /**
     * Converts a Fahrenheit temperature to Celsius and Kelvin.
     * Formulas:
     * - Fahrenheit to Celsius: (F − 32) × 5/9
     * - Fahrenheit to Kelvin: ((F − 32) × 5/9) + 273.15
     */
    function convertFromFahrenheit(fahrenheit) {
        const celsius = (fahrenheit - 32) * 5 / 9;
        const kelvin = celsius + 273.15;

        const formulaExplanation = `
            <p>• <strong>Fahrenheit to Celsius:</strong> (${fahrenheit}°F − 32) × 5/9 = <strong>${formatNumber(celsius)}°C</strong></p>
            <p>• <strong>Fahrenheit to Kelvin:</strong> ((${fahrenheit}°F − 32) × 5/9) + 273.15 = <strong>${formatNumber(kelvin)} K</strong></p>
        `;

        return { celsius, fahrenheit, kelvin, formulaExplanation };
    }

    /**
     * Converts a Kelvin temperature to Celsius and Fahrenheit.
     * Formulas:
     * - Kelvin to Celsius: K − 273.15
     * - Kelvin to Fahrenheit: ((K − 273.15) × 9/5) + 32
     */
    function convertFromKelvin(kelvin) {
        const celsius = kelvin - 273.15;
        const fahrenheit = (celsius * 9 / 5) + 32;

        const formulaExplanation = `
            <p>• <strong>Kelvin to Celsius:</strong> ${kelvin} K − 273.15 = <strong>${formatNumber(celsius)}°C</strong></p>
            <p>• <strong>Kelvin to Fahrenheit:</strong> (${kelvin} K − 273.15) × 9/5 + 32 = <strong>${formatNumber(fahrenheit)}°F</strong></p>
        `;

        return { celsius, fahrenheit, kelvin, formulaExplanation };
    }

    // ------------------------------------------------------------------------
    // 4. Utility Functions
    // ------------------------------------------------------------------------

    /**
     * Formats numbers cleanly:
     * Rounds up to 2 decimal places if needed, avoids trailing decimals on whole numbers.
     */
    function formatNumber(num) {
        if (Number.isInteger(num)) {
            return num.toString();
        }
        return parseFloat(num.toFixed(2)).toString();
    }

    /**
     * Shows an error message in the error alert box.
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorBox.classList.remove('hidden');
        resultsContainer.classList.add('hidden'); // Hide results when error exists
    }

    /**
     * Clears error messages.
     */
    function clearError() {
        errorMessage.textContent = '';
        errorBox.classList.add('hidden');
    }

    // ------------------------------------------------------------------------
    // 5. Main Calculation & Validation Handler
    // ------------------------------------------------------------------------
    function processConversion(e) {
        // Prevent default browser form submission refresh
        if (e) e.preventDefault();

        // Clear any previous error states
        clearError();

        const rawValue = tempInput.value.trim();
        const selectedUnit = unitSelect.value;

        // Requirement 1: Validate numeric input (reject empty or non-numeric)
        if (rawValue === '') {
            showError('Please enter a temperature value before clicking Convert.');
            tempInput.focus();
            return;
        }

        const numericValue = parseFloat(rawValue);

        if (isNaN(numericValue)) {
            showError('Invalid input! Please enter a valid number (e.g. 25, -10, or 98.6).');
            tempInput.focus();
            return;
        }

        // Requirement 5: Handle Absolute Zero Edge Case
        if (selectedUnit === 'celsius' && numericValue < ABSOLUTE_ZERO.celsius) {
            showError(`Temperature cannot be lower than Absolute Zero (${ABSOLUTE_ZERO.celsius}°C). Temperatures below this are physically impossible!`);
            return;
        }

        if (selectedUnit === 'fahrenheit' && numericValue < ABSOLUTE_ZERO.fahrenheit) {
            showError(`Temperature cannot be lower than Absolute Zero (${ABSOLUTE_ZERO.fahrenheit}°F). Temperatures below this are physically impossible!`);
            return;
        }

        if (selectedUnit === 'kelvin' && numericValue < ABSOLUTE_ZERO.kelvin) {
            showError(`Temperature cannot be lower than Absolute Zero (${ABSOLUTE_ZERO.kelvin} K). Temperatures below this are physically impossible!`);
            return;
        }

        // Requirement 4: Calculate converted values for ALL units simultaneously
        let results;
        if (selectedUnit === 'celsius') {
            results = convertFromCelsius(numericValue);
        } else if (selectedUnit === 'fahrenheit') {
            results = convertFromFahrenheit(numericValue);
        } else if (selectedUnit === 'kelvin') {
            results = convertFromKelvin(numericValue);
        }

        // Display results in DOM
        displayResults(results, selectedUnit);
    }

    /**
     * Renders converted temperature values and formula explanation to UI.
     */
    function displayResults(results, inputUnit) {
        valCelsius.textContent = `${formatNumber(results.celsius)} °C`;
        valFahrenheit.textContent = `${formatNumber(results.fahrenheit)} °F`;
        valKelvin.textContent = `${formatNumber(results.kelvin)} K`;

        formulaText.innerHTML = results.formulaExplanation;

        // Reset highlight states
        [cardCelsius, cardFahrenheit, cardKelvin].forEach(card => card.classList.remove('highlight'));
        [badgeCelsius, badgeFahrenheit, badgeKelvin].forEach(badge => badge.classList.add('hidden'));

        // Highlight input source unit card
        if (inputUnit === 'celsius') {
            cardCelsius.classList.add('highlight');
            badgeCelsius.classList.remove('hidden');
        } else if (inputUnit === 'fahrenheit') {
            cardFahrenheit.classList.add('highlight');
            badgeFahrenheit.classList.remove('hidden');
        } else if (inputUnit === 'kelvin') {
            cardKelvin.classList.add('highlight');
            badgeKelvin.classList.remove('hidden');
        }

        // Reveal results container
        resultsContainer.classList.remove('hidden');
    }

    // ------------------------------------------------------------------------
    // 6. Reset Handler
    // ------------------------------------------------------------------------
    function resetForm() {
        tempForm.reset();
        clearError();
        resultsContainer.classList.add('hidden');
        
        // Reset card highlights
        [cardCelsius, cardFahrenheit, cardKelvin].forEach(card => card.classList.remove('highlight'));
        [badgeCelsius, badgeFahrenheit, badgeKelvin].forEach(badge => badge.classList.add('hidden'));

        tempInput.focus();
    }

    // ------------------------------------------------------------------------
    // 7. Event Listeners
    // ------------------------------------------------------------------------
    // Listen for form submit (triggers when clicking Convert or pressing Enter inside inputs)
    tempForm.addEventListener('submit', processConversion);

    // Listen for Reset button click
    resetBtn.addEventListener('click', resetForm);

});
