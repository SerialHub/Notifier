const express = require('express');
const nodemailer = require('nodemailer');
const request = require('request');

const app = express();

async function sendEmail(posts) {
  // create a new transporter using the Gmail SMTP server
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'theserialwala@gmail.com',
      pass: 'kopjaoonosqcumkj'
    }
  });

  // construct the email message
  let message = {
    from: 'theserialwala@gmail.com',
    to: 'ideagained@gmail.com',
    subject: 'New posts on freewatchserialonline.com',
    text: `There are ${posts.length} new posts on freewatchserialonline.com:`
  };

  // add a list of the posts to the email message
  message.text += '\n\n';
  message.text += posts.map((post) => `- ${post.title}`).join('\n');

  // send the email
  let result = await transporter.sendMail(message);
  console.log(`Email sent: ${result.response}`);
}

app.get('/', (req, res) => {
  // make a request to the website to get the list of posts
  request('https://freewatchserialonline.com', (error, response, body) => {
    if (error) {
      console.error(error);
      res.send(error);
    } else {
      let posts = JSON.parse(body);
      sendEmail(posts);
      res.send(`An email was sent to ideagained@gmail.com about ${posts.length} new posts on freewatchserialonline.com.`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
