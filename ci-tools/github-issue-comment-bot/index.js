#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
  .option('login-user', {
    demandOption: true,
    type: 'string',
    description: 'The login user name of the GitHub account',
  })
  .option('owner', {
    demandOption: true,
    type: 'string',
    description: 'The owner of the repository',
  })
  .option('repo', {
    demandOption: true,
    type: 'string',
    description: 'The repository',
  })
  .option('issue-number', {
    demandOption: true,
    type: 'number',
    description: 'The issue number',
  })
  .option('comment', {
    demandOption: true,
    type: 'string',
    description: 'The comment to create or update',
  })
  .argv;

const github = require('octonode');
const _find = require('lodash.find');
const client = github.client(process.env.GH_TOKEN);
const ghissue = client.issue(`${argv.owner}/${argv.repo}`, argv.issueNumber);

ghissue.comments((err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  const comments = result;
  const comment = _find(comments, { user: { login: argv.loginUser } });

  if (!comment) {
    ghissue.createComment({ body: argv.comment }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    });
  } else {
    ghissue.updateComment(comment.id, { body: argv.comment }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    });
  }
});
