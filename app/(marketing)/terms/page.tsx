export default function TermsPage() {
  return (
    <div className="bg-background px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Terms of Service</p>
          <h1 className="text-4xl font-serif font-semibold text-foreground">Operating WatchTogether responsibly</h1>
          <p className="text-muted-foreground">
            These terms outline the agreements between WatchTogether and our customers. They reflect how the platform is built
            in tandem with our Django, Channels, and Stripe-powered backend.
          </p>
        </header>

        <section className="rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">1. Accounts &amp; access</h2>
          <p className="text-muted-foreground">
            Hosts must provide accurate information and maintain the security of their credentials. Access tokens, WebSocket
            keys, and billing permissions should only be shared with trusted team members. WatchTogether may suspend accounts
            when we detect abuse or security risks.
          </p>
        </section>

        <section className="rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">2. Usage guidelines</h2>
          <p className="text-muted-foreground">
            You are responsible for the content streamed through WatchTogether. Events must respect copyright, community
            standards, and the local laws of your audience. We provide moderation tools, but hosts are ultimately accountable for
            managing their communities.
          </p>
        </section>

        <section className="rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">3. Billing &amp; cancellations</h2>
          <p className="text-muted-foreground">
            Subscriptions are billed through Stripe according to the plan selected in your dashboard. Upgrades take effect
            immediately and downgrades at the end of the current billing cycle. Refunds are evaluated on a case-by-case basis for
            service interruptions.
          </p>
        </section>

        <section className="rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">4. Service reliability</h2>
          <p className="text-muted-foreground">
            We strive to keep WatchTogether available 24/7, leveraging observability, redundancy, and automated recovery. Planned
            maintenance will be announced in advance on the status page. We are not liable for outages caused by third-party
            providers or events beyond our control.
          </p>
        </section>

        <section className="rounded-3xl border border-border/40 bg-muted/40 p-8 space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-foreground">Contact &amp; updates</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may update these terms as the product evolves. We will notify admins about material changes via email and the
            dashboard. Continued use of WatchTogether indicates acceptance of the latest terms. Questions can be directed to
            legal@watchtogether.example.
          </p>
        </section>
      </div>
    </div>
  )
}
