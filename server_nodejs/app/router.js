'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/room', controller.room.index);


  //用户模块
  router.get('/user', controller.user.create);







};
