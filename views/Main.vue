<template>
    <div id="main">
        <!-- 头部 -->
        <div class="bkg" :style="{backgroundImage:'url('+data.avatar+')'}"></div>
        <div id="header">
            <div class="headerimg"><img :src='data.avatar' alt=""></div>
            <div class="headertxt">
                <div class="mername"><img src="../assets/imgs/brand@2x.png" alt=""><p>{{data.name}}</p></div>
                <p class="header-time">{{data.description}}/{{data.deliveryTime}}分钟到达</p>
                <div class="header-jian"><img src="../assets/imgs/decrease_1@2x.png" alt=""><p>{{data.supports[0].description}}</p></div>
            </div>
            <p class="header-b"><span>公告</span>{{data.bulletin}}</p>
        </div>
        <div class="router-link-div">
            <router-link to='/'>商品</router-link>
            <router-link to='/evaluate'>评价</router-link>
            <router-link to='/merchant'>商家</router-link>
        </div>
        <!-- 二级页面 -->
        <router-view></router-view>
        <!-- 购物车条 -->
        <div id="shopcar-bar">
            <div class="car" @click="canshow=!canshow">
                <div class="carnum" v-show="goodscarsum==0?false:true">{{goodscarsum}}</div>
                <img src="../assets/imgs/shopping_cart.svg" alt="">
            </div>
            <p><span :class="goodsoneAllmoney==0?false:'allmeony'">￥{{goodsoneAllmoney}}</span>另需配送费￥4元</p>
            <div class="shopping"><strong :class="goodsoneAllmoney<20?false:'xxx'" v-text="goodsoneAllmoney<20?car20:cargo"></strong></div> 
        </div>
        <!-- 购物车 -->
        <transition  name="slide-fade">
          <div id="shopcar" v-show="canshow">
              <p class="nullcar" v-show="datas==''?true:false">购物车里什么都没有哦~</p>
             <div class="carcontent" v-for="(v,i) in datas"  :key='i' >
              <div class="goodsimg"><img :src='v.image' ></div>
              <div class="gootstxt">
                  <p class="goots-tit">{{v.name}}</p>
                  <p class="pay" >
                      <span class="money01" >￥{{v.price}}</span>
                      <span class="money02">{{v.oldPrice}}</span>
                      <span class="add">
                        <Icon type="md-remove-circle" v-show="v.num> 0" @click="carchangedel(v.name,i)" />
                        <strong >{{v.num}}</strong>
                        <Icon type="md-add-circle"  v-show="v.num> 0" @click="carchangeadd(v.name,i)"/>   
                      </span>
                  </p>
              </div>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      //购物车显示判断的变量
      canshow: false,
      carnullshow: false,
      //页头数据，防止报错
      data: { supports: [{ description: "" }] },
      cargo:'立即付款',
      car20:'20元起送',
    };
  },
  created() {
    //商品顶部数据
    getSeller().then(res => {
      this.data = res.data.data;
    });
  },
  methods: {
    //减
    carchangedel(name, i) {
      this.$store.commit("carchangedel", { name, i });
      this.deladd(i);
    },
    // 加
    carchangeadd(name, i) {
      this.$store.commit("carchangeadd", { name, i });
      this.deladd(i);   
    },
    deladd(x){
      console.log( this.goodsonemoney[x])
    }
  },
  mounted() {
  },
  computed: {
    //获取vuex中的购物车数据
    datas() {
      //数组对象去重
      let map = new Map();
      for (const item of this.$store.getters.carGoodsNum) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      return [...map.values()];
    },
    //获取vuex中的购物车商品数量的数据
    /*  goodscarsum() {
      return this.$store.getters.Sum;
    }, */
    // 购物车商品数量
    goodscarsum() {
      var sum = 0;
      for (let j = 0; j < this.datas.length; j++) {
        sum += this.datas[j].num;
      }
      return sum;
    },
    //购物车商品单价
    goodsonemoney() {
      var list = [];
      for (let j = 0; j < this.datas.length; j++) {
        list.push(this.datas[j].num * this.datas[j].price);
      }
      return list;
    },
    //购物车商品总价
    goodsoneAllmoney() {
      var sum = 0;
      var list = [];
      for (let j = 0; j < this.datas.length; j++) {
        list.push(this.datas[j].num * this.datas[j].price);
      }
      for(let x=0;x<list.length;x++){
        sum+=list[x];
      }
      return sum;
    }
  }
};
</script>

