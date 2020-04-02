// const url = window.location.protocol + '//' + window.location.host;
// const url = 'https://ylgj.xwxcloud.com/' // 正式环境
const url = "https://nurse.newhit.cn/"; // 测试环境
// const url = 'http://125.120.44.170:8080/' // 本地环境
// const url = 'http://192.168.3.46:8089/' // 黄伟兴本地
// const url = 'http://172.16.113.80:8080/' // 黄则赟本地环境
// const url = "http://192.168.3.136:8089/"; // 杨崇本地环境

const uploadUrl = "https://newhit-uploadfile.oss-cn-hangzhou.aliyuncs.com/"; // 图片访问地址
const tokenUrl = `${url}work_order/ossApi/getStsToken`; // 图片上传Token获取地址
const webofThingsUrl = "http://47.99.138.77:7001/"; // 物联网服务地址
export default {
  domainAddress: url,
  uploadUrl: uploadUrl,
  tokenUrl: tokenUrl,
  webofThingsUrl: webofThingsUrl
};
