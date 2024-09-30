export interface User {
    uid: string,
    email: string, 
    password: string, 
    displayName: string, 
    image: File, 
    image_src: string
}

export interface Name {
    name: string
}

export interface FormUser {
    email: string, 
    displayName: string, 
    image_src: string
}