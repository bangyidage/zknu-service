'use strict';

const Controller = require('egg').Controller;

class LoadjobController extends Controller {
  async index() {
    const { ctx } = this;
    let token = this.ctx.request.header.token;
    let count = this.ctx.request.body.count;
    let result = await this.ctx.service.jwt.checkToken(token);
    const { status, msg } = result;
    if (status === -100) {
      this.ctx.body = result;
      return
    }
    let data = await this.ctx.service.loadjob.index(count);

    let teacherName = await this.ctx.service.loadjob.searchTeacherName(data);

    if (data.length > 0) {
      this.ctx.body = {
        teacherName,
        data
      }
      return
    }
    this.ctx.body = {
      status: 95,
      msg: '没有更改信息'
    };
  }
  async searchJobs() {
    const { ctx } = this;
    let token = this.ctx.request.header.token;
    let data = this.ctx.request.body.data;
    let result = await this.ctx.service.jwt.checkToken(token);
    const { status, msg } = result;
    if (status === -100) {
      this.ctx.body = result;
      return
    }
    let newResult = await this.ctx.service.loadjob.searchJobs(data);

    let teacherName = await this.ctx.service.loadjob.searchTeacherName(newResult);
    if (newResult.length === 0) {
      this.ctx.body = {
        status: 95,
        msg: '没有更改信息'
      };
      return
    }
    this.ctx.body = {
      newResult,
      teacherName
    }
  }
  async joinJobs() {
    const { ctx } = this;
    let token = this.ctx.request.header.token;
    let result = await this.ctx.service.jwt.checkToken(token);
    const { status, msg } = result;
    if (status === -100) {
      this.ctx.body = result;
      return
    }
    let jobId = this.ctx.request.body.jobId;

    let res = await this.ctx.service.loadjob.joinJobs(jobId, msg);
    this.ctx.body = res;
  }
  async currentJobs() {
    const { ctx } = this;
    let token = this.ctx.request.header.token;
    let result = await this.ctx.service.jwt.checkToken(token);
    const { status, msg } = result;
    if (status === -100) {
      this.ctx.body = result;
      return
    }
    let data = await this.ctx.service.loadjob.currentJobs(msg);
    this.ctx.body = data;

  }
}

module.exports = LoadjobController;
