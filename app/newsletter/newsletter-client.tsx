"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Mail,
    Send,
    CheckCircle2,
    Shield,
    Bell,
    Sparkles,
    Lock,
    Zap,
    TrendingUp,
    MessageSquare
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const NEWSLETTER_BENEFITS = [
    {
        title: "Security Updates",
        description: "Be the first to know about critical security patches and updates",
        icon: Shield,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Feature Announcements",
        description: "Get early access to new features and improvements",
        icon: Sparkles,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Privacy Tips",
        description: "Learn best practices for online security and privacy",
        icon: Lock,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Performance Insights",
        description: "Discover tips to optimize your browsing experience",
        icon: Zap,
        color: "from-yellow-500 to-orange-500",
    },
    {
        title: "Product Roadmap",
        description: "Stay informed about upcoming features and improvements",
        icon: TrendingUp,
        color: "from-red-500 to-rose-500",
    },
    {
        title: "Community Feedback",
        description: "Share your thoughts and help shape Locksy's future",
        icon: MessageSquare,
        color: "from-indigo-500 to-purple-500",
    },
]

export default function NewsletterClient() {
    const [email, setEmail] = useState("")
    const [privacyAgreed, setPrivacyAgreed] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!privacyAgreed) {
            setError("Please agree to receive newsletters to continue.")
            return
        }
        
        setIsSubmitting(true)
        setError("")

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    subject: "New Locksy Newsletter Subscription",
                    from_name: "Newsletter Subscriber",
                    email: email,
                    message: `
New Newsletter Subscription - Locksy

Email: ${email}

Subscription Type: General Newsletter
- Security Updates
- Feature Announcements
- Privacy Tips
- Performance Insights
- Product Roadmap Updates
- Community Feedback

Privacy Agreement: Confirmed

---
Timestamp: ${new Date().toISOString()}
                    `.trim(),
                }),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitted(true)
                setEmail("")
                setPrivacyAgreed(false)
            } else {
                setError("Failed to subscribe. Please try again later.")
            }
        } catch (err) {
            setError("Network error. Please try again later.")
            console.error("Subscription error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

                {/* Header */}
                <Header />

                <main className="relative max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                            <Bell className="h-4 w-4 animate-pulse" />
                            Stay Updated
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Locksy Newsletter
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Get the latest security updates, feature announcements, and exclusive insights delivered to your inbox
                        </p>
                    </div>

                    {/* Subscription Form */}
                    <div className="max-w-2xl mx-auto mb-16">
                        {!submitted ? (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                                <Card className="relative border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl">
                                    <CardContent className="pt-8 pb-8">
                                        <div className="text-center space-y-2 mb-8">
                                            <h2 className="text-3xl font-bold">Subscribe Now</h2>
                                            <p className="text-muted-foreground">
                                                Join our community and never miss an update
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    Email Address
                                                </label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="your.email@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="border-2 focus:border-primary"
                                                />
                                            </div>

                                            <div className="flex items-start space-x-3 p-4 bg-accent/30 border border-border rounded-lg">
                                                <Checkbox
                                                    id="privacy"
                                                    checked={privacyAgreed}
                                                    onCheckedChange={(checked) => setPrivacyAgreed(checked as boolean)}
                                                    className="mt-1"
                                                />
                                                <label
                                                    htmlFor="privacy"
                                                    className="text-sm leading-relaxed cursor-pointer flex-1"
                                                >
                                                    I agree to receive newsletters from Locksy with security updates, feature announcements, and insights. 
                                                    My email will be kept private and secure. I can unsubscribe anytime.
                                                </label>
                                            </div>

                                            {error && (
                                                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                                                    {error}
                                                </div>
                                            )}

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                                size="lg"
                                                disabled={isSubmitting || !privacyAgreed}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="animate-spin mr-2">⏳</span>
                                                        Subscribing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Subscribe to Newsletter
                                                        <Send className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl opacity-50" />
                                <Card className="relative border-2 border-green-500/30 bg-green-500/5 backdrop-blur-sm shadow-xl">
                                    <CardContent className="pt-12 pb-12">
                                        <div className="text-center space-y-6">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg animate-bounce">
                                                <CheckCircle2 className="h-10 w-10 text-white" />
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold">Welcome Aboard! 🎉</h3>
                                            <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                                Thank you for subscribing to the Locksy newsletter! 
                                                Check your inbox for a confirmation email.
                                            </p>
                                            <div className="pt-4 space-y-3">
                                                <p className="text-sm text-muted-foreground">
                                                    You'll now receive:
                                                </p>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium">
                                                        Security Updates
                                                    </span>
                                                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium">
                                                        Feature Announcements
                                                    </span>
                                                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium">
                                                        Exclusive Tips
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => setSubmitted(false)}
                                                variant="outline"
                                                className="mt-6"
                                            >
                                                Subscribe Another Email
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>

                    {/* Newsletter Benefits */}
                    <div className="mt-20 mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            What You'll Receive
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {NEWSLETTER_BENEFITS.map((benefit) => {
                                const Icon = benefit.icon
                                return (
                                    <Card 
                                        key={benefit.title}
                                        className="border-2 border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card/50 backdrop-blur-sm"
                                    >
                                        <CardContent className="pt-6 pb-6 space-y-4">
                                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} shadow-lg`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold">{benefit.title}</h3>
                                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    {/* Privacy Note */}
                    <div className="mt-16 max-w-3xl mx-auto">
                        <Card className="border-2 border-border/50 bg-accent/20 backdrop-blur-sm">
                            <CardContent className="pt-6 pb-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg">Your Privacy Matters</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            We take your privacy seriously. Your email will only be used to send you 
                                            Locksy updates and news. We'll never share your information with third parties, 
                                            and you can unsubscribe at any time with a single click. No spam, ever.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Weekly
                            </div>
                            <p className="text-sm text-muted-foreground">Newsletter Frequency</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                0% Spam
                            </div>
                            <p className="text-sm text-muted-foreground">Quality Content Only</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                1-Click
                            </div>
                            <p className="text-sm text-muted-foreground">Easy Unsubscribe</p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}
