import React, { useState } from 'react';
import spotifyDemo from '../assets/demos/spotify-control.png'
import systemDemo from '../assets/demos/system-monitor.png'
import windowsDemo from '../assets/demos/window-management.png'
import filesDemo from '../assets/demos/file-automation.png'

const DemoImage = ({ image, title, description }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex flex-col group cursor-pointer">
            <div className="relative w-full pb-[56.25%] mb-4 rounded-xl overflow-hidden border-2 border-emerald/20 bg-forest-deep shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-emerald group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(80,200,120,0.25)]">
                {/* Shimmer Effect while loading */}
                {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] z-10"></div>
                )}

                {/* Actual Image */}
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
            <div>
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-emerald transition-colors">{title}</h4>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    );
};

const VisualShowcase = () => {
    const demos = [
        {
            image: spotifyDemo,
            title: "Control Spotify hands-free",
            description: "Instantly play tracks, skip songs, and adjust volume without leaving your workflow."
        },
        {
            image: systemDemo,
            title: "Monitor your system effortlessly",
            description: "Get real-time updates on battery life, CPU usage, and network status."
        },
        {
            image: windowsDemo,
            title: "Manage windows like a pro",
            description: "Focus applications or minimize chaotic workspaces with a single thought."
        },
        {
            image: filesDemo,
            title: "Automate repetitive tasks",
            description: "Read and write to your clipboard or local files directly from the chat interface."
        }
    ];

    return (
        <section id="showcase" className="py-24 bg-forest-dark relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        See Heimdall in Your Workflow
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Dynamic visual demonstrations of how natural language commands instantly manipulate macOS.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {demos.map((item, index) => (
                        <DemoImage key={index} image={item.image} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisualShowcase;
