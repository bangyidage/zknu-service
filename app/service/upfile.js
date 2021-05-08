
'use strict';

const Service = require('egg').Service;

class UpfileService extends Service {

  async login(data) {
    const { ctx } = this;
    const result = await this.app.mysql.query(`INSERT INTO student (headpic) VALUES (${data})`);
    return result
  }
}

module.exports = UpfileService;
