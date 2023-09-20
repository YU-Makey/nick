import axios from 'axios'
import { ElLoading } from 'element-plus'
const config={
    baseURL:`http://interview-api-t.itheima.net/`
}

class request{
    instance:any
    lading:any
    constructor(config:any){
        this.instance=axios.create(config)
        this.instance.interceptors.request.use( (config:any)=> {
            // 在发送请求之前做些什么
            let token=localStorage.getItem('token')
            console.log('Bearer '+token);
            if(token){
                config.headers.Authorization='Bearer ' + token
            }
            this.lading=ElLoading.service({
                text:'加载中'
            })
            return config;
          }, function (error:any) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
        this.instance.interceptors.response.use( (response:any)=> {
            // 对响应数据做点什么
            this.lading.close()
            return response;
          }, function (error:any) {
            // 对响应错误做点什么
            return Promise.reject(error);
          });
    }
    get(url:string,params:any){
        return this.instance.get(url,params)
    }
    post(url:string,params:any){
        return this.instance.post(url,params)
    }
    put(url:string,params:any){
        return this.instance.put(url,params)
    }
    delete(url:string,data:any){
        return this.instance.delete(url,data)
    }
    
}

export default new request(config)