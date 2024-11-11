#!/bin/bash

# Set the environment name
ENV_NAME="../env"

# Check if requirements.txt exists
if [ ! -f ../requirements.txt ]; then
  echo "requirements.txt not found. Please create it by running 'pip freeze > requirements.txt'."
  exit 1
fi

# Create a virtual environment
python3 -m venv $ENV_NAME

# Activate the virtual environment
source $ENV_NAME/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies from requirements.txt
pip install -r ../requirements.txt

echo "Environment setup complete and dependencies installed."

# Optionally, activate the environment
echo "To activate the environment, use: source $ENV_NAME/bin/activate"
