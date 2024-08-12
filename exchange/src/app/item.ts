export interface Item {
    id: string, 
    posterUID: string, 
    title: string,
    desc: string,
    content: string, 
    image_src: string, 
    likeUsers: Array<string>,
    posted: boolean
}

export interface noIDItem {
    id: string, 
    title: string,
    desc: string,
    content: string, 
    image: File,
    image_src: string, 
    likeUsers: Array<string>,
    posted: boolean
}

//maybe accomodate to add more images? 