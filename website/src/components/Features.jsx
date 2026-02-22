import React, { useState } from 'react';

const featuresData = [
    {
        icon: "🎵",
        title: "Command Your Soundtrack",
        badge: "7 tools",
        badgeColor: "bg-gold/20 text-gold",
        examples: [
            { cmd: "Play my Discover Weekly playlist", result: "Instant playback" },
            { cmd: "What song is this?", result: "Get full track details" },
            { cmd: "Skip this, play something upbeat", result: "Smart control" }
        ],
        demo: {
            action: "play_spotify_track",
            input: "Bohemian Rhapsody Queen",
            output: "Now playing: Bohemian Rhapsody by Queen 🎵",
            copyCommand: "Play Bohemian Rhapsody by Queen",
            tools: ["play_spotify_track", "pause_spotify", "get_current_track", "skip_track"],
            docs: "https://github.com/sarva-20/heimdall-mcp/tree/main/docs"
        }
    },
    {
        icon: "🪟",
        title: "Control Your Workspace",
        badge: "4 tools",
        badgeColor: "bg-emerald/20 text-emerald",
        examples: [
            { cmd: "Focus my VS Code window", result: "Instant focus" },
            { cmd: "Minimize all Chrome windows", result: "Clean workspace" },
            { cmd: "What's currently active?", result: "Know context" }
        ],
        demo: {
            action: "focus_window",
            input: "Visual Studio Code",
            output: "Focused: Visual Studio Code ✓",
            copyCommand: "Focus my VS Code window",
            tools: ["focus_window", "list_windows", "minimize_window", "close_window"],
            docs: "https://github.com/sarva-20/heimdall-mcp/tree/main/docs"
        }
    },
    {
        icon: "🔋",
        title: "Monitor Everything",
        badge: "4 tools",
        badgeColor: "bg-emerald/20 text-emerald",
        examples: [
            { cmd: "How much battery?", result: "75%, 2hrs remaining" },
            { cmd: "Is CPU overloaded?", result: "23% usage, all good" },
            { cmd: "System specs?", result: "Complete breakdown" }
        ],
        demo: {
            action: "check_battery",
            input: "null",
            output: "Battery: 75%, Charging, Remaining: 120 mins ✓",
            copyCommand: "Check my battery",
            tools: ["check_battery", "check_cpu", "check_memory", "get_system_info"],
            docs: "https://github.com/sarva-20/heimdall-mcp/tree/main/docs"
        }
    },
    {
        icon: "📋",
        title: "Intelligent Data Flow",
        badge: "6 tools",
        badgeColor: "bg-emerald/20 text-emerald",
        examples: [
            { cmd: "Read clipboard and explain error", result: "AI debugging" },
            { cmd: "Save as script.py on Desktop", result: "Instant file" },
            { cmd: "Copy this as JSON", result: "Smart transform" }
        ],
        demo: {
            action: "write_file",
            input: "~/Desktop/script.py, content: print('Hello')",
            output: "Created: ~/Desktop/script.py ✓",
            copyCommand: "Save as script.py on Desktop",
            tools: ["read_clipboard", "write_clipboard", "read_file", "write_file"],
            docs: "https://github.com/sarva-20/heimdall-mcp/tree/main/docs"
        }
    },
    {
        icon: "🔔",
        title: "Stay Informed",
        badge: "2 tools",
        badgeColor: "bg-emerald/20 text-emerald",
        examples: [
            { cmd: "Notify at 20% battery", result: "Auto alerts" },
            { cmd: "Remind me in 25 mins", result: "Pomodoro" },
            { cmd: "Alert if CPU > 80%", result: "Monitoring" }
        ],
        demo: {
            action: "send_notification",
            input: "Meeting in 5 mins",
            output: "Notification dispatched to Notification Center ✓",
            copyCommand: "Send notification 'Meeting in 5 mins'",
            tools: ["send_notification", "schedule_alert"],
            docs: "https://github.com/sarva-20/heimdall-mcp/tree/main/docs"
        }
    },
    {
        icon: "🎨",
        title: "Perfect Your Setup",
        badge: "3 tools",
        badgeColor: "bg-emerald/20 text-emerald",
        examples: [
            { cmd: "Set volume to 40%", result: "Instant adjust" },
            { cmd: "Enable dark mode", result: "Ambient aware" },
            { cmd: "Dim screen to 30%", result: "Comfort" }
        ],
        demo: {
            action: "set_volume",
            input: "40",
            output: "System volume set to 40% ✓",
            copyCommand: "Set volume to 40%",
            tools: ["set_volume", "toggle_dark_mode", "set_brightness"],
            docs: "https://github.com/sarva-20/heimdall-mcp/tree/main/docs"
        }
    }
];

