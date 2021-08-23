import React from "react";

export const Loading = (props) => {
    return (
        <div className="loading">
            <p>{props.text}<span>.</span><span>.</span><span>.</span></p>
        </div>
    );
};