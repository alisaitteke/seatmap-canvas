$(document).ready(function () {
    function getRandomItem(array) {
        if (array.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const profiles = [
        {
            title: 'Default',
            blockSize: 2,
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

        // Update seat count badges
        $('#seat-count').text(selectedSeats.length);
        $('#mobile-seat-badge').text(selectedSeats.length);

        // Show/hide mobile basket button
        if (selectedSeats.length > 0) {
            $('#mobile-basket-btn').removeClass('hidden');
        } else {
            $('#mobile-basket-btn').addClass('hidden');
        }

        if (selectedSeats.length === 0) {
            // Show empty state
            $('#empty-basket').removeClass('hidden');
            $('#basket-footer').addClass('hidden');
            $('#selected-seats').html('');
            return;
        }

        // Hide empty state, show footer
        $('#empty-basket').addClass('hidden');
        $('#basket-footer').removeClass('hidden');

        let seatsTemplateHtml = ``

        for (let i = 0; i < selectedSeats.length; i++) {
            let selectedSeat = selectedSeats[i];

            let priceFormatted = selectedSeat.custom_data.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })

            let html = `
                <div class="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div class="flex items-start gap-3">
                        <!-- Seat Icon -->
                        <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                            <i class="fa-solid fa-chair text-white text-sm"></i>
                        </div>
                        
                        <!-- Seat Info -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between gap-2">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        ${selectedSeat.custom_data.basket_name}
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        ${selectedSeat.block.title || 'Block ' + selectedSeat.block.id}
                                    </p>
                                </div>
                                <div class="text-right flex-shrink-0">
                                    <p class="text-sm font-bold text-gray-900 dark:text-white">
                                        ${priceFormatted}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Remove Button -->
                        <button class="unselect-seat flex-shrink-0 w-7 h-7 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-all duration-150 flex items-center justify-center opacity-0 md:opacity-0 md:group-hover:opacity-100 sm:opacity-100" 
                                seat-id="${selectedSeat.id}" 
                                block-id="${selectedSeat.block.id}">
                            <i class="fa-solid fa-xmark text-sm"></i>
                        </button>
                    </div>
                </div>`

            seatsTemplateHtml += html;
        }

        // Calculate totals
        let totalPrice = selectedSeats.reduce((accumulator, currentValue) => accumulator + currentValue.custom_data.price, 0)
        let priceFormatted = totalPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })

        $('#selected-seats').html(seatsTemplateHtml)
        $('#subtotal').text(priceFormatted)

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

    // Mobile menu handlers
    $("#mobile-menu-btn").on("click", function() {
        $("#left-sidebar").removeClass("-translate-x-full");
        $("#mobile-overlay").removeClass("hidden");
        $("body").addClass("overflow-hidden");
    });

    $("#mobile-overlay").on("click", function() {
        $("#left-sidebar").addClass("-translate-x-full");
        $("#right-sidebar").addClass("translate-x-full");
        $("#mobile-overlay").addClass("hidden");
        $("body").removeClass("overflow-hidden");
    });

    $("#close-basket-btn").on("click", function() {
        $("#right-sidebar").addClass("translate-x-full");
        $("#mobile-overlay").addClass("hidden");
        $("body").removeClass("overflow-hidden");
    });

    $("#mobile-basket-btn").on("click", function() {
        $("#right-sidebar").removeClass("translate-x-full");
        $("#mobile-overlay").removeClass("hidden");
        $("body").addClass("overflow-hidden");
    });

    // Checkout Modal Handlers
    $("#proceed-checkout-btn").on("click", function() {
        const selectedSeats = seatmap.data.getSelectedSeats();
        if (selectedSeats.length === 0) return;

        // Populate checkout modal
        let seatsHtml = '';
        selectedSeats.forEach((seat, index) => {
            seatsHtml += `
                <div class="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-lg">
                    <span class="flex-shrink-0 w-6 h-6 bg-green-500 dark:bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">${index + 1}</span>
                    <span class="flex-1 text-gray-900 dark:text-white font-medium">${seat.custom_data.basket_name}</span>
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">${seat.custom_data.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
            `;
        });

        const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.custom_data.price, 0);
        const fee = 5.00;
        const total = subtotal + fee;

        $('#checkout-seats').html(seatsHtml);
        $('#checkout-subtotal').text(subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        $('#checkout-fee').text(fee.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        $('#checkout-total').text(total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

        // Show modal
        $("#checkout-modal").removeClass("hidden");
        $("body").addClass("overflow-hidden");
    });

    $("#close-checkout-modal, #cancel-checkout").on("click", function() {
        $("#checkout-modal").addClass("hidden");
        $("body").removeClass("overflow-hidden");
    });

    $("#confirm-checkout").on("click", function() {
        // Demo success message
        alert("🎉 Booking confirmed! This is a demo - no actual payment was processed.");
        $("#checkout-modal").addClass("hidden");
        $("body").removeClass("overflow-hidden");

        // Optional: Clear selection
        // seatmap.data.getSelectedSeats().forEach(seat => seat.svg.unSelect());
        // updateSelectedSeats();
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
                const currentRadius = seatmap.config.style.seat.radius || 15;
                const shapeSize = currentRadius * 2;

                const shapeConfig = {
                    shape: "path",
                    size: shapeSize,
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
                seatmap.config.style.seat.svg = null;

                // Regenerate entire stage with new shape
                seatmap.svg.stage.blocks.clear();
                seatmap.svg.stage.blocks.update();

                // Recalculate zoom levels and reset to venue view
                seatmap.zoomManager.calculateZoomLevels(seatmap.data.getBlocks());
                seatmap.zoomManager.calculateActiveBlocks(seatmap.data.getBlocks());
                seatmap.zoomManager.zoomToVenue(false);

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
        // Get current radius from seatmap config
        const currentRadius = seatmap.config.style.seat.radius || 15;
        const shapeSize = currentRadius * 2;  // Match circle diameter

        let shapeConfig = {
            shape: "circle",
            size: shapeSize,
            corner_radius: 0,
            path: null,
            path_box: "0 0 24 24",
            svg: null
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
            case "custom-svg":
                shapeConfig.shape = "auto";  // Let library decide (will use path extraction)
                shapeConfig.svg = "assets/custom_seat.svg";
                break;
        }

        // Update seatmap configuration
        seatmap.config.style.seat.shape = shapeConfig.shape;
        seatmap.config.style.seat.size = shapeConfig.size;
        seatmap.config.style.seat.corner_radius = shapeConfig.corner_radius;
        seatmap.config.style.seat.path = shapeConfig.path;
        seatmap.config.style.seat.path_box = shapeConfig.path_box;
        seatmap.config.style.seat.svg = shapeConfig.svg;

        // Regenerate entire stage with new shape
        seatmap.svg.stage.blocks.clear();
        seatmap.svg.stage.blocks.update();

        // Recalculate zoom levels and reset to venue view
        seatmap.zoomManager.calculateZoomLevels(seatmap.data.getBlocks());
        seatmap.zoomManager.calculateActiveBlocks(seatmap.data.getBlocks());
        seatmap.zoomManager.zoomToVenue(false);
    });
});
