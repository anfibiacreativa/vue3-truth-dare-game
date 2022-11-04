# A repo to demonstrate a Vue3 app developed in GitHub Codespaces and tested with Playwright

Welcome to this repo! This repo features a [Vue3/Vite](https://vitejs.dev/) application built using [Composition API](https://vuejs.org/api/composition-api-setup.html) patterns, and featuring [Pinia](https://pinia.vuejs.org/) to manage state. This application can be deployed to [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) free tier, leveraging [managed API](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions), which is a free, fully managed [Azure Function](https://learn.microsoft.com/en-us/azure/azure-functions/).

We will use the [Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/docs/cli/swa/), to bind all the pieces together and start a local server, inside of our container.

You can fork this repo to play with [Codespaces](https://github.com/features/codespaces)! For that, you will need a free [GitHub](https://www.github.com) account.

## Development setup prerequisites

Please make sure you have the following technologies installed
- [Node.js](https://nodejs.org/en/) LTS
- [npm](https://docs.npmjs.com/cli/v6)
- [VSCode](https://code.visualstudio.com/) with the following extensions:
    - [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces)

This extension and other required extensions will be recommended by VS Code when you open your project in Codespaces.

## Cosmos DB
In this example, we are storing our data in [Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/) for [Mongo DB API](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/feature-support-42 database, in Azure. But you can store your data wherever you prefer, or even mock it! You will need to update the function accordingly.

### Connection String as a Codespaces Secret in GitHub

If you use a database in the cloud, that requires a connection string, all you have to do is 

- go to GutHub and login
- click on `Settings` in the top right menu
- find the `Codespaces` tab, in the left-side navigation
- add a new `Secret` named `COSMOS_DB_CONNECTION_STRING` and add the string value*
_If you use a different database and want to change the constant name, you can do so in your function [file] (./api/cards/database.js)._ _You will also need to replace the [Mongoose.js](https://mongoosejs.com/) driver, with whatever tool you're using to query your data._

You can also create and push a `local.settings.json` configuration file for your function, and add the string to a variable called , like this

```
  "Values": {
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "CosmosDbConnectionString": “your-string-goes-here"
    },
```

You can use the configuration file to setups a CORS bypass, like this

```
    "Host": {
        "CORS": "http://localhost:3000",
        "CORSCredentials": false
    }
```

## Opening the project in Codespaces

Before you start, you can go to your Codespaces preferences in GitHub, and configure them to open in VSCode by default, as explained [here](https://docs.github.com/en/codespaces/developing-in-codespaces/using-github-codespaces-in-visual-studio-code).

When you're ready, go to the fork of this repo, in your account, and click on `Code` > `Codespaces`, to open it in Codespaces.

VSCode should launch and open the project.

As explained before, VSCode will recommend you install the required extensions, including `Azure Core Tools`.

## Installing the project app

Now you have the environment variable in place, you can install the project:

- in the terminal, run `npm install && npm run dev`

This will start the Vue.js/Vite server in port 3000. All ports are already forwarded in your container. If you need more information about port forwarding, you can find it [here](https://code.visualstudio.com/docs/devcontainers/containers)

- now you can start the Azure Function, and for that, you only have to click on `F5`. This will start the emulator on port 7071.

- finally, let's launch the Static Web Apps server, that connects to the function, by opening another terminal tab in VSCode, and executing the following command
`swa init && swa start http://localhost:3000 --api-location http://localhost:7071`

_If you run into errors, you can go to the `Ports` tab, and make sure the ports are effectively running a process. You should've gotten confirmation of this when you started each server, with a pop-up in VSCode._

## Open the application in your browser

Et voilà! Now you can go to `localhost:4280` and start playing "Truth or Dare"! You can continue to develop the application, inside of the container, and access it anywhere even on the web, to continue to work on it!

## Testing with Playwright

When you ran `npm install` before, you have also installed [Playwright]() for e2e testing.

You should be able to run

`npx playwright test`

to run the example tests and get started, and

`npx playwright show-report` to show the report.

_Should you run into any issues, you can try reinstalling Playwright with `npm install playwright` and the necessary dependencies. You will be prompted to do so in the console, if required._ 

### Using codegen to generate tests

As explained in Playwright documentation, you can use [Codegen](https://playwright.dev/docs/codegen) to generate tests, as you browse the application and interact with the user interface.

Because you are inside of a container with a Linux Debian OS, we have to install a browser. We have included some library scripts in the repo, that allow us to test our application end-to-end with [Playwright](). 

You can see the script [here](./.devcontainer/library-scripts/desktop-lite-debian.sh).

Once you run `npx playwright codegen http://localhost:4280` (or the port the Codespace has started your app at!), you will need to open the freshly installed browser. By default, it starts on port 6080. You will be able to open it from the `Ports` tab, clicking on the right process, or you can paste `http://localhost:6080` in your browser URL bar. That will star the brwoser and require a password. 

The password is : 'vscode'

## Committing changes

To push your development changes to the Codespace, you can always commit, push and sync your changes.
You can learn more, following [this link](https://docs.github.com/en/codespaces/developing-in-codespaces/using-source-control-in-your-codespace)

## Deploying your app to Azure

You can further leverage the Azure Static Web Apps CLI, to deploy your app to Azure! Type

`swa deploy` in the terminal, and follow the prompts. The CLI will make sure your app and Azure Functions are deployed and you will be able to see your published site, in a few moments!

You can then setup your [GitHub Actions](https://github.com/features/actions), and your CI/CD pipeline, to continue to deploy to Azure, when committing and pushing changes to your designated branch.





