'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const str = 'student'
    const result = await this.app.mysql.query(`select id from student`);
    this.ctx.body = result;
  }
}

module.exports = HomeController;
