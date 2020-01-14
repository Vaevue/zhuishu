<template>
    <div class="footerContainer">
        <ul>
            <router-link tag ='li' to='/book'>
                <i class ='fa fa-book'></i>
                <p>书架</p>
            </router-link>

            <router-link tag ='li' to='/index'>
                <i class ='fa fa-shopping-bag'></i>
                <p>书城</p>
            </router-link>

            <router-link tag ='li' to='/paihang'>
               <i class ='fa fa-signal'></i> 
               <p>排行</p>
            </router-link>

             <router-link tag ='li' to='/fenlei'>
               <i class ='fa fa-bars'></i> 
               <p>分类</p>
            </router-link>

             <router-link tag ='li' to='/search'>
               <i class ='fa fa-search'></i> 
               <p>搜索</p>
            </router-link>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.footerContainer{
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    ul {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        height: 70px;
        align-items: center;
        color:#a4a4a4;
        li {
            text-align: center;
            font-size: 23px;
        } 
    } 
}
</style>

<style lang="less">
.router-link-exact-active, .router-link-active{
    color:#ef4543;
}
</style>