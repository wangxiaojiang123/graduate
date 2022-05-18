import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      {
        path: require("@/assets/ser1_.png"),
        text: "维修",
      },
      {
        path: require("@/assets/ser2_.png"),
        text: "保养",
      },
      {
        path: require("@/assets/ser3_.png"),
        text: "调试",
      },
      {
        path: require("@/assets/ser4_.png"),
        text: "安装",
      },
      {
        path: require("@/assets/ser5_.png"),
        text: "其他",
      },
    ],
    types: [
      {
        text: "机械故障",
      },
      {
        text: "电气故障",
      },
      {
        text: "程序故障",
      },
      {
        text: "其他故障",
      },
    ],
    hot: [
      {
        path: require("@/assets/hot1.jpg"),
        text: "线路板设备",
      },
      {
        path: require("@/assets/hot2.jpg"),
        text: "空压机",
      },
      {
        path: require("@/assets/hot3.jpg"),
        text: "电梯",
      },
      {
        path: require("@/assets/hot4.jpg"),
        text: "印刷设备",
      },
    ],
    devices: [
      "线路板设备",
      "空压机",
      "数控机床",
      "注塑设备",
      "印刷设备",
      "泵类",
      "其他设备",
    ],
    dev1: [
      "贴片机",
      "钢片机",
      "压膜机",
      "钻孔机",
      "曝光机",
      "测试机",
      "自动沉铜线",
      "激光切割机",
    ],
    dev2: [
      "永磁变频螺杆机",
      "螺杆式空压机",
      "活塞式空压机",
      "干燥机",
      "气压机",
      "液压机",
    ],
    dev3: ["CNC", "数控冲床", "数控铣床", "数控钻床", "数控磨床", "数控车床"],
    dev4: ["注塑机", "上料机", "粉碎机", "拌料机", "吸料机"],
    dev5: [
      "凸版印刷机",
      "凹版印刷机",
      "平板印刷机",
      "丝网印刷机",
      "柔板印刷机",
      "数码印刷机",
    ],
    dev6: ["离心泵", "化工泵", "转子泵", "真空泵", "自吸泵", "排污泵"],
    dev7: ["电梯"],
    devtype:'',
    address:'',
    cargo:''
  },
  mutations: {
   
  },
  actions: {
  },
  modules: {
  }
})
