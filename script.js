// Global variables
let currentWeightUnit = 'kg';
let currentHeightUnit = 'cm';
let bmi = 0;

// DOM Elements
const weightSlider = document.getElementById('weightSlider');
const weightInput = document.getElementById('weightInput');
const heightSlider = document.getElementById('heightSlider');
const heightInput = document.getElementById('heightInput');
const calculateBtn = document.getElementById('calculateBtn');
const resultContainer = document.getElementById('resultContainer');
const emptyState = document.getElementById('emptyState');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const bmiCircle = document.getElementById('bmiCircle');
const bmiIndicator = document.getElementById('bmiIndicator');
const healthTip = document.getElementById('healthTip');

// Weight unit buttons
const kgBtn = document.getElementById('kgBtn');
const lbsBtn = document.getElementById('lbsBtn');
const stoneBtn = document.getElementById('stoneBtn');

// Height unit buttons
const cmBtn = document.getElementById('cmBtn');
const ftBtn = document.getElementById('ftBtn');
const mBtn = document.getElementById('mBtn');

// FAQ toggles
const faqToggles = document.querySelectorAll('.faq-toggle');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for weight controls
    weightSlider.addEventListener('input', () => {
        weightInput.value = weightSlider.value;
    });
    
    weightInput.addEventListener('input', () => {
        weightSlider.value = weightInput.value;
    });
    
    // Set up event listeners for height controls
    heightSlider.addEventListener('input', () => {
        heightInput.value = heightSlider.value;
    });
    
    heightInput.addEventListener('input', () => {
        heightSlider.value = heightInput.value;
    });
    
    // Calculate BMI when button is clicked
    calculateBtn.addEventListener('click', calculateBMI);
    
    // Set up weight unit buttons
    kgBtn.addEventListener('click', () => switchWeightUnit('kg'));
    lbsBtn.addEventListener('click', () => switchWeightUnit('lbs'));
    stoneBtn.addEventListener('click', () => switchWeightUnit('stone'));
    
    // Set up height unit buttons
    cmBtn.addEventListener('click', () => switchHeightUnit('cm'));
    ftBtn.addEventListener('click', () => switchHeightUnit('ft'));
    mBtn.addEventListener('click', () => switchHeightUnit('m'));
    
    // Set up FAQ toggles
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            
            content.classList.toggle('show');
            icon.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
});

// Functions
function calculateBMI() {
    let weight = parseFloat(weightInput.value);
    let height = parseFloat(heightInput.value);
    
    // Convert weight to kg if needed
    switch(currentWeightUnit) {
        case 'lbs':
            weight = weight * 0.453592;
            break;
        case 'stone':
            weight = weight * 6.35029;
            break;
    }
    
    // Convert height to meters if needed
    switch(currentHeightUnit) {
        case 'cm':
            height = height / 100;
            break;
        case 'ft':
            height = height * 0.3048;
            break;
    }
    
    // Calculate BMI
    bmi = weight / (height * height);
    
    // Display results
    displayResults(bmi);
}

function displayResults(bmi) {
    // Show results container
    resultContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    // Update BMI value
    bmiValue.textContent = bmi.toFixed(1);
    
    // Determine category and set colors
    let category = '';
    let color = '';
    let indicatorPosition = 0;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-500';
        bmiCircle.classList.remove('border-purple-200', 'border-green-200', 'border-yellow-200', 'border-red-200');
        bmiCircle.classList.add('border-blue-200');
        indicatorPosition = 10;
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        color = 'text-green-500';
        bmiCircle.classList.remove('border-purple-200', 'border-blue-200', 'border-yellow-200', 'border-red-200');
        bmiCircle.classList.add('border-green-200');
        indicatorPosition = 35;
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-500';
        bmiCircle.classList.remove('border-purple-200', 'border-blue-200', 'border-green-200', 'border-red-200');
        bmiCircle.classList.add('border-yellow-200');
        indicatorPosition = 65;
    } else {
        category = 'Obese';
        color = 'text-red-500';
        bmiCircle.classList.remove('border-purple-200', 'border-blue-200', 'border-green-200', 'border-yellow-200');
        bmiCircle.classList.add('border-red-200');
        indicatorPosition = 90;
    }
    
    // Update category
    bmiCategory.textContent = category;
    bmiCategory.className = `text-xl font-medium ${color}`;
    
    // Update indicator position
    bmiIndicator.style.width = `${indicatorPosition}%`;
    
    // Add animation
    bmiCircle.classList.add('animated');
    setTimeout(() => {
        bmiCircle.classList.remove('animated');
    }, 1500);
    
    // Update health tip
    updateHealthTip(category);
}

