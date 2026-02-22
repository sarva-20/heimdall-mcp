import React, { useState, useEffect } from 'react';

const CodeBlockWithCopy = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative mt-4 bg-forest-dark border border-emerald/30 font-mono text-sm rounded-lg overflow-hidden flex flex-col sm:flex-row group shadow-inner">
            <div className="p-4 overflow-x-auto flex-grow text-gray-300">
                <pre><code>{code}</code></pre>
            </div>
            <button
                onClick={handleCopy}
                className="self-end sm:self-auto m-2 sm:m-0 sm:mr-2 sm:my-2 px-4 py-2 rounded text-sm text-emerald border border-emerald/50 bg-emerald/10 hover:bg-emerald hover:text-forest-dark transition-colors font-bold whitespace-nowrap"
            >
                {copied ? '✓ Copied!' : 'Copy'}
            </button>
        </div>
    );
};

const SetupWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Step 1 State
    const [isMac, setIsMac] = useState(false);
    const [hasBun, setHasBun] = useState(false);
    const [hasClaude, setHasClaude] = useState(false);
    const step1Complete = isMac && hasBun && hasClaude;

    useEffect(() => {
        // Basic OS detection
        if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
            setIsMac(true);
        }
    }, []);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <section id="installation" className="py-24 bg-forest-deep relative z-10 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Interactive Setup Wizard
                    </h2>
                    <p className="text-xl text-gray-400">
                        Let's get Heimdall running on your Mac in minutes.
                    </p>
                </div>

                {/* Progress Bar + Navigation */}
                <div className="bg-forest-dark/80 backdrop-blur-md rounded-2xl border border-emerald/20 shadow-[0_0_30px_rgba(80,200,120,0.1)] overflow-hidden">

                    <div className="border-b border-white/10 p-6 md:px-8 flex justify-between items-center bg-forest-dark">
                        <div className="hidden md:flex gap-2">
                            {[1, 2, 3, 4].map(step => (
                                <div
                                    key={step}
                                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${step === currentStep
                                            ? 'bg-emerald text-forest-dark'
                                            : step < currentStep
                                                ? 'bg-emerald/30 text-emerald'
                                                : 'bg-white/5 text-gray-500'
                                        }`}
                                >
                                    {step < currentStep ? '✓' : step}
                                </div>
                            ))}
                        </div>

                        <div className="flex-grow md:hidden text-emerald font-bold">
                            Step {currentStep} of {totalSteps}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                Back
                            </button>
                            {currentStep < 4 && (
                                <button
                                    onClick={nextStep}
                                    disabled={currentStep === 1 && !step1Complete}
                                    className="px-6 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-emerald text-forest-dark hover:bg-jade hover:shadow-[0_0_15px_rgba(80,200,120,0.4)]"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="h-1 bg-white/5 w-full">
                        <div
                            className="h-full bg-gradient-to-r from-emerald to-jade transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>

                    {/* Wizard Content Area */}
                    <div className="p-6 md:p-10 min-h-[400px]">

                        {/* Step 1: Prerequisites */}
                        {currentStep === 1 && (
                            <div className="animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-white mb-2">Step 1: Check Prerequisites</h3>
                                <p className="text-gray-400 mb-8">Heimdall requires a few things to bridge the realms securely.</p>

                                <div className="space-y-4">
                                    <label className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${isMac ? 'bg-emerald/5 border-emerald/50' : 'bg-white/5 border-white/10 hover:border-emerald/30'}`}>
                                        <div className="mt-0.5">
                                            <input type="checkbox" checked={isMac} onChange={() => setIsMac(!isMac)} className="w-5 h-5 rounded border-emerald/50 text-emerald focus:ring-emerald accent-emerald bg-transparent" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">I am on macOS</div>
                                            <div className="text-sm text-gray-400">Heimdall heavily leverages AppleScript (JXA) to control the system.</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${hasBun ? 'bg-emerald/5 border-emerald/50' : 'bg-white/5 border-white/10 hover:border-emerald/30'}`}>
                                        <div className="mt-0.5">
                                            <input type="checkbox" checked={hasBun} onChange={() => setHasBun(!hasBun)} className="w-5 h-5 rounded border-emerald/50 text-emerald focus:ring-emerald accent-emerald bg-transparent" />
                                        </div>
                                        <div className="w-full">
                                            <div className="font-bold text-white flex justify-between">
                                                <span>Bun is installed</span>
                                                {!hasBun && <a href="https://bun.sh" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline text-sm font-medium" onClick={e => e.stopPropagation()}>Install Bun →</a>}
                                            </div>
                                            <div className="text-sm text-gray-400">Used as the incredibly fast JavaScript runtime.</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${hasClaude ? 'bg-emerald/5 border-emerald/50' : 'bg-white/5 border-white/10 hover:border-emerald/30'}`}>
                                        <div className="mt-0.5">
                                            <input type="checkbox" checked={hasClaude} onChange={() => setHasClaude(!hasClaude)} className="w-5 h-5 rounded border-emerald/50 text-emerald focus:ring-emerald accent-emerald bg-transparent" />
                                        </div>
                                        <div className="w-full">
                                            <div className="font-bold text-white flex justify-between">
                                                <span>Claude Desktop is installed</span>
                                                {!hasClaude && <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline text-sm font-medium" onClick={e => e.stopPropagation()}>Download Claude →</a>}
                                            </div>
                                            <div className="text-sm text-gray-400">The primary interface for Model Context Protocol (MCP) servers.</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Clone & Install */}
                        {currentStep === 2 && (
                            <div className="animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-white mb-2">Step 2: Clone & Install</h3>
                                <p className="text-gray-400 mb-6">Open your terminal and run the following commands to download Heimdall.</p>

                                <CodeBlockWithCopy code={`git clone https://github.com/sarva-20/heimdall-mcp.git\ncd heimdall-mcp\nbun install`} />

                                <div className="mt-10 flex justify-center">
                                    <button
                                        onClick={nextStep}
                                        className="px-8 py-3 rounded-lg text-lg font-bold transition-all bg-emerald/10 border-2 border-emerald text-emerald hover:bg-emerald hover:text-forest-dark hover:shadow-[0_0_20px_rgba(80,200,120,0.3)]"
                                    >
                                        I've run this command
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Configure */}
                        {currentStep === 3 && (
                            <div className="animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-white mb-2">Step 3: Configure Claude Desktop</h3>
                                <p className="text-gray-400 mb-6">We need to tell Claude how to communicate with Heimdall.</p>

                                <div className="mb-4">
                                    <div className="text-sm font-medium text-emerald mb-2">1. Open the Claude config file:</div>
                                    <CodeBlockWithCopy code={`open -e ~/Library/Application\\ Support/Claude/claude_desktop_config.json`} />
                                </div>

                                <div className="mt-8">
                                    <div className="text-sm font-medium text-emerald mb-2">2. Paste this inside the "mcpServers" object:</div>
                                    <CodeBlockWithCopy code={`"heimdall": {\n  "command": "bun",\n  "args": [\n    "run",\n    "/path/to/heimdall-mcp/index.js"\n  ]\n}`} />
                                    <p className="text-xs text-gray-500 mt-2">* Don't forget to replace <code className="text-emerald">/path/to/heimdall-mcp</code> with your actual repository path.</p>
                                </div>

                                <div className="mt-10 flex justify-center">
                                    <button
                                        onClick={nextStep}
                                        className="px-8 py-3 rounded-lg text-lg font-bold transition-all bg-emerald/10 border-2 border-emerald text-emerald hover:bg-emerald hover:text-forest-dark hover:shadow-[0_0_20px_rgba(80,200,120,0.3)]"
                                    >
                                        I've configured it
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Success */}
                        {currentStep === 4 && (
                            <div className="animate-fade-in-up text-center py-6">
                                <div className="w-24 h-24 bg-emerald/20 text-emerald rounded-full flex items-center justify-center text-5xl mx-auto mb-6 border-4 border-emerald shadow-[0_0_30px_rgba(80,200,120,0.4)] animate-bounce">
                                    ✓
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Installation Complete!</h3>
                                <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
                                    Restart the Claude Desktop application to establish the connection.
                                    You are now ready to command your Mac.
                                </p>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-10 text-left">
                                    <h4 className="text-emerald font-bold mb-3 uppercase text-sm tracking-wider flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                                        Suggested First Commands
                                    </h4>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex gap-2"><span className="text-gray-500">→</span> "Check my battery"</li>
                                        <li className="flex gap-2"><span className="text-gray-500">→</span> "What applications are running?"</li>
                                        <li className="flex gap-2"><span className="text-gray-500">→</span> "Focus my Spotify window"</li>
                                    </ul>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <a href="https://github.com/sarva-20/heimdall-mcp/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                                        Report an issue
                                    </a>
                                    <span className="text-gray-600">•</span>
                                    <a href="https://github.com/sarva-20/heimdall-mcp" target="_blank" rel="noopener noreferrer" className="text-emerald hover:text-jade transition-colors font-bold">
                                        Star on GitHub
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SetupWizard;
