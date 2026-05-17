import { RestaurantLoginForm } from "@/components/restaurant/RestaurantLoginForm"

export default function RestaurantLogin() {
  return (
    <div className="flex min-h-[calc(100svh-64px)] w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full max-w-4xl">
        <RestaurantLoginForm />
      </div>
    </div>
  )
}
