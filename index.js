function search() {
    $(".result").remove();
    $(".bottom").remove();
    $("#related a").remove();
    $("#count").html("Searching...");
    $.ajax({
        url: 'http://127.0.0.1:5000//search',
        data: {
            name: $('#textbox').val(),
        },
        dataType: 'JSON',
        type: 'GET',
        success: function(data) {
            // $("#result").html(data.result);
            // console.log(data.result);
            res = data.result;
            rst = "";
            // console.log(res.length - 1 + "parts has found.");
            // console.log(res[1]);
            $('#count').html(res.length + " results.");
            var url = "wholeParts.json" /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/

            var request = new XMLHttpRequest();

            request.open("get", url); /*设置请求方法与路径*/

            request.send(null); /*不发送数据到服务器*/

            request.onload = function() { /*XHR对象获取到返回信息后执行*/

                if (request.status == 200) { /*返回状态为200，即为数据获取成功*/

                    var json = JSON.parse(request.responseText);
                    for (j = 0; j < res.length; j++) {
                        for (i = 0; i < json.length; i++) {
                            // console.log(json[i].part_num);
                            // console.log(res[j]);
                            if (res[j] == json[i].part_num) {
                                AddResult(json[i].year, json[i].team, json[i].part_type, json[i].part_num, json[i].short_desc, json[i].contents, json[i].star, json[i].twins, json[i].len, json[i].released, json[i].part_url, json[i].score)
                                rst = rst + ' ' + json[i].short_desc;
                            }
                        }
                    }
                    // var reg1 = new RegExp(":", "g");
                    // var reg2 = new RegExp(";", "g");
                    // var reg3 = new RegExp("(", "g");
                    // var reg4 = new RegExp(")", "g");
                    // var reg5 = new RegExp(",", "g");
                    // rst = rst.replace(reg1, "");
                    // rst = rst.replace(reg2, "");
                    // rst = rst.replace(reg3, "");
                    // rst = rst.replace(reg4, "");
                    // rst = rst.replace(reg5, "");
                    // rst = rst.replace(":", "");
                    rst = rst.replace(/["'():;+*<>?,&^%$#@!~`|{}]/g, "").replace(/-/g, " ").replace(/_/g, " ");
                    FindHotWords(rst.split(' '));
                }
            }
        }
    });
}

$(function() {
    $('#button').click(function() {
        // console.log($('#textbox').val());
        search();
    });
})

function AddResult(year, team, type, number, name, content, star, twin, len, release, url, score) {
    if (len == "") len = "No sequence";
    else len = len + " bp";

    if (twin == "None") twin = "0";
    else {
        var twins = twin.split(' ');
        twin = twins.length - 1;
    }
    content = content.replace(name, "")
    var reg = new RegExp($('#textbox').val(), "ig");
    number = number.replace(reg, '<span>' + $('#textbox').val() + '</span>');
    name = name.replace(reg, '<span>' + $('#textbox').val() + '</span>');
    content = content.replace(reg, '<span>' + $('#textbox').val() + '</span>');
    var newElement = '<div class="result"><div class="head"><p>Year: ' + year + ' > Team: ' + team + ' > ' + type + '</p></div><div class="body"><p><a href="' + url + '" target="_blank">' + number + ': ' + name + '</a></p><div class="description">' + content + '</div></div><div class="bottom"><p>' + star + ' star(s) · ' + twin + ' twin(s) · ' + len + ' · ' + release + ' · Significance: ' + score + '</p></div></div>';
    // $("#results").highlight($("#textbox"));
    // console.log(newElement);
    // newElement = newElement.replace("ABCD", "A1B1C1D1");
    // console.log(newElement);

    $("#results").append(newElement);




}

function FindHotWords(words) {
    var wordList = [],
        wordFrequence = [],
        result = [];
    words.forEach(function(word) {
        var flag = false;
        for (i = 0; i < wordList.length; i++) {
            if (wordList[i].toUpperCase() == word.toUpperCase()) {
                wordFrequence[i]++;
                flag = true;
                break;
            }
        }
        if (!flag) {
            wordList[wordList.length] = word;
            wordFrequence[wordFrequence.length] = 1;
        }
    })
    for (i = 0; i < 5; i++) {
        var idx = wordFrequence.indexOf(Math.max.apply(Math, wordFrequence))
        if (wordFrequence[idx] > 2) {
            if (wordList[idx].toUpperCase() != $('#textbox').val().toUpperCase() && wordList[idx] != "and" && wordList[idx] != "the" && wordList[idx] != "with" && wordList[idx] != "under" && wordList[idx] != "on" && wordList[idx] != "about" && wordList[idx] != "have" && wordList[idx] != "up" && wordList[idx] != "down" && wordList[idx] != "" && wordList[idx] != "of" && wordList[idx] != "for" && wordList[idx] != "in" && wordList[idx] != "out" && wordList[idx] != "DNA" && wordList[idx] != "RNA" && wordList[idx] != "sequence" && wordList[idx] != "a" && wordList[idx] != "an" && wordList[idx] != "from") {
                result[result.length] = wordList[idx];
            } else {
                i--;
            }
            wordFrequence[idx] = 0;
        } else {
            break;
        }
    }
    result.forEach(function(res) {
        $('#related').append('<a href="#" onclick="fun(\'' + res + '\')">' + res + '</a>');
    })

}

function NewSearch(name) {
    $('#textbox').val() = name;
}


function fun(res) {
    $('#textbox').val(res);
    search();
}

$("#textbox").keypress(function(e) {
    if (e.which == 13) {
        search();
    }
});