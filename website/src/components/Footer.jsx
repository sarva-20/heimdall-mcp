import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-forest-dark border-t border-white/5 pt-16 pb-8 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Column 1: Branding */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🛡️</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald to-jade text-transparent bg-clip-text">Heimdall</span>
                        </div>
                        <p className="text-gray-400 font-medium mb-2">The All-Seeing Guardian</p>
                        <div className="inline-block mb-6 px-3 py-1 rounded-full border border-emerald/20 bg-emerald/5 w-max">
                            <span className="text-emerald text-xs font-semibold tracking-wide">v0.2.1</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-auto">
                            Made with <span className="text-red-500">❤️</span> by Sarvatarshan Sankar
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col">
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp/tree/main/docs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    GitHub Repository
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    Report Issues
                                </a>
                            </li>
                            <li>
                                <a href="https://mcpservers.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm flex items-center gap-1">
                                    mcpservers.org
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="flex flex-col">
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp/blob/main/docs/INSTALLATION.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    Installation Guide
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp/blob/main/docs/USAGE.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    Usage Examples
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    Changelog
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/sarva-20/heimdall-mcp/blob/main/docs/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald transition-colors text-sm">
                                    Contributing
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 Heimdall MCP. MIT License
                    </p>
                    <div className="flex items-center">
                        <a href="https://github.com/sarva-20/heimdall-mcp" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald transition-colors" aria-label="GitHub">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
