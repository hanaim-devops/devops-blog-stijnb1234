#!/bin/bash

# Verify that the user has installed Rust and Cargo
if ! command -v cargo &> /dev/null
then
    echo "Cargo could not be found. Please install Rust and Cargo."
    exit
fi

# Check if the user has installed the required dependencies, otherwise install them
if ! command -v mdbook &> /dev/null
then
    echo "Installing mdbook..."
    cargo install mdbook --version 0.4.40
    cargo install mdbook-linkcheck --locked --version 0.7.7
    cargo install mdbook-kroki-preprocessor --locked --version 0.2.0
fi

# Serve the book and open the browser
echo "Serving the book..."
mdbook serve
open http://localhost:3000