/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Quiz = require('../api/quiz/quiz.model');
// var sequencer = require('../api/modelUtils/sequencer')(mongoose);

// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });


// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, {
//     provider: 'local',
//     email: 'elaine.trombley3@gmail.com',
//     name: 'Elaine',
//     password: 'elaine',
//     bars: [{name:'Social', depInterval: 1},
//            {name:'Romance', depInterval: 1},
//             {name:'Entertainment', depInterval: 7},
//            {name:'Intimacy', depInterval: 14},
//             {name:'Alone Time', depInterval: 14}]

//   },{
//     provider: 'local',
//     email: 'evalve15@gmail.com',
//     name: 'Corey',
//     password: 'corey',
//     bars: [{name:'Social', depInterval: 1},
//            {name:'Romance', depInterval: 1},
//             {name:'Entertainment', depInterval: 7},
//            {name:'Intimacy', depInterval: 14},
//             {name:'Alone Time', depInterval: 14}]

//   },
//   {
//     provider: 'local',
//     email: 'martin@gmail.com',
//     name: 'Martin',
//     password: 'martin',
//     bars: [{name:'Social', depInterval: 1},
//            {name:'Romance', depInterval: 1},
//             {name:'Entertainment', depInterval: 7},
//            {name:'Intimacy', depInterval: 14},
//             {name:'Alone Time', depInterval: 14}]

//   },{
//     provider: 'local',
//     email: 'sara@gmail.com',
//     name: 'Sara',
//     password: 'sara',
//     bars: [{name:'Social', depInterval: 1},
//            {name:'Romance', depInterval: 1},
//             {name:'Entertainment', depInterval: 7},
//            {name:'Intimacy', depInterval: 14},
//             {name:'Alone Time', depInterval: 14}]

//   },
//   function() {
//       console.log('finished populating users');
//     }
//   );
// });

// sequencer.find({}).remove(function() {
  // Counter.create({
  //   _id : 'Quiz',
  //   seq : 6
  // }, {
  //   _id : 'TBD',
  //   seq : 0
  // });
// });


// Quiz.find({}).remove(function() {
//   Quiz.create({
//     // seq: 1,
//     questions : [
//         "Which one of your friends does your partner find most attractive?",
//         "What one item of clothing does your partner wear that you just can't stand?",
//         "How many times did you date before your first kiss with your partner?",
//         "What gift that your partner gave you came as the biggest surprise?",
//         "Who would your partner say was the 'better catch' out of you two?"
//       ]

//   }, {
//     // seq: 2,
//     questions : [
//         "Which one of your partner's friends look best in a bathing suit?",
//         "If your partner could choose one thing of yours to get rid of, what would they choose?",
//         "When our spouse says, 'Honey, they're playing our soung' what song are they playing?",
//         "If you told your wife that tomorrow you would do any one item from their Honey-Do list, what would they choose?",
//         "What is the breed and name of your partner childhood pet?"
//       ]
//   }, {
//     // seq: 3,
//     questions : [
//         "What is the most your partner has ever paid for a pair of shoes?",
//         "What is your partner's favorite color?",
//         "What was the last book your partner read?",
//         "Who is the better cook?",
//         "If you and your housband were to go get a new dog, what dog would your partner want to get?"
//       ]
//   },  {
//     // seq: 4,
//     questions : [
//         "What is the strangest gift your partner has ever bought for you?",
//         "what would your partner say was the last thing the two of you argued about?",
//         "When was the last time you and your partner had a long passionate kiss?",
//         "What is the honeymoon destination that your spouse would most likely choose for a second honeymoon?",
//         "Who usually gets their way with things?"
//       ]
//   },  {
//     // seq: 5,
//     questions : [
//         "Who gets to control the remote?",
//         "If your home was on fire, what are the three things you'd save?",
//         "what is one thing that you would like to change in your relationship?",
//         "Which song will you dedicate to your partner?",
//         "What was the best vacation you've ever taken together?"
//       ]
//   },{
//     // seq: 6,
//     questions : [
//         "What was the best vacation you've ever taken together?",
//         "if you had 2 weeks and money was not much of an object, where would you go?",
//         "What is your partner's best 'stupid human trick'?",
//         "What would your partner say you have the most of: sense of humor, sense of time, sense of adventure, common sense?",
//         "What is your partner's greatest phobia?",
//         "Who does your partner talk to on the phone the most?"
//       ]
//   });
// });





