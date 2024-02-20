import React from 'react';

function Progressproperties(props) {
    const { bgcolor, progress, height, width, left } = props;

    const containerStyles = {
        display: 'flex',
        alignItems: 'center',
        height: height,
        width: width,
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        marginLeft: 0,
        marginTop: -12,
        color: 'black',
    };

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    };

    const textOutsideBarStyles = {
        position: 'relative',
        color: 'black',
        fontWeight: '500',
        fontSize: '13px',
        top: '-15px',
        left: left,
        transform: 'translateX(-50%)', // Center the text
    };

    return (
        <div>
            <div style={textOutsideBarStyles}>{`${progress}% funded`}</div>
            <div style={containerStyles}>
                <div style={fillerStyles}></div>
            </div>
        </div>
    );
}

export default Progressproperties;
