import React from 'react';

const ProgressBar = (props) => {
    const { bgcolor, progress, height } = props;

    const containerStyles = {
        display: 'flex',
        alignItems: 'center',
        height: height,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        marginLeft: 0,
        marginTop: -12,
        color: 'black',
    }

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
    }

    const textContainerStyles = {
        // display: 'flex',
        // alignItems: 'center',
    };

    const textOutsideBarStyles = {
        position: 'relative',
        fontWeight: '200',
        fontSize: '13px',
        top: '-15px',
    };

    return (
        <div>
            <div style={textOutsideBarStyles}>{`${progress}% funded`}</div>
            <div style={containerStyles}>
                <div style={fillerStyles}></div>
            </div>
            <div style={textContainerStyles}>
            </div>
        </div>
    );
}

export default ProgressBar;
