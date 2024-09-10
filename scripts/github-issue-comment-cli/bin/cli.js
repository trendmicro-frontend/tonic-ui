#!/usr/bin/env node

const github = require('octonode');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
  .option('token', {
    demandOption: false,
    type: 'string',
    description: 'GitHub personal access token for authentication. If not provided, the action will use the default GitHub token available in the environment.',
  })
  .option('pattern', {
    demandOption: true,
    type: 'string',
    description: 'The string pattern to search for within the PR',
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
    description: 'The issue comment',
  })
  .argv;
const commentWithLineBreaks = String(argv.comment || '').replace(/\\n/g, '\n');
const client = github.client(argv.token || process.env.GH_TOKEN);
const ghissue = client.issue(`${argv.owner}/${argv.repo}`, argv.issueNumber);

ghissue.comments((err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  const comments = result;
  const comment = comments.find(comment => {
    if (comment.body.includes(argv.pattern)) {
      return true;
    }
  });

  if (!comment) {
    ghissue.createComment({ body: commentWithLineBreaks }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    });
  } else {
    ghissue.updateComment(comment.id, { body: commentWithLineBreaks }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    });
  }
});
