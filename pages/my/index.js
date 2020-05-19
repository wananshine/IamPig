import api from '../../api/api.js'


//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    msg: 'memeda',
    motto: '小猪佩奇',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    scrollTop: 100,
    washingList: [
      { id: 1, selected: true, value: '1', name: 'USA1' },
      { id: 2, selected: false, value: '2', name: 'USA2'  },
      { id: 3, selected: true, value: '3', name: 'USA3'  },
      { id: 4, selected: false, value: '4', name: 'USA4'  },
      { id: 5, selected: true, value: '5', name: 'USA5'  },
      { id: 6, selected: false, value: '6', name: 'USA6'  },
      { id: 7, selected: false, value: '7', name: 'USA7'  },
      { id: 8, selected: false, value: '8', name: 'USA8'  },
      { id: 9, selected: false, value: '9', name: 'USA9'  },
      { id: 10, selected: false, value: '10', name: 'USA10'  },
      { id: 11, selected: false, value: '11', name: 'USA11'  },
    ],
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'FRA', value: '法国' },
    ],

    modalVal: 'one',
    modalList: [
      { name: "标准洗", time: "45分钟", price: "￥5.00", checked: true, value: "norm"},
      { name: "大件", time: "55分钟", price: "￥5.00", checked: false, value: "big" },
      { name: "快速洗", time: "25分钟", price: "￥5.00", checked: false, value: "fast" }
    ],
    number: 20,
    optional: [
      { name: "洗衣液", note: "10ml约3件衣服", volume: "10", checked: true, price: "5.00" },
      { name: "柔顺液", note: "10ml约3件衣服", volume: "10", checked: false, price: "5.00" },
      { name: "烘干", note: "推荐60分钟", volume: "10", checked: false, price: "5.00" }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    console.log("option",option)
    
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
    };

    api.getCarousel({
      success: (res) => {
        if (res.data.res === 0) {
          let carousel = res.data.data
          this.setData({ carousel })
        }
        console.log("+++++++++++++++++:",res)
      }
    })

    wx.request({
      url: 'http://m.wufazhuce.com/one/ajaxlist/2257',
      success: function(res){
        console.log("----------one",res)
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
  clickMe: function(e){
    console.log(123)
    this.setData({ msg: "Hello World" })
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        console.log("success:", res)
      },
      fail(res) {
        console.log("err:",res)
      },
      complete: function (res) { }
    })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  radioChange: function(e){
    console.log(e)
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  radioChangeModal: function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.valueid)
    console.log('radioChangeModal发生change事件，携带value值为：', e.detail.value)
  },
  radioSelected: function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.valid)
    console.log('radioSelected发生change事件，携带value值为：', e.currentTarget.dataset.radioid)
  },

  radioChangeModal2: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.valueid)
    console.log('radioChangeModal发生change事件，携带value值为：', e.detail.value)
  },
  radioSelected2: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.index)
    console.log('radioSelected发生change事件，携带value值为：', e.currentTarget.dataset.radioid)
    var modalList = this.data.modalList;
    console.log(modalList)
    for (var v in modalList){
      console.log(v)
      if (v == e.currentTarget.dataset.index){
        modalList[v].checked = true
      }else{
        modalList[v].checked = false
      }
    }
    this.setData({
      modalList: modalList
    })
  },

  //洗衣液减少
  minusCustomer: function(e){
    const minus = Number(e.currentTarget.dataset.minus) - 10;
    const price = (minus * 5 / 10).toFixed(2);
    const optional = this.data.optional;
    console.log(e, minus, price)
    for (let v in optional) {
      if (v == e.currentTarget.dataset.index) {
        if (Number(e.currentTarget.dataset.minus) <= 10){
          optional[v].volume = 10;
          optional[v].price = '5.00';
        } else {
          optional[v].volume = minus;
          optional[v].price = price;
        } 
      }
    }
    this.setData({
      optional: optional
    }) 
  },

  //洗衣液添加
  plusCustomer: function(e){
    const plus = Number(e.currentTarget.dataset.plus) + 10;
    const price = (plus * 5 / 10).toFixed(2);
    const optional = this.data.optional;
    console.log(e, plus, price)
    for (let v in optional){
      if (v == e.currentTarget.dataset.index){
        optional[v].volume = plus;
        optional[v].price = price;
      }
    }
    this.setData({
      optional: optional
    })
  },

  collentTap: function(e){
    wx.showToast({
      title: '存储成功',
      icon: 'success',
      duration: 2000
    });
    wx.showModal({
      title: '提示',
      content: '确定要xxx吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    const newCollect =  wx.getStorageInfoSync('newsCollect');
  },

  onShareAppMessage: function(){
    return{
      title: "分享图片",
      path: "./pages"
    }
  },

})
