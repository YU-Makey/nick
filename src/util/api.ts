import http from './requ'
// 登录
export const loginapi=(params:any)=>http.post('/auth/login',params)
// 列表
export const listapi=(params:any)=>http.get('/admin/interview/query',{params})
// 详情
export const xqapi=(params:any)=>http.get('/admin/interview/show',{params})
// 创建
export const addapi=(params:any)=>http.post('/admin/interview/create',params)
// 编辑
export const bianpai=(params:any)=>http.put('/admin/interview/update',params)
// 删除
export const delapi=(data:any)=>http.delete('/admin/interview/remove',{data})