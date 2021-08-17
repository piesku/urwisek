# New Project

This project is based on [Goodluck](https://github.com/piesku/goodluck), a hackable template for creating small and fast browser games.

## Running Locally

To run locally, install the dependencies and start the local dev server:

    npm install
    npm start

Then, open http://localhost:1234 in the browser.

In VS Code, Ctrl+Shift+B will show the available build tasks, including `npm start`, and F5 will open the browser.

## Building

To produce the optimized build, use the `Makefile` in `play/`.

    make -C play

The default target will create a single HTML file, `play/index.html`, will all resources inlined.

If you have the 7-Zip command line utility installed (`p7zip-full` on Ubuntu), you can build the ZIP file by running:

    make -C play index.zip

