export default function PrivacyPage() {
  return (
    <div className="bg-background px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Privacy Policy</p>
          <h1 className="text-4xl font-serif font-semibold text-foreground">Your trust powers every watch party</h1>
          <p className="text-muted-foreground">
            This policy explains how WatchTogether handles information for hosts, participants, and admins across our platform.
            It reflects the infrastructure described in our documentation and will evolve alongside the product.
          </p>
        </header>

        <section className="rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm">
          <h2 className="text-2xl font-serif font-semibold text-foreground">Information we collect</h2>
          <p className="mt-4 text-muted-foreground">
            We collect only the data required to run synchronized screenings, manage billing, and deliver support. This includes
            account details, watch party metadata, and diagnostic logs tied to integrations like Stripe, Django Channels, and
            Celery jobs.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            <li className="rounded-xl border border-border/30 bg-background/70 p-4 text-sm text-muted-foreground">
              Account profile information provided during registration or imported from integrations.
            </li>
            <li className="rounded-xl border border-border/30 bg-background/70 p-4 text-sm text-muted-foreground">
              Event analytics such as attendance, playback quality, and chat engagement for host reporting.
            </li>
            <li className="rounded-xl border border-border/30 bg-background/70 p-4 text-sm text-muted-foreground">
              Payment and subscription metadata handled by Stripe and stored according to PCI requirements.
            </li>
            <li className="rounded-xl border border-border/30 bg-background/70 p-4 text-sm text-muted-foreground">
              Technical diagnostics that help keep WebSocket connections stable across devices and networks.
            </li>
          </ul>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border/40 bg-card/50 p-8">
            <h3 className="text-xl font-semibold text-foreground">How we use data</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Data powers personalized dashboards, proactive support, and feature development. We never sell personal information
              and limit access to staff who maintain the platform.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Authenticating users and enforcing role-based permissions.</li>
              <li>Delivering synchronized playback, chat, and notification services.</li>
              <li>Measuring usage to improve performance, reliability, and content offerings.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border/40 bg-card/50 p-8">
            <h3 className="text-xl font-semibold text-foreground">Your choices</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Hosts manage data retention from the dashboard. Participants can update account information, adjust notification
              preferences, or request deletion by contacting our support team.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Update profile and notification preferences in account settings.</li>
              <li>Export watch party analytics and chat transcripts on demand.</li>
              <li>Request account deletion by emailing privacy@watchtogether.example.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-border/40 bg-muted/40 p-8">
          <h3 className="text-xl font-semibold text-foreground">Staying informed</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            We will notify admins about material privacy changes through the dashboard and email. Continued use of WatchTogether
            after updates indicates acceptance of the revised policy. If you have any questions, reach us at
            privacy@watchtogether.example.
          </p>
        </section>
      </div>
    </div>
  )
}
