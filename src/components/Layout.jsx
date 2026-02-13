import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-ram-eesh-blue text-white selection:bg-ram-eesh-gold selection:text-black">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-ram-eesh-gold/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

            {/* Glass Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center min-h-screen backdrop-blur-sm">
                <div className="w-full h-full p-4 md:p-8 max-w-7xl mx-auto flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
