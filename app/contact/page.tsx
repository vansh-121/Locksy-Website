"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Mail,
    Github,
    Linkedin,
    Send,
    MessageSquare,
    Code2,
    Heart,
    ExternalLink,
    CheckCircle2,
    User,
    MessageCircle
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const SOCIAL_LINKS = [
    {
        name: "Email",
        icon: Mail,
        href: "mailto:vansh.sethi98760@gmail.com",
        username: "vansh.sethi98760@gmail.com",
        description: "Direct email for inquiries and support",
        color: "from-red-500 to-orange-500",
        hoverColor: "hover:from-red-600 hover:to-orange-600",
    },
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/vansh-121",
        username: "@vansh-121",
        description: "View projects and contribute",
        color: "from-gray-700 to-gray-900",
        hoverColor: "hover:from-gray-800 hover:to-black",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/vansh-sethi-vs",
        username: "Vansh Sethi",
        description: "Professional network and updates",
        color: "from-blue-600 to-blue-800",
        hoverColor: "hover:from-blue-700 hover:to-blue-900",
    },
    {
        name: "Sponsor",
        icon: Heart,
        href: "https://github.com/sponsors/vansh-121",
        username: "GitHub Sponsors",
        description: "Support the project development",
        color: "from-primary to-secondary",
        hoverColor: "hover:from-primary hover:to-secondary",
    },
]

const QUICK_ACTIONS = [
    {
        title: "Report a Bug",
        description: "Found an issue? Let me know",
        icon: Code2,
        href: "https://github.com/vansh-121/Locksy/issues",
        color: "from-red-500 to-pink-500",
    },
    {
        title: "Request Feature",
        description: "Have an idea? Share it",
        icon: MessageSquare,
        href: "https://github.com/vansh-121/Locksy/issues",
        color: "from-purple-500 to-indigo-500",
    },
    {
        title: "General Support",
        description: "Need help with Locksy?",
        icon: Heart,
        href: "mailto:vansh.sethi98760@gmail.com",
        color: "from-green-500 to-emerald-500",
    },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
                    subject: `Locksy Contact: ${formData.subject}`,
                    from_name: formData.name,
                    email: formData.email,
                    message: `
Contact Form Submission - Locksy Website

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Timestamp: ${new Date().toISOString()}
                    `.trim(),
                }),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitted(true)
                setFormData({ name: "", email: "", subject: "", message: "" })
            } else {
                setError("Failed to send message. Please try email directly.")
            }
        } catch (err) {
            setError("Network error. Please try again or use email directly.")
            console.error("Submission error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Header */}
            <Header />

            <main className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                        <MessageCircle className="h-4 w-4" />
                        Get in Touch
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Contact Developer
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Have questions, feedback, or just want to say hi? I'd love to hear from you!
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
                    {SOCIAL_LINKS.map((social) => {
                        const Icon = social.icon
                        return (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                <Card className="relative border-2 border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card/50 backdrop-blur-sm h-full">
                                    <CardContent className="pt-6 pb-6 space-y-4">
                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} ${social.hoverColor} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold">{social.name}</h3>
                                                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-sm font-mono text-primary">{social.username}</p>
                                            <p className="text-sm text-muted-foreground">{social.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        )
                    })}
                </div>

                {/* Quick Actions */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {QUICK_ACTIONS.map((action) => {
                            const Icon = action.icon
                            return (
                                <a
                                    key={action.title}
                                    href={action.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                >
                                    <Card className="border-2 border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card/50 backdrop-blur-sm h-full">
                                        <CardContent className="pt-6 pb-6 text-center space-y-3">
                                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-all duration-300`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold">{action.title}</h3>
                                            <p className="text-sm text-muted-foreground">{action.description}</p>
                                        </CardContent>
                                    </Card>
                                </a>
                            )
                        })}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center space-y-4 mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold">Send a Message</h2>
                        <p className="text-muted-foreground">
                            Fill out the form below and I'll get back to you as soon as possible
                        </p>
                    </div>

                    {!submitted ? (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <Card className="relative border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl">
                                <CardContent className="pt-8 pb-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    Name
                                                </label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Your name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-2 focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    Email
                                                </label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="your.email@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-2 focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-semibold flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                Subject
                                            </label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="What's this about?"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="border-2 focus:border-primary"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-semibold flex items-center gap-2">
                                                <MessageCircle className="h-4 w-4" />
                                                Message
                                            </label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="Tell me more..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="resize-none border-2 focus:border-primary"
                                            />
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
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="animate-spin mr-2">⏳</span>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
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
                                <CardContent className="pt-8 pb-8">
                                    <div className="text-center space-y-6">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                                            <CheckCircle2 className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold">Message Sent! 🎉</h3>
                                        <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                            Thanks for reaching out! I'll get back to you as soon as possible.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            variant="outline"
                                            className="mt-4"
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 border border-border rounded-full text-sm">
                        <Heart className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                            Made with passion by Vansh Sethi
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Typically responds within 24-48 hours
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
