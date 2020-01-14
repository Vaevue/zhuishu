<template>
    <div class ='phbContainer'>
        <p class="tltle">
            {{title}}
        </p>
        <div class="list">
            <ul>
                <li v-for ='(item,index) in arr' :key ='item._id' @click ='phbinfo(item,index)'>
                    <img :src="src(item)">
                    <p class ='text'>{{item.title || item.name}}</p>
                </li>
            </ul>
        </div>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
<!-- 'http://statics.zhuishushenqi.com' + item.cover -->
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props:['title','arr'],
    data(){
        return {
            page : 0,
            gender : ''
        } 
    },
    methods :{
        src(item){
            console.log()
            if(item.bookCover){
                return 'http://statics.zhuishushenqi.com' + item.bookCover[0]
            }
            if(item.cover == '/ranking-cover/142319217152210'){
                return 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827'
            }else if (item.cover == '/ranking-cover/14795217326220' || item.cover == '/ranking-cover/147946444450686'){
                 return 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827'
            }
            else {
                return 'http://statics.zhuishushenqi.com' + item.cover
            } 
        },
        phbinfo(item,index) {
            if(item.bookCover){
                console.log(item)
                switch(this.title) {
                    case '男生' :
                        this.gender =  'male'
                        break;
                    case '女生' :
                        this.gender =  'female'
                        break;
                    case '热门' :
                        this.gender =  'picture'
                        break;
                    case '其他' :
                        this.gender =  'press'
                        break;
                } 
                console.log(this.title)
                console.log('进来了')
                console.log(item)
                this.$ajax.get('/api/book/by-categories',{
                    params : {
                        gender :this.gender,
                        type : 'hot',
                        major : item.name,
                        start : this.page,
                        limit : 20
                    }
                }).then((res) => {
                    console.log(res.data.books)
                    let data = res.data.books
                    let length  = res.data.books.length
                     this.setid(data)
                                   this.$router.push({
                path : `/paihang/${data[index]._id}`,
                query : {
                    length : length
                }
                
            })
             
                } )
                return 
            }
            var length
            this.$ajax.get(`/api/ranking/${item._id}`).then((res) => {
              let  data =   res.data.ranking.books
              length = data.length
              console.log(length)
              this.setid(data)
               this.$router.push({
                path : `/paihang/${item._id}`,
                query : {
                    length : length
                }
                
            })
             
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            } )
          
        } ,
        ...mapMutations({
            setid : 'SET_ID'
        })
    }
}
</script>

<style lang="less" scoped>
.phbContainer{
    margin-top: 20px;
    background: #fff;
   
    .tltle {
        font-size: 25px;
        font-weight: 600;
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    } 
    .list {
        padding-bottom: 40px;
        margin-bottom: 40px;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            width:20%;
            text-align: center;
            img {
                width: 60px;
                height: 60px;
                margin: 0 auto;
                padding: 10px 0;
            } 
        } 
    } 
}
</style>