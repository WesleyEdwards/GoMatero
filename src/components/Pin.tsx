import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LatLng, MateSession } from "../utils/models";

type PinProps = {
    session:MateSession,
    position:LatLng
}

export const Pin = ({session, position}:PinProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { api } = useContext(AuthContext);
    const pinRef = useRef<HTMLDivElement>(null);
    const [members,setMembers] = useState("");

    useEffect(() => {
        api.publicUsers(session.attendedMembers)
        .then(users => {
            var res = "";
            users.forEach(user => {
                res += user.name + " ";
            });
            setMembers(res)
        })
    },[])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pinRef.current && !pinRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return ()=> {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [pinRef]);
    return (
        <div className={isFocused ? 'PinFocused':'PinUnfocused'} ref={pinRef} onClick={()=>setIsFocused(true)}>
            <div>
            <img src={session.image} alt={session.title}/>
            {isFocused?
            <>
                <h4>{session.title}</h4>
                <p>{session.description}</p>
                <p>{session.date}</p>
                <p>{members}</p>
            </>
                :<></>}
            </div>
        </div>
    )
}

export default Pin;