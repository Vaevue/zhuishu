<template> 
    <div class ='bookinfoContainer'>
        <div class="top">
            <div class="left" @click ='back' >
                <i class ='fa fa-chevron-left'></i>
            </div>
            <div class="right">
                <i class ='fa fa-share-alt'></i>
            </div>
        </div>
        <div class="bg" :style ='bg()'>

        </div>
        <div class="center">
            <div class="img">
                <img v-if ='shuju.cover!==undefined' :src='"http://statics.zhuishushenqi.com" + shuju.cover' alt="">
            </div>
            <div class="text">
                <p class="title">{{shuju.title}}</p>
                <p class="user">作者 : {{shuju.author}}</p>
                <p class="zi">字数 : {{wan(shuju.wordCount)}}</p>
                <p class='sc'>收藏人数 : {{wan(shuju.latelyFollower)}}</p>
                <p class="zuih">最后更新 : {{myTime(shuju.updated)}}</p>
            </div>
        </div>
        <div class="pf">
            <ul>
                <li>
                    <p class="t" v-if ='shuju.rating !== undefined'>{{shuju.rating.score }}</p>
                    <p class="b" v-if ='shuju.rating !== undefined'>{{shuju.rating.tip }}></p>
                </li>

                <li>
                    <p class="t">{{shuju.retentionRatio}}%</p>
                    <p class="b">读者留存</p>
                </li>

                 <li>
                    <p class="t">{{wan(shuju.latelyFollower)}}</p>
                    <p class="b">7日人气</p>
                </li>

                 <li>
                    <p class="t">{{wan(shuju.totalFollower)}}</p>
                    <p class="b">累计人气</p>
                </li>
            </ul>
        </div>
        <div class="js">
            <p>
                {{shuju.copyrightInfo}}
            </p>
        </div>

        <div class="jianjie">
            <div class="title">简介</div>
            <ul>
                <li v-for ='item in shuju.tags' :key ='item'>{{item}}</li>
            </ul>
            <div class="txt">
                <p class ='s'>
                    {{shuju.longIntro}}
                </p>
                <i v-show ='flag' class="bottom fa fa-angle-up" @click ='gg'></i>
                <i v-show ='!flag' class="bottom fa fa-angle-down" @click ='gg'></i>
            </div>
            <p class="zuih">最后更新 : {{shuju.lastChapter}}</p>
            <div class="tuijian">
                 <p class="title">相关推荐</p>
                <ul>
                   
                    <li v-for ='item in tuijian' :key ='item._id'>
                        <img v-if ='shuju.cover!==undefined' :src='"http://statics.zhuishushenqi.com" + item.cover'>
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>
            <div class="bt">
                <span class ='play' @click ='goplay'>开始阅读</span>
                <span class ='push' @click ='pushlike'>{{msg}}</span>
            </div>
        </div>
          <div class="topss"  @click ='hide' v-if ='trr'>
                    <span class ='fa fa-angle-down'></span>
                </div>
        <transition name ='test-fade'>
          
         <div class="zj" v-if ='trr'>
                
                <div class="wrapper">
                <ul>
                    <li class ='book' v-for ='(item,index) in zhangj' :key ='item.title' @click ='goread(index)'>
                        {{item.title}}
                    </li>
                        
                </ul>
                <v-loading v-if ='zhangj.length == 0'></v-loading>
                </div>
        </div>
        </transition>
    </div>
