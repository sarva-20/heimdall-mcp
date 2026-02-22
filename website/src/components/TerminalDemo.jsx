import React, { useState, useEffect } from 'react';

const commands = [
    {
        cmd: "→ Check my battery",
        output: ["Battery: 75%, Charging, Remaining: 120 mins ✓"],
    },
    {
        cmd: "→ Play Bohemian Rhapsody on Spotify",
        output: ["Searching and playing: Bohemian Rhapsody by Queen 🎵"],
    },
    {
        cmd: "→ What apps are running?",
        output: [
            "Running applications:",
            "• Safari",
            "• Visual Studio Code",
            "• Spotify",
            "• Claude ✓"
        ],
    },
    {
        cmd: "→ Focus my VS Code window",
        output: ["Focused: Visual Studio Code ✓"],
    }
];

const TerminalDemo = () => {
    const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
    const [displayedCmd, setDisplayedCmd] = useState('');
    const [showOutput, setShowOutput] = useState(false);
    const [isTyping, setIsTyping] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout;
        if (isTyping) {
            const fullCmd = commands[currentCmdIndex].cmd;
            if (displayedCmd.length < fullCmd.length) {
                timeout = setTimeout(() => {
                    setDisplayedCmd(fullCmd.slice(0, displayedCmd.length + 1));
                }, 50); // Typing speed
            } else {
                setIsTyping(false);
                timeout = setTimeout(() => {
                    setShowOutput(true);
                }, 500); // Pause before showing output
            }
        } else {
            timeout = setTimeout(() => {
                // Reset for next command
                setShowOutput(false);
                setDisplayedCmd('');
                setIsTyping(true);
                setCurrentCmdIndex((prev) => (prev + 1) % commands.length);
                setCopied(false);
            }, 4000); // Show output for 4 seconds before cycling
        }

        return () => clearTimeout(timeout);
    }, [displayedCmd, isTyping, currentCmdIndex]);

    const handleCopy = () => {
        // Copy without the "→ " prefix
        const textToCopy = commands[currentCmdIndex].cmd.replace('→ ', '');
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 bg-forest-dark relative z-10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        See Heimdall in Action
                    </h2>
                    <p className="text-xl text-gray-400">
                        Natural language, powerful results
                    </p>
                </div>

                <div className="bg-forest-dark border border-emerald/30 rounded-xl shadow-[0_0_30px_rgba(80,200,120,0.1)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(80,200,120,0.15)] flex flex-col font-mono text-sm md:text-base">
                    {/* Terminal Header */}
                    <div className="bg-forest-deep flex items-center px-4 py-3 border-b border-emerald/20">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto text-gray-400 text-xs">heimdall-mcp — bash</div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex text-emerald mb-2">
                                    <span className="mr-2">~</span>
                                    <span>
                                        {displayedCmd}
                                        <span className="animate-pulse bg-emerald w-2 h-4 inline-block ml-1 align-middle"></span>
                                    </span>
                                </div>

                                {displayedCmd.length === commands[currentCmdIndex].cmd.length && (
                                    <button
                                        onClick={handleCopy}
                                        className="ml-4 px-3 py-1 rounded text-xs font-sans text-emerald border border-emerald/30 hover:bg-emerald/10 transition-colors"
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                )}
                            </div>

                            {showOutput && (
                                <div className="mt-2 text-jade animate-fade-in-up">
                                    {commands[currentCmdIndex].output.map((line, i) => (
                                        <div key={i} className={`${i > 0 && line.startsWith('•') ? 'ml-4' : ''} mb-1`}>
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-gray-500 text-xs border-t border-white/5 pt-4 text-right">
                            Command {currentCmdIndex + 1} of {commands.length}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TerminalDemo;
