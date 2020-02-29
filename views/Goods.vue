<template>
    <div id="goods">
         <div class="goods-left">
            <p v-for="(v,i) in data" :key="i" @click="setactivewhite(i)" :class="{menu:true,actvieWhite:i==indexone?true:false}">
              <img style="width:12px" v-show='v.type==1' src="../assets/imgs/decrease_3@2x.png" >
              <img style="width:12px" v-show='v.type==2' src="../assets/imgs/discount_1@2x.png">
              {{v.name}}
            </p>
        </div> 


        <div class="goods-right">
          <!-- 只要使用better-scroll效果，必须在使用的节点下放入一个class名为content的ul -->
          <ul class="content">
            <div  v-for="(v,i) in data" :key="i" :id='i'>
                <!-- 标题 -->
               <p class="tit" > {{v.name}}</p>
               <!-- 单个商品 -->
                <div v-for="(x,y) in data[i].foods" :key='y' class="goods-r">
                    <div class="goodsimg"><img :src='x.image' alt=""></div>
                    <div class="gootstxt">
                        <p class="goots-tit">{{x.name}}</p>
                        <p class="goods-num">月售{{x.sellCount}}份  好评率{{x.rating}}%</p>
                        <p class="pay">
                            <span class="money01">￥{{x.price}}</span>
                            <span class="money02">{{x.oldPrice}}</span>
                            <span class="add"><Icon type="md-add-circle" /></span>
                        </p>
                    </div>
                </div>
            </div>
          </ul>
        </div>
    </div>
</template>

<script>
//引入商品接口
import { getGoods } from "../api/apis.js";
//引入better-scroll
import BScroll from "better-scroll";

export default {
  data() {
    return {
      data: [],
      indexone:0,
      gr:''
    };
  },
  created() {
    getGoods(1).then(res => {
      this.data = res.data.data;
    });
  },
  mounted() {
    //实例化滚动版,挂载到当前组件上
    this.gr= new BScroll(document.querySelector(".goods-right"),{
      //允许点击
      click:true,
    });
    
  },
  methods:{
    setactivewhite(i){
      this.indexone=i;
      this.gr.scrollToElement(document.getElementById(i),300)
    }
  }
};
</script>

<style lang="less" scoped>
#goods {
  display: flex;
  //左
  .goods-left {
    width: 80px;
    .menu {
      line-height: 24px;
      width: 100%;
      padding: 8px 3px 8px 8px;
      background: #f3f6f6;
    }
    .actvieWhite{
      background: white;
    }
  }
  //右
  .goods-right {
    flex: 1;
    height: 530px;
    overflow: hidden;
    // padding-left: 80px;
    position: relative;
    .tit {
      background: #f3f6f6;
    }
    .goods-r {
      flex: 1;
      margin: 7px;
      padding: 7px;
      display: flex;
      border-bottom: 1px solid #ccc;
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
        .goots-tit {
          color: #000;
          font-size: 18px;
          font-weight: 600;
        }
        .goods-num {
          min-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pay {
          .money01 {
            font-size: 20px;
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
}
</style>