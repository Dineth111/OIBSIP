# Temperature Converter Website

## Description
A responsive, browser-based Temperature Converter built using HTML5, CSS3, 
and vanilla JavaScript. This tool allows users to convert temperature values 
between Celsius, Fahrenheit, and Kelvin in real time, with input validation 
and edge-case handling for physically impossible temperatures (below absolute zero).

This project was developed as part of the Oasis Infobyte Summer Internship 
Program (OIBSIP) — Web Development & Designing Track, Level 1, Task 3.

## Features
- Numeric input field with validation (rejects non-numeric input)
- Unit selector dropdown (Celsius / Fahrenheit / Kelvin)
- Convert button that calculates results on click
- Displays converted values in all three units simultaneously
- Absolute zero edge case handling with a friendly error message
- Clean, centered, responsive UI built with CSS Flexbox
- Fully responsive layout for mobile and desktop

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla, no frameworks or libraries)

## Conversion Formulas Used
- Celsius to Fahrenheit: (C × 9/5) + 32
- Celsius to Kelvin: C + 273.15
- Fahrenheit to Celsius: (F − 32) × 5/9
- Kelvin to Celsius: K − 273.15

## How to Run
1. Clone or download this folder
2. Open `index.html` in any web browser
3. Enter a temperature value, select the input unit, and click Convert

## Author
Dineth — Oasis Infobyte Web Development Intern

## Project Structure
```
WebDev-L1-TemperatureConverter/
├── index.html
├── style.css
├── script.js
└── README.md
```
