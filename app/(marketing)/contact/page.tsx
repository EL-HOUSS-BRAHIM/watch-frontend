import { Mail, MessageCircle, Phone } from "lucide-react"

const contactChannels = [
  {
    icon: Mail,
    title: "Email our team",
    description: "Reach the founders and support engineers directly for account and billing questions.",
    detail: "hello@watchtogether.example",
    href: "mailto:hello@watchtogether.example",
  },
  {
    icon: MessageCircle,
    title: "Join the creator Slack",
    description: "Collaborate with other hosts, share launch checklists, and get realtime platform updates.",
    detail: "watchtogether.example/slack",
    href: "https://watchtogether.example/slack",
  },
  {
    icon: Phone,
    title: "Production hotline",
    description: "Priority phone support for Studio and Network plans during live broadcasts.",
    detail: "+1 (555) 010-2024",
    href: "tel:+15550102024",
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background px-4 py-16">
      <div className="container mx-auto max-w-5xl space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Contact</p>
          <h1 className="text-4xl font-serif font-semibold text-foreground">Let&apos;s plan your next watch party launch</h1>
          <p className="text-muted-foreground">
            Whether you&apos;re prototyping an integration or preparing a premiere, our team is ready to help. Choose a channel
            below and we&apos;ll respond within one business day.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              className="flex h-full flex-col rounded-3xl border border-border/40 bg-card/50 p-6 shadow-sm transition hover:border-primary/60 hover:shadow-lg"
            >
              <channel.icon className="h-10 w-10 text-primary" aria-hidden="true" />
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold text-foreground">{channel.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{channel.description}</p>
                <p className="text-sm font-medium text-primary">{channel.detail}</p>
              </div>
            </a>
          ))}
        </section>

        <section className="rounded-3xl border border-border/40 bg-muted/40 p-8 space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">Need product support?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Existing customers can open tickets directly from the dashboard support center. For urgent production issues,
            include your event ID so we can connect with on-call engineers immediately. We monitor the status page and email for
            real-time incidents.
          </p>
        </section>
      </div>
    </div>
  )
}
