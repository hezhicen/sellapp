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
        <!-- 购物车 -->
        <div id="shopcar-bar">
            <div class="car">
                <router-link to="/shopcar"><img src="../assets/imgs/shopping_cart.svg" alt=""></router-link>
            </div>
            <p><span>￥0</span>另需配送费￥4元</p>
            <div class="shopping">￥20起送</div> 
        </div>
        <!-- 购物车 -->
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      data: { supports: [{ description: "" }] }
    };
  },
  created() {
    getSeller().then(res => {
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less">
//头部样式
.bkg{
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
//购物车
#shopcar-bar {
  width: 100%;
  height: 60px;
  background: #131d27;
  position: fixed;
  bottom: 0;
  display: flex;
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
  }
}
</style>
