'use strict';

const Controller = require('egg').Controller;

class LoadjobController extends Controller {
  async index() {
    const { ctx } = this;
    let token = this.ctx.request.header.token;
    let phone = this.ctx.request.body.phone;
    let result = await this.ctx.service.jwt.checkToken(token);
    const { status, msg } = result;
    if (status === -100) {
      this.ctx.body = result;
      return
    }

    this.ctx.body = '1';
  }
}

module.exports = LoadjobController;
