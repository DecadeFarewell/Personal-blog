
const article_list = new Vue({
    el: '#article-list',
    data: {
        articleList: []
    },
    created() {
        axios.get('/queryBlog?page=0&pageSize=100').then(resp => {
            console.log(resp)
            for(let i = 0;i<resp.data.data.length;i++){
                resp.data.data[i].link = '/blog_detail.html?blog_id='+ resp.data.data[i].id;
            }
            this.articleList = resp.data.data
        }).catch(resp => {
            console.log(resp)
        })
    }
})