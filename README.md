# Scratch Node Project #

This project is intended to be copied and used as a starting structure to explore small blocks of isolated functionality.

## Intended Development Pattern ##

The structure used here is intended to facilitate a style of Test Driven Development (TDD). The `./src/main.js` is included so the code can be run easily, but it is highly advised to rely only on unit tests.

## To Use ##

```bash
git clone https://github.com/mwj8410/scratch-node-project.git <folder-name>
cd <folder-name>
rm -rf .git
```

Then open `./package.json` in your editor and change `name`, `description`, `repository.url`, and any other desired values.

Next, rename `./src/Object-Flatten.module.js` and `./src/Object-Flatten.spec.js` to an appropriate name for your work. Ensure that `./tests/unit.config.js` is refactored to reflect the changes.

Finally, run ...

```bash
npm install
npm test
git init
git add .
git commit -m "chore() initialize"
git remote set-url origin <repo url>
git push
```
