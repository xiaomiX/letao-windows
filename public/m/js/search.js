$(function() {
// 进入页面清空输入框
  $(".search input").val("");
// 获取搜索历史
  getStorage();
// 点击搜索按钮
  $(".search button").on("tap", function() {
    addStorage();
    window.location.href = "./productList.html?search="+$(".search input").val();
  });
// 点击删除历史纪录
  $(".history-list").on("tap", "ul li span", function() {
    var index = $(this)
      .parent()
      .data("index");
    removeStorage(index);
    getStorage();
  });
// 点击清空历史纪录
  $(".search-history a").on("tap", function() {
    clearStorage();
    getStorage();
  });

// --------------  函数封装  -------------

// 初始化history数组
var history;
  function historyInit(){
    history = JSON.parse(window.localStorage.getItem("searchHistory"));
    if (!history) {
      history = [];
    }
  }
// 添加本地存储
  function addStorage() {
    historyInit();
    var searchContent = $(".search input").val();
    if (searchContent.trim()) {
      // trim()方法：去空格
      // 遍历history数组看是否已存在
      var flag = true;
      for (var i = 0; i < history.length; i++) {
        if (searchContent == history[i]) {
          flag = false;
          return;
        }
      }
      if (flag) {
        history.push(searchContent);
      }
    }
    window.localStorage.setItem("searchHistory", JSON.stringify(history));
  }

// 获取本地存储，渲染到页面
  function getStorage() {
    historyInit();
    $(".history-list").html(template("history", { "rows": history }));
  }

// 删除本地存储
  function removeStorage(index) {
    historyInit();
    history.splice(index, 1);
    window.localStorage.setItem("searchHistory", JSON.stringify(history));
  }

// 清空本地存储
  function clearStorage() {
    window.localStorage.removeItem("searchHistory");
  }
});
