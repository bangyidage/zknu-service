'use strict';
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const fs = require('mz/fs');
const Controller = require('egg').Controller
class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    let token = this.ctx.request.header.token;

    let result = await this.ctx.service.jwt.checkToken(token);
    const { status, msg } = result;
    if (status === -100) {
      this.ctx.body = result;
      return
    }
    // 获取 steam
    const stream = await ctx.getFileStream();
    // 生成文件名
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
    // 写入路径
    const target = path.join(this.config.baseDir, 'app/public/upload/', filename);
    const writeStream = fs.createWriteStream(target);
    let newUrl = `http://localhost:7001/public/upload/${filename}`;

    try {
      // 写入文件
      await stream.pipe(writeStream);

      // await stream.pipe(writeStream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    let isInsert = await this.ctx.service.user.modifyHead(newUrl, msg);
    if (isInsert === 1) {
      this.ctx.body = {
        isSuccess: true,
        imgUrl: newUrl
      };
      return
    }
    this.ctx.body = {
      isSuccess: false,
      msg: '请稍后尝试'
    };

  }
}


module.exports = UploadController;
