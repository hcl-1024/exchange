export interface Item {
    id: string, 
    title: string,
    desc: string,
    content: string, 
    image_src: string
}

export interface noIDItem {
    id: string, 
    title: string,
    desc: string,
    content: string, 
    image: File,
    image_src: string
}
//maybe accomodate to add more images? 