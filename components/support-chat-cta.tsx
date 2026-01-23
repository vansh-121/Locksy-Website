"use client"

import { MessageCircle, Clock, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportChatCTA() {
  const openChat = () => {
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg mb-6">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            Still Have Questions?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our support team is ready to help you with setup, troubleshooting, or any questions about Locksy.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-muted-foreground">
              Get answers within a few hours
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Expert Help</h3>
            <p className="text-sm text-muted-foreground">
              Direct support from our team
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Available 24/7</h3>
            <p className="text-sm text-muted-foreground">
              Reach out anytime, anywhere
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={openChat}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-lg px-8 py-6 group"
          >
            <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Chat With Us Now
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No account needed • Instant connection
          </p>
        </div>
      </div>
    </section>
  )
}
