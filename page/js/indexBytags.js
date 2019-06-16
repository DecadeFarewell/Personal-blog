//每日一句部分
const every_day = new Vue({
    el: '#every_day',
    data: {
        content: {
            en: 'Find a group of people who challenge and inspire you, spend a lot of time with them, and it will change your life.',
            ch: '寻找会挑战并鼓舞你的人，多花时间跟他们待在一起，这将改变你的人生。',
            author: 'Amy Poehlerv'
        }
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created() {
        axios.get('/queryEveryDay').then((resp) => {
            const dataArr = resp.data.data[0].content.split('||');
            this.content.en = dataArr[0];
            this.content.ch = dataArr[1];
            this.content.author = dataArr[2];
        })
            .catch((error) => {
                console.log(error)
            })
    }
})
//文章列表
const article_list = new Vue({
    el: '#article_list',
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [],
        searchWord: '',
        searchKey: '',
    },
    computed: {
        jumpTo() {
            return function (item) {
                if (item.text == '上一页' && this.page == 1) {
                    alert('已经到第一页了~~~')
                    return
                }
                if (item.text == '下一页' && Math.ceil(this.count / this.pageSize) == this.page) {
                    alert('没有更多了~~~')
                    return
                }
                this.getPage(item.page, this.pageSize, this.searchWord)
            }
            //     this.getPage(page, this.pageSize,this.searchWord)
            // }
        },
        getArticleList() {
            return this.articleList
        },
        getPage() {
            return function (page, pageSize, tag) {
                let url = '';
                if (this.searchKey == 'tag') {
                    url = '/queryBlogByTag'
                } else if (this.searchKey == 'searchWord') {
                    url = '/queryBlogBySearchWord'
                }
                axios.get(url, {
                    params: {
                        page: page - 1,
                        pageSize,
                        tag,
                    }
                }).then((resp) => {
                    console.log(resp)
                    const list = [];
                    resp.data.data.forEach((item, index) => {
                        const temp = {};
                        let { title, content, ctime, views, tags, id } = item;
                        temp.title = title;
                        temp.content = content;
                        temp.date = (new Date(ctime * 1000)).toLocaleDateString();
                        temp.views = views;
                        temp.tag = tags;
                        temp.link = '/blog_detail.html?blog_id=' + id;
                        temp.id = id;
                        list.push(temp)
                    })
                    this.articleList = list;
                    this.page = page;
                }).catch((resp) => {
                    // console.log(resp.data.data[0])
                })
                axios.get('/queryBlogCountByTags?tag=' + this.searchWord).then((resp) => {
                    console.log('文章总数量')
                    console.log(resp.data.data)
                    this.count = resp.data.data[0].count
                    this.generatePageTool;
                })
            }
        },
        generatePageTool() {
            const nowPage = this.page; //1
            const pageSize = this.pageSize;//5
            const total = this.count;//100
            const result = [];
            result.push({ text: '上一页', page: nowPage - 1 })
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 })
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 })
            }
            result.push({ text: nowPage, page: nowPage })
            if (nowPage + 1 <= (total + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 })
            }
            if (nowPage + 2 <= (total + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 })
            }
            // result.push({ text: '下一页', page: parseInt((total + pageSize - 1) / pageSize) })
            result.push({ text: '下一页', page: nowPage + 1 })
            this.pageNumList = result;
            return result;
        },

    },
    created() {
        //发送ajax请求获取文章列表
        const searchValue = decodeURIComponent(location.search).split('?')[1].split('=')[1];
        const searchKey = decodeURIComponent(location.search).split('?')[1].split('=')[0];
        this.searchWord = searchValue.replace(/'/g, '');
        this.searchKey = searchKey;
        // if (searchKey == 'tag') {
        this.getPage(this.page, this.pageSize, this.searchWord)
        // } else  if(searchKey == 'searchWord'){
        // this.getPage(this.page, this.pageSize, this.searchWord)
        // }
    }
})