</template>
<script>
import BScroll from "better-scroll"
import {mapGetters,mapMutations} from 'vuex'
import vLoading from '../common/login'
import bus from '../../assets/commonjs/bus'
import {Toast} from 'mint-ui' 
export default {
    components:{vLoading},
    data(){
        return {
            flag : false ,
            shuju : [],
            tuijian :[],
            trr : false ,
            zhangj: [],
            page : 0,
            like : [],
            msg : '加入收藏'
        }
    },
    computed : {
        ...mapGetters(['datas','ids'])
    } ,
    created(){
        if(!this.datas._id){
            this.$router.back()
        }
         this.getlist()   
  },
    methods : {
         get(){
              let like = JSON.parse(localStorage.getItem('like')) || []
        like.forEach(item=>{
                    if(item._id === this.shuju._id){
                        this.msg = '已收藏'
                    }
                })
    },
        pushlike(){
             let like = JSON.parse(localStorage.getItem('like')) || []
            let flag = true
            if(like.length<100){
                like.forEach(item=>{
                    if(item._id === this.shuju._id){
                         
                        this.msg = '已收藏'
                        flag = false 
                    }
                })
            }else {
                flag = false 
            } 
            if(flag) {
                Toast('收藏成功!!')
                like.push(this.shuju)
                this.msg = '已收藏'
            } else {
                 like.forEach((item,index)=>{
                    if(item._id === this.shuju._id && this.msg == '已收藏'){
                       like.splice(index,1)
                       Toast('取消成功!!')
                       this.msg = '加入收藏'
                    }
                })
            } 
            localStorage.setItem('like',JSON.stringify(like))
            
        },
        wan(item){
            if(item < 10000){
                return item
            } else {
                return Math.floor((item / 10000)) + '万' 
            }
        },
        addZero(num) {
    return num < 10 ? '0' + num : num;
},
bg(){
    if(this.shuju.cover !== undefined){
    return `background:url('http://statics.zhuishushenqi.com${this.shuju.cover}') no-repeat`
    }
},
myTime(date){
  if(date) {
     var arr=date.split('T');
   var d=arr[0];
   var darr = d.split('-');

   var t=arr[1];

  var dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2]);
 return dd;
} 
},
goread(index){
    let div = document.getElementsByClassName('book')
    let d = {
        zhangj : this.zhangj,
        index : index
    }
    // let id = div[this.page].getAttribute('data-id')
     this.setbook(d)
     this.$router.push('/read')
},
        gg(e){
            let s = document.getElementsByClassName('s')
           if( s[0].classList.contains('height') == false ){
               s[0].style.height = 'auto'
               s[0].classList.add('height')
           }else {
               s[0].style.height = '30px'
               s[0].classList.remove('height')
           }
           this.flag = !this.flag
        },
      back(){
          this.$router.back()
      },
      hide(){
          this.trr = false
      },
      getlist(){
          this.$ajax.get(`/api/book/${this.datas._id}`).then((res) => {
              this.shuju = res.data
             this.gettuijian()
             this.get()
          } )
      },
      goplay(){
          this.$ajax.get('/api/atoc',{
              params:{
                  view : 'summary',
                  book : this.datas._id
              }
          }).then((res) =>{
              var id = res.data[0]._id
              this.$ajax.get(`/api/atoc/${id}?view=chapters`).then((re) => {
                  this.zhangj = re.data.chapters
              } )

          })
          this.trr = !this.trr
      },
      gettuijian(){
          this.$ajax.get(`/api/book/${this.shuju._id}/recommend`).then((res) => {
              let arr =res.data.books
              for(let i =0;i<3;i++){
                  this.tuijian.push(arr[i])
              }
          } )
      },
      ...mapMutations({
          setbook : 'SET_BOOK'
      })
    } 
}
</script>
<style lang="less" scoped>
.topss{
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
}
.zj {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;

    ul {
        overflow-y: auto;
        li {
            height: 70px;
            line-height: 70px;
            padding-left: 30px;
            font-size: 20px;
            border-bottom: 1px solid #eee;
        }
    } 
} 
    .heihgt{
        height: auto;
    }
    .bookinfoContainer {
       position:fixed;
       background-color: #fff;
       z-index: 9999991;
       overflow: auto;
       height: 100%;
       width: 100%;
       .top {
           display: flex;
           justify-content: space-between;
           color:#dadbdb;
           font-size: 30px;
           padding : 20px;
       } 
       .bg{
           height: 300px;
           width: 100%;
           background-size: 100%;
           filter: blur(10px);
           position:absolute;
           top: 0;
           z-index: -1;
       }
       .center{
           position:relative;
           top: 70px;
           height: 300px;
           background-color: #eee;
           .img {
               position: absolute;
               top: -70px;
               left: 50px;
               img {
                   height: 320px;
               } 
           } 
           .text{
               margin-left: 330px;
               p {
                   height: 50px;
                   line-height: 55px;
                   color:#656b71;
               } 
               .title {
                   font-size: 30px;
                   font-weight: 600;
                   color:#000;
               } 
           }
       }
       .pf  {
           margin-top: 80px;
           color: #8b8b90;
           ul {
               display: flex;
               justify-content: space-between;
               padding : 0 50px;
                height: 70px;
                align-items: center;
               li {
                   text-align: center;
                   .t {
                       font-size: 25px;
                   } 
                   .b {
                       font-size: 15px;
                   } 
               }
           } 
       } 
       .js {
           width:90%;
           margin: 20px auto;
           border:1px solid #eee;
           padding: 30px;
           box-sizing: border-box;
           p{
               color:#845350;
           }
       }
       .jianjie{
           padding : 0 35px;
           color:#616166;
           .title {
               height: 40px;
               font-size: 30px;
           } 
           ul {
               display: flex;
               margin-top: 30px;
               flex-wrap: wrap;
               li {
                   min-width: 30px;
                   padding : 10px 10px;
                   margin : 0 10px;
                   background-color: #f0f0f4;
                   border-radius: 20px;
                   color:#b8b9be;
                   margin-top: 20px;
               } 
           }
           .txt{
               position:relative;
               margin-top: 30px;
              p {
                height: 60px;
               overflow: hidden;
              }
              .bottom {
                  position:absolute;
                  right: 10px;
                  font-size: 40px;
                  font-weight: 600;
                  color:#b8b9be;
              } 
             
           } 
            .zuih {
                  margin-top: 50px;
                  font-size: 25px;
              } 
              .bt {
                  position: fixed;
                  width: 100%;
                  bottom: 0;
                  left: 0;
                  height: 70px;
                  display: flex;
                  font-size: 23px;
                  span {
                      width: 50%;
                      text-align:center;
                      line-height: 70px;
                  } 
                  .play {
                      background-color: #409EFF;
                      color:#efefef;
                  } 
                  .push {
                      border:1px solid #eee;
                      background-color: #fff;
                  } 
              } 
       }
       .tuijian {
           margin-top: 30px;
           
         .title {  font-weight: 600;} 
          
           ul {
               display: flex;
               li {
                   background-color: #fff;
                   text-align: center;
                    width: 25%;
                   img {
                       height: 200px;
                       width: 150px;
                   }
                   p {
                       margin-top: 20px;
                   } 
               } 
           } 
       } 
    } 
</style>


<style lang="less">
.mint-toast{
    z-index: 99999999999999999;
}
    .test-fade-enter {
        transform: translateY(100%);
        opacity: 1;
    } 
    .test-fade-leave-to {
        transform: translateY(100%);
    } 
    .test-fade-enter-active,
    .test-fade-leave-active {
        transition: all .5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    } 
</style>
