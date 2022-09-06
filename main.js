'use strict';

function LinkGame(config) {
  if (!(this instanceof LinkGame)) {
    return new LinkGame(config);
  }
  this.score = 0; // 得分
  this.$box = $('#' + (config.boxId || 'game'));
  this.cellWidth = config.cellWidth || 42; // 每格的的宽度
  this.cellHeight = config.cellHeight || 42; // 每格的高度
  this.cols = config.cols + 2 || 10; // 列数
  this.rows = config.rows + 2 || 8; // 行数
  this.level = config.level || 0; // 等级
  this.leftDisorderTime = 5; // 剩余重排次数
  this.audios = [
    "images/words/零-líng.mp3","images/words/金-jīn.mp3","images/words/一-yī.mp3","images/words/丁-dīng.mp3","images/words/七-qī.mp3","images/words/万-wàn.mp3","images/words/三-sān.mp3","images/words/上-shàng.mp3","images/words/下-xià.mp3","images/words/不-bù.mp3","images/words/专-zhuān.mp3","images/words/业-yè.mp3","images/words/东-dōng.mp3","images/words/两-liǎng.mp3","images/words/个-gè.mp3","images/words/中-zhōng.mp3","images/words/为-wéi.mp3","images/words/主-zhǔ.mp3","images/words/么-mó.mp3","images/words/乐-lè.mp3","images/words/九-jiǔ.mp3","images/words/也-yě.mp3","images/words/习-xí.mp3","images/words/乡-xiāng.mp3","images/words/书-shū.mp3","images/words/了-liǎo.mp3","images/words/二-èr.mp3","images/words/云-yún.mp3","images/words/五-wǔ.mp3","images/words/井-jǐng.mp3","images/words/亮-liàng.mp3","images/words/亲-qīn.mp3","images/words/人-rén.mp3","images/words/什-shí.mp3","images/words/今-jīn.mp3","images/words/从-cóng.mp3","images/words/他-tā.mp3","images/words/以-yǐ.mp3","images/words/们-mén.mp3","images/words/伙-huǒ.mp3","images/words/会-huì.mp3","images/words/伴-bàn.mp3","images/words/位-wèi.mp3","images/words/你-nǐ.mp3","images/words/借-jiè.mp3","images/words/做-zuò.mp3","images/words/像-xiàng.mp3","images/words/儿-ér.mp3","images/words/先-xiān.mp3","images/words/光-guāng.mp3","images/words/入-rù.mp3","images/words/全-quán.mp3","images/words/八-bā.mp3","images/words/公-gōng.mp3","images/words/六-liù.mp3","images/words/兰-lán.mp3","images/words/共-gòng.mp3","images/words/关-guān.mp3","images/words/兴-xīng.mp3","images/words/再-zài.mp3","images/words/写-xiě.mp3","images/words/军-jūn.mp3","images/words/冬-dōng.mp3","images/words/冷-lěng.mp3","images/words/净-jìng.mp3","images/words/凉-liáng.mp3","images/words/几-jī.mp3","images/words/出-chū.mp3","images/words/分-fēn.mp3","images/words/刚-gāng.mp3","images/words/别-bié.mp3","images/words/到-dào.mp3","images/words/前-qián.mp3","images/words/力-lì.mp3","images/words/办-bàn.mp3","images/words/动-dòng.mp3","images/words/北-běi.mp3","images/words/十-shí.mp3","images/words/千-qiān.mp3","images/words/升-shēng.mp3","images/words/午-wǔ.mp3","images/words/半-bàn.mp3","images/words/南-nán.mp3","images/words/卜-bǔ.mp3","images/words/原-yuán.mp3","images/words/去-qù.mp3","images/words/又-yòu.mp3","images/words/友-yǒu.mp3","images/words/发-fā.mp3","images/words/变-biàn.mp3","images/words/口-kǒu.mp3","images/words/古-gǔ.mp3","images/words/只-zhī.mp3","images/words/叫-jiào.mp3","images/words/可-kě.mp3","images/words/右-yòu.mp3","images/words/叶-yè.mp3","images/words/吃-chī.mp3","images/words/各-gè.mp3","images/words/合-hé.mp3","images/words/同-tóng.mp3","images/words/名-míng.mp3","images/words/后-hòu.mp3","images/words/向-xiàng.mp3","images/words/吓-xià.mp3","images/words/吗-má.mp3","images/words/吧-bā.mp3","images/words/听-tīng.mp3","images/words/吹-chuī.mp3","images/words/呀-yā.mp3","images/words/呢-ní.mp3","images/words/和-hé.mp3","images/words/哪-nǎ.mp3","images/words/唱-chàng.mp3","images/words/四-sì.mp3","images/words/回-huí.mp3","images/words/因-yīn.mp3","images/words/园-yuán.mp3","images/words/土-tǔ.mp3","images/words/在-zài.mp3","images/words/地-dì.mp3","images/words/坐-zuò.mp3","images/words/声-shēng.mp3","images/words/处-chǔ.mp3","images/words/多-duō.mp3","images/words/大-dà.mp3","images/words/天-tiān.mp3","images/words/太-tài.mp3","images/words/头-tóu.mp3","images/words/女-nǚ.mp3","images/words/奶-nǎi.mp3","images/words/她-tā.mp3","images/words/妈-mā.mp3","images/words/姐-jiě.mp3","images/words/子-zǐ.mp3","images/words/学-xué.mp3","images/words/孩-hái.mp3","images/words/完-wán.mp3","images/words/定-dìng.mp3","images/words/家-jiā.mp3","images/words/对-duì.mp3","images/words/小-xiǎo.mp3","images/words/少-shǎo.mp3","images/words/就-jiù.mp3","images/words/尺-chǐ.mp3","images/words/山-shān.mp3","images/words/岁-suì.mp3","images/words/工-gōng.mp3","images/words/左-zuǒ.mp3","images/words/已-yǐ.mp3","images/words/巴-bā.mp3","images/words/巾-jīn.mp3","images/words/师-shī.mp3","images/words/带-dài.mp3","images/words/帮-bāng.mp3","images/words/常-cháng.mp3","images/words/干-gān.mp3","images/words/平-píng.mp3","images/words/年-nián.mp3","images/words/广-guǎng.mp3","images/words/座-zuò.mp3","images/words/开-kāi.mp3","images/words/往-wǎng.mp3","images/words/很-hěn.mp3","images/words/得-dé.mp3","images/words/心-xīn.mp3","images/words/忘-wàng.mp3","images/words/忙-máng.mp3","images/words/快-kuài.mp3","images/words/念-niàn.mp3","images/words/怕-pà.mp3","images/words/急-jí.mp3","images/words/总-zǒng.mp3","images/words/情-qíng.mp3","images/words/想-xiǎng.mp3","images/words/意-yì.mp3","images/words/成-chéng.mp3","images/words/我-wǒ.mp3","images/words/房-fáng.mp3","images/words/手-shǒu.mp3","images/words/才-cái.mp3","images/words/扫-sǎo.mp3","images/words/找-zhǎo.mp3","images/words/把-bǎ.mp3","images/words/拉-lā.mp3","images/words/收-shōu.mp3","images/words/放-fàng.mp3","images/words/文-wén.mp3","images/words/新-xīn.mp3","images/words/方-fāng.mp3","images/words/无-wú.mp3","images/words/日-rì.mp3","images/words/早-zǎo.mp3","images/words/时-shí.mp3","images/words/明-míng.mp3","images/words/星-xīng.mp3","images/words/春-chūn.mp3","images/words/是-shì.mp3","images/words/晚-wǎn.mp3","images/words/更-gēng.mp3","images/words/最-zuì.mp3","images/words/月-yuè.mp3","images/words/有-yǒu.mp3","images/words/朋-péng.mp3","images/words/木-mù.mp3","images/words/本-běn.mp3","images/words/朵-duǒ.mp3","images/words/机-jī.mp3","images/words/李-lǐ.mp3","images/words/条-tiáo.mp3","images/words/来-lái.mp3","images/words/林-lín.mp3","images/words/果-guǒ.mp3","images/words/树-shù.mp3","images/words/桃-táo.mp3","images/words/桥-qiáo.mp3","images/words/正-zhèng.mp3","images/words/母-mǔ.mp3","images/words/毛-máo.mp3","images/words/气-qì.mp3","images/words/水-shuǐ.mp3","images/words/江-jiāng.mp3","images/words/汽-qì.mp3","images/words/沙-shā.mp3","images/words/没-méi.mp3","images/words/河-hé.mp3","images/words/法-fǎ.mp3","images/words/洗-xǐ.mp3","images/words/活-huó.mp3","images/words/海-hǎi.mp3","images/words/淡-dàn.mp3","images/words/湖-hú.mp3","images/words/火-huǒ.mp3","images/words/点-diǎn.mp3","images/words/热-rè.mp3","images/words/照-zhào.mp3","images/words/爱-ài.mp3","images/words/父-fù.mp3","images/words/爷-yé.mp3","images/words/爸-bà.mp3","images/words/片-piàn.mp3","images/words/牙-yá.mp3","images/words/牛-niú.mp3","images/words/王-wáng.mp3","images/words/玩-wán.mp3","images/words/球-qiú.mp3","images/words/瓜-guā.mp3","images/words/生-shēng.mp3","images/words/用-yòng.mp3","images/words/田-tián.mp3","images/words/电-diàn.mp3","images/words/男-nán.mp3","images/words/画-huà.mp3","images/words/白-bái.mp3","images/words/百-bǎi.mp3","images/words/的-dí.mp3","images/words/皮-pí.mp3","images/words/目-mù.mp3","images/words/看-kàn.mp3","images/words/真-zhēn.mp3","images/words/着-zhuó.mp3","images/words/知-zhī.mp3","images/words/短-duǎn.mp3","images/words/石-shí.mp3","images/words/禾-hé.mp3","images/words/秀-xiù.mp3","images/words/秋-qiū.mp3","images/words/种-zhǒng.mp3","images/words/空-kōng.mp3","images/words/立-lì.mp3","images/words/童-tóng.mp3","images/words/竹-zhú.mp3","images/words/笑-xiào.mp3","images/words/米-mǐ.mp3","images/words/红-hóng.mp3","images/words/级-jí.mp3","images/words/练-liàn.mp3","images/words/给-gěi.mp3","images/words/绿-lǜ.mp3","images/words/网-wǎng.mp3","images/words/羊-yáng.mp3","images/words/美-měi.mp3","images/words/老-lǎo.mp3","images/words/耳-ěr.mp3","images/words/脸-liǎn.mp3","images/words/自-zì.mp3","images/words/节-jié.mp3","images/words/花-huā.mp3","images/words/苗-miáo.mp3","images/words/苦-kǔ.mp3","images/words/草-cǎo.mp3","images/words/虫-chóng.mp3","images/words/虾-xiā.mp3","images/words/蚁-yǐ.mp3","images/words/蚂-mǎ.mp3","images/words/行-háng.mp3","images/words/衣-yī.mp3","images/words/西-xī.mp3","images/words/要-yào.mp3","images/words/见-jiàn.mp3","images/words/认-rèn.mp3","images/words/让-ràng.mp3","images/words/许-xǔ.mp3","images/words/诗-shī.mp3","images/words/话-huà.mp3","images/words/语-yǔ.mp3","images/words/说-shuō.mp3","images/words/请-qǐng.mp3","images/words/谁-shéi.mp3","images/words/象-xiàng.mp3","images/words/贝-bèi.mp3","images/words/走-zǒu.mp3","images/words/赶-gǎn.mp3","images/words/起-qǐ.mp3","images/words/足-zú.mp3","images/words/跑-pǎo.mp3","images/words/跟-gēn.mp3","images/words/跳-tiào.mp3","images/words/车-chē.mp3","images/words/边-biān.mp3","images/words/过-guò.mp3","images/words/这-zhè.mp3","images/words/进-jìn.mp3","images/words/远-yuǎn.mp3","images/words/连-lián.mp3","images/words/送-sòng.mp3","images/words/选-xuǎn.mp3","images/words/道-dào.mp3","images/words/那-nà.mp3","images/words/都-dū.mp3","images/words/里-lǐ.mp3","images/words/量-liáng.mp3","images/words/长-cháng.mp3","images/words/门-mén.mp3","images/words/闭-bì.mp3","images/words/问-wèn.mp3","images/words/间-jiān.mp3","images/words/队-duì.mp3","images/words/阳-yáng.mp3","images/words/雨-yǔ.mp3","images/words/雪-xuě.mp3","images/words/非-fēi.mp3","images/words/面-miàn.mp3","images/words/风-fēng.mp3","images/words/飞-fēi.mp3","images/words/香-xiāng.mp3","images/words/马-mǎ.mp3","images/words/高-gāo.mp3","images/words/鱼-yú.mp3","images/words/鸟-niǎo.mp3","images/words/黄-huáng.mp3","images/words/齐-qí.mp3"
  ];
  this.lesson_number = [
    'images/numbers/0.svg',
    'images/numbers/1.svg',
    'images/numbers/2.svg',
    'images/numbers/3.svg',
    'images/numbers/4.svg',
    'images/numbers/5.svg',
    'images/numbers/6.svg',
    'images/numbers/7.svg',
    'images/numbers/8.svg',
    'images/numbers/9.svg',
  ]; 

  this.number_audio = {
    '/images/numbers/0.svg':"images/words/零-líng.mp3",
    '/images/numbers/1.svg':"images/words/一-yī.mp3",
    '/images/numbers/2.svg':"images/words/二-èr.mp3",
    '/images/numbers/3.svg':"images/words/三-sān.mp3",
    '/images/numbers/4.svg':"images/words/四-sì.mp3",
    '/images/numbers/5.svg':"images/words/五-wǔ.mp3",
    '/images/numbers/6.svg':"images/words/六-liù.mp3",
    '/images/numbers/7.svg':"images/words/七-qī.mp3",
    '/images/numbers/8.svg':"images/words/八-bā.mp3",
    '/images/numbers/9.svg':"images/words/九-jiǔ.mp3"
  };

  this.lesson_1 = [
    'images/words/天-5929.svg',
    'images/words/地-5730.svg',
    'images/words/人-4EBA.svg',
    'images/words/你-4F60.svg',
    'images/words/我-6211.svg',
    'images/words/他-4ED6.svg',
    'images/words/金-91D1.svg',
    'images/words/木-6728.svg',
    'images/words/水-6C34.svg',
    'images/words/火-706B.svg',
    'images/words/土-571F.svg',
    'images/words/一-4E00.svg',
    'images/words/二-4E8C.svg',
    'images/words/三-4E09.svg',
    'images/words/四-56DB.svg',
    'images/words/五-4E94.svg',
    'images/words/上-4E0A.svg',
    'images/words/下-4E0B.svg',
    'images/words/日-65E5.svg',
    'images/words/月-6708.svg',
  ]; 
  this.lesson_2 = [
    'images/words/金-91D1.svg',
    'images/words/木-6728.svg',
    'images/words/水-6C34.svg',
    'images/words/火-706B.svg',
    'images/words/土-571F.svg',
  ];

  this.lesson_2_1 = [
    'images/words/一-4E00.svg',
    'images/words/二-4E8C.svg',
    'images/words/三-4E09.svg',
    'images/words/四-56DB.svg',
    'images/words/五-4E94.svg',
    'images/words/上-4E0A.svg',
    'images/words/下-4E0B.svg',
  ];

  this.lesson_2_2 = [
    'images/words/金-91D1.svg',
    'images/words/木-6728.svg',
    'images/words/水-6C34.svg',
    'images/words/火-706B.svg',
    'images/words/土-571F.svg',
    'images/words/天-5929.svg',
    'images/words/地-5730.svg',
    'images/words/分-5206.svg',
    'images/words/上-4E0A.svg',
    'images/words/下-4E0B.svg',
    'images/words/日-65E5.svg',
    'images/words/月-6708.svg',
    'images/words/照-7167.svg',
    'images/words/今-4ECA.svg',
    'images/words/古-53E4.svg',
  ];

  this.gifts = [ 
    'images/gifts/0.png',
    'images/gifts/1.png',
    'images/gifts/2.png',
    'images/gifts/3.png',
    'images/gifts/4.png',
    'images/gifts/5.png',
    'images/gifts/6.png',
    'images/gifts/7.png',
    'images/gifts/8.png',
    'images/gifts/9.png',
    'images/gifts/10.png',
    'images/gifts/11.png',
    'images/gifts/12.png',
    'images/gifts/13.png',
    'images/gifts/14.png',
    'images/gifts/15.png',
    'images/gifts/16.png',
    'images/gifts/17.png',
    'images/gifts/18.png',
    'images/gifts/19.png',
    'images/gifts/20.png',
    'images/gifts/21.png',
    'images/gifts/22.png',
    'images/gifts/23.png',
    'images/gifts/24.png',
    'images/gifts/25.png',
    'images/gifts/26.png',
    'images/gifts/27.png',
    'images/gifts/28.png',
  ];
  this.nums = [
    'images/0.png',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
  ];
  this.xnums = [
    'images/x0.png',
    'images/x1.png',
    'images/x2.png',
    'images/x3.png',
    'images/x4.png',
    'images/x5.png',
  ];
  this.pnums = [
    'images/p0.png',
    'images/p1.png',
    'images/p2.png',
    'images/p3.png',
    'images/p4.png',
    'images/p5.png',
    'images/p6.png',
    'images/p7.png',
    'images/p8.png',
    'images/p9.png',
  ];
  return this;
}

