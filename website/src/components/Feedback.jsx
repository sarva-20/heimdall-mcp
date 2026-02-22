import React, { useState } from 'react';

const Feedback = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            setStatus('error');
        }
    };

    return (
        <section id="feedback" className="py-24 relative overflow-hidden bg-forest-dark">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-emerald/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Share Your <span className="bg-gradient-to-r from-emerald to-jade text-transparent bg-clip-text">Feedback</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Help us improve Heimdall MCP by sharing your thoughts.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/20 text-emerald mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                            <p className="text-gray-400">Your feedback has been submitted successfully.</p>
                            <button
                                onClick={() => setStatus('')}
                                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
                            >
                                Submit another response
                            </button>
                        </div>
                    ) : (
                        <form
                            action="https://formspree.io/f/YOUR_FORM_ID"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <input type="hidden" name="_subject" value="Heimdall Feedback" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Rating</label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <label key={num} className="cursor-pointer group flex shadow-sm flex-col items-center">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={num}
                                                required
                                                className="peer sr-only"
                                            />
                                            <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/10 bg-black/40 text-gray-400 peer-checked:border-emerald peer-checked:text-emerald peer-checked:bg-emerald/10 hover:border-white/30 transition-all font-semibold">
                                                {num}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors resize-none"
                                    placeholder="Tell us what you think..."
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    Oops! There was a problem submitting your feedback. Please try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-emerald hover:bg-emerald-light text-forest-dark font-bold rounded-lg px-6 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-forest-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Feedback;
