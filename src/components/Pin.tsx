import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Pin = (props:MateSession) => {
    const [isFocused, setIsFocused] = useState(false);
    const { api } = useContext(AuthContext);
    return (
        <div className={isFocused ? 'Focused Pin':'Pin'}>
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