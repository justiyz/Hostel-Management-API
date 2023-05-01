import { RoomDto } from "src/room/roomDto";



export class HostelDto{
    public name: string;
    public location: string;
    public noOfRooms: number;
    public isTaken: boolean;
    public isAvailable: boolean;
    public rooms: RoomDto []
}