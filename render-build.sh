#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

# Install Chromium for Puppeteer on Render
# Check if chromium is already installed
if [ ! -f /usr/bin/google-chrome-stable ]; then
  echo "...Downloading Chrome..."
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
  apt-get update
  apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends
  rm -rf /var/lib/apt/lists/*
fi
