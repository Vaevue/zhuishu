<template>
    <div class ='readContainer' @click ='gi'>
        <div class="top ss" ref='top'>
            <span class ='fa fa-chevron-left' @click = 'back'></span>
            <span>{{title}}</span> 
        </div>
        <mt-swipe :auto = "0" :defaultIndex = index :continuous ='false' :showIndicators ='false' @change ='getindex'>
               <mt-swipe-item v-for ='(item,index) in te' :key ='index' ref ='item'>
                    <div class="text">
                        <h1 v-show ='index == 0'>{{title}}</h1>
                        <p v-for ='(text,index) in item' :key="index">{{text}}</p>
                    </div>
               </mt-swipe-item>
           </mt-swipe>
           <div class="zdc"  v-show = 'flag'>
              <div class="box">
                   <v-loading></v-loading>
              </div>
           </div>
           <div class="bottom ss" ref ='bottom'>
              <div class="bt-top" v-if ='book.zhangj !== undefined'>
                  <span class ='perv' @click.stop ='perv'>上一章</span>
                  <span class ='zhangj'>{{book.index+1}}/{{book.zhangj.length}}</span>
                  <span class ='next' @click.stop ='next'>下一章</span>
              </div>
              <div class="bt-bottom">
                  <ul>
                      <li>
                          <span class ='fa fa-align-justify'></span>
                          <p>目录</p>
                      </li>

                      <li @click.stop = 'shezhi'>
                          <span class ='fa fa-cog'></span>
                          <p>设置</p>
                      </li>

                      <li>
                          <span class ='fa fa-heart-o'></span>
                          <p>收藏</p>
                      </li>

                      <li @click.stop ='riye'>
                          <span class ='fa fa-sun-o'></span>
                          <p>日/夜</p>
                      </li>
                  </ul>
              </div>
           </div>
           <div class="shezhi" v-show ='shezhiflag'>
               <ul>
                   <li class ='sz_top'>
                       <span>切换字体颜色:</span> 
                       <i @click.stop ='setbg(item)' v-for ='item in bgColor' :key="item" :style='item'></i>
                   </li>

                   <li class ='sz_bottom'>
                        <span>切换字体样式:</span>
                        <span :class ="[index == 0 ? 'active' : '']" @click.stop ='setfn(item,index)' class ='sz_text' :style ='item.style' v-for= '(item,index) in font' :key ='index'>
                            {{item.text}}
                        </span>
                   </li>
               </ul>
           </div>
        </div>
   
</template>

