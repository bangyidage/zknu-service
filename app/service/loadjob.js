'use strict';

const Service = require('egg').Service;

class LoadjobService extends Service {
  //查询mysql 教师id发布人 找头像 兼职任务名字  领取人数
  async index(count) {
    const { ctx } = this;
    const result = await this.app.mysql.query(`select * from jobs where  replyprogress=0 and (now_nums < nums)
  ORDER BY id   limit ${count * 10}, 10;`);
    return result;
  }
  async searchTeacherName(data) {//查询教师名称
    let teacherName = [];
    for (let i = 0; i < data.length; i++) {
      let id = data[i].account;
      let name = await this.ctx.app.mysql.query(`select name,id,headpic from teacher where id=${id};`);
      teacherName[i] = name[0];
    }

    return teacherName;

  }
  async searchJobs(data) {
    const { ctx } = this;
    const result = await this.app.mysql.query(`SELECT * FROM jobs WHERE title LIKE '%${data}%' and replyprogress=0 and (now_nums < nums) order BY id ;`);

    return result;
  }
}

module.exports = LoadjobService;
