import axios from "axios";

const token = localStorage.getItem("jwt_token");

axios.defaults.baseURL = "http://localhost:3000/api";
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = token ? "Bearer " + localStorage.getItem("jwt_token") : ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {

    if (typeof res.data !== 'object') {
        return Promise.reject(res);
    }
    // if (res.data.resultCode != 200) {
    //     if (res.data.message) ElMessage.error(res.data.message)
    //     if (res.data.resultCode == 419) {
    //         router.push({ path: '/login' })
    //     }
    //     return Promise.reject(res.data)
    // }

    return res.data;
})

export default axios