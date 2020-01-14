<template>
    <div class ='indexContainer'>
          <div class="input">
            <span class ='search fa fa-search'></span>
            <input type="text" :placeholder="text">
            <span class ='fenlei' @click ='gofenlei'>
                <i class ='fa fa-bars'></i>
                分类
            </span>
        </div>
        <img src="../../assets/images/Slice_3.png" alt="">
        <ul>
            <li @click="gofenlei">
                <img src="../../assets/images/fenlei.jpg" alt="">
                <p>分类</p>
            </li>

             <li @click ='gopaihang'>
                <img src="../../assets/images/paihang.jpg" alt="">
                <p>排行</p>
            </li>

             <li>
                <img src="../../assets/images/vip.jpg" alt="">
                <p>VIP</p>
            </li>

             <li>
                <img src="../../assets/images/dshw.jpg" alt="">
                <p>大神红文</p>
            </li>

             <li>
                <img src="../../assets/images/sd.jpg" alt="">
                <p>书单</p>
            </li>
        </ul>
        <!-- 一周热门推荐 -->
        <v-rmtj></v-rmtj>
    </div>
</template>

<script>
import vTop from './top'
import vRmtj from './rmtj'
export default {
    components : {vTop,vRmtj},
    data(){
        return {
            tiem : 0,
            text : '斗破苍穹',
            data : []
        } 
    },
    created(){
      var timer =  setInterval(()=>{
           this.tiem++
           if(this.tiem == this.data.length){
               this.text ='更多内容，敬请期待'
           }
           this.getkeyword()
       },3000)
       if(this.tiem == this.data.length){
           clearInterval(timer)
       }
    },
    methods:{
        gofenlei(){
            this.$router.push('/fenlei')
        },
        gopaihang(){
            this.$router.push('/paihang')
        },
        getkeyword (){
            if(this.data.length == 0){
        this.$ajax.get('/api/book/search-hotwords').then((res) => {
           this.data =  res.data.searchHotWords
        } )
            }else {
            let arr =  this.data
            this.text = arr[this.tiem].word
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .input {
        position:relative;
        height: 50px;
        line-height: 50px;
        margin-top: 80px;
        span {
            color:#ef4543;
            font-size: 20px;
        } 
        .fenlei{
            margin-left: 20px;
        }
        input {
            padding-left: 40px;
            width: 70%;
            margin-left : 5%;
            height: 50px;
            border:none;
            background:#f5f5fa;
            color:#8b8b90;
            border-radius: 5px;
        } 
        .search {
            position:absolute;
            left: 50px;
            top: 15px;
        } 
    } 
.indexContainer {
    font-size: 20px;
    background-color: #fff;
    img {
        width: 95%;
        margin: 20px auto;
    } 
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            width: 20%;
            text-align: center;
            color:#acacac;
            img {
                width: 40px;
                height: 40px;
            } 
        } 
    } 
} 
</style>