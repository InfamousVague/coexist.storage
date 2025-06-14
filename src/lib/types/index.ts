export enum DriveItem {
    File,
    Folder
}

export type File = {
    id: string,
    type: DriveItem.File,
    name: string,
    extension: string,
    size: number,
    lastModified: number,
    created: number
}

export type Folder = {
    id: string,
    type: DriveItem.Folder,
    name: string,
    size: number,
    lastModified: number,
    created: number,
    children: Array<File | Folder>
}
