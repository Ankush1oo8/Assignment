"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function SellerOnboarding() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    storeName: "",
    storeDescription: "",
    productName: "",
    productDescription: "",
    bankAccount: "",
  })

  const totalSteps = 6

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeStep nextStep={nextStep} />
      case 1:
        return (
          <BasicInfoStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 2:
        return (
          <StoreSetupStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 3:
        return (
          <ProductAdditionStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 4:
        return (
          <PaymentSetupStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 5:
        return <CompletionStep />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Seller Onboarding</CardTitle>
          <Progress value={((step + 1) / totalSteps) * 100} className="w-full" />
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  )
}

function WelcomeStep({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Our Marketplace!</h2>
      <p className="mb-6">
        We're excited to have you join as a seller. Let's get your store set up in just a few easy steps.
      </p>
      <Button onClick={nextStep}>Get Started</Button>
    </div>
  )
}

function BasicInfoStep({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>
      <StepNavigation nextStep={nextStep} prevStep={prevStep} />
    </div>
  )
}

function StoreSetupStep({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store Setup</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            value={formData.storeName}
            onChange={(e) => updateFormData("storeName", e.target.value)}
            placeholder="My Awesome Store"
          />
        </div>
        <div>
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            value={formData.storeDescription}
            onChange={(e) => updateFormData("storeDescription", e.target.value)}
            placeholder="Tell us about your store..."
          />
        </div>
      </div>
      <StepNavigation nextStep={nextStep} prevStep={prevStep} />
    </div>
  )
}

function ProductAdditionStep({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Your First Product</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={(e) => updateFormData("productName", e.target.value)}
            placeholder="Awesome Product"
          />
        </div>
        <div>
          <Label htmlFor="productDescription">Product Description</Label>
          <Textarea
            id="productDescription"
            value={formData.productDescription}
            onChange={(e) => updateFormData("productDescription", e.target.value)}
            placeholder="Describe your product..."
          />
        </div>
      </div>
      <StepNavigation nextStep={nextStep} prevStep={prevStep} />
    </div>
  )
}

function PaymentSetupStep({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Setup</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="bankAccount">Bank Account Number</Label>
          <Input
            id="bankAccount"
            value={formData.bankAccount}
            onChange={(e) => updateFormData("bankAccount", e.target.value)}
            placeholder="Enter your bank account number"
          />
        </div>
      </div>
      <StepNavigation nextStep={nextStep} prevStep={prevStep} />
    </div>
  )
}

function CompletionStep() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p className="mb-6">Your seller account is now set up. You're ready to start selling!</p>
      <Button>Go to Dashboard</Button>
    </div>
  )
}

function StepNavigation({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  return (
    <CardFooter className="flex justify-between mt-6">
      <Button onClick={prevStep} variant="outline">
        Back
      </Button>
      <Button onClick={nextStep}>Next</Button>
    </CardFooter>
  )
}

interface StepProps {
  formData: {
    name: string
    email: string
    storeName: string
    storeDescription: string
    productName: string
    productDescription: string
    bankAccount: string
  }
  updateFormData: (field: string, value: string) => void
  nextStep: () => void
  prevStep: () => void
}


