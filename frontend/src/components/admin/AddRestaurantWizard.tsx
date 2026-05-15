import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

interface AddRestaurantWizardProps {
  onComplete: () => void
  onCancel: () => void
}

export function AddRestaurantWizard({ onComplete, onCancel }: AddRestaurantWizardProps) {
  const [step, setStep] = useState(1)

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))

  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Address" },
    { id: 3, label: "Agreement" },
  ]

  return (
    <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto w-full">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2">
          {/* Progress Indicator */}
          <div className="mb-8 mt-2">
            <div className="flex items-center justify-between mb-2 relative">
              {/* Background line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
              {/* Active line */}
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300 ease-in-out" 
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2 bg-background px-2 relative z-10">
                  <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                    step >= s.id ? "bg-primary border-primary text-primary-foreground scale-110" : "bg-background border-muted text-muted-foreground"
                  }`}>
                    {s.id}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${step >= s.id ? "text-primary" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <CardTitle className="text-2xl">Add New Restaurant</CardTitle>
          <CardDescription>
            {step === 1 && "Start by filling in the fundamental details of your restaurant."}
            {step === 2 && "Where is your restaurant located? We need this for delivery zoning."}
            {step === 3 && "Please review our terms of service before finalizing registration."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input id="name" placeholder="Enter restaurant name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the restaurant" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Contact email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Owner password" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" placeholder="URL for restaurant logo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="images">Images URLs (comma separated)</Label>
                <Input id="images" placeholder="URL1, URL2..." />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="addressLine">Address Line</Label>
                <Input id="addressLine" placeholder="Street address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="Zip or Postal code" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State/Province" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Contact number" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground border">
                <h4 className="font-medium text-foreground mb-2">Terms and Conditions</h4>
                <p>
                  By registering this restaurant on the platform, you agree to comply with our operating standards, ensure food quality, and abide by our commission and payment terms. You acknowledge that providing false information may lead to immediate suspension.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={step === 1 ? onCancel : handlePrev}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={onComplete}>Submit Registration</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
