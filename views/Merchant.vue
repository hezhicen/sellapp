<template>
    <div id="merchant">
        <!-- 评价 -->
    <div class="header">
      <div class="grade-left">
        <h2>{{data.name}}</h2>
        <p>
          <Rate allow-half v-model="data.foodScore" />
          <span>月销609单</span>
        </p>
      </div>
      <div class="grade-right">
        <Icon type="md-heart-outline" />
        <p>收藏</p>
      </div>
    </div>
    <!--配送信息 -->
    <div class="delivery">
      <Row>
        <i-Col :xs="8">
          <p>起送价</p>
          <p>
            <span>{{data.minPrice}}</span>分
          </p>
        </i-Col>
        <i-Col :xs="8" class="center-div">
          <p>商家配送</p>
          <p>
            <span>{{data.deliveryPrice}}</span>元
          </p>
        </i-Col>
        <i-Col :xs="8">
          <p>平均配送时间</p>
          <p>
            <span>{{data.deliveryTime}}</span>分
          </p>
        </i-Col>
      </Row>
      <div></div>

      <div></div>
    </div>
    <!-- 分隔条 -->
    <div class="bg-line"></div>
    <div class="activity">
      <h2>公告与活动</h2>
      <p class="content">{{data.bulletin}}</p>

      <!-- 具体活动 -->
      <div class="activities" v-for="val in data.supports" :key="val.id">
        <img style="width:12px" v-show="val.type==-1" src alt />
        <img style="width:12px" v-show="val.type==1" src="../assets/imgs/decrease_1@2x.png" alt />
        <img style="width:12px" v-show="val.type==0" src="../assets/imgs/decrease_3@2x.png" alt />
        <img style="width:12px" v-show="val.type==2" src="../assets/imgs/discount_1@2x.png" alt />
        <span>{{val.description}}</span>
      </div>
      <!-- 分隔条 -->
    </div>
    <div class="bg-line"></div>
    <!-- 商家实景 -->
    <div class="Merchant-img">
      <h2>商家实景</h2>
      <div class="images">
        <img :src="item" alt v-for="(item) in data.pics" :key="item.id" />
      </div>
    </div>
    <div class="bg-line"></div>
    <!-- 商家信息 -->
    <div class="information">
      <h2>商家信息</h2>
      <p v-for="(info) in data.infos" :key="info.id">{{info}}</p>
    </div>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
        data:''
    };
  },
  created() {
    getSeller().then(d => {
      this.data=d.data.data
      console.log(this.data);
    });
  },
};
</script>

<style lang="less" scoped>
#merchant {
  // 头部
  .header {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid #ececec;
    .grade-right {
      text-align: center;
      .ivu-icon {
        font-size: 36px;
        // color: red;
      }
    }
  }
  // 配送信息
  .delivery {
    padding: 20px 0px;
    p {
      span {
        font-size: 24px;
      }
    }
    .ivu-col-span-xs-8 {
      height: 50px;
      // background: pink;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .center-div {
      border-left: 1px solid #000;
      border-right: 1px solid #000;
    }
  }
  // 分隔条
  .bg-line {
    width: 100%;
    height: 20px;
    background: rgba(204, 204, 204, 0.5);
  }
  // 活动
  .activity {
    padding: 20px;
    .content {
      color: red;
      font-size: 14px;
      padding: 10px 10px 20px 10px;
    }
    .activities {
      border-top: 1px solid #eaeaea;
      padding: 20px 0;
      img {
        width: 20px !important;
      }
      span {
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
  // 商家实景
  .Merchant-img {
    padding: 20px;
    h2 {
      font-weight: normal;
    }
    .images {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 15px;
      img {
        width: 160px;
        height: 100px;
        margin-bottom: 10px;
      }
    }
  }
  .information {
    // margin-bottom: 60px;
    padding: 20px;
    h2 {
      margin-bottom: 14px;
    }
    p {
      font-size: 14px;
      padding: 18px 10px;
      border-top: 1px solid #eaeaea;
    }
  }
}
</style>