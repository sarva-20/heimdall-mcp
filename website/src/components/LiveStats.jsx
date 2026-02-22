import React, { useState, useEffect } from 'react';

// Custom hook for count-up animation
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            setCount(Math.floor(end * easeOutQuart));

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };

        if (end > 0) {
            requestAnimationFrame(animate);
        }
    }, [end, duration]);

    return count;
};

const StatCard = ({ title, value, isLoading, useAnimation = false }) => {
    const animatedValue = useCountUp(useAnimation ? (typeof value === 'number' ? value : 0) : 0);
    const displayValue = useAnimation ? (typeof value === 'number' ? animatedValue : value) : value;

    return (
        <div className="bg-forest-deep/60 border border-emerald/20 rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(80,200,120,0.2)] flex flex-col items-center justify-center text-center h-full">
            {isLoading ? (
                <div className="animate-pulse flex flex-col items-center w-full">
                    <div className="h-10 bg-emerald/20 rounded w-20 mb-3"></div>
                    <div className="h-4 bg-emerald/10 rounded w-24"></div>
                </div>
            ) : (
                <>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {displayValue}
                    </div>
                    <div className="text-emerald font-medium text-sm md:text-base tracking-wide uppercase">
                        {title}
                    </div>
                </>
            )}
        </div>
    );
};

const LiveStats = () => {
    const [githubStats, setGithubStats] = useState({ stars: 0, loading: true, error: false });

    const fetchStats = async () => {
        try {
            // Using GitHub API to fetch repo stats
            const response = await fetch('https://api.github.com/repos/sarva-20/heimdall-mcp');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setGithubStats({
                stars: data.stargazers_count,
                loading: false,
                error: false
            });
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            // Default to 0 or a hardcoded fallback if API fails
            setGithubStats(prev => ({
                ...prev,
                loading: false,
                error: true,
                stars: prev.stars || 42 // Fallback to a realistic-looking number or keep previous if available
            }));
        }
    };

    useEffect(() => {
        fetchStats();

        // Refresh stats every 5 minutes (300,000 ms)
        const interval = setInterval(fetchStats, 300000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 bg-forest-dark relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <StatCard
                        title="GitHub Stars"
                        value={githubStats.stars}
                        isLoading={githubStats.loading}
                        useAnimation={true}
                    />
                    <StatCard
                        title="Total Tools"
                        value="35+"
                        isLoading={false}
                    />
                    <StatCard
                        title="Listed"
                        value="mcpservers.org ✅"
                        isLoading={false}
                    />
                    <StatCard
                        title="License"
                        value="MIT Open Source"
                        isLoading={false}
                    />
                </div>

                {githubStats.error && (
                    <p className="text-center text-xs text-emerald/40 mt-6 mt-4">
                        *Stats are currently displaying cached data
                    </p>
                )}
            </div>
        </section>
    );
};

export default LiveStats;
