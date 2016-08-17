(function() {
    var defaultShareTitle, uniqueQuestion, weixinData;

    weixinData = {
        "img_url": "http://xinwen.ouc.edu.cn/ouctest/images/xiaobiao.jpg",
        "img_width": "120",
        "img_height": "120",
        "link": "http://news.upc.edu.cn/zt/upctest/index.html",
        "desc": "我在参加2016年普通高等学校招生全国统一考试(井冈卷)考试！你也来试试！",
        "title": "我在参加2016年普通高等学校招生全国统一考试(井冈卷)考试！你也来试试"
    };

    (function() {
        var onBridgeReady;
        onBridgeReady = function() {
            return WeixinJSBridge.on('menu:share:timeline', function(argv) {
                return WeixinJSBridge.invoke('shareTimeline', weixinData, function() {});
            });
        };
        if (document.addEventListener) {
            return document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            return document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    })();

    defaultShareTitle = '我在参加2016年普通高等学校招生全国统一考试(井冈卷)考试！你也来试试！';

    weixinData.title = defaultShareTitle;

    weixinData.desc = defaultShareTitle;

    uniqueQuestion = (function() {
        function uniqueQuestion(dataJson) {
            this.startDiv;
            this.endDiv;
            this.queDiv;
            this.queList;
            this.btnStart;
            this.dataArray = dataJson['queData'];
            this.scoreArray = dataJson['scoreArray'];
            this.fullScore = dataJson['fullScore'];
            this.score = 0;
            this.nowQueIndex = 0;
            this.averageScore;
            this.init();
        }

        uniqueQuestion.prototype.init = function() {
            var _this = this;
            this.startDiv = jQuery(".cBodyStart");
            this.endDiv = jQuery(".cBodyEnd");
            this.queDiv = jQuery(".cBodyQue");
            this.queList = jQuery("#queList");
            this.averageScore = this.fullScore / this.dataArray.length;
            console.log(this.averageScore);
            return this.startDiv.click(function() {
                _this.startDiv.hide();
                return _this.startAnswer();
            });
        };

        uniqueQuestion.prototype.startAnswer = function() {
            this.nowQueIndex = -1;
            return this.changeQue();
        };

        uniqueQuestion.prototype.getWordByIndex = function(index) {
            switch (index) {
                case 0:
                    return 'A';
                    break;
                case 1:
                    return 'B';
                    break;
                case 2:
                    return 'C';
                    break;
                case 3:
                    return 'D';
                    break;
                case 4:
                    return 'E';
                    break;
                case 5:
                    return 'F';
                    break;
            }
        };

        uniqueQuestion.prototype.createQueDiv = function() {
            var choicesArray, index, item, liHtml, nowDataJson, nowWord, queHtml, title, titleStr, _i, _len;
            nowDataJson = this.dataArray[this.nowQueIndex];
            title = nowDataJson['title'];
            titleStr = "" + (this.nowQueIndex + 1) + ". " + title;
            queHtml = "<div class='title'>                    " + titleStr + "                    </div>                <ul id='queList'>";
            choicesArray = nowDataJson['choices'];
            for (index = _i = 0, _len = choicesArray.length; _i < _len; index = ++_i) {
                item = choicesArray[index];
                nowWord = this.getWordByIndex(index);
                liHtml = "<li><span>" + nowWord + ". " + item + "</span></li>";
                queHtml += liHtml;
            }
            queHtml += '</ul>';
            this.queDiv.hide();
            this.queDiv.html(queHtml);
            this.queDiv.fadeIn();
            return this.addEvent();
        };

        uniqueQuestion.prototype.ifRightChoice = function(choiceIndex) {
            var nowdatajson;
            nowdatajson = this.dataArray[this.nowQueIndex];
            console.log(choiceIndex, nowdatajson['rightIndex']);
            if (nowdatajson['rightIndex'] === choiceIndex) {
                return true;
            } else {
                return false;
            }
        };

        uniqueQuestion.prototype.addEvent = function() {
            var _this;
            this.queList = jQuery("#queList li");
            console.log(this.queList, "quelist");
            _this = this;
            return this.queList.click(function() {
                var nowEle, nowIndex;
                nowEle = jQuery(this);
                nowIndex = nowEle.index();
                nowEle.addClass("active");
                console.log(nowIndex, 'nowIndex');
                if (_this.ifRightChoice(nowIndex)) {
                    _this.score += _this.averageScore;
                } else {
                    console.log("wrong choice!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                }
                console.log(_this.score);
                return setTimeout((function() {
                    return _this.changeQue();
                }), 40);
            });
        };

        uniqueQuestion.prototype.changeQue = function() {
            if (this.nowQueIndex < this.dataArray.length - 1) {
                console.log("nowQueIndex", this.nowQueIndex);
                this.nowQueIndex++;
                return this.createQueDiv();
            } else {
                console.log(this.score, "score!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log("finish");
                return this.endAnswer();
            }
        };

        uniqueQuestion.prototype.getcommentIndex = function(nowIndex) {
            var nowItem;
            nowItem = this.scoreArray[nowIndex];
            console.log(this.score, nowIndex, nowItem);
            if (this.score > nowItem['score']) {
                return this.getcommentIndex(nowIndex + 1);
            } else {
                return nowIndex;
            }
        };

        uniqueQuestion.prototype.getCommentByScore = function() {
            var comment, commentIndex;
            commentIndex = 0;
            commentIndex = this.getcommentIndex(commentIndex);
            console.log(commentIndex);
            comment = this.scoreArray[commentIndex]['comment'];
            console.log(comment);
            return comment;
        };

        uniqueQuestion.prototype.endAnswer = function() {
            var comment, endHtml, followHref;
            comment = this.getCommentByScore();
            this.score = parseInt(this.score);
            followHref = '#';
            endHtml = "<div class='score-holder'>                    <span id='score'>"
                + this.score + "分</span></div><div class='infos'><div><b>详细分析:</b></div><p id='comment'>"
                + comment + "</p><p>知道是哪道题做错了吗？</p>点击下方“查看答案”查看每题详情。</p><a class='btn btn-lg btn-success' id='btn-share' onclick='showGuide();'>邀请小伙伴一起玩</a><a class='btn btn-lg btn-danger' id='btn-share' href="
                + followHref + "'>查看答案</a></div>";
            this.queDiv.hide();
            this.startDiv.hide();
            this.endDiv.append(endHtml);
            this.endDiv.fadeIn();
            weixinData.title = this.score + "分! " + comment;
            return weixinData.desc = this.score + "分! " + comment;
        };

        return uniqueQuestion;

    })();

    jQuery(document).ready(function() {
        var divisor, joinEm, nowTime, people, timeRange;
        console.log("ready");
        window.nowUQ = new uniqueQuestion(window.nowdatajson);
        joinEm = jQuery(".joinPeople em");
        nowTime = Date.parse(new Date());
        timeRange = nowTime - 1406699956000;
        divisor = 0.0017;
        people = parseInt(timeRange * divisor) + 561;
        //joinEm.html("超过20万");
        window.hideGuide = function() {
            var theGuidePage;
            theGuidePage = jQuery("#share-guide");
            return theGuidePage.hide();
        };
        return window.showGuide = function() {
            var theGuidePage;
            theGuidePage = jQuery("#share-guide");
            return theGuidePage.show();
        };
    });

}).call(this);
