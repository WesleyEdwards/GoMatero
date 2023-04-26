import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Pin = (props:MateSession) => {
    const [isFocused, setIsFocused] = useState(false);
    const { api } = useContext(AuthContext);
    const pinRef = useRef<HTMLDivElement>(null);

    const unfocusedPinStyle = {
        position: "relative",
        width: "20px",
        height: "30px",
        background: "red",
        border_radius: "10px 10px 0 0",
        transform: "rotate(45deg)",
    };
    const pinImageStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-45deg)"
    }
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
            <img src={props.image} alt={props.title}/>
            {isFocused?
            <>
                <h4>{props.title}</h4>
                <p>{props.description}</p>
                <p>{props.date.toISOString()}</p>
                <p>{props.attendedMembers.map((id) => {id}).join(', ')}</p>
            </>
                :<></>}
            </div>
        </div>
    )
}

export default Pin;