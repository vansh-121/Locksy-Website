export default function KeyboardShortcuts() {
    const shortcuts = [
        {
            keys: ["Alt", "Shift", "9"],
            action: "Lock Current Tab",
            description: "Instantly lock the tab you're currently viewing",
            icon: "🔒",
            gradient: "from-blue-500 via-cyan-500 to-teal-500",
        },
        {
            keys: ["Alt", "Shift", "0"],
            action: "Open Domain Lock Manager",
            description: "Quick access to manage all your locked domains",
            icon: "🗂️",
            gradient: "from-purple-500 via-pink-500 to-rose-500",
        },
        {
            keys: ["Alt", "Shift", "8"],
            action: "Lock All Tabs",
            description: "Lock all compatible tabs in the current window at once",
            icon: "⚡",
            gradient: "from-orange-500 via-red-500 to-pink-500",
        },
    ]

    return (
        <section id="keyboard-shortcuts" className="py-24 md:py-32 bg-gradient-to-b from-accent via-background to-accent relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-300" />
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-full text-sm font-bold shadow-2xl mb-6 animate-pulse">
                        <span className="text-lg">⌨️</span>
                        <span>Version 1.0.7</span>
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">NEW</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight text-foreground mb-6">
                        Lightning-Fast{" "}
                        <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                            Keyboard Shortcuts
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Lock tabs at the speed of thought. No mouse needed.
                    </p>
                </div>

                {/* Shortcuts - Bento Box Style */}
                <div className="max-w-6xl mx-auto mb-20">
                    <div className="grid md:grid-cols-3 gap-6">
                        {shortcuts.map((shortcut, idx) => (
                            <div
                                key={idx}
                                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Subtle gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${shortcut.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                <div className="relative p-8">
                                    {/* Icon - cleaner look */}
                                    <div className="mb-6">
                                        <div className={`inline-flex w-16 h-16 items-center justify-center text-4xl bg-gradient-to-br ${shortcut.gradient} rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300`}>
                                            {shortcut.icon}
                                        </div>
                                    </div>

                                    {/* Action Title */}
                                    {/* Action Title */}
                                    <h3 className="font-bold text-xl mb-4 text-foreground">
                                        {shortcut.action}
                                    </h3>
                                    {/* Keyboard Keys - Softer styling */}
                                    <div className="flex flex-wrap items-center justify-start gap-2 mb-6">
                                        {shortcut.keys.map((key, keyIdx) => (
                                            <span key={keyIdx} className="inline-flex items-center">
                                                <kbd className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm text-base font-semibold text-gray-700 min-w-[3.5rem] text-center hover:border-gray-300 transition-all">
                                                    {key}
                                                </kbd>
                                                {keyIdx < shortcut.keys.length - 1 && (
                                                    <span className="mx-2 text-lg font-medium text-gray-400">+</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed text-base">
                                        {shortcut.description}
                                    </p>
                                </div>

                                {/* Subtle corner accent */}
                                <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${shortcut.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section - Side by Side */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    {/* Customization Info */}
                    <div className="md:col-span-1 group relative overflow-hidden bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                                ⚙️
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-foreground mb-2">
                                    Fully Customizable
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Personalize all shortcuts in your browser's extension settings.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Indicators */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                        <div className="group relative overflow-hidden bg-gradient-to-br from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/20 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                                    🔒
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-foreground mb-2">
                                        Lock Icon
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Red lock overlay on tab favicons. Spot protected tabs instantly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden bg-gradient-to-br from-red-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                                    🔢
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-foreground mb-2">
                                        Badge Counter
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Real-time counter on extension icon. Never lose track of locked tabs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
