// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  plugins: [

    {
      use: '@gridsome/source-graphql',
      options: {
        url: `https://serve.onegraph.com/graphql?${process.env.ONEGRAPH_ID}`,
        fieldName: 'oneGraphCal',
        typeName: 'ONEGRAPHCAL',
        headers: {
          Authorization: `Bearer ${process.env.ONEGRAPH_TOKEN}`,
        },
      },
    },

      {
      use: '@jammeryhq/gridsome-source-google-calendar',
      options: {
        calendarId: process.env.GCAL_ID,
        apiKey: process.env.GCAL_API_KEY,
        typeName: 'GoogleCalendar',
        includeRaw: true,
        includeRecurringEvents: true
      },
    },
  ],
}