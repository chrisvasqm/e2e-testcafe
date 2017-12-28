# End-To-End testing with TestCafe

This is a *demo* project to showcase how to use [TestCafe](https://github.com/DevExpress/testcafe) for End-To-End testing.

## Recomended IDE/editor

- [VS Code](https://code.visualstudio.com/download) (Free)
- [Atom](https://atom.io/) (Free)
- [Brackets](http://brackets.io/) (Free)
- [WebStorm](https://www.jetbrains.com/webstorm/) (Paid, with subscriptions)

I used VS Code for this project, but you can use whichever you prefer. In case you also chose VS Code, [here](https://marketplace.visualstudio.com/search?term=testcafe&target=VSCode&category=All%20categories&sortBy=Relevance) are some helpful Extensions you may want to use.

## Why use TestCafe over Selenium?

- Never have to care about waiting for an element on the page to load.
- Supports JavaScript and TypeScript.
- Running multiple browsers in parallel is super simple, without any special setup. Just a command.
- Supports the PageObject pattern
- Compatible with Continous Integration systems like Jenkins, TeamCity, Travis, etc.

## Setup

The easiest way to install it is by running the following command that requires [NodeJS](https://nodejs.org/en/) to be installed on your machine:

`npm install -g testcafe`

For more information, please refer to their [Getting Started](https://github.com/DevExpress/testcafe#getting-started) guide.