<script>
import {mapGetters} from 'vuex'
import vLoading from '../common/login'
import bus from '../../assets/commonjs/bus'
import {Toast} from 'mint-ui' 
export default {
    components : {vLoading},
    data(){
        return {
            content : '',
            title : '',
            bgflag : false,
            te : [],
            page: 0,
            index : 0,
            title : '',
            flag :false,
            clickflag : false ,
            shezhiflag : false,
            bgColor : ['background: rgb(255, 242, 226);','background: rgb(247, 238, 229);','background: rgb(205, 239, 206);','background: rgb(40, 53, 72);','background: rgb(164, 164, 164);'],
            font : [{
                text : '静蕾字体',
                style : 'font-family: ygy;'
            },
            {
                text : '仿宋字体',
                style : 'font-family: fangsong;'
            },
            {
                text : '楷书字体',
                style : 'font-family: kaiti;'
            },
            {
                text : '微软雅黑',
                style : 'font-family : "微软雅黑"'
            },
            {
                text : '正版宋体',
                style : 'font-family:"宋体"'
            }]
        } 
    },
    computed : {
        ...mapGetters(['book'])
    },
    created(){
        this.gettext()
    },
    mounted(){
       this.$nextTick(()=>{
            this.getindex()
       })
    },
    methods : {
        riye(){
            this.bgflag = !this.bgflag
            console.log(111)
            if(this.bgflag){
                console.log('true')
                console.log(document.getElementsByClassName('readContainer')[0].style)
                Toast('1111')
                document.getElementsByClassName('readContainer')[0].style.background = 'rgb(133,133,133)' 
            }else {
                console.log('false')
                document.getElementsByClassName('readContainer')[0].style.background = '#fafafa'
            } 
        },
        setfn(item,index){
            console.log(index)
            let li = document.getElementsByClassName('sz_text')
            for(let i = 0;i<li.length;i++){
                li[i].classList.remove('active')
            }
            li[index].classList.add('active')
            document.body.style = item.style
        },
        setbg(item){
            document.getElementsByClassName('readContainer')[0].style =item
        },
        shezhi(){
            this.shezhiflag = !this.shezhiflag
        },
        perv(){
            if(this.book.index == 0) {
                return 
            } 
            this.book.index--
            this.gettext()
        },
        next(){
           this.book.index++ 
           this.gettext()
        },
        back(){
            this.$router.back()
        },
        gi(){
            this.clickflag = !this.clickflag
            this.shezhiflag = false 
            if(this.clickflag){
                this.$refs.top.style.transform = 'translateY(0)'
                this.$refs.top.style.transition = 'all .5s ease'
                this.$refs.bottom.style.transform = 'translateY(0)'
                this.$refs.bottom.style.transition = 'all .5s ease'
            }else {
                 this.$refs.top.style.transform = 'translateY(-100%)'
                this.$refs.bottom.style.transform = 'translateY(100%)'
            } 
        },
       gettext () {
            this.$ajax.get(`/content/chapter/${this.book.zhangj[this.book.index].link}`).then((res) => {
                this.title  = res.data.chapter.title
                let arr = res.data.chapter.cpContent.split('。')
                let result = []
                for(var i = 0;i<arr.length;i+=12){
                  result.push(arr.slice(i,i+12));
                }
                this.te = result
                this.flag = false
            }).catch((err)=>{
                console.log(new Error(err))
                setTimeout(()=>{
                    Toast('抱歉,暂时没有本章内容')
                    this.flag = false
                },5000)
            })
       },
        getindex (){
          if(this.$refs.item){
                     if(this.$refs.item[this.te.length-1].$el.classList.contains('is-active')){
               this.$refs.item[this.te.length-1].$el.addEventListener('touchend',()=>{
                this.flag = true
                this.book.index++
                this.gettext()
               })
               
           }
          }
        }
    } 
}
</script>

<style lang="less" scoped>
.active {
    color:orange;
    border-color: orange !important;
} 
.box {
    position:absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
} 
.zdc{
    position:fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99999999999999999;
}
.readContainer{
    .ss {
        position: fixed;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        color:#d5d5d5;
        padding : 0 20px;
        transition: all .5s ease;
        z-index: 999;
    } 
    .top  {
        top: 0;
        line-height: 100px;
        height: 100px;
        transform: translateY(-100%);
        span {
            font-size: 30px;
        } 
    }
    .bottom {
      bottom: 0;
      height: 180px;
      padding-left: 0;
      transform: translateY(100%);
      .bt-top {
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid #fff;
          text-align: center;
          span {
              padding : 0 30px;
          } 
      }
      .bt-bottom{
          ul {
              display: flex;
              height: 100px;
              align-items:center;
              justify-content: space-between;
              padding : 0 20px;
              li {
                  text-align: center;
              } 
          } 
      }  
    } 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background-color: #fafafa;
    z-index: 999999999;
    .text{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    height: 90%;
    margin-top: 70px;
    h1 {
        text-align:center;
        font-size: 30px;
    } 
        p {
            padding:10px 0;
            font-size: 24px;
            padding : 20px;
            text-indent: 1rem;
            width: 95%;
        } 
    }
}
.shezhi{
    position: fixed;
    bottom: 180px;
    left: 0;
    width: 100%;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.9);
    border-bottom: 1px solid #fff;
    color:#d5d5d5;
    ul{
        height: 100%;
        
    }
    li {
        margin-top: 3%;
        height: 30%;
        padding-left: 20px;
        i{
            height: 40px;
            width: 40px;
            display: inline-block;
            margin : 0 20px;
        }
    } 
    .sz_bottom{
        .sz_text{
            height:60px;
            width: 120px;
            border:1px solid #fff;
            text-align:center;
            line-height: 60px;
            display: inline-block;
            border-radius: 20px;
            margin : 5px;
        }
    }
} 
</style>

<style lang="less">

</style>
