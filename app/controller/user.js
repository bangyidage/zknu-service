'use strict';

const Controller = require('egg').Controller

class UserController extends Controller {
  //owner页面个人信息
  async index() {
    const { ctx } = this;
    const token = this.ctx.request.header.token;
    let userId = await this.ctx.service.jwt.checkToken(token);

    this.ctx.body = userId;
  }
}

module.exports = UserController;
