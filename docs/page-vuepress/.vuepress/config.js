module.exports = {
  title: "CSC3206 AI Assignment 1 (2020-03)",
  base: "/maze/page/",
  // base: "/page/",
  dest: "../page",
  head: [
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" }],
    ["link", { rel: "stylesheet", href: "https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css" }],
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" }],
  ],
  themeConfig: {
    nav: [],
    sidebarDepth: 2,
    sidebar: [
      '/',
      'problem',
      'instructions',
      'player',
      'test-environment',
      'loading-code',
      'testing',
      'solving-maze',
      'maze-creator',
      // {
      //   title: '2020 March',
      //   collapsable: false,
      //   children: [
      //     '/get-start',
      //     '/lab1',
      //     '/lab2',
      //     '/lab3',
      //     // '/lab4',
      //     // '/lab5',
      //     // '/lab6',
      //     // '/lab7',
      //     // '/lab8',
      //     // '/lab9'
      //   ]
      // },
    ],
    lastUpdated: 'Last Updated'
  },
  markdown: {
    lineNumbers: true
  },
  // plugins: [
  //   'latex',
  //   'tabs'
  // ],
}
