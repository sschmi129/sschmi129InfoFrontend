import { Location } from "history";
export interface HrefProps {
    hrefLink: string
}

export interface User {
    'username': string,
}

export interface Module {
    'module_name': string,
    'compulsory_module': string,
    'credit_points': number,
    'learning_outcomes': string,
    'content': string
}

export interface Message {
    'id': number,
    'message': string,
}

export interface Guestbook {
    'name': string,
    'message': string
}

export interface userRequestProps {
    hrefLink: string,
    setUser: (user: User) => void,
    location: Location,
    setIsClicked: (booleanValue: boolean) => void,
}

export interface modulesRequestProps {
    hrefLink: string,
    setModules: (module: [Module]) => void,
    location: Location
}

export interface messagesRequestProps {
    hrefLink: string,
    setMessages: (message: [Message]) => void,
    location: Location,
}

export interface messageDeleteProps {
    hrefLink: string;
    messages: [Message];
    setMessages: (message: [Message]) => void;
    index: number;
    location: Location;
} 

export interface guestbookRequestProps {
    hrefLink: string;
    setGuestbook: (guestbook: [Guestbook]) => void;
    location: Location;
}

export interface messageSubmitProps {
    hrefLink: string;
    message: string;
    setMessages: (message: [Message]) => void;
    location: Location;
}

export interface guestbookSubmitProps{
    hrefLink: string;
    message: string;
    location: Location;
}

export interface guestbookDeleteProps{
    hrefLink: string;
    location: Location;
}

export interface guestbookDeleteByIdProps{
    hrefLink: string;
    id: string;
    location: Location;
}