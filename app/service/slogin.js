
'use strict';

const Service = require('egg').Service;

class SloginService extends Service {

  async login(account, pwd, iden) {
    const { ctx } = this;
    const result = await this.app.mysql.query(`select id from ${iden}  where account=${account} and pass=${pwd};`);
    if (result.length > 0) {
      const userID = result[0].id;
      //签名
      const token = await this.ctx.service.jwt.index(userID);
      return {
        data: {
          userId: token,
        },
        status: 100
      }
    }
    else {
      return {
        status: -99,
        msg: '用户名或密码错误',
      };
    }
  }
}

module.exports = SloginService;
