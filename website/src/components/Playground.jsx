import React, { useState, useEffect } from 'react';

const categories = {
    "System Monitoring": [
        { label: "Check battery", cmd: "Check my battery", response: ["Battery: 75%, Charging, Remaining: 120 mins", "✓ Success"] },
        { label: "CPU usage", cmd: "What is the CPU usage?", response: ["CPU Load: 15% (User: 10%, Sys: 5%)", "Active cores: 8", "✓ Success"] },
        { label: "RAM status", cmd: "Check RAM usage", response: ["Memory Pressure: Normal", "Used: 12GB / 16GB", "✓ Success"] },
        { label: "System specs", cmd: "Show system info", response: ["OS: macOS Sonoma 14.3", "Chip: Apple M2 Pro", "Uptime: 4 days, 12:30", "✓ Success"] },
    ],
    "Media Control": [
        { label: "Play track", cmd: "Play Bohemian Rhapsody", response: ["Now playing: Bohemian Rhapsody by Queen 🎵", "✓ Success"] },
        { label: "Pause media", cmd: "Pause Spotify", response: ["Playback paused", "✓ Success"] },
        { label: "Skip track", cmd: "Skip this song", response: ["Skipping to next track...", "✓ Success"] },
        { label: "Set volume 50%", cmd: "Set volume to 50%", response: ["System volume set to 50%", "✓ Success"] },
    ],
    "Window Management": [
        { label: "List windows", cmd: "What apps are running?", response: ["Visible applications:", "• Safari", "• VS Code", "• Spotify", "• Warp", "✓ Success"] },
        { label: "Focus VS Code", cmd: "Focus my VS Code window", response: ["Focused application: Visual Studio Code", "✓ Success"] },
        { label: "Minimize all", cmd: "Minimize all windows", response: ["All visible windows minimized to dock", "✓ Success"] },
    ],
    "File Operations": [
        { label: "Save file", cmd: "Save as summary.md on Desktop", response: ["Created: ~/Desktop/summary.md", "Content written successfully", "✓ Success"] },
        { label: "Read file", cmd: "What is in config.json?", response: ["Reading ./config.json...", "{", '  "theme": "dark",', '  "autoSave": true', "}", "✓ Success"] },
        { label: "List Desktop", cmd: "List files on Desktop", response: ["Desktop contents:", "• Project_Proposal.pdf", "• screenshot_1.png", "• summary.md", "✓ Success"] },
    ],
    "Notifications": [
        { label: "Send alert", cmd: 'Send notification "Meeting in 5"', response: ["Notification dispatched to Notification Center", "✓ Success"] },
        { label: "Remind me", cmd: "Remind me to drink water in 1hr", response: ["Timer set for 1 hour: Drink water", "✓ Success"] },
    ]
};

