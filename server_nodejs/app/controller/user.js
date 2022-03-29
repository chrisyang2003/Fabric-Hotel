const { Controller } = require('egg');

class UserController extends Controller {
  async create() {
    const { ctx, service } = this;

    // 获取请求信息
    const userInfo = ctx.request.query;
    console.log(userInfo)
    ctx.body = "12312"
    // 校验参数
    // ctx.assert(userInfo && userInfo.name, 422, 'user name is required.');

    // // 调用 Service 进行业务处理
    // const result = await service.user.create(userInfo);

    // // 响应内容和响应码
    // ctx.body = result;
    // ctx.status = 201;
  }
}
module.exports = UserController;