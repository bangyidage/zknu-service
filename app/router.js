'use strict';

const { Controller } = require("egg");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/slogin', controller.slogin.index);
  router.post('/user', controller.user.index);
  router.post('/upload', controller.upload.index);
  router.post('/modifyPhone', controller.modifyphone.index);
  router.get('/', controller.loadjob.index);
}