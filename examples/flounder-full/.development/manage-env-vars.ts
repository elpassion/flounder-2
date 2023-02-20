// @ts-ignore
const CryptoJS = require("crypto-js");
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));


enum Action {
  encrypt = "encrypt",
  decrypt = "decrypt"
}
const validActions = Object.values(Action) as string[];

const region = 'eu-west-1';
const projectName = 'flounder'; //REPLACE_PROJECT
const secretManager = new SecretsManagerClient({ region: region });
const getEncryptionKeySecretCommand = new GetSecretValueCommand({ SecretId: `${projectName}-stg-env-vars-encryption-key` });

secretManager
  .send(getEncryptionKeySecretCommand)
  .then((data: { SecretString: string }) => {

    const encryptionKey = data.SecretString;
    manageEnvVars(encryptionKey);

    console.log("Finished.");
  })
  .catch((error: any) => {

    console.error("Something went wrong. Error: ", error?.message);

    throw error;
  });


const manageEnvVars = (password: string): void => {

  const isValidActionParam = "action" in argv  && validActions.includes(argv["action"]);
  if (!isValidActionParam) {
    console.error(`Invalid/missing --action param. Given value: "${argv["action"]}".`);
    console.info(`Valid values: ${JSON.stringify(validActions)}. For example: --action=decrypt`);
    return;
  }

  const isValidProjectsParams =  "projects" in argv && argv["projects"].split(",").length > 0;
  if(!isValidProjectsParams) {
    console.error(`Invalid/missing --projects param. Given value: "${argv["projects"]}".`);

    console.info(`Valid values: admin,frontend,mobile,backend. For example: ---projects=admin,frontend`);
    return;
  }

  const appsNames = argv["projects"].split(",");
  const actionName = argv["action"];
  appsNames.forEach((appName: string): void => {
    console.info(`Processing app: ${appName}...`);
    switch (actionName) {
      case Action.encrypt:
        console.info(`Starting encrypting env vars from .env.development >> .env.development.encrypted.`);
        encryptEnvs(appName, password);
        break;
      case Action.decrypt:
        console.info(`Starting decrypting env vars from .env.development.encrypted >> .env.development.`);
        decryptEnvs(appName, password);
        break;
    }
    console.info(`Done.`);
    console.info(`--------`);
  });
};

// @ts-ignore
const getEnvNames = (fileContent: string) => ([...fileContent.matchAll(/[a-zA-Z\\_\-\\d]*=/g)].map((item: any) => item[0]).sort());

const encryptEnvs = (appName: string, encryptionKey: string) => {
  const decryptedFileContentPath = appName === 'mobile' ? `./apps/${appName}/.env` : `./apps/${appName}/.env.development`;
  const decryptedFileContent = fs.readFileSync(decryptedFileContentPath, 'utf8');
  const templateFileContent = fs.readFileSync(`./apps/${appName}/.env.development.template`, 'utf8');

  const envFileTemplateIsUpToDate = getEnvNames(decryptedFileContent).join() !== getEnvNames(templateFileContent).join();
  if (envFileTemplateIsUpToDate) {
    console.log("Error: .env.development has to have the same keys what .env.development.template. has.");
    return;
  }

  const encryptedFileContent = CryptoJS.AES.encrypt(decryptedFileContent, encryptionKey).toString();
  fs.writeFileSync(`./apps/${appName}/.env.development.encrypted`, encryptedFileContent, 'utf8');
}

const decryptEnvs = (appName: string, encryptionKey: string) => {
  const encryptedFileContent = fs.readFileSync(`./apps/${appName}/.env.development.encrypted`, 'utf8');
  const decryptedFileContent = CryptoJS.AES.decrypt(encryptedFileContent, encryptionKey);
  const decryptedFileContentPath = appName === 'mobile' ? `./apps/${appName}/.env` : `./apps/${appName}/.env.development`;
  fs.writeFileSync(decryptedFileContentPath, decryptedFileContent.toString(CryptoJS.enc.Utf8), 'utf8');
}


