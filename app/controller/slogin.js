'use strict';

const Controller = require('egg').Controller

class SloginController extends Controller {
  async index() {
    const { ctx } = this;
    const { account, pwd, iden } = ctx.request.body;
    if (!iden) {
      this.ctx.body = {
        status: -100,
        msg: '请重新选择用户身份'
      }
    }
    if (iden) {
      //查询表登录
      let result = await this.ctx.service.slogin.login(account, pwd, iden);
      this.ctx.body = result;
    }

  }
}

module.exports = SloginController;
