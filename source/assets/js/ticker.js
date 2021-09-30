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

            for (let i = 1; i < servicesTickerList.length; i += 1) {
                //servicesTickerList[i].style.display = 'flex';
            }
        }

        // function copyList () {
        //     let servicesTitles = document.querySelector('.services__titles');
        //     let servicesTickerList = document.querySelector('.services__list');
        //     const col = 2;

        //     for (let i = 0; i < col; i += 1) {
        //         servicesTitles.appendChild(servicesTickerList.cloneNode(true));
        //     }
        // }

        document.addEventListener("DOMContentLoaded", function () {
            copyListItem();
            //copyList();
        })
    }
})()