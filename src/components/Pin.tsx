import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Pin = (props:MateSession) => {
    const [isFocused, setIsFocused] = useState(false);
    const { api } = useContext(AuthContext);
    const pinRef = useRef<HTMLDivElement>(null);

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
        <div className={isFocused ? 'Focused Pin':'Pin'} ref={pinRef} onClick={()=>setIsFocused(true)}>
            <img src={props.image} alt={props.title}/>
            {isFocused?
            <>
                <div>{props.title}</div>
                <div>{props.description}</div>
                <div>{props.date.toISOString()}</div>
                <div>{props.attendedMembers.map((id) => {id}).join(', ')}</div>
            </>
                :<></>}
        </div>
    )
}

export default Pin;