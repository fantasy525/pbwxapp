/**
 * Created by zxf on 2018.2.4.
 */
/**
 * Created by zxf on 2017.11.30.
 */
const Syndrome = {
  getScores(answers) {
    var bianzheng1 = answers[3].value;
    var bianzheng2 = answers[4].value;
    var bianzheng3 = answers[5].value;
    var bianzheng4 = answers.S04_FREQUENTMICTURITION;
    var bianzheng5 = answers.S05_COLDLIMBS;
    var bianzheng6 = answers.S06_POORURINEADNLIGHTCOLOR;
    var bianzheng7 = answers.S07_EXHAUSTED;
    var bianzheng8 = answers.S08_EASYCOLD;
    var bianzheng9 = answers.S09_LIPS;
    var bianzheng10 = answers.S10_EYESTRAIN;
    var bianzheng11 = answers.S11_DIET;
    var bianzheng12 = answers.S12_DIARRHEA;
    var bianzheng13 = answers.S13_COUGH;
    var bianzheng14 = answers.S14_CONSTIPATION;
    var bianzheng15 = answers.S15_UNSHAPED;
    var bianzheng16 = answers.S16_EYEDRY;
    var bianzheng17 = answers.S17_HALITOSIS;
    var bianzheng18 = answers.S18_DIZZY;
    var bianzheng19 = answers.S19_ANGRY;
    var bianzheng20 = answers.S20_STING;
    var bianzheng21 = answers.S21_DRYTONGUE;
    var bianzheng22 = answers.S22_TONGUECOLOR;
    var bianzheng23 = answers.S23_DULLRED;

    var scores = new Array();
    scores[0] = bianzheng1 * 2 + bianzheng2 * 2;
    scores[1] = bianzheng2 * 1 + bianzheng3 * 2 + bianzheng4 * 1;
    scores[2] = bianzheng5 * 2 + bianzheng6 * 2;
    scores[3] = bianzheng7 * 2 + bianzheng8 * 1 + bianzheng14 * 1;
    scores[4] = bianzheng9 * 2 + bianzheng10 * 2;
    scores[5] = bianzheng7 * 1 + bianzheng11 * 1 + bianzheng12 * 2;
    scores[6] = bianzheng13 * 2 + bianzheng22 * 6;
    scores[7] = bianzheng14 * 1 + bianzheng16 * 1 + bianzheng21 * 6;
    scores[8] = bianzheng15 * 2 + bianzheng17 * 2;
    scores[9] = bianzheng18 * 2 + bianzheng19 * 2;
    scores[10] = bianzheng20 * 2 + bianzheng23 * 6;

    return scores;
  },
  nameOfZhengXing(scores) {

    var aNames = new Array();
    aNames[0] = "髓减证";
    aNames[1] = "肾虚";
    aNames[2] = "阳虚";
    aNames[3] = "气虚";
    aNames[4] = "血虚";
    aNames[5] = "脾虚";
    aNames[6] = "痰浊蒙窍证";
    aNames[7] = "阴虚";
    aNames[8] = "热毒内盛证";
    aNames[9] = "肝阳上亢证";
    aNames[10] = "瘀血阻络证";

    var bNames = new Array();
    bNames[0] = "髓海不足，肾精亏虚证";
    bNames[1] = "肾阳虚证";
    bNames[2] = "肾阴虚证";
    bNames[3] = "肾气虚证";
    bNames[4] = "脾肾两虚证";
    bNames[5] = "阳气亏虚证";
    bNames[6] = "阴阳两虚证";
    bNames[7] = "气血亏虚证";
    bNames[8] = "脾气亏虚证";
    bNames[9] = "痰浊血瘀证";
    bNames[10] = "肝火亢盛证";
    bNames[11] = "肝肾亏虚证";
    bNames[12] = "脾肾阳虚证";
    bNames[13] = "肝肾阴虚证";
    bNames[14] = "肾阳虚证";

    var reString = "";
    var countOfOverSix = 0;
    var saveIndexOfOverSix = new Array();
    var indexOfOverSix = 0;
    for (var i = 0; i < scores.length; i++) {
      if (scores[i] > 6) {
        countOfOverSix++;
        saveIndexOfOverSix[indexOfOverSix] = i;
        indexOfOverSix++;
      }
    }

    if (countOfOverSix == 0) {
      reString = "平和体质；";
    } else if (countOfOverSix == 1) {
      // A finished
      reString = aNames[saveIndexOfOverSix[0]] + "；";
    } else if (countOfOverSix == 2) {
      if (this.isCaseB(saveIndexOfOverSix) >= 0) {
        // B finished
        reString = bNames[this.isCaseB(saveIndexOfOverSix)] + "；";
      } else {
        // C1 finished
        reString = this.caseC1(saveIndexOfOverSix, scores, aNames) + "；";
      }
    } else if (countOfOverSix == 3) {
      if (this.isCaseB(saveIndexOfOverSix) >= 0) {
        // B finished
        reString = bNames[this.isCaseB(saveIndexOfOverSix)] + "；";
      } else {
        // C2 finished
        reString = this.caseC2(saveIndexOfOverSix, scores, aNames, bNames) + "；";
      }
    } else if (countOfOverSix >= 4) {
      // C3 finished
      reString = this.caseC3(saveIndexOfOverSix, scores, aNames, bNames) + "；";
    }

    return reString;
  },
  isCaseB(tmpSaveIndexOfOverSix) {
    var tag = -1;
    if (tmpSaveIndexOfOverSix.length == 2) {
      if (tmpSaveIndexOfOverSix[0] == 0 && tmpSaveIndexOfOverSix[1] == 1) {
        tag = 0;
      } else if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 2) {
        tag = 1;
      } else if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 7) {
        tag = 2;
      } else if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 3) {
        tag = 3;
      } else if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 5) {
        tag = 4;
      } else if (tmpSaveIndexOfOverSix[0] == 2 && tmpSaveIndexOfOverSix[1] == 3) {
        tag = 5;
      } else if (tmpSaveIndexOfOverSix[0] == 2 && tmpSaveIndexOfOverSix[1] == 7) {
        tag = 6;
      } else if (tmpSaveIndexOfOverSix[0] == 3 && tmpSaveIndexOfOverSix[1] == 4) {
        tag = 7;
      } else if (tmpSaveIndexOfOverSix[0] == 3 && tmpSaveIndexOfOverSix[1] == 5) {
        tag = 8;
      } else if (tmpSaveIndexOfOverSix[0] == 6 && tmpSaveIndexOfOverSix[1] == 10) {
        tag = 9;
      } else if (tmpSaveIndexOfOverSix[0] == 8 && tmpSaveIndexOfOverSix[1] == 9) {
        tag = 10;
      } else if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 9) {
        tag = 11;
      }
    } else if (tmpSaveIndexOfOverSix.length == 3) {
      if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 2 && tmpSaveIndexOfOverSix[2] == 5) {
        tag = 12;
      } else if (tmpSaveIndexOfOverSix[0] == 1 && tmpSaveIndexOfOverSix[1] == 7 && tmpSaveIndexOfOverSix[2] == 9) {
        tag = 13;
      } else if (tmpSaveIndexOfOverSix[0] == 0 && tmpSaveIndexOfOverSix[1] == 1 && tmpSaveIndexOfOverSix[2] == 2) {
        tag = 14;
      }
    }
    return tag;
  },
  caseC1(tmpSaveIndexOfOverSix, tmpScores, tmpANames) {
    var reString = "";
    if (tmpScores[tmpSaveIndexOfOverSix[0]] > tmpScores[tmpSaveIndexOfOverSix[1]]) {
      reString = tmpANames[tmpSaveIndexOfOverSix[0]];
    } else if (tmpScores[tmpSaveIndexOfOverSix[0]] == tmpScores[tmpSaveIndexOfOverSix[1]]) {
      if (tmpSaveIndexOfOverSix[0] == 6 || tmpSaveIndexOfOverSix[1] == 6) {
        reString = tmpANames[6];
        if (tmpSaveIndexOfOverSix[0] == 6) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        }
      } else if (tmpSaveIndexOfOverSix[0] == 10 || tmpSaveIndexOfOverSix[1] == 10) {
        reString = tmpANames[10];
        if (tmpSaveIndexOfOverSix[0] == 10) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        }
      } else {
        reString = tmpANames[tmpSaveIndexOfOverSix[0]] + "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
      }
    } else if (tmpScores[tmpSaveIndexOfOverSix[0]] < tmpScores[tmpSaveIndexOfOverSix[1]]) {
      reString = tmpANames[tmpSaveIndexOfOverSix[1]];
    }
    return reString;
  },
  caseC2(tmpSaveIndexOfOverSix, tmpScores, tmpANames, tmpBNames) {
    var reString = "";

    if ((tmpSaveIndexOfOverSix[0] == 6 && tmpSaveIndexOfOverSix[1] == 10) ||
      (tmpSaveIndexOfOverSix[0] == 6 && tmpSaveIndexOfOverSix[2] == 10) ||
      (tmpSaveIndexOfOverSix[1] == 6 && tmpSaveIndexOfOverSix[2] == 10)) {
      reString = tmpBNames[this.isCaseB([6, 10])];
      if (tmpSaveIndexOfOverSix[0] == 6 && tmpSaveIndexOfOverSix[1] == 10) {
        reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
      } else if (tmpSaveIndexOfOverSix[0] == 6 && tmpSaveIndexOfOverSix[2] == 10) {
        reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
      } else if (tmpSaveIndexOfOverSix[1] == 6 && tmpSaveIndexOfOverSix[2] == 10) {
        reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
      }
    } else if ((tmpSaveIndexOfOverSix[0] == 3 && tmpSaveIndexOfOverSix[1] == 4) ||
      (tmpSaveIndexOfOverSix[0] == 3 && tmpSaveIndexOfOverSix[2] == 4) ||
      (tmpSaveIndexOfOverSix[1] == 3 && tmpSaveIndexOfOverSix[2] == 4)) {
      reString = tmpBNames[this.isCaseB([3, 4])];
      if (tmpSaveIndexOfOverSix[0] == 3 && tmpSaveIndexOfOverSix[1] == 4) {
        reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
      } else if (tmpSaveIndexOfOverSix[0] == 3 && tmpSaveIndexOfOverSix[2] == 4) {
        reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
      } else if (tmpSaveIndexOfOverSix[1] == 3 && tmpSaveIndexOfOverSix[2] == 4) {
        reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
      }
    } else if (tmpSaveIndexOfOverSix[0] == 6 || tmpSaveIndexOfOverSix[1] == 6 || tmpSaveIndexOfOverSix[2] == 6) {
      reString = tmpANames[6];
      if (tmpSaveIndexOfOverSix[0] == 6) {
        if (tmpScores[tmpSaveIndexOfOverSix[1]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[1] == 6) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[2] == 6) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[1]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        }
      }
    } else if (tmpSaveIndexOfOverSix[0] == 10 || tmpSaveIndexOfOverSix[1] == 10 || tmpSaveIndexOfOverSix[2] == 10) {
      reString = tmpANames[10];
      if (tmpSaveIndexOfOverSix[0] == 10) {
        if (tmpScores[tmpSaveIndexOfOverSix[1]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[1] == 10) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[2] == 10) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[1]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        }
      }
    } else if (tmpSaveIndexOfOverSix[0] == 8 || tmpSaveIndexOfOverSix[1] == 8 || tmpSaveIndexOfOverSix[2] == 8) {
      reString = tmpANames[8];
      if (tmpSaveIndexOfOverSix[0] == 8) {
        if (tmpScores[tmpSaveIndexOfOverSix[1]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[1] == 8) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[2] == 8) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[1]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        }
      }
    } else if (tmpSaveIndexOfOverSix[0] == 9 || tmpSaveIndexOfOverSix[1] == 9 || tmpSaveIndexOfOverSix[2] == 9) {
      reString = tmpANames[9];
      if (tmpSaveIndexOfOverSix[0] == 9) {
        if (tmpScores[tmpSaveIndexOfOverSix[1]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[1] == 9) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[2]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[2]];
        }
      } else if (tmpSaveIndexOfOverSix[2] == 9) {
        if (tmpScores[tmpSaveIndexOfOverSix[0]] >= tmpScores[tmpSaveIndexOfOverSix[1]]) {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[0]];
        } else {
          reString += "，" + tmpANames[tmpSaveIndexOfOverSix[1]];
        }
      }
    } else {
      if (this.isCaseB([tmpSaveIndexOfOverSix[0], tmpSaveIndexOfOverSix[1]]) >= 0 ||
        this.isCaseB([tmpSaveIndexOfOverSix[0], tmpSaveIndexOfOverSix[2]]) >= 0 ||
        this.isCaseB([tmpSaveIndexOfOverSix[1], tmpSaveIndexOfOverSix[2]]) >= 0) {
        if (this.isCaseB([tmpSaveIndexOfOverSix[0], tmpSaveIndexOfOverSix[1]]) >= 0) {
          reString = tmpBNames[this.isCaseB([tmpSaveIndexOfOverSix[0], tmpSaveIndexOfOverSix[1]])];
        } else if (this.isCaseB([tmpSaveIndexOfOverSix[0], tmpSaveIndexOfOverSix[2]]) >= 0) {
          reString = tmpBNames[this.isCaseB([tmpSaveIndexOfOverSix[0], tmpSaveIndexOfOverSix[2]])];
        } else if (this.isCaseB([tmpSaveIndexOfOverSix[1], tmpSaveIndexOfOverSix[2]]) >= 0) {
          reString = tmpBNames[this.isCaseB([tmpSaveIndexOfOverSix[1], tmpSaveIndexOfOverSix[2]])];
        }
      } else {
        var tmpIndexOfSocreSort = this.sortIndex(tmpScores, tmpSaveIndexOfOverSix);
        reString = tmpANames[tmpIndexOfSocreSort[tmpIndexOfSocreSort.length - 1]];
        reString = reString + "，" + tmpANames[tmpIndexOfSocreSort[tmpIndexOfSocreSort.length - 2]];
      }
    }
    return reString;
  },
  caseC3(tmpSaveIndexOfOverSix, tmpScores, tmpANames, tmpBNames) {
    var reString = "";
    var tmpHas6 = -1;
    for (var i = 0; i < tmpSaveIndexOfOverSix.length; i++) {
      if (tmpSaveIndexOfOverSix[i] == 6) {
        tmpHas6 = i;
      }
    }
    var tmpHas610 = -1;
    if (tmpHas6 >= 0) {
      for (var i = 0; i < tmpSaveIndexOfOverSix.length; i++) {
        if (tmpSaveIndexOfOverSix[i] == 10) {
          tmpHas610 = i;
        }
      }
    }

    if (tmpHas610 >= 0) {
      reString = tmpBNames[this.isCaseB([6, 10])];

      var tmpIndexOfOverSixCaseC3 = new Array();
      var tmpIndexOfOverSixCaseC3S = new Array();
      var tmpIndexOfOverSixCaseC3Index = 0;
      for (var i = 0; i < tmpSaveIndexOfOverSix.length; i++) {
        if (tmpSaveIndexOfOverSix[i] != 6 && tmpSaveIndexOfOverSix[i] != 10) {
          tmpIndexOfOverSixCaseC3[tmpIndexOfOverSixCaseC3Index] = tmpScores[tmpSaveIndexOfOverSix[i]];
          tmpIndexOfOverSixCaseC3S[tmpIndexOfOverSixCaseC3Index] = i;
          tmpIndexOfOverSixCaseC3Index++;
        }
      }

      var tmpIndexOfOverSixCaseC3AfterSort = this.sortIndex(tmpScores, tmpSaveIndexOfOverSix);
      reString = reString + "，"
        + tmpANames[tmpIndexOfOverSixCaseC3AfterSort[tmpIndexOfOverSixCaseC3AfterSort.length - 1]];
    } else {
      var tmpIndexMaxThreeScore = new Array();
      var tmpIndexOfOverSixCaseC3AfterSort = this.sortIndex(tmpScores, tmpSaveIndexOfOverSix);
      tmpIndexMaxThreeScore[0] = tmpIndexOfOverSixCaseC3AfterSort[tmpIndexOfOverSixCaseC3AfterSort.length - 1];
      tmpIndexMaxThreeScore[1] = tmpIndexOfOverSixCaseC3AfterSort[tmpIndexOfOverSixCaseC3AfterSort.length - 2];
      tmpIndexMaxThreeScore[2] = tmpIndexOfOverSixCaseC3AfterSort[tmpIndexOfOverSixCaseC3AfterSort.length - 3];
      tmpIndexMaxThreeScore.sort(this.compare);
      reString = this.caseC2(tmpIndexMaxThreeScore, tmpScores, tmpANames, tmpBNames);
    }
    return reString;
  }
  , sortIndex(scores, indexOverSix) {
    var tmpSortScores = new Array();
    var tmpScores = new Array();
    for (var i = 0; i < indexOverSix.length; i = i + 1) {
      tmpScores[i] = scores[indexOverSix[i]];
      tmpSortScores[i] = tmpScores[i];
    }
    tmpSortScores.sort(this.compare);
    var x = Array();
    for (var i = 0; i < tmpSortScores.length; i = i + 1) {
      for (var j = 0; j < tmpScores.length; j = j + 1) {
        if (tmpSortScores[i] == tmpScores[j]) {
          x[i] = indexOverSix[j];
          tmpScores[j] = 10000;
          break;
        }
      }
    }
    return x;
  },
  compare(a, b) {
    return a - b;
  }
}
export {Syndrome}