function updateHealthTip(category) {
    const tips = {
        'Underweight': {
            icon: 'sun',
            text: 'Consider nutrient-dense foods and strength training to gain healthy weight.'
        },
        'Normal weight': {
            icon: 'check-circle',
            text: 'Great job! Maintain your healthy lifestyle with balanced nutrition and regular exercise.'
        },
        'Overweight': {
            icon: 'alert-triangle',
            text: 'Focus on gradual weight loss through a balanced diet and increased physical activity.'
        },
        'Obese': {
            icon: 'alert-octagon',
            text: 'Consult a healthcare professional for a personalized weight management plan.'
        }
    };
    
    const tip = tips[category];
    healthTip.innerHTML = `
        <div class="flex items-start">
            <i data-feather="${tip.icon}" class="text-purple-500 mr-3"></i>
            <p>${tip.text}</p>
        </div>
    `;
    feather.replace();
}

function switchWeightUnit(unit) {
    currentWeightUnit = unit;
    
    // Update active button
    kgBtn.classList.remove('active', 'bg-purple-600', 'text-white');
    lbsBtn.classList.remove('active', 'bg-purple-600', 'text-white');
    stoneBtn.classList.remove('active', 'bg-purple-600', 'text-white');
    
    switch(unit) {
        case 'kg':
            kgBtn.classList.add('active', 'bg-purple-600', 'text-white');
            break;
        case 'lbs':
            lbsBtn.classList.add('active', 'bg-purple-600', 'text-white');
            break;
        case 'stone':
            stoneBtn.classList.add('active', 'bg-purple-600', 'text-white');
            break;
    }
    
    // Update slider and input ranges
    if (unit === 'kg') {
        weightSlider.min = 20;
        weightSlider.max = 200;
        weightSlider.value = 70;
        weightInput.value = 70;
    } else if (unit === 'lbs') {
        weightSlider.min = 44;
        weightSlider.max = 440;
        weightSlider.value = 154;
        weightInput.value = 154;
    } else if (unit === 'stone') {
        weightSlider.min = 3;
        weightSlider.max = 28;
        weightSlider.value = 11;
        weightInput.value = 11;
    }
    
    // Update slider markers
    const markers = weightSlider.nextElementSibling.querySelectorAll('span');
    markers[0].textContent = weightSlider.min;
    markers[1].textContent = Math.floor((parseInt(weightSlider.max) - parseInt(weightSlider.min)) / 2 + parseInt(weightSlider.min));
    markers[2].textContent = weightSlider.max;
}

function switchHeightUnit(unit) {
    currentHeightUnit = unit;
    
    // Update active button
    cmBtn.classList.remove('active', 'bg-purple-600', 'text-white');
    ftBtn.classList.remove('active', 'bg-purple-600', 'text-white');
    mBtn.classList.remove('active', 'bg-purple-600', 'text-white');
    
    switch(unit) {
        case 'cm':
            cmBtn.classList.add('active', 'bg-purple-600', 'text-white');
            break;
        case 'ft':
            ftBtn.classList.add('active', 'bg-purple-600', 'text-white');
            break;
        case 'm':
            mBtn.classList.add('active', 'bg-purple-600', 'text-white');
            break;
    }
    
    // Update slider and input ranges
    if (unit === 'cm') {
        heightSlider.min = 120;
        heightSlider.max = 220;
        heightSlider.value = 170;
        heightInput.value = 170;
    } else if (unit === 'ft') {
        heightSlider.min = 4;
        heightSlider.max = 7;
        heightSlider.step = 0.1;
        heightSlider.value = 5.6;
        heightInput.value = 5.6;
    } else if (unit === 'm') {
        heightSlider.min = 1.2;
        heightSlider.max = 2.2;
        heightSlider.step = 0.01;
        heightSlider.value = 1.7;
        heightInput.value = 1.7;
    }
    
    // Update slider markers
    const markers = heightSlider.nextElementSibling.querySelectorAll('span');
    markers[0].textContent = heightSlider.min;
    markers[1].textContent = (parseFloat(heightSlider.max) - parseFloat(heightSlider.min)) / 2 + parseFloat(heightSlider.min);
    markers[2].textContent = heightSlider.max;
}