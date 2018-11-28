//index.js
//获取应用实例
const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
import { movie, bannerUrl, movie2} from '../data/format'
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    index: 999,
    time: "2018-06-12",
    id: 0,
    zero: 0,
    condition: true,
    array: [
      { "img":"aaa", "txt": "1111" },
      { "img": "bbb", "txt": "1111" },
      { "img": "ccc", "txt": "1111" },
      { "img": "ddd", "txt": "1111" }
    ],
    objectArray: [
      { id: 5, unique: 'unique_5', txt: '选择1' },
      { id: 4, unique: 'unique_4', txt: '选择2' },
      { id: 3, unique: 'unique_3', txt: '选择3' },
      { id: 2, unique: 'unique_2', txt: '选择4' },
      { id: 1, unique: 'unique_1', txt: '选择5' },
      { id: 0, unique: 'unique_0', txt: '选择6' },
    ],
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    movieList: movie,
    bannerList: bannerUrl,
    msg: 'memeda',
    motto: '小猪佩奇',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    oneday: '',
    timetxt: '开始',
    show: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    const date = new Date('2018-07-07 10:18:00').getTime();
    const dar = new Date().getTime()
    const dateend = new Date('2018-06-05 10:20:00').getTime();
    if (dar<date){
      console.log(1)
    } else if (dar > date && dar < dateend){
      console.log(2)
    }else{
      console.log(3)
    }
    const _this = this;
    const timer = setInterval(function(){
        const nowdate = new Date().getTime()
        if (date > nowdate){
          _this.setData({
            oneday: _this.daoTime(date, nowdate),
            timetxt: '距离开始'
          })
        } else if ((date === nowdate || date < nowdate) && (nowdate < dateend) ){
          _this.setData({
            oneday: _this.daoTime(dateend, nowdate),
            timetxt: '距离结束'
          })
        }else{
          _this.setData({
            oneday: '00:00:00:00',
            timetxt: '已结束'
          })
          console.log('结束');
          clearInterval(timer);
        }
        // console.log(date, nowdate)
        // console.log(_this.daoTime(date, nowdate))
    },1000);
    //timer();
    console.log(date, dar, dateend,movie, bannerUrl, movie2)
    console.log(0, Date.parse(new Date()))
    console.log(1,Date.parse(new Date('2018-07-04 14:25:33')))
    console.log(2,(new Date('2018-07-04 14:25:33:123')).valueOf())
    console.log(3,new Date('2018-07-04 14:25:33:256').getTime());
    console.log('getTime', this.getTime(date))
    // wx.request({
    //   // url: 'test.php', //仅为示例，并非真实的接口地址
    //   url: '../data/format',
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onReady: function(){
    
  },

  getTime: function (date){
    const dateYY = new Date(date);
    const Y = dateYY.getFullYear();
    const M = dateYY.getMonth() + 1 < 10 ? '0' + (dateYY.getMonth() + 1) : dateYY.getMonth() + 1;
    const D = dateYY.getDate();
    const H = dateYY.getHours();
    const Mi = dateYY.getMinutes();
    const S = dateYY.getSeconds();
    console.log('YDM:', dateYY, Y, M, D, H, Mi, S, date)
  },

  daoTime(date, nowdate){
    const _this = this;
    const futuredate = date - nowdate;  //86400
    const DD = Math.floor(futuredate / (60 * 60 * 24 * 1000)) < 10 ? '0' + Math.floor(futuredate / (60 * 60 * 24 * 1000)) : Math.floor(futuredate / (60 * 60 * 24 * 1000));
    const HH = Math.floor(futuredate % (60 * 60 * 24 * 1000) / (1000 * 60 * 60)) < 10 ? '0' + Math.floor(futuredate % (60 * 60 * 24 * 1000) / (1000 * 60 * 60)) : Math.floor(futuredate % (60 * 60 * 24 * 1000) / (1000 * 60 * 60)) 
    const Mi = Math.floor(futuredate % (60 * 60 * 24 * 1000) % (1000 * 60 * 60) / (1000 * 60)) < 10 ? '0'+Math.floor(futuredate % (60 * 60 * 24 * 1000) % (1000 * 60 * 60) / (1000 * 60)) : Math.floor(futuredate % (60 * 60 * 24 * 1000) % (1000 * 60 * 60) / (1000 * 60))
    const SS = Math.floor(futuredate % (60 * 60 * 24 * 1000) % (1000 * 60 * 60) % (1000 * 60) / 1000) < 10 ? '0' + Math.floor(futuredate % (60 * 60 * 24 * 1000) % (1000 * 60 * 60) % (1000 * 60) / 1000) : Math.floor(futuredate % (60 * 60 * 24 * 1000) % (1000 * 60 * 60) % (1000 * 60) / 1000)
    //const onedayTime = DD.toString() + HH.toString() + Mi.toString() + SS.toString()
    const onedayTime = DD + ':' + HH + ':' + Mi + ':' + SS
    return onedayTime
    console.log('date, dar:', DD, HH, Mi, SS, onedayTime,date - nowdate);
  },

  //跳转到详情页
  toDetail(e){
    console.log(e.currentTarget.dataset.movieid)
    wx.navigateTo({
      //url: "../../pages/detail/detail id=" + e.currentTarget.dataset.movieid,
      url: "../../pages/details/index?id="+ e.currentTarget.dataset.movieid,
      //接口调用成功的回调方法
      fuccess: function () {
         console.log(1)
       },
       //接口调用失败的回调方法
       fail:function () {
         console.log(2)
        },
      //接口调用无论成功或者失败的回调方法
       complete:function () { 
          console.log(12)
       }
   })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  showShareMenu(){
    wx.showShareMenu({})
    console.log("显示了当前页面的转发按钮");
  },

  hideShareMenu() {
    wx.hideShareMenu();
    console.log("隐藏了当前页面的转发按钮");
  },

  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  },
  
  onUnload: function () {
    // Do something when page close.
  },

  //分享 
  onShareAppMessage(res) {
    if(res.from === 'button'){
      console.log("来自页面内转发按钮")
      console.log("res.target")
    }else{
      console.log("来自右上角转发菜单")
    }
    return{
      title: "tupian",
      path: '/pages/details/index?id=123',
      imageUrl: "/images/1.jpg",
      success: (res)=>{
        console.log("转发成功", res)
      },
      fail: (res)=>{
        console.log("转发失败", res)
      }
    }
  },

  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log(123)
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log(456)
  },

  onPageScroll: function () {
    // Do something when page scroll
  },
  onResize: function () {
    // Do something when page resize
  },

  //点我扫一扫
  clickCode(){
    var that = this;
    var show;
    wx.scanCode({
      success: (res) =>{
        this.show = "结果：" + res.result + "； 二维码类型：" + res.scanType + "; 字符集：" + res.charSet + "; 路径：" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res)=>{
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res)=>{
      }
    })
  },

  clickMe: function(e){
    console.log(123)
    this.setData({ msg: "Hello World" })
  },
  clickShow: function(e){
    this.setData({ condition: !this.data.condition })
  },
  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
    console.log(this.data.objectArray)
  },
  changeIndicatorDots: function(e){
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e){
    this.setData({
      autoplay: !this.data.autoplay
    });
    console.log(123)
  },
  intervalChange(e){
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  supper: function(e){
    console.log(e)
  },
  lower(e){
    console.log(e)
  },
  scroll: function(e){
    console.log(e)
  },
  tap(e){
    for(var i=0;i<order.length;i++){
      if(order[i] === this.data.toView){
        this.setData({
          toView: order[i + 1]
        })
        console.log(this.data.toView)
        break;
      }
    }
  },
  tapMove(e){
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  
})
