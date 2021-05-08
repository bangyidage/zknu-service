'use strict';

const Controller = require('egg').Controller;

class ModifyPhoneController extends Controller {
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
    let isInsert = await this.ctx.service.user.modifyPhone(phone, msg);
    if (isInsert === 1) {
      this.ctx.body = {
        status: 96,
        isSuccess: true,
        msg: '修改成功'
      };
      return
    }
    this.ctx.body = {
      status: -99,
      msg: '网络错误',
    };
  }
}

module.exports = ModifyPhoneController;
