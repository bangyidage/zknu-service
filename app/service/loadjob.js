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
  async currentJobs(data) {
    const { ctx } = this;
    const student = await this.app.mysql.query(`SELECT * FROM student WHERE id=${data} ;`);
    let { current_job } = student[0];
    let jobId = JSON.parse(current_job);
    let jobsDetails = await this.app.mysql.query(`SELECT * FROM jobs WHERE id=${jobId} ;`);
    let jobsDetail = jobsDetails[0];
    const { account } = jobsDetail;
    let teacherMsgs = await this.app.mysql.query(`SELECT * FROM teacher WHERE id=${account} ;`);
    let teacherMsg = teacherMsgs[0];
    return {
      teacherMsg,
      jobsDetail
    };
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
  async joinJobs(jobId, userId) {
    //更改 jobs 领取人 get_people  领取人数now_nums
    //student current_job
    const { ctx } = this;

    let result = await this.app.mysql.query(`select nums,now_nums,get_people from jobs where id=${jobId};`);
    //'任务不存在',
    if (!result[0]) {
      return {
        msg: '任务不存在',
        status: -90
      }
    }
    //'报名人数已满
    let { nums, now_nums, get_people } = result[0];
    if (nums <= now_nums) {
      return {
        msg: '报名人数已满',
        status: -89
      }
    }

    let current_jobs = await this.app.mysql.query(`select current_job from student where id=${userId};`);
    if (current_jobs[0]['current_job']) {
      return {
        msg: '当前有任务在进行中',
        status: -89,
        current_jobs
      }
    }
    //报名人数为空0
    if (!now_nums) {
      let data = JSON.stringify([userId]);
      let res = await this.app.mysql.update('jobs', {
        id: jobId,
        now_nums: 1,
        get_people: data
      });
      const k = res.affectedRows === 1;
      if (k) {
        let b = await this.app.mysql.update('student', {
          id: userId,
          current_job: jobId
        })
        const c = b.affectedRows === 1;
        if (c) {
          return {
            msg: true,
            status: 87
          }
        }
        return {
          msg: '网络错误',
          status: -87
        }
      }
      if (!k) {

      }
      return res;
    }
    //人数不为空
    if (!current_jobs[0]['current_job']) {

      let get_people_arr = JSON.parse(get_people);
      let res = get_people_arr.findIndex(function (value, index) {
        return value === userId;
      })
      if (res !== -1) {
        return {
          msg: '已经报名参加',
          status: -89
        }
      }
      if (res === -1) {
        get_people_arr[get_people_arr.length] = userId;
        now_nums++;
      }
      const row = {
        id: userId,
        now_nums,
        get_people: JSON.stringify(get_people_arr)
      };
      const resultJobsUpdate = await this.app.mysql.update('jobs', row);

      const isSuccessed = resultJobsUpdate.affectedRows === 1;
      if (isSuccessed) {
        let isUpdate = await this.app.mysql.update('student', {
          id: userId,
          current_job: jobId
        });
        const isUpdateSuccessed = isUpdate.affectedRows === 1;

        if (isUpdateSuccessed) {
          return {
            msg: true,
            status: 89
          }
        }
        return {
          msg: '网络错误',
          status: -88
        }
      }
    }
  }
}

module.exports = LoadjobService;
