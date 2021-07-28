const { App } = require('@slack/bolt');
require('dotenv').config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.SLACK_APP_TOKEN
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: 'section',
        fields: [
          {
            type: 'plain_text',
            text: 'Hello! What team would you like to make a saying for?',
            emoji: true
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Team name'
        },
        accessory: {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Select a user',
            emoji: true
          },
          options: [
            {
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'DMP'
              },
              value: 'value-0'
            },
            {
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Vortal'
              },
              value: 'value-1'
            },
            {
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Annotations'
              },
              value: 'value-2'
            }
          ],
          action_id: 'team-select-action'
        }
      }
    ]
  });
});

app.action('team-select-action', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();

  await say(
    `Nice team, I have always wanted to be on ${body.actions[0].selected_option.text.text}!`
  );

  await say({
    blocks: [
      {
        dispatch_action: true,
        type: 'input',
        element: {
          type: 'plain_text_input',
          action_id: 'new_saying-action'
        },
        label: {
          type: 'plain_text',
          text: `Enter a new saying for ${body.actions[0].selected_option.text.text}`,
          emoji: true
        }
      }
    ]
  });
});

app.action('new_saying-action', async ({ body, ack, say }) => {
  await ack();
  await say(`Nice joke, I think ${body.actions[0].value} will really slap`);
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'Is this an error or success message?',
          emoji: true
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'radio_buttons',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'error',
                  emoji: true
                },
                value: 'error'
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'success',
                  emoji: true
                },
                value: 'success'
              }
            ],
            action_id: 'error_or_success'
          }
        ]
      }
    ]
  });
});

app.action('error_or_success', async ({ body, ack, say }) => {
  await ack();
  await say('Great! Sending this off to Wavy HQ now.');
});

// app.action('new_saying-action', async ({ body, ack, say }) => {
//   // Acknowledge the action
//   await ack();
//   await say(`Nice joke, I think ${body.actions[0].value} will really slap`);
// });

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
