$(document).ready(async function () {
    const strJson = await $.getJSON('/stadium.json');
    const zones = strJson.zones;
    const categories = strJson.categories;
    const zone = zones[0];
    const rows = zone.rows;

    console.log('strJson',strJson)

    // let block = {
    //     "id": `block-${j}`,
    //     "title": blockTitle,
    //     "labels": [],
    //     "color": color,
    //     "seats": seats
    // };


    // console.log('categories', categories)
    // console.log('zone', zone)
    // console.log('rows', rows)
    //
    // let blocks = []
    //
    // // cate to block
    //
    //
    // const jsonModel = SeatMapCanvas


    // blocks.push(block)


    // JSON MODELS
    // - seatmap or pretix

    let seatmap = new SeatMapCanvas("#seats_container", {
        legend: true,
        json_model: 'pretix',
        style: {
            seat: {
                hover: '#8fe100',
                color: '#f0f7fa',
                selected: '#8fe100',
                check_icon_color: '#fff',
                not_salable: '#0088d3',
                focus: '#8fe100',
            },
            legend: {
                font_color: '#3b3b3b',
                show: false
            },
            block: {
                title_color: '#fff'
            }
        }
    });


    seatmap.eventManager.addEventListener("SEAT.CLICK", (seat) => {
        // Only allow interaction with salable seats
        if (!seat.item.salable) return;
        
        if (!seat.isSelected()) {
            seat.select()
        } else {
            seat.unSelect()
        }

        updateSelectedSeats()
    });


    // FOR DEMO


    const unselectSeat = function () {
        let seatId = $(this).attr('seat-id');
        let blockId = $(this).attr('block-id');
        let seat = seatmap.data.getSeat(seatId, blockId);
        seat.svg.unSelect()
        updateSelectedSeats()
    }

    const updateSelectedSeats = function () {
        let selectedSeats = seatmap.data.getSelectedSeats();

        let seatsTemplateHtml = ``

        if (selectedSeats.length === 0) {
            seatsTemplateHtml = `
                    <tr class="text-center py-2 px-2 flex flex-col">
                        <td class="text-lg text-gray-400"><i class="fa-regular fa-face-rolling-eyes"></i></td>
                        <td class="text-gray-400">No selected seat</td>
                    </tr>
                `
        }

        for (let i = 0; i < selectedSeats.length; i++) {
            let selectedSeat = selectedSeats[i];

            let priceFormatted = selectedSeat.custom_data.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })

            let html = `<tr class="w-full h-8 hover:bg-blue-100 py-1 px-2 items-center">
                    <td class="w-6">
                        <div class="inline-block w-3 h-3 bg-[#8fe100] rounded-lg ml-1"></div>
                    </td>
                    <td class="flex-0">${selectedSeat.custom_data.basket_name}</td>
                    <td class="text-right font-bold">${priceFormatted}</td>
                    <td class="w-6 unselect-seat text-center cursor-pointer text-red-200 hover:text-red-500" seat-id="${selectedSeat.id}" block-id="${selectedSeat.block.id}">
                        <i class="fa-solid fa-xmark text-md "></i>
                    </td>
                </tr>`

            seatsTemplateHtml += html;
        }

        if (selectedSeats.length > 0) {
            let totalPrice = selectedSeats.reduce((accumulator, currentValue) => accumulator + currentValue.custom_data.price, 0)
            let priceFormatted = totalPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
            let seatDesc = selectedSeats.length === 1 ? 'a seat' : `${selectedSeats.length} seats`;
            seatsTemplateHtml += `
                    <tr class="border-t h-6 text-center bg-gray-200">
                        <td colspan="4" class="py-1">Total: <strong>${priceFormatted}</strong> for ${seatDesc} </td>
                    </tr>
                `
        }

        $('#selected-seats').html(seatsTemplateHtml)

        $(".unselect-seat").on('click', unselectSeat)
    }

    // generateRandomBlocks()
    updateSelectedSeats()
    seatmap.data.replaceData(strJson);

    $("#zoomout-button").on("click", function () {
        seatmap.zoomManager.zoomToVenue();
    });

    $(".zoom-to-block").on("click", function (a) {
        let blockId = $(this).attr('data-block-id');
        seatmap.zoomManager.zoomToBlock(blockId);
    });
    $("#get-selected-seats").on("click", function (a) {
        let selectedSeats = seatmap.data.getSelectedSeats();
        console.log(selectedSeats)
    });

    // $(".unselect-seat").on("click", function (a) {
    //
    // });

    $("#randomize-btn").on("click", function (a) {
        // generateRandomBlocks()
    });
});