LinkGame.prototype = {
  init: function (isReset) {
    var self = this;
    this.stack = [];
    this.iconTypeCount = this.level + 11; // 图片的种类
    this.count = (this.rows - 2) * (this.cols - 2); // 图片的总数
    this.remain = this.count; // 剩余的未有消去的图片
    this.pictures = []; // 图片集合
    this.linkPictures = [];
    this.preClickInfo = null; // 上一次被点中的图片信息
    this.leftTime = 300; // 剩余时间
    this.points = []; // 图片可以相消时的拐点集合
    this.timmer = setInterval(function () {
      self.updateCountDown();
    }, 1000);
    this.createMap();
    this.disorder();
    !isReset && this.bindDomEvents();
    this.updateLevel();
    this.domUpdateScore();
  },
  reset: function () {
    this.init(true);
  },
  nextLevel: function () {
    clearInterval(this.timmer);
    this.reset();
  },
  // 模板替换
  replaceTpl: function (tpl, data) {
    return tpl.replace(/\${(\w+)}/ig, function (match, $1) {
      return data[$1];
    });
  },
  // 合并数组，并把相同的元素排除掉
  mergeArray: function (target, source) {
    source.forEach(function (e) {
      if (target.indexOf(e) === -1) {
        target.push(e);
      }
    })
  },
  // 生成一定范围内的随机数
  random: function (min, max) {
    return parseInt((Math.random() * max) + min);
  },

  shuffleArray: function (array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  },
  // 交换对象属性
  swapProperties: function (obj1, obj2, properties) {
    properties.forEach(function (property) {
      var temp = obj1[property];
      obj1[property] = obj2[property];
      obj2[property] = temp;
    });
  },
  // 克隆对象（浅克隆）
  cloneObj: function (source) {
    var target = {};
    for (var pro in source) {
      source.hasOwnProperty(pro) && (target[pro] = source[pro]);
    }
    return target;
  },
  // 获取历史记录
  getHistoryScore: function () {
    return window.localStorage.getItem('highestScore') || 0;
  },
  // 保存最高分
  setHistoryScore: function (score) {
    var highestScore = this.getHistoryScore('highestScore');
    if (score > highestScore) {
      window.localStorage.setItem('highestScore', score);
    }

  },

  updateDomNumbers: function ($container, value, type) {
    var numList = [];
    var nums = type === 1 ? this.nums : (type === 2 ? this.xnums : this.pnums);
    $container.html('');
    do {
      numList.push(value % 10);
      value = parseInt(value / 10);
    } while (value > 0);

    while (numList.length) {
      $container.append(this.replaceTpl('<img src="${src}" />', {
        src: nums[numList.pop()]
      }));
    }
  },

  updateCountDown: function () {
    --this.leftTime;
    if (this.leftTime < 0) {
      clearInterval(this.timmer);
      this.gameOver();
      return;
    }
    this.updateDomNumbers($('.time'), this.leftTime, 1);
  },
  gameOver: function () {
    $('.game-over').removeClass('hidden').find('.history-score').text(this.getHistoryScore() || 0);
    this.updateDomNumbers($('.current-score'), this.score, 3);
    this.setHistoryScore(this.score);
  },

  updateLevel: function () {
    this.updateDomNumbers($('.level'), this.level + 1, 1);
  },
  createMap: function () {
    this.gifts = this.gifts.concat(this.lesson_1).concat(this.lesson_number);
    this.gifts = this.shuffleArray(this.gifts);
    var count = 0;
    for (var row = 0; row < this.rows; row++) {
      this.pictures.push([]);
      for (var col = 0; col < this.cols; col++) {
        // 边界元素
        if (row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1) {
          this.pictures[row].push({
            row: row,
            col: col,
            isEmpty: true,
            isBoundary: true
          });

          // 内部元素
        } else {
          this.pictures[row].push({
            row: row,
            col: col,
            isEmpty: false,
            index: count,
            pic: this.gifts[parseInt(count / 2) % this.iconTypeCount],
            width: this.cellWidth,
            height: this.cellHeight,
            isBoundary: false
          });
          count++;
        }

      }
    }
  },
  // 打乱顺序
  disorder: function () {
    var pictures = this.pictures;
    var random = this.random.bind(this);
    for (var i = 0; i < this.count * 10; i++) {
      // 随机选中2张图片，调用this.swapProperties交换俩人的pic和isEmpty属性
      var picture1 = pictures[random(1, this.rows - 2)][random(1, this.cols - 2)];
      var picture2 = pictures[random(1, this.rows - 2)][random(1, this.cols - 2)];
      this.swapProperties(picture1, picture2, ['pic', 'isEmpty']);
    }
    this.renderMap();
    this.updateDisorderTime();
  },

  updateDisorderTime: function () {
    this.updateDomNumbers($('.disorder'), this.leftDisorderTime, 2);
  },
  renderMap: function () {
    this.$box.html(''); // 将视图清空
    var html = '';
    var pictures = this.pictures;
    var tpl = '<td><div class="pic-box ${empty}" data-row="${row}" data-col="${col}" data-index="${index}"><img class="pic" draggable=false src="${pic}" width=${width} height=${height} /></div></td>';
    for (var row = 1; row < this.rows - 1; row++) {
      html += '<tr class="game-row">';
      for (var col = 1; col < this.cols - 1; col++) {
        var picture = this.cloneObj(pictures[row][col]);
        picture.empty = picture.isEmpty ? 'empty' : '';
        html += this.replaceTpl(tpl, picture);
      }
      html += '</tr>';
    }
    this.$box.html(html);
  },

  // 检测连通性
  checkMatch: function (curClickInfo) {
    var pictures = this.pictures,
      preClickInfo = this.preClickInfo ? this.preClickInfo : {},
      preRow = +preClickInfo.row,
      preCol = +preClickInfo.col,
      preIndex = +preClickInfo.index,
      curRow = +curClickInfo.row,
      curCol = +curClickInfo.col,
      curIndex = +curClickInfo.index;

    // 如果点击的图片是空白的，则退出
    if (pictures[curRow][curCol].isEmpty) {
      return;
    }
    this.preClickInfo = curClickInfo;
    this.domAddActive(curIndex);
    if (preIndex !== preIndex) { // NaN
      return;
    }


    // 如果前后2次点击的是同一张图片，或者2张图片不是同类型的，则退出
    if (preIndex === curIndex || pictures[preRow][preCol].pic !== pictures[curRow][curCol].pic) {
      this.domRemoveActive(preIndex);
      return;
    }
    if (this.canCleanup(preCol, preRow, curCol, curRow)) {
      this.linkPictures = [];
      for (var i = 0; i < this.points.length - 1; i++) {
        this.mergeArray(this.linkPictures, this.countPoints(this.points[i], this.points[i + 1]));
      }
      this.drawLine();
      
      //随机报喜
      if(this.getRandom(10)%3==0){
        //成功播放声音
        setTimeout(function(){
        $("#yes")[0].play();
        }, 300);  
      }

      this.updateStatus(preRow, preCol, curRow, curCol, preIndex, curIndex);
    } else {
      setTimeout(function(){
        $("#no")[0].play();
      }, 1000);  
      this.domRemoveActive(preIndex);
    }
  },

  getRandom:function(n){
    return Math.floor(Math.random()*n+1)
  },

  isKeyExists :function(obj,key){
    if( obj[key] == undefined ){
        return false;
    }else{
        return true;
    }
  },

  countPoints: function (start, end) {
    var points = [];
    var pictures = this.pictures;
    if (start[0] === end[0]) { // 同列
      var x = start[0];
      if (start[1] > end[1]) { // 从下到上
        for (var i = start[1]; i >= end[1]; i--) {
          points.push(pictures[i][x]);
        }
      } else { // 从上到下
        for (var i = start[1]; i <= end[1]; i++) {
          points.push(pictures[i][x]);
        }
      }
    } else if (start[1] === end[1]) { // 同行
      var y = start[1];
      if (start[0] > end[0]) { // 从右到左
        for (var i = start[0]; i >= end[0]; i--) {
          points.push(pictures[y][i]);
        }
      } else { // 从左到右
        for (var i = start[0]; i <= end[0]; i++) {
          points.push(pictures[y][i]);
        }
      }
    }
    return points;
  },

  domAddActive: function (index) {
    $('.game-row .pic-box').eq(index).addClass('active');
    return this;
  },
  domRemoveActive: function (index) {
    $('.game-row .pic-box').eq(index).removeClass('active');
    return this;
  },

  domAddEmpty: function (index) {
    $('.game-row .pic-box').eq(index).addClass('empty').removeClass('active');
    return this;
  },

  // 记分
  domUpdateScore: function () {
    this.updateDomNumbers($('.scoring'), this.score, 1);
  },

  // 连线
  drawLine: function (callback) {
    var $canvas = $('#canvas');
    if (!$canvas[0].getContext('2d')) return; // 不支持Canvas
    var linkList = this.linkPictures;
    var coordinate = [];
    for (var i = 0; i < linkList.length; i++) {
      var x = linkList[i].col === 0 ? 0 : (linkList[i].col === this.cols - 1 ? $('#game').width() : linkList[i].col * 80 - 40);
      var y = linkList[i].row === 0 ? 0 : (linkList[i].row === this.rows - 1 ? $('#game').height() : linkList[i].row * 80 - 40);
      coordinate.push([x, y]);
    }
    var ctx = $canvas[0].getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = "#fbff98";
    ctx.fillStyle = "#fbff98";
    ctx.lineWidth = 4;
    ctx.save();
    for (var i = 0; i < linkList.length; i++) {
      if (i === 0) {
        ctx.moveTo(coordinate[i][0], coordinate[i][1]);
      }
      ctx.lineTo(coordinate[i][0], coordinate[i][1]);
    }
    ctx.stroke();
    ctx.restore();
    $canvas.removeClass('hidden');
    setTimeout(function () {
      ctx.clearRect(0, 0, 800, 800);
      $canvas.addClass('hidden');
    }, 200);

  },

  updateStatus: function (preRow, preCol, curRow, curCol, preIndex, curIndex) {
    var self = this;
    this.remain -= 2;
    this.score += 10 * (this.linkPictures.length - 1);
    this.preClickInfo = null;
    this.domUpdateScore();
    setTimeout(function () {
      self.pictures[preRow][preCol].isEmpty = true;
      self.pictures[curRow][curCol].isEmpty = true;
      self.domAddEmpty(preIndex).domAddEmpty(curIndex);
      if (self.remain === 0) {
        ++self.level;
        self.nextLevel();
      }
    }, 200);
  },
  isRowEmpty: function (x1, y1, x2, y2) {
    if (y1 != y2) {
      return false;
    }
    x1 > x2 && (x1 = x1 + x2, x2 = x1 - x2, x1 = x1 - x2); //强制x1比x2小
    for (var j = x1 + 1; j < x2; ++j) { //from (x2,y2+1) to (x2,y1-1);
      if (!this.pictures[y1][j].isEmpty) {
        return false;
      }
    }
    return true;
  },
  isColEmpty: function (x1, y1, x2, y2) {
    if (x1 != x2) {
      return false;
    }
    y1 > y2 && (y1 = y1 + y2, y2 = y1 - y2, y1 = y1 - y2); //强制y1比y2小

    for (var i = y1 + 1; i < y2; ++i) { //from (x2+1,y2) to (x1-1,y2);
      if (!this.pictures[i][x1].isEmpty) {
        return false;
      }
    }
    return true;
  },

  addPoints: function () {
    var args = arguments,
      len = args.length,
      i = 0;

    for (; i < len;) {
      this.points.push(args[i++]);
    }
  },
  // 判断两个坐标是否可以相互消除
  canCleanup: function (x1, y1, x2, y2) {
    this.points = [];
    if (x1 === x2) {
      if (1 === y1 - y2 || 1 === y2 - y1) { //相邻
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else if (this.isColEmpty(x1, y1, x2, y2)) { //直线
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else { //两个拐点	(优化)
        var i = 1;
        while ((x1 + i < this.cols) && this.pictures[y1][x1 + i].isEmpty) {
          if (!this.pictures[y2][x2 + i].isEmpty) {
            break;
          } else {
            if (this.isColEmpty(x1 + i, y1, x1 + i, y2)) {
              this.addPoints([x1, y1], [x1 + i, y1], [x1 + i, y2], [x2, y2]);
              return true;
            }
            i++;
          }
        }
        i = 1;
        while ((x1 - i >= 0) && this.pictures[y1][x1 - i].isEmpty) {
          if (!this.pictures[y2][x2 - i].isEmpty) {
            break;
          } else {
            if (this.isColEmpty(x1 - i, y1, x1 - i, y2)) {
              this.addPoints([x1, y1], [x1 - i, y1], [x1 - i, y2], [x2, y2]);
              return true;
            }
            i++;
          }
        }

      }
    }

    if (y1 === y2) { //同行
      if (1 === x1 - x2 || 1 === x2 - x1) {
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else if (this.isRowEmpty(x1, y1, x2, y2)) {
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else {
        var i = 1;
        while ((y1 + i < this.rows) && this.pictures[y1 + i][x1].isEmpty) {
          if (!this.pictures[y2 + i][x2].isEmpty) {
            break;
          } else {
            if (this.isRowEmpty(x1, y1 + i, x2, y1 + i)) {
              this.addPoints([x1, y1], [x1, y1 + i], [x2, y1 + i], [x2, y2]);
              return true;
            }
            i++;
          }
        }
        i = 1;
        while ((y1 - i >= 0) && this.pictures[y1 - i][x1].isEmpty) {
          if (!this.pictures[y2 - i][x2].isEmpty) {
            break;
          } else {
            if (this.isRowEmpty(x1, y1 - i, x2, y1 - i)) {
              this.addPoints([x1, y1], [x1, y1 - i], [x2, y1 - i], [x2, y2]);
              return true;
            }
            i++;
          }
        }
      }
    }

    //一个拐点
    if (this.isRowEmpty(x1, y1, x2, y1) && this.pictures[y1][x2].isEmpty) { // (x1,y1) -> (x2,y1)
      if (this.isColEmpty(x2, y1, x2, y2)) { // (x1,y2) -> (x2,y2)
        this.addPoints([x1, y1], [x2, y1], [x2, y2]);
        return true;
      }
    }
    if (this.isColEmpty(x1, y1, x1, y2) && this.pictures[y2][x1].isEmpty) {
      if (this.isRowEmpty(x1, y2, x2, y2)) {
        this.addPoints([x1, y1], [x1, y2], [x2, y2]);
        return true;
      }
    }

    //不在一行的两个拐点
    if (x1 != x2 && y1 != y2) {
      i = x1;
      while (++i < this.cols) {
        if (!this.pictures[y1][i].isEmpty) {
          break;
        } else {
          if (this.isColEmpty(i, y1, i, y2) && this.isRowEmpty(i, y2, x2, y2) && this.pictures[y2][i].isEmpty) {
            this.addPoints([x1, y1], [i, y1], [i, y2], [x2, y2]);
            return true;
          }
        }
      }

      i = x1;
      while (--i >= 0) {
        if (!this.pictures[y1][i].isEmpty) {
          break;
        } else {
          if (this.isColEmpty(i, y1, i, y2) && this.isRowEmpty(i, y2, x2, y2) && this.pictures[y2][i].isEmpty) {
            this.addPoints([x1, y1], [i, y1], [i, y2], [x2, y2]);
            return true;
          }
        }
      }

      i = y1;
      while (++i < this.rows) {
        if (!this.pictures[i][x1].isEmpty) {
          break;
        } else {
          if (this.isRowEmpty(x1, i, x2, i) && this.isColEmpty(x2, i, x2, y2) && this.pictures[i][x2].isEmpty) {
            this.addPoints([x1, y1], [x1, i], [x2, i], [x2, y2]);
            return true;
          }
        }
      }

      i = y1;
      while (--i >= 0) {
        if (!this.pictures[i][x1].isEmpty) {
          break;
        } else {
          if (this.isRowEmpty(x1, i, x2, i) && this.isColEmpty(x2, i, x2, y2) && this.pictures[i][x2].isEmpty) {
            this.addPoints([x1, y1], [x1, i], [x2, i], [x2, y2]);
            return true;
          }
        }
      }
    }

    return false;
  },
  bindDomEvents: function () {
    var self = this;
    $('.wrapper').on('click', '.pic-box', function () {
      var supportDataSet = this.dataset ? true : false;
      var data = { // 兼容IE不支持dataset
        row: supportDataSet ? this.dataset.row : this.getAttribute('data-row'),
        col: supportDataSet ? this.dataset.col : this.getAttribute('data-col'),
        index: supportDataSet ? this.dataset.index : this.getAttribute('data-index')
      }
      //点击播放声音
      if($(this).css("opacity") > 0) {
      var imgSrc = $(this).children("img.pic")[0].src;
      var imgSrcDecode = decodeURIComponent(imgSrc);
      var reg = /[\u4E00-\u9FFF]/g;
      var keyArr = imgSrcDecode.match(reg);
      if(keyArr!=undefined){
      //没有声音的不播放
      var key = keyArr[0];
      $.each(self.audios, function(i, item){
          if(item.indexOf(key)>=0){
            if($("#"+key)[0]!=undefined){
              $("#"+key)[0].play();
            }else{
              var audio = document.createElement('audio');
              audio.setAttribute('id', key);
              audio.src = item;
              document.body.appendChild(audio);
              audio.play();
            }
          }
      });
     }
     //找数字语音
     const urlc = new URL(imgSrcDecode);
     var key = urlc.pathname;
     if(self.isKeyExists(self.number_audio, key)){
      var strkey = key.replace(/\//g, "-");
      if($("#"+strkey)[0]!=undefined){
        $("#"+strkey)[0].play();
      }else{
        var audio = document.createElement('audio');
        audio.setAttribute('id', strkey);
        audio.src = self.number_audio[key];
        document.body.appendChild(audio);
        audio.play();
      }
     }
     //找数字结束
    }
    //点击播放
      self.checkMatch(data);
    }).on('click', '.disorder', function (event) {
      self.leftDisorderTime-- > 0 && self.disorder();
    }).on('click', '.replay-btn', function () {
      self.score = 0;
      self.level = 0;
      self.leftDisorderTime = 5;
      $('.game-over').addClass('hidden');
      self.reset();
    });

    // window.onbeforeunload = function (event) {
    //   return confirm("游戏可能会终止，您确定要刷新？");
    // };
  }
};


$(function () {
  $('.start-btn').click(function () {
    //$('audio').get(0).play();
    $('.init-box').addClass('hidden');
    $('.game-box').removeClass('hidden');
    var gameConfig = {
      cellWidth: 42,
      cellHeight: 42,
      rows: 7,
      cols: 10,
      level: 0,
    }
    new LinkGame(gameConfig).init();
  });
});