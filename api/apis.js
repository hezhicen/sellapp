//所有请求封装接口文件
import axios from 'axios'
//创建一个请求对象
let req = axios.create({
    //基本路径
    baseURL: 'http://192.168.1.10:3000',
    //请求10s，如果超过10s还没返回数据，则提示超时//超时限制
    timeout: 10000,
});

//请求商家信息
export function getSeller() {
    return req.get('/api/seller')
}
//请求评论信息
export function getRatings() {
    return req.get('/api/ratings')
}
//请求商品信息
export function getGoods(seller) {
    return req.get('/api/goods',seller)
}