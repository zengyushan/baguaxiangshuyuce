<template>
  <div class="home">
    <div class="result" :class="{show:benGuaYao.length}">
      <div class="bengua">
        <div class="tit">本卦</div>
        <div class="row row1">
          <div class="tiyong">
            <span class="">{{ dongYao > 3 ? '用' : '体' }}</span>
            <span class="">{{ dongYao > 3 ? '体' : '用' }}</span>
          </div>
          <div class="yaos">
          <span :class="one">
            <i class="left"></i>
            <i class="right"></i>
          </span>
            <span :class="two">
            <i class="left"></i>
            <i class="right"></i>
          </span>
            <span :class="three">
            <i class="left"></i>
            <i class="right"></i>
          </span>
            <span :class="four">
            <i class="left"></i>
            <i class="right"></i>
          </span>
            <span :class="five">
            <i class="left"></i>
            <i class="right"></i>
          </span>
            <span :class="six">
            <i class="left"></i>
            <i class="right"></i>
          </span>
          </div>
          <div class="wuxing">
            <span :class="upColor(upGuaWuXing)">{{ upGuaWuXing }}</span>
            <span :class="downColor(downGuaWuXing)">{{ downGuaWuXing }}</span>
          </div>
        </div>
        <div class="row row2">
          <div>{{ sixtyFourGuaName }}</div>
          <div>{{ shengKeRes }}</div>
        </div>
      </div>
      <div class="others">
        <div class="hugua">
          <div class="tit">互卦</div>
          <div class="row row1">
            <div class="tiyong">
              <span class="">{{ dongYao > 3 ? '用' : '体' }}</span>
              <span class="">{{ dongYao > 3 ? '体' : '用' }}</span>
            </div>
            <div class="yaos">
          <span :class="benGuaYao[1]">
            <i class="left"></i>
            <i class="right"></i>
          </span>
              <span :class="benGuaYao[2]">
            <i class="left"></i>
            <i class="right"></i>
          </span>
              <span :class="benGuaYao[3]">
            <i class="left"></i>
            <i class="right"></i>
          </span>
              <span :class="benGuaYao[2]">
            <i class="left"></i>
            <i class="right"></i>
          </span>
              <span :class="benGuaYao[3]">
            <i class="left"></i>
            <i class="right"></i>
          </span>
              <span :class="benGuaYao[4]">
            <i class="left"></i>
            <i class="right"></i>
          </span>
            </div>
            <div class="wuxing">
              <span :class="upColor(upHuGuaWuXing)">{{ upHuGuaWuXing }}</span>
              <span :class="downColor(downHuGuaWuXing)">{{ downHuGuaWuXing }}</span>
            </div>
          </div>
          <div class="row row2">
            <div>{{ sixtyFourHuGuaName }}</div>
            <div>{{ huShengKeRes }}</div>
          </div>
        </div>
        <div class="hugua">
          <div class="tit">变卦</div>
          <div class="row row1">
            <div class="tiyong">
              <span class="">{{ dongYao > 3 ? '用' : '体' }}</span>
              <span class="">{{ dongYao > 3 ? '体' : '用' }}</span>
            </div>
            <div class="yaos">
          <span :class="bianGuaYao[0]">
            <i class="left" :class="{isDongYao:dongYao==6}"></i>
            <i class="right" :class="{isDongYao:dongYao==6}"></i>
          </span>
              <span :class="bianGuaYao[1]">
            <i class="left" :class="{isDongYao:dongYao==5}"></i>
            <i class="right" :class="{isDongYao:dongYao==5}"></i>
          </span>
              <span :class="bianGuaYao[2]">
            <i class="left" :class="{isDongYao:dongYao==4}"></i>
            <i class="right" :class="{isDongYao:dongYao==4}"></i>
          </span>
              <span :class="bianGuaYao[3]">
            <i class="left" :class="{isDongYao:dongYao==3}"></i>
            <i class="right" :class="{isDongYao:dongYao==3}"></i>
          </span>
              <span :class="bianGuaYao[4]">
            <i class="left" :class="{isDongYao:dongYao==2}"></i>
            <i class="right" :class="{isDongYao:dongYao==2}"></i>
          </span>
              <span :class="bianGuaYao[5]">
            <i class="left" :class="{isDongYao:dongYao==1}"></i>
            <i class="right" :class="{isDongYao:dongYao==1}"></i>
          </span>
            </div>
            <div class="wuxing">
              <span :class="upColor(upBianGuaWuXing)">{{ upBianGuaWuXing }}</span>
              <span :class="downColor(downBianGuaWuXing)">{{ downBianGuaWuXing }}</span>
            </div>
          </div>
          <div class="row row2">
            <div>{{ sixtyFourBianGuaName }}</div>
            <div>{{ bianShengKeRes }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="alert" v-if="showAlert">{{ alertTxt }}</div>
      <div class="operationIn">
        <div class="types">
          <el-radio-group class="radios" v-model="functionType">
            <el-radio :label="'time'">按时间起卦</el-radio>
            <el-radio :label="'number'">按数字起卦</el-radio>
            <!--            <el-radio :label="'strlen'">按多字字数起卦</el-radio>-->
          </el-radio-group>
        </div>
        <div class="btns">
          <el-button class="btn" type="primary" size="medium" @click="start">起卦</el-button>
        </div>
      </div>
      <div class="inp">
        <div class="time" v-show="functionType=='time'">
          <el-input class="input" type="number" v-model="params.year" placeholder="年"/>
          <el-input class="input" type="number" v-model="params.month" placeholder="月"/>
          <el-input class="input" type="number" v-model="params.day" placeholder="日"/>
          <el-input class="input" type="number" v-model="params.hour" placeholder="时"/>
          <el-button size="mini" @click="setNow">现在时间</el-button>
          <span @click="reset">清空</span>
        </div>
        <div class="number" v-show="functionType=='number'">
          <el-input class="input" type="number" v-model="params.numbers" placeholder="请输入一串数字"/>
        </div>
        <!--        <div class="strlen">-->
        <!--          <el-input class="input" type="number" v-model="params.strlen" placeholder="请输入字数"/>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
const {Solar, Lunar} = require('lunar-javascript') //Solar是阳历 Lunar是阴历
export default {
  components: {},
  computed: {
    one() {
      return this.benGuaYao[0]
    },
    two() {
      return this.benGuaYao[1]
    },
    three() {
      return this.benGuaYao[2]
    },
    four() {
      return this.benGuaYao[3]
    },
    five() {
      return this.benGuaYao[4]
    },
    six() {
      return this.benGuaYao[5]
    },
    shengKeRes() {
      if (this.dongYao > 3) { //上用下体
        return this.shengKe[this.wuXing[this.upGuaName] + this.wuXing[this.downGuaName]]
      } else {
        return this.shengKe[this.wuXing[this.downGuaName] + this.wuXing[this.upGuaName]]
      }
    },
    huShengKeRes() {
      if (this.dongYao > 3) {
        return this.shengKe[this.wuXing[this.upHuGuaName] + this.wuXing[this.downHuGuaName]]
      } else {
        return this.shengKe[this.wuXing[this.downHuGuaName] + this.wuXing[this.upHuGuaName]]
      }
    },
    bianShengKeRes() {
      if (this.dongYao > 3) {
        return this.shengKe[this.wuXing[this.upBianGuaName] + this.wuXing[this.downBianGuaName]]
      } else {
        return this.shengKe[this.wuXing[this.downBianGuaName] + this.wuXing[this.upBianGuaName]]
      }
    }
  },
  data() {
    return {
      alertTxt: '',
      showAlert: false,
      params: {
        year: '',
        month: '',
        day: '',
        hour:'',
        minute:'',
        second:'',
        numbers: '',
        strlen: ''
      },
      ganzhi: {
        '子': {
          year: 1,
          month: 11,
          hour: 1
        },
        '丑': {
          year: 2,
          month: 12,
          hour: 2
        },
        '寅': {
          year: 3,
          month: 1,
          hour: 3
        },
        '卯': {
          year: 4,
          month: 2,
          hour: 4
        },
        '辰': {
          year: 5,
          month: 3,
          hour: 5
        },
        '巳': {
          year: 6,
          month: 4,
          hour: 6
        },
        '午': {
          year: 7,
          month: 5,
          hour: 7
        },
        '未': {
          year: 8,
          month: 6,
          hour: 8
        },
        '申': {
          year: 9,
          month: 7,
          hour: 9
        },
        '酉': {
          year: 10,
          month: 8,
          hour: 10
        },
        '戌': {
          year: 11,
          month: 9,
          hour: 11
        },
        '亥': {
          year: 12,
          month: 10,
          hour: 12
        }
      },
      benGuaYao: [],
      huGuaYao: [],
      bianGuaYao: [],
      eightChunGua: [
        {name: '乾', yaos: ['阳', '阳', '阳'], wuxing: '金'},
        {name: '兑', yaos: ['阴', '阳', '阳'], wuxing: '金'},
        {name: '离', yaos: ['阳', '阴', '阳'], wuxing: '火'},
        {name: '震', yaos: ['阴', '阴', '阳'], wuxing: '木'},
        {name: '巽', yaos: ['阳', '阳', '阴'], wuxing: '木'},
        {name: '坎', yaos: ['阴', '阳', '阴'], wuxing: '水'},
        {name: '艮', yaos: ['阳', '阴', '阴'], wuxing: '土'},
        {name: '坤', yaos: ['阴', '阴', '阴'], wuxing: '土'}
      ],
      wuXing: {'乾': '金', '兑': '金', '离': '火', '震': '木', '巽': '木', '坎': '水', '艮': '土', '坤': '土'},
      eightGuaNameByYao: {
        '阳阳阳': '乾',
        '阴阳阳': '兑',
        '阳阴阳': '离',
        '阴阴阳': '震',
        '阳阳阴': '巽',
        '阴阳阴': '坎',
        '阳阴阴': '艮',
        '阴阴阴': '坤',
      },
      shengKe: {
        '水木': '用生体',
        '水火': '用克体',
        '水土': '体克用',
        '水金': '体生用',

        '木火': '用生体',
        '木土': '用克体',
        '木金': '体克用',
        '木水': '体生用',

        '火土': '用生体',
        '火金': '用克体',
        '火水': '体克用',
        '火木': '体生用',

        '土金': '用生体',
        '土水': '用克体',
        '土木': '体克用',
        '土火': '体生用',

        '金水': '用生体',
        '金木': '用克体',
        '金火': '体克用',
        '金土': '体生用',

        '金金': '体用比和',
        '木木': '体用比和',
        '水水': '体用比和',
        '火火': '体用比和',
        '土土': '体用比和',
      },
      dongYao: 1,
      sixtyFourGua: {
        '乾乾': {
          name: '乾为天',
        },
        '乾兑': {
          name: '天泽履',
        },
        '乾离': {
          name: '天火同人',
        },
        '乾震': {
          name: '天雷无妄',
        },
        '乾巽': {
          name: '天风姤',
        },
        '乾坎': {
          name: '天水讼',
        },
        '乾艮': {
          name: '天山遁',
        },
        '乾坤': {
          name: '天地否',
        },
        '兑乾': {
          name: '泽天夬',
        },
        '兑兑': {
          name: '兑为泽',
        },
        '兑离': {
          name: '泽火革',
        },
        '兑震': {
          name: '泽雷随',
        },
        '兑巽': {
          name: '泽风大过',
        },
        '兑坎': {
          name: '泽水困',
        },
        '兑艮': {
          name: '泽山咸',
        },
        '兑坤': {
          name: '泽地萃',
        },
        '离乾': {
          name: '火天大有',
        },
        '离兑': {
          name: '火泽睽',
        },
        '离离': {
          name: '离为火',
        },
        '离震': {
          name: '火雷噬嗑',
        },
        '离巽': {
          name: '火风鼎',
        },
        '离坎': {
          name: '火水未济',
        },
        '离艮': {
          name: '火山旅',
        },
        '离坤': {
          name: '火地晋',
        },
        '震乾': {
          name: '雷天大壮',
        },
        '震兑': {
          name: '雷泽归妹',
        },
        '震离': {
          name: '雷火丰',
        },
        '震震': {
          name: '震为雷',
        },
        '震巽': {
          name: '雷风恒',
        },
        '震坎': {
          name: '雷水解',
        },
        '震艮': {
          name: '雷山小过',
        },
        '震坤': {
          name: '雷地豫',
        },
        '巽乾': {
          name: '风天小畜',
        },
        '巽兑': {
          name: '风泽中孚',
        },
        '巽离': {
          name: '风火家人',
        },
        '巽震': {
          name: '风雷益',
        },
        '巽巽': {
          name: '巽为风',
        },
        '巽坎': {
          name: '风水涣',
        },
        '巽艮': {
          name: '风山渐',
        },
        '巽坤': {
          name: '风地观',
        },
        '坎乾': {
          name: '水天需',
        },
        '坎兑': {
          name: '水泽节',
        },
        '坎离': {
          name: '水火既济',
        },
        '坎震': {
          name: '水雷屯',
        },
        '坎巽': {
          name: '水风井',
        },
        '坎坎': {
          name: '坎为水',
        },
        '坎艮': {
          name: '水山蹇',
        },
        '坎坤': {
          name: '水地比',
        },
        '艮乾': {
          name: '山天大畜',
        },
        '艮兑': {
          name: '山泽损',
        },
        '艮离': {
          name: '山火贲',
        },
        '艮震': {
          name: '山雷颐',
        },
        '艮巽': {
          name: '山风蛊',
        },
        '艮坎': {
          name: '山水蒙',
        },
        '艮艮': {
          name: '艮为山',
        },
        '艮坤': {
          name: '山地剥',
        },
        '坤乾': {
          name: '地天泰',
        },
        '坤兑': {
          name: '地泽临',
        },
        '坤离': {
          name: '地火明夷',
        },
        '坤震': {
          name: '地雷复',
        },
        '坤巽': {
          name: '地风升',
        },
        '坤坎': {
          name: '地水师',
        },
        '坤艮': {
          name: '地山谦',
        },
        '坤坤': {
          name: '坤为地',
        },
      },
      functionType: 'time',
      sixtyFourGuaName: '',
      upGuaWuXing: '',
      downGuaWuXing: '',
      upGuaName: '',
      downGuaName: '',

      sixtyFourHuGuaName: '',
      upHuGuaName: '',
      downHuGuaName: '',
      upHuGuaWuXing: '',
      downHuGuaWuXing: '',

      sixtyFourBianGuaName: '',
      upBianGuaName: '',
      downBianGuaName: '',
      upBianGuaWuXing: '',
      downBianGuaWuXing: ''
    }
  },
  created() {

  },
  methods: {
    upColor(upGuaWuXing) {
      return upGuaWuXing == '木' ? 'green' : upGuaWuXing == '火' ? 'red' : upGuaWuXing == '土' ? 'yellow' : upGuaWuXing == '金' ? 'white' : upGuaWuXing == '水' ? 'black' : ''
    },
    downColor(downGuaWuXing) {
      return downGuaWuXing == '木' ? 'green' : downGuaWuXing == '火' ? 'red' : downGuaWuXing == '土' ? 'yellow' : downGuaWuXing == '金' ? 'white' : downGuaWuXing == '水' ? 'black' : ''
    },
    get64Gua(upYuShu, downYuShu) {
      this.upGuaName = this.eightChunGua[upYuShu - 1].name
      this.downGuaName = this.eightChunGua[downYuShu - 1].name
      let guaName = this.upGuaName + this.downGuaName

      this.benGuaYao = this.eightChunGua[upYuShu - 1].yaos.concat(this.eightChunGua[downYuShu - 1].yaos)
      this.upGuaWuXing = this.eightChunGua[upYuShu - 1].wuxing
      this.downGuaWuXing = this.eightChunGua[downYuShu - 1].wuxing
      console.log('this.benGuaYao', this.benGuaYao)
      return guaName
    },
    getHuGua() {
      this.huGuaYao = [].concat(this.benGuaYao[1]).concat(this.benGuaYao[2]).concat(this.benGuaYao[3]).concat(this.benGuaYao[2]).concat(this.benGuaYao[3]).concat(this.benGuaYao[4])
      this.upHuGuaName = this.eightGuaNameByYao[this.huGuaYao[0] + this.huGuaYao[1] + this.huGuaYao[2]]
      this.downHuGuaName = this.eightGuaNameByYao[this.huGuaYao[3] + this.huGuaYao[4] + this.huGuaYao[5]]
      let huGuaEightName = this.upHuGuaName + this.downHuGuaName
      this.sixtyFourHuGuaName = this.sixtyFourGua[huGuaEightName].name
      this.upHuGuaWuXing = this.eightChunGua.filter(item => item.name == this.upHuGuaName)[0].wuxing
      this.downHuGuaWuXing = this.eightChunGua.filter(item => item.name == this.downHuGuaName)[0].wuxing
    },
    getBianGua() {
      console.log('this.dongYao', this.dongYao)
      this.bianGuaYao = this.benGuaYao.map((item, index, array) => {
        console.log('array.length', array.length)
        if (array.length - index == this.dongYao) {
          if (item == '阴') {
            return '阳'
          } else {
            return '阴'
          }
        } else {
          return item
        }
      })
      this.upBianGuaName = this.eightGuaNameByYao[this.bianGuaYao[0] + this.bianGuaYao[1] + this.bianGuaYao[2]]
      this.downBianGuaName = this.eightGuaNameByYao[this.bianGuaYao[3] + this.bianGuaYao[4] + this.bianGuaYao[5]]
      let bianGuaEightName = this.upBianGuaName + this.downBianGuaName
      this.sixtyFourBianGuaName = this.sixtyFourGua[bianGuaEightName].name
      this.upBianGuaWuXing = this.eightChunGua.filter(item => item.name == this.upBianGuaName)[0].wuxing
      this.downBianGuaWuXing = this.eightChunGua.filter(item => item.name == this.downBianGuaName)[0].wuxing
    },
    start() {
      if (this.functionType == 'time') {
        this.startByTime()
      } else if (this.functionType == 'number') {
        this.startByNumber()
      }
      this.getHuGua()
      this.getBianGua()
    },
    startByTime() {
      if (!this.params.year || !this.params.month || !this.params.day || !this.params.hour) {
        this.alertTxt = '请完成输入后再起卦'
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 1000)
        return
      }
      // 实例化
      let solar = Solar.fromYmdHms(this.params.year, this.params.month, this.params.day, this.params.hour, this.params.minute, this.params.second);
      // 转阴历
      let lunar = solar.getLunar();
      console.log('lunar', lunar.toString());
      //获取农历年月日时并转换为数字
      let year = this.ganzhi[lunar.getYearZhiExact()].year; //年以月令交节为准
      let month = this.ganzhi[lunar.getMonthZhiExact()].month;//月以月令交节为准
      let day = lunar.getDay();
      let hour = this.ganzhi[lunar.getTimeZhi()].hour;
      console.log('年月日时',year, month, day, hour)

      let upHe = year + month + day
      let upYuShu = upHe % 8 === 0 ? 8 : upHe % 8

      let downHe = year + month + day + hour
      let downYuShu = downHe % 8 === 0 ? 8 : downHe % 8

      let dongYaoHe = year + month + day + hour
      this.dongYao = dongYaoHe % 6 === 0 ? 6 : dongYaoHe % 6
      this.sixtyFourGuaName = this.sixtyFourGua[this.get64Gua(upYuShu, downYuShu)].name;
    },
    startByNumber() {
      if (!this.params.numbers) {
        this.alertTxt = '请完成输入后再起卦'
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 1500)
        return
      }
      if (this.params.numbers.toString().length == 1) {
        this.alertTxt = '请至少输入两位数字'
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 1500)
        return
      }
      let numStr = this.params.numbers.toString()
      console.log('numStr', numStr)
      let upGuaWeiShu
      let downGuaWeiShu
      if (numStr.length % 2 > 0) { //如果是奇数
        upGuaWeiShu = (numStr.length - 1) / 2
        downGuaWeiShu = upGuaWeiShu + 1
      } else {
        upGuaWeiShu = numStr.length / 2
        downGuaWeiShu = upGuaWeiShu
      }
      let upArr = numStr.substring(0, upGuaWeiShu).split('')
      let downupArr = numStr.substring(upGuaWeiShu, numStr.length).split('')
      let numStrArr = numStr.split('')
      console.log('upArr', upArr)
      console.log('downupArr', downupArr)
      let upHe = 0
      let downHe = 0
      let dongYaoHe = 0
      upArr.forEach(item => {
        if (item == 0) {
          upHe += 8
        } else {
          upHe += Number(item)
        }
      })
      downupArr.forEach(item => {
        if (item == 0) {
          downHe += 8
        } else {
          downHe += Number(item)
        }
      })
      numStrArr.forEach(item => {
        if (item == 0) {
          dongYaoHe += 8
        } else {
          dongYaoHe += Number(item)
        }
      })
      let upYuShu = upHe % 8 === 0 ? 8 : upHe % 8
      let downYuShu = downHe % 8 === 0 ? 8 : downHe % 8
      this.dongYao = dongYaoHe % 6 === 0 ? 6 : dongYaoHe % 6
      this.sixtyFourGuaName = this.sixtyFourGua[this.get64Gua(upYuShu, downYuShu)].name;
    },
    setNow() {
      let solarStr = Solar.fromDate(new Date()).toYmdHms();
      console.log(solarStr)
      this.params.year = solarStr.split(' ')[0].split('-')[0];
      this.params.month = solarStr.split(' ')[0].split('-')[1];
      this.params.day = solarStr.split(' ')[0].split('-')[2];
      this.params.hour = solarStr.split(' ')[1].split(':')[0];
      this.params.minute = solarStr.split(' ')[1].split(':')[1];
      this.params.second = solarStr.split(' ')[1].split(':')[2];
    },
    reset() {
      this.params.year = '';
      this.params.month = '';
      this.params.day = '';
      this.params.hour = '';
      this.params.minute = '';
      this.params.second = '';
    }
  }
};
</script>
<style lang="less" scoped>
::v-deep > input {
  padding: 0 5px;
  text-align: center;
}

