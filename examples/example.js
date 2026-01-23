$(document).ready(function () {
    function getRandomItem(array) {
        if (array.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const profiles = [
        {
            title: 'Default',
            blockSize: 4,
            gapX: 40,
            gapY: 40,
            minItem: 200,
            maxItem: 400,
            customSeatSvg: null,
            seatRadius: 15,
            cellMin: 12,
            cellMax: 24,
            blockGap: 12
        },
        // {
        //     title: 'Table',
        //     blockSize: 1,
        //     gapX: 120,
        //     gapY: 120,
        //     minItem: 12,
        //     maxItem: 12,
        //     customSeatSvg: 'assets/table.svg',
        //     seatRadius: 80,
        //     cellMin: 2,
        //     cellMax: 4,
        //     blockGap: 100
        // },
        // {
        //     title: 'Seat',
        //     blockSize: 4,
        //     gapX: 80,
        //     gapY: 80,
        //     minItem: 100,
        //     maxItem: 200,
        //     customSeatSvg: 'assets/seat-2.svg',
        //     seatRadius: 50,
        //     cellMin: 8,
        //     cellMax: 12,
        //     blockGap: 100
        // },
        // {
        //     title: 'Basic Rectangle',
        //     blockSize: 4,
        //     gapX: 80,
        //     gapY: 80,
        //     minItem: 100,
        //     maxItem: 200,
        //     customSeatSvg: 'assets/rect.svg',
        //     seatRadius: 50,
        //     cellMin: 8,
        //     cellMax: 12,
        //     blockGap: 100
        // },
        // {
        //     title: 'Basketball',
        //     blockSize: 4,
        //     gapX: 80,
        //     gapY: 80,
        //     minItem: 100,
        //     maxItem: 200,
        //     customSeatSvg: 'assets/basketball.svg',
        //     seatRadius: 50,
        //     cellMin: 8,
        //     cellMax: 12,
        //     blockGap: 100
        // },
        // {
        //     title: 'Custom Svg',
        //     blockSize: 4,
        //     gapX: 80,
        //     gapY: 80,
        //     minItem: 100,
        //     maxItem: 200,
        //     customSeatSvg: 'assets/user.svg',
        //     seatRadius: 50,
        //     cellMin: 8,
        //     cellMax: 12,
        //     blockGap: 100
        // }
    ]

    const defaultProfile = profiles[0]

    let seatmap = new SeatMapCanvas("#seats_container", {
        legend: true,
        style: {
            seat: {
                hover: '#8fe100',
                color: '#f0f7fa',
                selected: '#8fe100',
                check_icon_color: '#fff',
                not_salable: '#0088d3',
                focus: '#8fe100',
                // svg: 'assets/table.svg',
                // radius: 30
            },
            legend: {
                font_color: '#3b3b3b',
                show: false
            },
            block: {
                title_color: '#fff'
            },
            tooltip: {
                bg: '#ffffff',
                color: '#1f2937',
                border_color: 'rgba(0,0,0,0.08)',
                border_width: 1,
                border_radius: 10,
                padding: 14,
                font_size: '14px',
                font_weight: '600',
                line_height: 20,
                shadow: '0 8px 24px rgba(0,0,0,0.2)',
                text_align: 'center',
                width: 160
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

    const generateRandomBlocks = function (titlePrefix = 'Block',
                                           blockSize = defaultProfile.blockSize,
                                           gapX = defaultProfile.gapX,
                                           gapY = defaultProfile.gapY,
                                           minItem = defaultProfile.minItem,
                                           maxItem = defaultProfile.maxItem,
                                           customSeatSvg = defaultProfile.customSeatSvg,
                                           seatRadius = defaultProfile.seatRadius,
                                           cellMin = defaultProfile.cellMin,
                                           cellMax = defaultProfile.cellMax,
                                           blockGap = defaultProfile.blockGap
    ) {
        let block_colors = ["#01a5ff", "#fccf4e", "#01a5ff", "#01a5ff"];
        let blocks = []
        let last_x = 0;
        seatmap.config.style.seat.svg = customSeatSvg
        seatmap.config.style.seat.radius = seatRadius
        for (let j = 0; j < blockSize; j++) { // blocks

            let color = block_colors[j];

            let seats = []
            let cell_count = 0;
            let row_count = 0;
            let block_final_x = 0;
            let randomSeatCount = Math.round((Math.random() * (Math.abs(maxItem - minItem))) + minItem)
            let randomCell = Math.round((Math.random() * (Math.abs(cellMax - cellMin))) + cellMin)
            let blockTitle = `${titlePrefix} ${j + 1}`;

            for (let k = 0; k < randomSeatCount; k++) { // row
                if (k % randomCell === 0) {
                    cell_count = 1;
                    row_count++;
                }

                let x = (cell_count * gapX) + last_x;
                let y = row_count * gapY;

                if (block_final_x < x) block_final_x = x;
                let salable = Math.ceil(Math.random() * 10) > 3;
                let randomPrice = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * 10

                let seat = {
                    id: `s-${k}`,
                    x: x,
                    y: y,
                    color: color, // can use item.color from json data
                    salable: salable,
                    custom_data: {
                        any: "things",
                        price: randomPrice,
                        basket_name: `${blockTitle} - ${cell_count} ${row_count}`
                    },
                    note: "note test",
                    tags: {},
                    title: `${blockTitle}\n${cell_count} ${row_count}`
                }
                cell_count++;
                seats.push(seat)
            }

            last_x = block_final_x + 320;

            let block = {
                "id": `block-${j}`,
                "title": blockTitle,
                "labels": [],
                "color": color,
                "seats": seats,
                "gap": blockGap,
            };

            blocks.push(block);
        }

        seatmap.data.replaceData(blocks);
    }
    const unselectSeat = function () {
        let seatId = $(this).attr('seat-id');
        let blockId = $(this).attr('block-id');
        let seat = seatmap.data.getSeat(seatId, blockId);
        seat.svg.unSelect()
        updateSelectedSeats()
    }

    window.zoomToBlock2 = (blockId) => {
        console.log('blockId', blockId)
        seatmap.zoomManager.zoomToBlock('block-' + blockId);
    }
    window.selectProfile = (profileIndex) => {
        console.log('profileIndex', profileIndex)
        const selectedProfile = profiles[profileIndex]


        generateRandomBlocks(selectedProfile.title, selectedProfile.blockSize, selectedProfile.gapX, selectedProfile.gapY, selectedProfile.minItem, selectedProfile.maxItem, selectedProfile.customSeatSvg, selectedProfile.seatRadius, selectedProfile.cellMin, selectedProfile.cellMax, selectedProfile.blockGap)
        updateSelectedSeats()
        updateBlocks()
        const blockCount = seatmap.data.getBlocks()
        let randomBlockIndex = Math.round((Math.random() * (Math.abs(blockCount.length))))
        setTimeout(() => {
            seatmap.zoomManager.zoomToBlock('block-' + randomBlockIndex);
        }, 250)
        document.getElementById('profile-'+profileIndex).classList.add('bg-red-200')
    }

    const generateProfiles = () => {
        let profilesHtml = ``
        for (let i = 0; i < profiles.length; i++) {
            const profile = profiles[i]
            profilesHtml += `
                <button onclick="selectProfile(${i})" id="profile-${i}" class="border w-full text-left border-slate-500 bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 text-slate-800 py-1 px-3 rounded-md hover:bg-slate-200 "
                        >
                    <i class="fa-solid fa-magnifying-glass-plus mr-2"></i>
                    ${profile.title}
                </button>
            `
        }
        // $('#profiles').html(profilesHtml)
    }

    const updateBlocks = function () {
        let selectedSeats = seatmap.data.getBlocks();
        let blockButtonsHtml = `
            <div class="w-full text-primary dark:text-white">Zoom to Block</div>
            <button class="border text-left border-slate-500 bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 text-slate-800 py-1 px-3 rounded-md hover:bg-slate-200"
                        id="zoomout-button">
                    <i class="fa-solid fa-magnifying-glass-minus mr-2"></i>
                    All Blocks
                </button>
        `
        for (let i = 0; i < selectedSeats.length; i++) {
            blockButtonsHtml += `
                <button onclick="zoomToBlock2(${i})" class="border w-full text-left border-slate-500 bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 text-slate-800 py-1 px-3 rounded-md hover:bg-slate-200 "
                        >
                    <i class="fa-solid fa-magnifying-glass-plus mr-2"></i>
                    Zoom Block ${i + 1}
                </button>
            `
        }

        $('#zoom-blocks-buttons').html(blockButtonsHtml)
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

            let html = `<tr class="w-full cursor-default border-b dark:bg-gray-950 h-8 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 py-1 px-2 items-center">
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
                    <tr class="border-t cursor-default h-6 text-center bg-gray-200 dark:bg-gray-900 dark:text-white">
                        <td colspan="4" class="py-1">Total: <strong>${priceFormatted}</strong> for ${seatDesc} </td>
                    </tr>
                `
        }

        $('#selected-seats').html(seatsTemplateHtml)

        $(".unselect-seat").on('click', unselectSeat)
    }

    generateRandomBlocks()
    updateSelectedSeats()
    updateBlocks()
    generateProfiles()

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

        // generateRandomBlocks('Home', 1, 50, 50, 68, 68,)
        const randomProfile =  Math.floor(Math.random() * profiles.length)
        selectProfile(randomProfile)
        updateSelectedSeats()
        updateBlocks()
    });
    $("#dark-mode-btn").on("click", function (a) {
        $('html').toggleClass('dark')
    });

    // SVG Upload Handler
    $("#svg-upload").on("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const svgContent = event.target.result;
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
                
                // Check for parse errors
                const parseError = svgDoc.querySelector("parsererror");
                if (parseError) {
                    alert("Invalid SVG file!");
                    return;
                }
                
                // Extract SVG element
                const svgElement = svgDoc.querySelector("svg");
                if (!svgElement) {
                    alert("No SVG element found!");
                    return;
                }
                
                // Extract viewBox
                let viewBox = svgElement.getAttribute("viewBox");
                if (!viewBox) {
                    // Try to get from width/height
                    const width = svgElement.getAttribute("width") || "24";
                    const height = svgElement.getAttribute("height") || "24";
                    viewBox = `0 0 ${parseFloat(width)} ${parseFloat(height)}`;
                }
                
                // Extract path data - try multiple strategies
                let pathData = "";
                
                // Strategy 1: Find first <path> element
                const pathElement = svgElement.querySelector("path");
                if (pathElement) {
                    pathData = pathElement.getAttribute("d");
                }
                
                // Strategy 2: If multiple paths, combine them
                if (!pathData) {
                    const allPaths = svgElement.querySelectorAll("path");
                    if (allPaths.length > 0) {
                        pathData = Array.from(allPaths)
                            .map(p => p.getAttribute("d"))
                            .filter(d => d)
                            .join(" ");
                    }
                }
                
                // Strategy 3: Look for polygon/polyline/rect/circle and convert
                if (!pathData) {
                    const polygon = svgElement.querySelector("polygon");
                    const polyline = svgElement.querySelector("polyline");
                    const rect = svgElement.querySelector("rect");
                    const circle = svgElement.querySelector("circle");
                    
                    if (polygon) {
                        const points = polygon.getAttribute("points");
                        pathData = `M${points}Z`;
                    } else if (polyline) {
                        const points = polyline.getAttribute("points");
                        pathData = `M${points}`;
                    } else if (rect) {
                        const x = parseFloat(rect.getAttribute("x") || 0);
                        const y = parseFloat(rect.getAttribute("y") || 0);
                        const w = parseFloat(rect.getAttribute("width"));
                        const h = parseFloat(rect.getAttribute("height"));
                        pathData = `M${x},${y}h${w}v${h}h${-w}Z`;
                    } else if (circle) {
                        const cx = parseFloat(circle.getAttribute("cx") || 0);
                        const cy = parseFloat(circle.getAttribute("cy") || 0);
                        const r = parseFloat(circle.getAttribute("r"));
                        // Approximate circle with path
                        pathData = `M${cx-r},${cy}a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 ${-r*2},0`;
                    }
                }
                
                if (!pathData) {
                    alert("Could not extract path data from SVG!");
                    return;
                }
                
                // Apply custom SVG
                const shapeConfig = {
                    shape: "path",
                    size: 24,
                    corner_radius: 0,
                    path: pathData,
                    path_box: viewBox
                };
                
                // Update button styles
                $(".shape-btn").removeClass("bg-blue-200 dark:bg-blue-800").addClass("bg-gray-100 dark:bg-gray-900");
                
                // Show custom SVG info
                $("#custom-svg-name").text(file.name);
                $("#custom-svg-info").removeClass("hidden");
                
                // Update seatmap configuration
                seatmap.config.style.seat.shape = shapeConfig.shape;
                seatmap.config.style.seat.size = shapeConfig.size;
                seatmap.config.style.seat.corner_radius = shapeConfig.corner_radius;
                seatmap.config.style.seat.path = shapeConfig.path;
                seatmap.config.style.seat.path_box = shapeConfig.path_box;
                
                // Regenerate entire stage with new shape
                seatmap.svg.stage.blocks.clear();
                seatmap.svg.stage.blocks.update();
                
            } catch (error) {
                console.error("Error parsing SVG:", error);
                alert("Error processing SVG file: " + error.message);
            }
        };
        
        reader.readAsText(file);
    });

    // Shape selection handlers
    $(".shape-btn").on("click", function() {
        const selectedShape = $(this).data("shape");
        
        // Hide custom SVG info
        $("#custom-svg-info").addClass("hidden");
        
        // Update button styles
        $(".shape-btn").removeClass("bg-blue-200 dark:bg-blue-800").addClass("bg-gray-100 dark:bg-gray-900");
        $(this).removeClass("bg-gray-100 dark:bg-gray-900").addClass("bg-blue-200 dark:bg-blue-800");
        
        // Apply shape configuration
        let shapeConfig = {
            shape: "circle",
            size: 24,
            corner_radius: 0,
            path: null,
            path_box: "0 0 24 24"
        };
        
        switch(selectedShape) {
            case "circle":
                shapeConfig.shape = "circle";
                break;
            case "rect":
                shapeConfig.shape = "rect";
                shapeConfig.corner_radius = 0;
                break;
            case "rect-rounded":
                shapeConfig.shape = "rect";
                shapeConfig.corner_radius = 6;
                break;
        }
        
        // Update seatmap configuration
        seatmap.config.style.seat.shape = shapeConfig.shape;
        seatmap.config.style.seat.size = shapeConfig.size;
        seatmap.config.style.seat.corner_radius = shapeConfig.corner_radius;
        seatmap.config.style.seat.path = shapeConfig.path;
        seatmap.config.style.seat.path_box = shapeConfig.path_box;
        
        // Regenerate entire stage with new shape
        seatmap.svg.stage.blocks.clear();
        seatmap.svg.stage.blocks.update();
    });
});