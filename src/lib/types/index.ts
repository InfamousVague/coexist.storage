export enum DriveItem {
    File,
    Folder
}

export type File = {
    type: DriveItem.File,
    name: string,
    extension: string,
    size: number
}

export type Folder = {
    type: DriveItem.Folder,
    name: string,
    size: number,
    children: Array<File | Folder>
}
