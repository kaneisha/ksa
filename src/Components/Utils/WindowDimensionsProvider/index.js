import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowDimensionsCtx = createContext(null);

const WindowDimensionsProvider = ({ children }) => {

    const breakpoints = {
        'sm': 576,
        'md': 800,
        'lg': 1300,
        'xl': 1500
    }

    const getBreakpoint = (value) => {
        if (value < breakpoints.sm) { return 'xs'; }
        else if (value < breakpoints.md) { return 'sm'; }
        else if (value < breakpoints.lg) { return 'md'; }
        else if (value < breakpoints.xl) { return 'lg'; }
        else { return 'xl'; }
    }

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoints: breakpoints,
        getBreakpoint: getBreakpoint(window.innerWidth)
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
                breakpoints: breakpoints,
                getBreakpoint: getBreakpoint(window.innerWidth)
            })
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [getBreakpoint, breakpoints]);

    return (
        <WindowDimensionsCtx.Provider value={dimensions}>
            {children}
        </WindowDimensionsCtx.Provider>
    );

}

export default WindowDimensionsProvider;
export const useWindowDimensions = () => useContext(WindowDimensionsCtx);