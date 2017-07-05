// src/project-seeds.js

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const organization = {
  name: 'Aliens Are Among Us',
  description: 'Aliens Are Among Us main organization'
};

const project = {
  name: 'My first project',
  description: 'This is a project description',
  localeCodes: ['nl'],
};

const entries = [
  {
    name: 'item data',
    description: 'main menu item data',
    group: 'menu',
    tags: ['menu', 'data'],
    platforms: [
      {
        platformCode: 'default',
        key: 'main_menu_item_data',
        translations: [
          {
            localeCode: 'nl',
            translation: 'DATA'
          }
        ]
      }
    ]
  },
  {
    name: 'item profile',
    description: 'main menu item profile',
    group: 'menu',
    tags: ['menu', 'profile'],
    platforms: [
      {
        platformCode: 'default',
        key: 'main_menu_item_profile',
        translations: [
          {
            localeCode: 'nl',
            translation: 'PROFIEL'
          }
        ]
      }
    ]
  },
  {
    name: 'item messages',
    description: 'main menu item messages',
    group: 'menu',
    tags: ['menu', 'messages'],
    platforms: [
      {
        platformCode: 'default',
        key: 'main_menu_item_messages',
        translations: [
          {
            localeCode: 'nl',
            translation: 'BERICHTEN'
          }
        ]
      }
    ]
  }
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('organizations').create(organization)
  .then((org) => {
    console.log('Organization seeded...', org.name);
    feathersClient.service('projects').create(Object.assign(project, {organizationId: org._id}))
      .then((proj) => {
        console.log('Project seeded...', proj.name);
        entries.map((entry) => {
          feathersClient.service('entries').create(Object.assign(entry, {projectId: proj._id}))
            .then((ent) => {
              console.log('Entry seeded...', ent.name);
            })
            .catch((error) => {
              console.error('Error seeding entry!', error.message);
            });
        });
      })
      .catch((error) => {
        console.error('Error seeding project!', error.message);
      });
  })
  .catch((error) => {
    console.error('Error seeding organization!', error.message);
  });