const FeatureCard = ({ icon, title, badge, badgeColor, examples, demo }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(demo.copyCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={`bg-forest-deep/60 border rounded-xl p-6 transition-all duration-500 overflow-hidden flex flex-col backdrop-blur-sm relative group
        ${isExpanded
                    ? 'border-emerald shadow-[0_0_30px_rgba(80,200,120,0.2)] md:col-span-2 lg:col-span-3'
                    : 'border-emerald/20 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(80,200,120,0.15)] h-full'}`}
        >
            {/* Header section - clicking anywhere here toggles expansion if collapsed, or just the button if expanded */}
            <div
                className={`flex flex-col ${!isExpanded ? 'cursor-pointer h-full' : ''}`}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                <div className="flex justify-between items-start mb-5">
                    <div className="text-4xl">{icon}</div>
                    <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor || 'bg-emerald/20 text-emerald'}`}>
                            {badge}
                        </div>
                        {isExpanded && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                className="w-8 h-8 rounded-full bg-forest-dark border border-emerald/30 text-gray-400 hover:text-white hover:border-emerald hover:bg-emerald/10 flex items-center justify-center transition-all"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div className={`flex flex-col md:flex-row gap-6 ${isExpanded ? 'mb-8' : 'flex-grow flex-col'}`}>
                    <div className={isExpanded ? 'md:w-1/3' : 'w-full flex flex-col flex-grow'}>
                        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                        <ul className="space-y-3 flex-grow mb-6">
                            {examples.map((ex, idx) => (
                                <li key={idx} className="text-sm">
                                    <span className="text-gray-300 italic">"{ex.cmd}"</span>
                                    <span className="text-emerald mx-2">→</span>
                                    <span className="text-gray-400">{ex.result}</span>
                                </li>
                            ))}
                        </ul>

                        {!isExpanded && (
                            <div className="mt-auto">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                                    className="w-full py-2.5 rounded-lg border border-emerald/30 text-emerald text-sm font-bold bg-emerald/5 hover:bg-emerald hover:text-forest-dark hover:border-emerald transition-all mt-4"
                                >
                                    See Demo
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Expanded Content Area */}
                    <div className={`transition-all duration-500 origin-top overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100 md:w-2/3 flex flex-col md:border-l md:border-emerald/10 md:pl-6' : 'max-h-0 opacity-0 hidden'}`}>

                        <h4 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Live Terminal Execution
                        </h4>

                        <div className="bg-forest-dark rounded-lg border border-emerald/30 font-mono text-sm overflow-hidden mb-6 shadow-inner">
                            <div className="p-4 space-y-3">
                                <div className="flex text-gray-400">
                                    <span className="text-emerald mr-2">→</span>
                                    <span>{demo.action}</span>
                                </div>
                                <div className="text-gray-500 ml-5">
                                    Input: <span className="text-gray-300">"{demo.input}"</span>
                                </div>
                                <div className="text-jade ml-5 pt-2 border-t border-white/5 animate-pulse-once">
                                    Output: {demo.output}
                                </div>
                            </div>
                            <div className="bg-forest-deep px-4 py-2 border-t border-emerald/20 flex justify-between items-center">
                                <span className="text-xs text-gray-400">Try this command:</span>
                                <button
                                    onClick={handleCopy}
                                    className="text-xs bg-emerald/10 text-emerald hover:bg-emerald hover:text-forest-dark px-3 py-1 rounded transition-colors"
                                >
                                    {copied ? 'Copied!' : 'Copy Command'}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                            <div className="flex-grow">
                                <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">Related Tools</h4>
                                <div className="flex flex-wrap gap-2">
                                    {demo.tools.map(tool => (
                                        <span key={tool} className="text-xs bg-forest-dark border border-white/10 text-gray-300 px-2 py-1 rounded">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="sm:self-end mt-4 sm:mt-0">
                                <a
                                    href={demo.docs}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-emerald hover:text-jade font-medium text-sm border-b border-transparent hover:border-jade pb-0.5 transition-all"
                                >
                                    Learn More <span className="text-lg leading-none">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-24 bg-forest-dark relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight bg-gradient-to-r from-emerald to-jade text-transparent bg-clip-text inline-block w-full">
                    Powers of the Guardian
                </h2>

                {/* We use dense packing to allow expanded items to take full width naturally */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
