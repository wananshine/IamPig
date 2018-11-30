//index.js
//获取应用实例
const app = getApp()
import { movie, bannerUrl, movie2 } from '../data/format'
Page({
  data: {
    msg: 'memeda',
    movieDetail: {},
    movies: [],
    limit: 6,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  requestData: function(){
    var that = this;
    wx.request({
      url: 'http://m.maoyan.com/cinemas.json', //仅为示例，并非真实的接口地址
      data: {
        limit: that.data.limit
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        console.log("movies:", res)
        // 数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          // movies: res.data.data.movies
          // loading: true
        })
        // console.log("movies:",that.data.movies)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  

  onLoad: function (options) {
    // options为页面跳转所带来的参数
    console.log('options',options)
    console.log(movie)
    const that = this;
    that.requestData();
    const movieList = movie.data;
    let mDetail = movieList.filter((detail, index)=>{
      console.log(detail.filmInfoVO.movieId, index, Number(options.id))
      return detail.filmInfoVO.movieId === Number(options.id)
    })
    
    this.setData({
      movieDetail: mDetail[0].filmInfoVO
    })
   
    console.log('movieDetail:', mDetail, this.data.movieDetail)
  },

  // 页面初次渲染完成（每次打开页面都会调用一次）
  onReady: function () {
    console.log('movieDetail2:', this.data.movieDetail)

    //动态设置页面头部
    wx.setNavigationBarTitle({
      title: this.data.movieDetail.movieName
    })
  },

  clickMe: function(e){
    console.log(123)
    this.setData({ msg: "Hello World" })
  }
})
