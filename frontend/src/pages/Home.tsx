export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100svh-64px)]">
      <h1 className="text-4xl font-bold font-heading text-center">
        Welcome to <span className="text-primary">FoodDash</span>
      </h1>
      <p className="text-muted-foreground mt-4">
        Your favorite food, all in one place.
      </p>
    </div>
  )
}
