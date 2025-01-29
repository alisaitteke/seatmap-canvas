import {PretixCategory, PretixModel, PretixZone} from "@/converters/pretix/pretix.model";
import {ParserBase} from "@/converters/parser.base";
import BlockModel from "@model/block.model";
import SeatModel from "@model/seat.model";

export class PretixParser extends ParserBase {

    public name: string = 'pretix';

    constructor() {
        super()
    }

    parse(jsonModel: PretixModel) {

        const categories: PretixCategory[] = jsonModel.categories;
        const zones: PretixZone[] = jsonModel.zones;

        const blocks: any[] = []


        for (let i = 0; i < zones.length; i++) {
            const zone = zones[i];
            let cx = zone.position.x;
            let cy = zone.position.y;


            const zoneRows = zone.rows;
            for (let j = 0; j < zoneRows.length; j++) {
                const row = zoneRows[j];
                cx += row.position.x;
                cy += row.position.y;
                const rowSeats = row.seats;


                for (let k = 0; k < rowSeats.length; k++) {
                    const seatData = rowSeats[k];
                    let x = cx + seatData.position.x;
                    let y = cy + seatData.position.y;

                    const blockId = `${seatData.category}-${row.row_number}-${row.row_number_position}`

                    let currentBlock: any = blocks.find(b => b.id === blockId);

                    if (currentBlock === undefined) {
                        const newBlock = {
                            id: blockId,
                            title: seatData.category,
                            color: "#2c2828",
                            seats: [],
                            labels: []
                        }
                        blocks.push(newBlock)
                        currentBlock = newBlock;
                    }

                    const newSeat = {
                        id: seatData.seat_guid,
                        x: x,
                        y: y,
                        title: seatData.seat_guid,
                        salable: true,
                        note: "",
                        tags: {
                            category: seatData.category
                        }
                    }

                    currentBlock.seats.push(newSeat)
                }
            }
        }

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            block.seats = block.seats.sort((a: any, b: any) => {
                if (a.x === b.x) {
                    return a.y - b.y;
                }
                return a.x - b.x;
            })
        }

        return blocks;
    }


}