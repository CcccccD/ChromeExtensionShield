



clear();

function clear(){
    chrome.storage.local.get(['nameList'], function (result) {
        $(document).ready(function () {
            nameList = result.nameList ? JSON.parse(result.nameList) : [];
            setTimeout(() => {
                var list = Array.from(document.querySelectorAll('.pin-list .item.shadow'));
                list && list.forEach(item => {
                    let username = $(item).find('.pin-header-content .username').text();
                    if(nameList.indexOf(username)!== -1){
                        $(item).hide();
                    }
                })
            },200)
        })
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request.cmd == 'test') clear();
    sendResponse('我收到了你的消息！');
});