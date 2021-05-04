'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await this.app.mysql.get('student');
    ctx.body = data;
  }
}

module.exports = HomeController;
