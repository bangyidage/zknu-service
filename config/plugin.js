'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  cors: {
    enable: true,
    package: 'egg-cors',

  },
  oss: {
    enable: true,
    package: 'egg-oss',
  }
};
