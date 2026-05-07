import React, { useState, useEffect } from 'react';

const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-forest-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald to-jade text-transparent bg-clip-text">Heimdall</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="https://github.com/sarva-20/heimdall-mcp/tree/main/docs" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
                <a href="https://github.com/sarva-20/heimdall-mcp" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
            </nav>
        </div>
    </header>
);

const Particle = ({ className, style }) => (
    <div className={`absolute rounded-full opacity-60 ${className}`} style={style} />
);

const BackgroundParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimalist tree silhouette using SVG */}
        <div className="absolute inset-x-0 bottom-0 top-[10%] opacity-10 flex justify-center items-end">
            <svg width="100%" height="80%" viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
                <path d="M500 800 L500 400 M500 600 L400 300 M500 500 L650 250 M450 450 L350 200 M550 400 L700 150 M400 300 L300 100 M650 250 L800 50 M400 300 L200 150 M500 400 L400 150 M500 600 L750 350 M750 350 L900 200 M450 450 L250 300 M250 300 L150 150 M550 400 L600 200 M650 250 L600 50 M500 500 L350 400" stroke="white" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
        </div>

        {/* Particles */}
        <Particle className="bg-emerald w-4 h-4 animate-float-slow" style={{ top: '20%', left: '15%' }} />
        <Particle className="bg-jade w-3 h-3 animate-float-medium" style={{ top: '40%', left: '80%' }} />
        <Particle className="bg-emerald w-5 h-5 animate-float-fast" style={{ top: '70%', left: '25%' }} />
        <Particle className="bg-jade w-2 h-2 animate-float-slow" style={{ top: '10%', left: '60%' }} />
        <Particle className="bg-emerald w-6 h-6 animate-float-medium" style={{ top: '80%', left: '75%' }} />
        <Particle className="bg-white w-2 h-2 animate-float-fast blur-[1px]" style={{ top: '50%', left: '10%' }} />
        <Particle className="bg-jade w-4 h-4 animate-float-slow blur-sm" style={{ top: '30%', left: '90%' }} />
    </div>
);

const Hero = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header />
            <section className="relative min-h-screen bg-gradient-to-b from-forest-dark to-forest-deep flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                >
                    <BackgroundParticles />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up mt-20">
                    <div className="mb-6 flex justify-center">
                        <span className="text-6xl drop-shadow-[0_0_30px_rgba(80,200,120,0.8)] filter">🛡️</span>
                    </div>

                    <div className="inline-block mb-8 px-5 py-1.5 rounded-full border border-emerald bg-transparent">
                        <span className="text-white text-sm font-medium tracking-wide">v0.2.1 • 33 Tools • Listed on mcpservers.org</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                        The All-Seeing Guardian <br />
                        <span className="bg-gradient-to-r from-emerald via-jade to-white text-transparent bg-clip-text drop-shadow-sm">of Your Mac</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Bridge the realms between Claude AI and macOS. Command your system through the Bifröst of natural language.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <a
                            href="https://github.com/sarva-20/heimdall-mcp/blob/main/docs/INSTALLATION.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-emerald text-forest-dark font-bold text-lg hover:shadow-[0_0_20px_rgba(80,200,120,0.5)] transition-all transform hover:-translate-y-1 inline-flex items-center justify-center"
                        >
                            Start Your Journey
                        </a>
                        <a
                            href="https://github.com/sarva-20/heimdall-mcp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-emerald text-emerald font-bold text-lg hover:bg-emerald/10 transition-all"
                        >
                            Explore on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
