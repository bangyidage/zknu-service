'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let postData = this.ctx.request.body;

    ctx.body = postData;
  }
}

module.exports = HomeController;
