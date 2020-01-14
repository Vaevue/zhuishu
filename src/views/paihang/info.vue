<template>
    <div class ='infoContainer' :style ='styles'>
        <div class="back" @click ='back' v-if ='flag'>
            <i class ='fa fa-chevron-left'></i>
        </div>
        <div class="box" ref ='personWrap'>
            <ul ref ='personTab'>
            <li @click ='gos(item)' v-for ='item in id' :key ='item._id' class ='doculi' >
                <div class="left">
                    
                    <img v-lazy="'http://statics.zhuishushenqi.com' + item.cover">
                </div>
                <div class="right">
                    <p class="title">{{item.title}}</p>
                    <p class="shouc">{{item.latelyFollower}}人收藏</p>
                    <p class="fenlei">
                        <span>{{item.majorCate}}</span>
                        <span>{{item.minorCate}}</span>
                    </p>
                    <p class ='text'>{{item.shortIntro}}</p>
                </div>
            </li>  
        </ul>
        </div>
    </div>
</template>

<script>

import BScroll from "better-scroll";
import {mapMutations,mapGetters} from 'vuex'
export default {
  name: "ReserveInfo",
  props : {
      flag : {
          type : Boolean,
          default : true
      },
      styles : {
          type : String,
          default : 'position:fixed;top:50px;left:0;right:0;bottom:0;'
      }
  },
  data() {
    return {
        data : []
    };
  },
  created() { 
      if(this.id.length == 0){
          this.$router.push('/')
      }
    this.$nextTick(() => {
      this.personScroll()
    })
  },
  computed:{
      ...mapGetters(['id'])
  },
  methods: {
      gos(item){
          let id = this.$route.params.id 
         this.setdata(item)
         this.setids(id)
         this.$router.push('/bookinfo')
      },
      back(){
          document.body.style.overflow = 'auto'
          document.body.style.position = 'static'
          this.$router.back()
      },
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为170px
      var length = 0 
      if(this.id.length == 0){
          length = this.$route.query.length
      }else {
          length = this.id.length
      }
      let height = length * 150;
      this.$refs.personTab.style.height = height + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startY: 0,
            click: true,
            scrollY: true,

            scrollX: false,
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    ...mapMutations ({
        setdata : 'SET_DATA',
        setids : 'SET_IDS'
    }) 
  }
}

</script>
<style lang="less" scoped>
.my {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
border:none;
} 
.back{
    position: fixed;
    right: 20px;
    top: 100px;
    z-index: 555;
    background: #ef4543;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    i{
        line-height: 40px;
        font-size: 20px;
    }
}
    .box {
        height: 100%;
        width: 100%;
        overflow: hidden;
    } 
    .infoContainer {
        position: fixed;
        z-index: 10;
        background-color: #fff;
        ul {
            li {
                display: flex;
                margin: 20px 0;
                border-bottom: 1px solid #eee;
                padding-bottom: 30px;
                .left {
                    img {
                        width: 190px;
                        height: 240px;
                        margin: 0 30px;
                    }
                }
                .right {
                    position: relative;
                    width:100%;
                    p{
                        line-height: 50px;
                    }
                    .title {
                        font-size: 30px;
                    } 
                    .shouc {
                        color:#9f9fa4;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    } 
                    .fenlei {
                      color: #9f9fa4;
                      span {
                          display: inline-block;
                          padding : 0 20px;
                          background-color: #f0f0f4;
                          color:#9f9fa4;
                          border-radius: 30px;
                      } 
                    }
                    .text {
                       color: #9f9fa4;
                        position: absolute;
                        bottom: 10px;
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-right: 20px;
                    }
                }  
            }
        } 
    } 
</style>