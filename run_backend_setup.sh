#!/bin/bash
set -e
echo "Running in directory: $(pwd)"
echo "Attempting to navigate to Sama-Car-Rapide/backend"
cd Sama-Car-Rapide/backend
echo "Now in directory: $(pwd)"
echo "Listing files in current directory (Sama-Car-Rapide/backend):"
ls -la
echo "Installing main dependencies..."
npm install express pg sequelize jsonwebtoken bcryptjs qrcode dotenv
echo "Installing dev dependencies..."
npm install --save-dev nodemon eslint prettier
echo "Backend dependencies installed successfully."
