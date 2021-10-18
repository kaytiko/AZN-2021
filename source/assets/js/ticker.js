(function () {
    if (window.matchMedia("(min-width: 720px)").matches) {
        let totalWidth;
        let count;

        function copyListItem() {
            let ticker = document.getElementById("ticker");
            let servicesTickerList = ticker.querySelectorAll("ul");
            let servicesTickerItem = ticker.querySelectorAll("li");

            totalWidth = 0;
            count = servicesTickerItem.length;

            for (let i = 0; i < count; i += 1) {
                totalWidth -= servicesTickerItem[i].getBoundingClientRect().width;
            }

            for (let i = 0; i < count; i += 1) {
                servicesTickerList.forEach(item => {
                    item.appendChild(servicesTickerItem[i].cloneNode(true));
                })
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            copyListItem();
        })
    }
})()