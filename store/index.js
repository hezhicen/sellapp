import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建数据仓库
// store:仓库对象实例 暴露出去
export default new Vuex.Store({
    // 存放所有交互数据
    state: {
        list: [],
        // carlist:[],
    },
    //改变，是改变state的唯一方式
    mutations: {
        //只有mutations里的函数才可以改变state里的值
        //必要有state形参
        goodsdata(state, data) {
            state.list = data;
        },
        //页面商品数量增加
        numChangeAdd(state, x) {
            state.list[x.i].foods[x.y].num += 1;
        },
        //页面商品数量减少
        numChangeDec(state, x) {
            state.list[x.i].foods[x.y].num -= 1;
        },
        //购物车商品数量减
        carchangedel(state, x) {
            for (let i of state.list) {
                for (let j of i.foods) {
                    if (j.name == x.name) {
                        j.num--;
                    }
                }
            }
        },
        // 购物车商品数量加
        carchangeadd(state, x) {
            for (let i of state.list) {
                for (let j of i.foods) {
                    if (j.name == x.name) {
                        j.num++;
                    }
                }
            }
        }
    },
    //vuex版的计算属性，和computed原理一样，会缓存数据
    getters: {
        //必要有state形参
        //返回选择的商品
        carGoodsNum(state) {
            var nums = [];
            for (let i = 0; i < state.list.length; i++) {
                for (let j = 0; j < state.list[i].foods.length; j++) {
                    nums.push(state.list[i].foods[j]);
                }
            }
            return [...new Set(nums.filter(obj => obj.num > 0))];
            
        },
        //返回选择的商品的数量
        /* Sum(state) {
            var sum = 0;
            var nums = [];
            for (let i = 0; i < state.list.length; i++) {
                for (let j = 0; j < state.list[i].foods.length; j++) {
                    nums.push(state.list[i].foods[j].num);
                }
            }
            var a = nums.filter(obj => obj > 0);
            for (let i = 0; i < a.length; i++) {
                sum += a[i]
            }
            return sum;
        } */
    }
});
//参数1：需要触发的mutation的名字，参数2：传入的参数
// store.commit('changename',555);
// console.log(store.state.name);