const Playground = () => {
    const [selectedCategory, setSelectedCategory] = useState("System Monitoring");
    const [activeCommand, setActiveCommand] = useState(null);

    const [displayedCmd, setDisplayedCmd] = useState('');
    const [showOutput, setShowOutput] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout;

        if (activeCommand && isTyping) {
            if (displayedCmd.length < activeCommand.cmd.length) {
                timeout = setTimeout(() => {
                    setDisplayedCmd(activeCommand.cmd.slice(0, displayedCmd.length + 1));
                }, 30); // Fast typing speed
            } else {
                setIsTyping(false);
                timeout = setTimeout(() => {
                    setShowOutput(true);
                }, 800); // Pause before showing output
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedCmd, isTyping, activeCommand]);

    const handleSelectCommand = (cmdObj) => {
        setActiveCommand(cmdObj);
        setDisplayedCmd('');
        setShowOutput(false);
        setIsTyping(true);
        setCopied(false);
    };

    const handleReset = () => {
        setActiveCommand(null);
        setDisplayedCmd('');
        setShowOutput(false);
        setIsTyping(false);
        setCopied(false);
    };

    const handleCopy = () => {
        if (activeCommand) {
            navigator.clipboard.writeText(activeCommand.cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section id="playground" className="py-24 bg-forest-dark relative z-10 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-emerald to-jade text-transparent bg-clip-text inline-block">
                        Try It Yourself
                    </h2>
                    <p className="text-xl text-gray-400">
                        See what Heimdall can do - no installation needed
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Controls Panel */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        <div className="bg-forest-deep/50 border border-emerald/20 rounded-xl p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(80,200,120,0.05)]">
                            <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                            <div className="space-y-2">
                                {Object.keys(categories).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                                                ? 'bg-emerald border border-emerald text-forest-dark font-bold'
                                                : 'bg-forest-dark border border-emerald/10 text-gray-300 hover:border-emerald/30 hover:bg-emerald/5'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-forest-deep/50 border border-emerald/20 rounded-xl p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(80,200,120,0.05)]">
                            <h3 className="text-lg font-bold text-white mb-4">Available Commands</h3>
                            <div className="space-y-2">
                                {categories[selectedCategory].map((cmdObj, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelectCommand(cmdObj)}
                                        className="w-full text-left px-4 py-2 rounded-lg text-sm transition-colors bg-forest-dark border border-emerald/10 text-emerald hover:border-emerald/40 hover:bg-emerald/10 hover:shadow-[0_0_10px_rgba(80,200,120,0.2)] group"
                                    >
                                        {cmdObj.label}
                                        <span className="opacity-0 group-hover:opacity-100 float-right transition-opacity">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-center text-emerald/60 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                            This is a demo. Real Heimdall does this on YOUR Mac!
                        </p>
                    </div>

                    {/* Terminal Display */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-forest-dark border-2 border-emerald/40 rounded-xl shadow-[0_0_40px_rgba(80,200,120,0.2)] overflow-hidden transition-all duration-500 flex flex-col font-mono h-[450px]">
                            {/* Terminal Header */}
                            <div className="bg-forest-deep flex items-center justify-between px-4 py-3 border-b border-emerald/20">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="text-gray-400 text-xs">interactive-demo — bash</div>
                                <div className="w-16"></div> {/* Spacer for centering */}
                            </div>

                            {/* Terminal Body */}
                            <div className="p-6 md:p-8 flex-grow flex flex-col overflow-y-auto">
                                {!activeCommand ? (
                                    <div className="flex-grow flex items-center justify-center text-center px-4">
                                        <div className="text-gray-500">
                                            <p className="mb-2">⚡️ Welcome to the Heimdall Playground</p>
                                            <p className="text-xs">Select a category and command from the left to see it in action.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div className="flex text-emerald mb-4">
                                                <span className="mr-2">~</span>
                                                <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                                    {displayedCmd}
                                                    <span className={`${isTyping ? 'animate-none opacity-100' : 'animate-pulse'} bg-emerald w-2 h-4 inline-block ml-1 align-middle`}></span>
                                                </span>
                                            </div>
                                        </div>

                                        {showOutput && (
                                            <div className="mt-4 text-jade animate-fade-in-up space-y-1 bg-emerald/5 p-4 rounded-lg border border-emerald/10">
                                                {activeCommand.response.map((line, i) => {
                                                    if (line === "✓ Success") {
                                                        return <div key={i} className="text-green-400 font-bold mt-4">{line}</div>;
                                                    }
                                                    return (
                                                        <div key={i} className={`${line.startsWith('•') || line.startsWith('  ') ? 'ml-4 text-gray-300' : 'text-gray-200'}`}>
                                                            {line}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Terminal Footer Actions */}
                                {activeCommand && showOutput && (
                                    <div className="mt-auto pt-8 flex gap-3 animate-fade-in-up">
                                        <button
                                            onClick={handleReset}
                                            className="px-4 py-2 rounded text-xs font-sans text-forest-dark bg-emerald hover:bg-jade hover:shadow-[0_0_15px_rgba(80,200,120,0.4)] transition-all font-bold"
                                        >
                                            Try Another Command
                                        </button>
                                        <button
                                            onClick={handleCopy}
                                            className="px-4 py-2 rounded text-xs font-sans text-emerald border border-emerald hover:bg-emerald/10 transition-colors"
                                        >
                                            {copied ? 'Copied!' : 'Copy Command'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Playground;
