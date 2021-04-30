'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async adminLogin() {
        const post = await this.app.mysql.get('student', { id: 1 });
        return '1';
    }
    async studentLogin() {
        const post = await this.app.mysql.get('student', { id: 1 });
        return '1';
    }
    async teacherLogin() {
        const post = await this.app.mysql.get('student', { id: 1 });
        return '1';
    }
}

module.exports = LoginService;