::v-deep > input::-webkit-outer-spin-button,
::v-deep > input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

::v-deep > input {
  -moz-appearance: textfield;
}
::v-deep .el-radio__label{
  font-size: 20px;
}
.tit {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3px;
}

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 15px;
  height: 100vh;
  box-sizing: border-box;
  .operation {
    display: flex;
    padding: 30px 0 15px;
    flex-direction: column;
    width: 332px;
    position: relative;
    .alert {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: red;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .operationIn {
      display: flex;
      justify-content: space-between;

      .types {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .radios {
          display: flex;
          flex-direction: column;

          > label {
            margin-bottom: 15px;
            display: flex;
            align-items: center;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .btns {
        margin-left: 20px;

        .btn {
          width: 100px;
          height: 60px;
          font-size: 30px;
        }
      }
    }

    .inp {
      margin-top: 15px;

      .time {
        display: flex;
        justify-content: space-between;

        .input {
          width: 50px;
        }

        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          cursor: pointer;
        }
      }

      .number {
        .input {

        }
      }

      .strlen {
        .input {

        }
      }
    }
  }

  .result {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    visibility: hidden;
    .bengua {
      .row1 {
        display: flex;
        justify-content: center;

        .tiyong {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 0;

          span {
            font-size: 20px;
          }
        }

        .yaos {
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          width: 180px;

          span {
            position: relative;
            margin-bottom: 10px;
            display: inline-block;
            height: 22px;

            &:last-child {
              margin-bottom: 0;
            }
          }

          .阴 {
            .left {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 74px;
              background-color: black;
            }

            .right {
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 74px;
              background-color: black;
            }
          }

          .阳 {
            .left {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              background-color: black;
            }

            .right {
              display: none;
            }
          }
        }

        .wuxing {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 0;

          span {
            font-size: 20px;
            font-weight: bold;
          }

          .green {
            color: green;
          }

          .red {
            color: red;
          }

          .yellow {
            color: #e1c015;
          }

          .white {
            color: white;
          }

          .black {
            color: black;
          }
        }
      }

      .row2 {
        > div {
          margin-top: 5px;
          text-align: center;
          font-size: 20px;
        }
      }
    }

    .others {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      .hugua {
        .row1 {
          display: flex;
          justify-content: center;

          .tiyong {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 0;

            span {
              font-size: 20px;
            }
          }

          .yaos {
            margin: 0 10px;
            display: flex;
            flex-direction: column;
            width: 102px;

            span {
              position: relative;
              margin-bottom: 6px;
              display: inline-block;
              height: 14px;

              &:last-child {
                margin-bottom: 0;
              }
            }

            .阴 {
              .left {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 42px;
                background-color: black;
              }

              .right {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 42px;
                background-color: black;
              }
            }

            .阳 {
              .left {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                background-color: black;
              }

              .right {
                display: none;
              }
            }
            .isDongYao{
              background-color: #ff0000!important;
            }
          }

          .wuxing {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 0;

            span {
              font-size: 20px;
              font-weight: bold;
            }

            .green {
              color: green;
            }

            .red {
              color: red;
            }

            .yellow {
              color: #e1c015;
            }

            .white {
              color: white;
            }

            .black {
              color: black;
            }
          }
        }

        .row2 {
          > div {
            margin-top: 5px;
            text-align: center;
            font-size: 20px;
            &:last-child{
              margin-top: 2px;
            }
          }

        }
      }
    }
  }
  .show{
    visibility: visible;
  }
}
</style>
