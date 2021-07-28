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
        text: {
          type: 'plain_text',
          text: 'What is the sentiment of this saying?',
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
            action_id: 'ghost_action'
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Pick an item from the dropdown list'
        },
        accessory: {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Select an item',
            emoji: true
          },
          options: [
            {
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'DMP'
              },
              value: 'DMP'
            },
            {
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Vortal'
              },
              value: 'Vortal'
            },
            {
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Annotations'
              },
              value: 'Annotations'
            }
          ],
          action_id: 'ghost_action'
        }
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          action_id: 'ghost_action'
        },
        label: {
          type: 'plain_text',
          text: 'Your saying',
          emoji: true
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Submit saying',
              emoji: true
            },
            value: 'click_me_123',
            action_id: 'submit_joke_action'
          }
        ]
      }
    ]
  });
});

app.action('ghost_action', async ({ body, ack, say }) => {
  // gets rid of the loading errors in the slack UI
  await ack();
});

app.action('submit_joke_action', async ({ body, ack, say }) => {
  await ack();

  const responses = Object.values(body.state.values);

  responses.forEach(item => {
    const res = Object.values(item)[0];

    switch (res.type) {
      case 'radio_buttons':
        console.log(res.selected_option.value);
        break;
      case 'static_select':
        console.log(res.selected_option.value);
        break;
      default:
        console.log(res.value);
        break;
    }
  });
  await say('Request received! Sending off to Wavy HQ now.');
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
