
'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {

  async index(userId) {
    const { ctx } = this;
    const result = await this.app.mysql.query(`select  name, account, phone, sex, birth from ` + ' student ' + ` where id=${userId}; `);
    if (result.length > 0) {
      //签名
      return result[0];
    }
    else {
      return {
        code: -100,
        msg: '请重新登录',
      };
    }
  }
  async modifyHead(data, userId) {
    const { ctx } = this;
    // 修改数据，将会根据主键 ID 查找，并更新
    const row = {
      id: userId,
      headpic: `${data} `
    };
    const result = await this.app.mysql.update('student', row); // 更新 posts 表中的记录
    return result.affectedRows;
  }
  async modifyPhone(data, userId) {
    const { ctx } = this;
    // 修改数据手机，将会根据主键 ID 查找，并更新
    const row = {
      id: userId,
      phone: `${data} `
    };
    const result = await this.app.mysql.update('student', row); // 更新 posts 表中的记录
    return result.affectedRows;
  }
}

module.exports = UserService;
