export interface PretixModel {
    name: string
    categories: PretixCategory[]
    zones: PretixZone[]
    size: PretixSize
}

export interface PretixCategory {
    name: string
    color: string
}

export interface PretixZone {
    name: string
    position: PretixPosition
    rows: PretixRow[]
    areas: PretixArea[]
    uuid: string
    zone_id: string
}

export interface PretixPosition {
    x: number
    y: number
}

export interface PretixRow {
    position: PretixPosition2
    row_number: string
    row_number_position: string
    seats: PretixSeat[]
    uuid: string
}

export interface PretixPosition2 {
    x: number
    y: number
}

export interface PretixSeat {
    seat_number: string
    seat_guid: string
    uuid: string
    position: PretixPosition3
    category: string
}

export interface PretixPosition3 {
    x: number
    y: number
}

export interface PretixArea {
    shape: string
    color: string
    border_color: string
    rotation: number
    uuid: string
    position: PretixPosition4
    text: PretixText
    rectangle: PretixRectangle
}

export interface PretixPosition4 {
    x: number
    y: number
}

export interface PretixText {
    position: PretixPosition5
    color: string
    text: string
}

export interface PretixPosition5 {
    x: number
    y: number
}

export interface PretixRectangle {
    width: number
    height: number
}

export interface PretixSize {
    width: number
    height: number
}
