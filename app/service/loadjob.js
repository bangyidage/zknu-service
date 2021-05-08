'use strict';

const Service = require('egg').Service;

class LoadjobService extends Service {
  //查询mysql 教师id发布人 找头像 兼职任务名字  领取人数
  async index() {
    const { ctx } = this;
    const result = await this.app.mysql.query(`select `);
    return result
  }
}

module.exports = LoadjobService;
