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
  router.post('/', controller.loadjob.index);
  router.post('/searchJobs', controller.loadjob.searchJobs);
  router.post('/joinJobs', controller.loadjob.joinJobs);
  router.post('/currentJobs', controller.loadjob.currentJobs);
}