<style lang="less">
.allmeony{
  color: red;
}
//头部样式
.bkg {
  position: absolute;
  height: 150px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(10px);
}
#header {
  height: 150px;
  width: 100%;
  padding: 30px 30px 0px 30px;
  display: flex;
  position: relative;
  .headerimg {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .headertxt {
    flex: 1;
    color: white;
    .mername {
      display: flex;
      line-height: 25px;
      img {
        width: 35px;
        height: 25px;
        margin-right: 6px;
      }
      p {
        flex: 1;
        font-size: 22px;
        font-weight: 600;
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .header-time {
      font-size: 18px;
      line-height: 36px;
    }
    .header-jian {
      display: flex;
      line-height: 16px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }
      p {
        flex: 1;
        font-size: 14px;
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .header-b {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-weight: 300;
    height: 25px;
    font-size: 14px;
    line-height: 25px;
    padding-left: 20px;
    padding-right: 20px;
    color: white;
    background: rgba(32, 31, 31, 0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      background: white;
      color: black;
      font-size: 14px;
      font-weight: 600;
      padding: 1px 3px 0 3px;
      margin-right: 4px;
      border-radius: 4px;
    }
  }
}
//路由分页
.router-link-div {
  display: flex;
  justify-content: space-around;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  a {
    color: #111;
    font-size: 18px;
  }
  .router-link-exact-active {
    color: red;
  }
}
//购物车条
#shopcar-bar {
  width: 100%;
  height: 60px;
  background: #131d27;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 9;
  .car {
    width: 60px;
    height: 60px;
    background: #2a353a;
    padding: 6px 10px 10px 8px;
    border: 8px solid #131d27;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    left: 15px;
    .carnum {
      width: 18px;
      height: 18px;
      text-align: center;
      font-weight: 600;
      border-radius: 50%;
      position: absolute;
      background: red;
      left: 30px;
      top: -12px;
      color: white;
    }
    img {
      width: 30px;
      height: 35px;
    }
  }
  p {
    flex: 1;
    padding-left: 80px;
    margin-top: 16px;
    span {
      margin-right: 8px;
      padding-right: 8px;
      border-right: 1px solid #888;
      font-size: 18px;
      font-weight: 600;
    }
  }
  .shopping {
    height: 100%;
    width: 100px;
    text-align: center;
    line-height: 60px;
    background: #2a353a;
    color: #888;
    font-weight: 600;
    font-size: 16px;
    .xxx{
      color: white;
      display: inline-block;
      width: 100%;
      height: 100%;
      background: rgb(248, 151, 5);
    }
  }
}
// 购物车
#shopcar {
  width: 100%;
  max-height: 320px;
  overflow:scroll;
  padding: 24px 24px 24px 34px;
  background: white;
  border-top: 14px solid rgba(238, 184, 59, 0.3);
  border-radius: 50px 50px 0 0;
  position: fixed;
  bottom: 60px;
  z-index: 6;
  .nullcar {
    font-size: 20px;
    text-align: center;
  }
  .carcontent {
    display: flex;
    height: 95px;
    padding-bottom: 15px;
    border-bottom: 1px solid #888;
    .goodsimg {
      width: 80px;
      height: 80px;
      margin-right: 5px;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .gootstxt {
      line-height: 40px;
      .goots-tit {
        color: #000;
        font-size: 20px;
        font-weight: 600;
      }
      .goods-num {
        min-width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pay {
        .money01 {
          font-size: 18px;
          font-weight: 600;
          color: red;
        }

        .money02 {
          padding-left: 6px;
          text-decoration: line-through;
        }
        .add {
          font-size: 24px;
          color: #00a1dc;
          position: absolute;
          right: 14px;
        }
      }
    }
  }
}
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(300px);
  opacity: 0;
}
</style>
