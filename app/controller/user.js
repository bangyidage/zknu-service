'use strict';

const Controller = require('egg').Controller

class UserController extends Controller {
  //owner页面个人信息
  async index() {
    const { ctx } = this;
    const token = this.ctx.request.header.token;
    let result = await this.ctx.service.jwt.checkToken(token);
    if (result.status === -100) {
      this.ctx.body = result;
      return
    }
    const { msg } = result
    let data = await this.ctx.service.user.index(msg);
    this.ctx.body = {
      data,
      status: 98
    };
  }
}

module.exports = UserController;
