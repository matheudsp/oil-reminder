export interface IVehicle {
    id: number,
    name: string,
    type: string,
    observation:string,
    odometer: string,
    oilInterval: string,
    image: string
}

export interface IVehicleItem {
    vehicle: IVehicle
}