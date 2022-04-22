#!/usr/bin/env node
const inquirer = require('inquirer');
const camelcase = require('camelcase');

(async () => {
  const questions = [{
    name: 'baseBucketName',
    message: 'What is the bucket name?',
    type: 'input',
    validate: (x) => !!x,
  }, {
    name: 'isStageAppended',
    message: 'Append stage to name?',
    type: 'confirm',
    default: true,
  }];

  const {
    baseBucketName,
    isStageAppended,
  } = await inquirer.prompt(questions);

  const bucketName = isStageAppended
    ? `${baseBucketName}-$\{self:provider.stage}`
    : baseBucketName;

  console.log();
  console.log('Copy and paste this in the Resources section:');
  console.log(`
  ${camelcase(baseBucketName, { pascalCase: true })}Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: ${bucketName}
`);
})();
