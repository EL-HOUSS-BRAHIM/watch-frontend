import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StorePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Store & Merch</h1>
        <p className="text-muted-foreground">
          Sell digital tickets, merch bundles, and premium content. Stripe endpoints described in the API guide will power
          checkout and fulfillment.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Integrate Stripe checkout</CardTitle>
          <CardDescription>
            Use `/api/store/items/` for catalog data and `/api/store/purchase/` to complete transactions. Mock responses allow the
            UI to ship before payments go live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Future iterations will display `StoreProductCard` components and order history. Reference the technology alignment doc
            for environment configuration.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
