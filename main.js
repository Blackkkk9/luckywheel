(() => {
    const $ = document.querySelector.bind(document)

    let timer = 7000;
    let isRotating = false
    let currentRotate = 0

    const wheel = $('.wheel')
    const btnStart = $('.btn-start')
    const msg = $('.msg')

    const listGift = [
        {
            txtName: 0,
            percent: 10/100,
        },
        {
            txtName: 1,
            percent: 10/100,
        },{
            txtName: 2,
            percent: 10/100,
        },{
            txtName: 3,
            percent: 10/100,
        },{
            txtName: 4,
            percent: 10/100,
        },{
            txtName: 5,
            percent: 10/100,
        },{
            txtName: 6,
            percent: 10/100,
        },{
            txtName: 7,
            percent: 10/100,
        },{
            txtName: 8,
            percent: 10/100,
        },{
            txtName: 9,
            percent: 10/100,
        },
    ]

    const size = listGift.length
    const rotate = 360 / size
    const skewY = 90 - rotate

    const renderItem = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li')

            itemGift.style.transform = `
                rotate(${rotate * index}deg)
                skewY(-${skewY}deg)
            `

            itemGift.innerHTML = `
                <p class="text-item ${index % 2 == 0 && 'even'}"
                    style="transform: skewY(${skewY}deg)
                        rotate(${rotate / 2}deg)"
                >
                    <b>${item.txtName}</b>
                </p>
            `

            wheel.appendChild(itemGift)
        })
    }

    const rotateWheel = ((currentRotate, index) => {
        wheel.style.transform = `rotate(${
            currentRotate - index * rotate - rotate / 2
        }deg)`
    })

    const getGift = randomNumber => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {
            currentPercent += item.percent

            randomNumber <= currentPercent && list.push({
                    ...item,
                    index,
                })
        })

        return list[0];
    }

    const showTxTGift = txt => {
        setTimeout(() => {
            isRotating =false;
            msg.innerHTML = `Number Lucky: ${txt}`
        }, timer)
    }

    const start = () => {
        isRotating = true;
        msg.innerHTML = ``;

        const random = Math.random();
        const gift = getGift(random);

        currentRotate += 360 * 10

        rotateWheel(currentRotate, gift.index)
        showTxTGift(gift.txtName)
    }

    btnStart.addEventListener('click', () => {
        !isRotating && start()
    })

    renderItem()
})();