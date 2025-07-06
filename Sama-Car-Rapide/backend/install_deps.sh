#!/bin/bash
set -e
echo "Current directory before cd: $(pwd)"
cd "$(dirname "$0")" # Ensure we are in the backend directory
echo "Current directory after cd: $(pwd)"
echo "Listing files in current directory: $(ls -la)"
npm install express pg sequelize jsonwebtoken bcryptjs qrcode dotenv
npm install --save-dev nodemon eslint prettier
echo "Dependencies installed successfully"
