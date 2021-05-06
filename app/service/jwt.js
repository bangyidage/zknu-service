'use strict';

const Service = require('egg').Service;

class JwtService extends Service {
  async index(userId) {
    const { ctx } = this;
    const token = this.app.jwt.sign(userId, this.app.config.jwt.secret);
    return token;
  }
  async checkToken(userId) {
    const { ctx } = this;
    try {
      const decode = this.app.jwt.verify(userId, this.app.config.jwt.secret);
      return decode;
    } catch (error) {
      console.log(error);
      return {
        code: -100,
        msg: '请重新登录'
      }
    }
    return
  }
}

module.exports = JwtService;
