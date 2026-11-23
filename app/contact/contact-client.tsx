"use client"

import { useState } from "react"
import {
    Mail,
    Github,
    Linkedin,
    Send,
    MessageSquare,
    Code2,
    Heart,
    ArrowUpRight,
    CheckCircle2,
    CircleAlert,
    LoaderCircle,
    User,
    MessageCircle
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Callout, IconTile, PageHero, PageSection } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { WHATSAPP_CHANNEL_URL, openWhatsAppChannel } from "@/lib/social-links"

const SOCIAL_LINKS = [
    {
        name: "Email",
        icon: Mail,
        href: "mailto:support@locksy.dev",
        username: "support@locksy.dev",
        description: "Direct email for inquiries and support",
    },
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/vansh-121",
        username: "@vansh-121",
        description: "View projects and contribute",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/vansh-sethi-vs",
        username: "Vansh Sethi",
        description: "Professional network and updates",
    },
    {
        name: "Sponsor",
        icon: Heart,
        href: "https://github.com/sponsors/vansh-121",
        username: "GitHub Sponsors",
        description: "Support the project development",
    },
]

const QUICK_ACTIONS = [
    {
        title: "Report a Bug",
        description: "Found an issue? Let me know",
        icon: Code2,
        href: "https://github.com/vansh-121/Locksy/issues",
    },
    {
        title: "Request Feature",
        description: "Have an idea? Share it",
        icon: MessageSquare,
        href: "https://github.com/vansh-121/Locksy/issues",
    },
    {
        title: "General Support",
        description: "Need help with Locksy?",
        icon: Heart,
        href: "mailto:support@locksy.dev",
    },
    {
        title: "WhatsApp Channel",
        description: "Follow Locksy Support for updates",
        icon: WhatsAppIcon,
        href: WHATSAPP_CHANNEL_URL,
    },
]

export default function ContactClient() {
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

    const inputClass =
        "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    const labelClass = "flex items-center gap-2 text-sm font-medium text-foreground"

    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <Header />

                <main className="relative">
                    {/* Hero Section */}
                    <PageHero
                        eyebrow="Get in Touch"
                        title="Contact Developer"
                        description="Have questions, feedback, or just want to say hi? I'd love to hear from you!"
                    />

                    {/* Social Media Links */}
                    <PageSection className="!pt-0">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="surface group flex h-full flex-col p-6 transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <span className="flex items-start justify-between">
                                        <IconTile icon={social.icon} />
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-5 text-lg font-semibold text-foreground">{social.name}</h3>
                                    <p className="mt-1 font-mono text-sm text-foreground/80">{social.username}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{social.description}</p>
                                </a>
                            ))}
                        </div>
                    </PageSection>

                    {/* Quick Actions */}
                    <PageSection>
                        <SectionHeading title="Quick Actions" />
                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {QUICK_ACTIONS.map((action) => (
                                <a
                                    key={action.title}
                                    href={action.href}
                                    onClick={action.href === WHATSAPP_CHANNEL_URL ? openWhatsAppChannel : undefined}
                                    target={action.href.startsWith("http") || action.href.startsWith("mailto") ? "_blank" : undefined}
                                    rel={action.href.startsWith("http") || action.href.startsWith("mailto") ? "noopener noreferrer" : undefined}
                                    className="surface group flex h-full flex-col items-center p-6 text-center transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <IconTile icon={action.icon} />
                                    <h3 className="mt-4 text-lg font-semibold text-foreground">{action.title}</h3>
                                    <p className="mt-1.5 text-sm text-muted-foreground">{action.description}</p>
                                </a>
                            ))}
                        </div>
                    </PageSection>

                    {/* Contact Form */}
                    <PageSection width="narrow">
                        <div id="contact-form" className="scroll-mt-24">
                            <SectionHeading
                                title="Send a Message"
                                description="Fill out the form below and I'll get back to you as soon as possible"
                            />

                            <div className="mt-10">
                                {!submitted ? (
                                    <div className="surface p-6 md:p-8">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className={labelClass}>
                                                        <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        placeholder="Your name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="email" className={labelClass}>
                                                        <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                                        Email
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className={inputClass}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="subject" className={labelClass}>
                                                    <MessageSquare className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                                    Subject
                                                </label>
                                                <input
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="What's this about?"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className={labelClass}>
                                                    <MessageCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    placeholder="Tell me more..."
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={6}
                                                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                />
                                            </div>

                                            {error && (
                                                <div role="alert">
                                                    <Callout tone="danger" icon={CircleAlert}>
                                                        {error}
                                                    </Callout>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="h-4 w-4" aria-hidden="true" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="surface p-6 md:p-8" role="status">
                                        <Callout tone="success" icon={CheckCircle2} title={<span className="text-base">Message Sent!</span>}>
                                            Thanks for reaching out! I'll get back to you as soon as possible.
                                        </Callout>
                                        <div className="mt-6 flex justify-center">
                                            <button type="button" onClick={() => setSubmitted(false)} className="btn-secondary">
                                                Send Another Message
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-14 space-y-3 text-center">
                            <span className="eyebrow">
                                <Heart className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
                                Made with passion by Vansh Sethi
                            </span>
                            <p className="text-sm text-muted-foreground">Typically responds within 24-48 hours</p>
                        </div>
                    </PageSection>
                </main>

                <Footer />
            </div>
        </>
    )
}
