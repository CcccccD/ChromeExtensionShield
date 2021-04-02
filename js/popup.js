function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function refresh() {
    location.reload();
}

chrome.storage.local.get(['nameList'], function (result) {
    var nameList = [];
    if (result.nameList) {
        nameList = JSON.parse(result.nameList);
        let htmlStr = '';
        nameList && nameList.forEach(nameItem => {
            htmlStr += `<p class="ignoreItem">${nameItem} <a dataName="${nameItem}" class="recovery" id="recovery">恢复</a></p>`
        })
        $('.hasIgnore').html(htmlStr);
        $('.recovery').click(function (e) {
            let iName = e.target.attributes && e.target.attributes.dataName.value || '';
            let nameList = [], newNameList = [];
            chrome.storage.local.get(['nameList'], function (result) {
                nameList = result.nameList ? JSON.parse(result.nameList) : [];
                newNameList = nameList.filter(iname => iname !== iName);
                chrome.storage.local.set({ 'nameList': JSON.stringify(newNameList) }, function () {
                        // 这里应该把隐藏的显示出来的，不搞了，刷一下页面吧~
                });
            });
        })
    }
})

console.log(Array.from($('.main .test')));
$('.main .test').text('222222222222');

$('#ignoreBtn').click(function () {
    console.log($('#ignoreValue').val());
    let iName = $('#ignoreValue').val();
    let nameList = [];
    chrome.storage.local.get(['nameList'], function (result) {
        nameList = result.nameList ? JSON.parse(result.nameList) : [];
        nameList.push(iName);
        chrome.storage.local.set({ 'nameList': JSON.stringify(nameList) }, function () {
            refresh();
        });
    });
})

$('#clearBtn').click(function () {
    sendMessageToContentScript({cmd:'test', value:'clear'}, function(response)
    {
        console.log('来自content的回复：'+response);
    });

})
