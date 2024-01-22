import { Guestbook, guestbookDeleteByIdProps, guestbookDeleteProps, messageSubmitProps, guestbookRequestProps, guestbookSubmitProps, Module, modulesRequestProps, messagesRequestProps, messageDeleteProps, User, userRequestProps } from './interfaces';
import { Location } from "history";

const requestOptionsBuilder: any = (location: Location) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },

    };
    return requestOptions;
}

const deleteOptionsBuilder: any = (location: Location, id: number) => {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ id: id }),

    };
    return requestOptions;
}

const downloadFileOptionsBuilder: any = (location: Location) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
    };
    return requestOptions;
}

const postOptionsBuilder: any = (location: Location, id: number) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
    };
    return requestOptions;
}


export const userRequest = ({ hrefLink, setUser, location, setIsClicked }: userRequestProps) => {
    fetch(`${hrefLink}/user`, requestOptionsBuilder(location))
        .then(res => res.json())
        .then(
            (result) => {
                setUser(
                    { username: result[0].username }
                );
                setIsClicked(true);
            },
            (error) => {
                console.log(error);
            }
        )
}

export const modulesRequest = ({ hrefLink, setModules, location }: modulesRequestProps) => {
    fetch(`${hrefLink}/modules`, requestOptionsBuilder(location))
        .then(res => res.json())
        .then(
            (result: [Module]) => {
                setModules(result);
            },
            (error) => {
                console.log(error);
            }
        )
}

export const messagesRequest = ({ hrefLink, setMessages, location }: messagesRequestProps) => {
    fetch(`${hrefLink}/message`, requestOptionsBuilder(location))
        .then((res) => {
            return res.json();
        }).then(data => {
            setMessages(data);
        })
}

export const messageDelete = ({ hrefLink, messages, setMessages, index, location }: messageDeleteProps) => {
    fetch(`${hrefLink}/message`, deleteOptionsBuilder(location, messages[index].id))
        .then(
            (res) => {
                if (res.ok) {
                    messagesRequest({ hrefLink, setMessages, location });
                }
            }
        )
}

export const downloadFile = ({ hrefLink, location }: any) => {
    fetch(`${hrefLink}/leistungsuebersicht`, requestOptionsBuilder(location))
        .then((res) => {
            if (res.ok) {
                res.blob().then(
                    (blob) => {
                        const fileURL = window.URL.createObjectURL(blob);
                        let alink = document.createElement('a');
                        alink.href = fileURL;
                        alink.download = 'leistungsuebersicht.pdf';
                        alink.click();

                    }
                )
            }
        })
}

export const logoutRequest = ({ hrefLink, location, setLogout }: any) => {
    fetch(`${hrefLink}/logout`, postOptionsBuilder(location))
        .then((res) => {
            if (res.status === 302) {
                setLogout(true);
            }
        })
}



export const guestbookRequest = ({ hrefLink, setGuestbook, location }: guestbookRequestProps) => {
    fetch(`${hrefLink}/api/guestbook`, requestOptionsBuilder(location))
        .then(res => res.json())
        .then(
            (result: [Guestbook]) => {
                setGuestbook(result);
            },
            (error) => {
                console.log(error);
            }
        )
}

export const guestbookSubmit = ({ hrefLink, message, location }: guestbookSubmitProps) => {
    fetch(`${hrefLink}/guestbook/add`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + location.state
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ message: message }) // body data type must match "Content-Type" header
    });
    //   return response.json();
}

export const messageSubmit = ({ hrefLink, message, setMessages, location }: messageSubmitProps) => {
    fetch(`${hrefLink}/message`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached // include, *same-origin, omit
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': true
        },
        redirect: 'error', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ message: message }) // body data type must match "Content-Type" header
    }).then(
        (res) => {
            if (res.ok) {
                messagesRequest({ hrefLink, setMessages, location });
            }
        }
    )
}

export const guestbookDelete = ({ hrefLink, location }: guestbookDeleteProps) => {
    fetch(`${hrefLink}/guestbook/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${location.state}`
        },
    });
}

export const guestbookDeleteById = ({ hrefLink, id, location }: guestbookDeleteByIdProps) => {
    fetch(`${hrefLink}/guestbook/deletebyid`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${location.state}`
        },
        body: JSON.stringify({ id: id })
    });
}