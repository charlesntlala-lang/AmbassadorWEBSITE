"use client"

import { useState } from "react"
import { X, Loader2, CheckCircle, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

const grades = [
  "Pre-School (Ages 3-4)",
  "Kindergarten (Age 5)",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7"
]

const relationships = [
  "Mother",
  "Father",
  "Guardian",
  "Grandparent",
  "Other"
]

interface FormData {
  studentName: string
  dateOfBirth: string
  gender: string
  grade: string
  parentName: string
  relationship: string
  email: string
  phone: string
  alternativePhone: string
  address: string
  city: string
  country: string
  previousSchool: string
  reasonForJoining: string
  additionalComments: string
}

const initialFormData: FormData = {
  studentName: "",
  dateOfBirth: "",
  gender: "",
  grade: "",
  parentName: "",
  relationship: "",
  email: "",
  phone: "",
  alternativePhone: "",
  address: "",
  city: "",
  country: "Lesotho",
  previousSchool: "",
  reasonForJoining: "",
  additionalComments: ""
}

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.studentName.trim()) newErrors.studentName = "Required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required"
    if (!formData.gender) newErrors.gender = "Required"
    if (!formData.grade) newErrors.grade = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.parentName.trim()) newErrors.parentName = "Required"
    if (!formData.relationship) newErrors.relationship = "Required"
    if (!formData.email.trim()) {
      newErrors.email = "Required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email"
    }
    if (!formData.phone.trim()) newErrors.phone = "Required"
    if (!formData.address.trim()) newErrors.address = "Required"
    if (!formData.city.trim()) newErrors.city = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleClose = () => {
    setStep(1)
    setFormData(initialFormData)
    setIsSuccess(false)
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Thank you for applying to Ambassador International School. We will review your application and contact you within 5-7 business days.
            </p>
            <Button onClick={handleClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="relative">
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="font-serif text-xl">Student Application</DialogTitle>
                  <p className="text-sm text-muted-foreground">Ambassador International School</p>
                </div>
              </div>
            </DialogHeader>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
              {[
                { num: 1, label: "Student Info" },
                { num: 2, label: "Parent/Guardian" },
                { num: 3, label: "Additional Info" }
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                        step >= s.num
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {s.num}
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground hidden sm:block">{s.label}</span>
                  </div>
                  {i < 2 && (
                    <div
                      className={cn(
                        "w-12 sm:w-20 h-1 mx-2 rounded-full transition-colors",
                        step > s.num ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Student Information */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-foreground mb-4">Student Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="studentName">Full Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => updateField("studentName", e.target.value)}
                    placeholder="Enter student's full name"
                    className={cn(errors.studentName && "border-destructive")}
                  />
                  {errors.studentName && <p className="text-xs text-destructive">{errors.studentName}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth <span className="text-destructive">*</span></Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      className={cn(errors.dateOfBirth && "border-destructive")}
                    />
                    {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Gender <span className="text-destructive">*</span></Label>
                    <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                      <SelectTrigger className={cn(errors.gender && "border-destructive")}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Grade Applying For <span className="text-destructive">*</span></Label>
                  <Select value={formData.grade} onValueChange={(v) => updateField("grade", v)}>
                    <SelectTrigger className={cn(errors.grade && "border-destructive")}>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.grade && <p className="text-xs text-destructive">{errors.grade}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Parent/Guardian Information */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-foreground mb-4">Parent/Guardian Information</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Full Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => updateField("parentName", e.target.value)}
                      placeholder="Parent/Guardian name"
                      className={cn(errors.parentName && "border-destructive")}
                    />
                    {errors.parentName && <p className="text-xs text-destructive">{errors.parentName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Relationship <span className="text-destructive">*</span></Label>
                    <Select value={formData.relationship} onValueChange={(v) => updateField("relationship", v)}>
                      <SelectTrigger className={cn(errors.relationship && "border-destructive")}>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationships.map(rel => (
                          <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.relationship && <p className="text-xs text-destructive">{errors.relationship}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="email@example.com"
                      className={cn(errors.email && "border-destructive")}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+266 XXXX XXXX"
                      className={cn(errors.phone && "border-destructive")}
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternativePhone">Alternative Phone (Optional)</Label>
                  <Input
                    id="alternativePhone"
                    type="tel"
                    value={formData.alternativePhone}
                    onChange={(e) => updateField("alternativePhone", e.target.value)}
                    placeholder="+266 XXXX XXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Home Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Street address"
                    className={cn(errors.address && "border-destructive")}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town <span className="text-destructive">*</span></Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="e.g., Maseru"
                      className={cn(errors.city && "border-destructive")}
                    />
                    {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      placeholder="Lesotho"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-foreground mb-4">Additional Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">Previous School (Optional)</Label>
                  <Input
                    id="previousSchool"
                    value={formData.previousSchool}
                    onChange={(e) => updateField("previousSchool", e.target.value)}
                    placeholder="Name of previous school"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reasonForJoining">Reason for Joining Ambassador (Optional)</Label>
                  <Textarea
                    id="reasonForJoining"
                    value={formData.reasonForJoining}
                    onChange={(e) => updateField("reasonForJoining", e.target.value)}
                    placeholder="Tell us why you're interested in our school..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalComments">Additional Comments (Optional)</Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => updateField("additionalComments", e.target.value)}
                    placeholder="Any other information you'd like to share..."
                    rows={3}
                  />
                </div>

                {/* Summary Preview */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm text-foreground mb-3">Application Summary</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <p><span className="text-muted-foreground">Student:</span> {formData.studentName}</p>
                    <p><span className="text-muted-foreground">Grade:</span> {formData.grade}</p>
                    <p><span className="text-muted-foreground">Guardian:</span> {formData.parentName}</p>
                    <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
