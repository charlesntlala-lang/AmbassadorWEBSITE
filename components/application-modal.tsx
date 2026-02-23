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


interface FormData {
  // Student info
  studentName: string
  dateOfBirth: string
  placeOfBirth: string
  clan: string
  citizenship: string
  religion: string
  gender: string // sex
  grade: string
  previousSchoolName: string
  previousSchoolFrom: string
  previousSchoolTo: string
  motherName: string
  fatherName: string
  disability: "yes" | "no" | ""
  disabilityDetails: string
  livingWith: string
  livingWithOther: string

  // Parent / guardian contact
  parentName: string
  parentOccupation: string
  parentCompany: string
  parentHomePhone: string
  email: string
  phone: string
  whatsapp: string
  address: string
  parentDeclAgree: boolean

  // payment fields
  paymentStatus: "paid" | "later" | ""
  proofFile: File | null
  paymentReference: string
  paymentMethod: string
}

const initialFormData: FormData = {
  studentName: "",
  dateOfBirth: "",
  placeOfBirth: "",
  clan: "",
  citizenship: "",
  religion: "",
  gender: "",
  grade: "",
  previousSchoolName: "",
  previousSchoolFrom: "",
  previousSchoolTo: "",
  motherName: "",
  fatherName: "",
  disability: "",
  disabilityDetails: "",
  livingWith: "",
  livingWithOther: "",

  parentName: "",
  parentOccupation: "",
  parentCompany: "",
  parentHomePhone: "",
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  parentDeclAgree: false,

  paymentStatus: "",
  proofFile: null,
  paymentReference: "",
  paymentMethod: ""
}

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.studentName.trim()) newErrors.studentName = "Required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required"
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = "Required"
    if (!formData.clan.trim()) newErrors.clan = "Required"
    if (!formData.citizenship.trim()) newErrors.citizenship = "Required"
    if (!formData.religion.trim()) newErrors.religion = "Required"
    if (!formData.gender) newErrors.gender = "Required"
    if (!formData.grade) newErrors.grade = "Required"
    if (!formData.motherName.trim()) newErrors.motherName = "Required"
    if (!formData.fatherName.trim()) newErrors.fatherName = "Required"
    if (!formData.disability) newErrors.disability = "Required"
    if (formData.disability === "yes" && !formData.disabilityDetails.trim()) {
      newErrors.disabilityDetails = "Required"
    }
    if (!formData.livingWith) newErrors.livingWith = "Required"
    if (formData.livingWith === "Others" && !formData.livingWithOther.trim()) {
      newErrors.livingWithOther = "Required"
    }
    // previous school fields optional
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.parentName.trim()) newErrors.parentName = "Required"
    if (!formData.parentOccupation.trim()) newErrors.parentOccupation = "Required"
    if (!formData.parentCompany.trim()) newErrors.parentCompany = "Required"
    if (!formData.parentHomePhone.trim()) newErrors.parentHomePhone = "Required"
    if (!formData.email.trim()) {
      newErrors.email = "Required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email"
    }
    if (!formData.phone.trim()) newErrors.phone = "Required"
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "Required"
    if (!formData.address.trim()) newErrors.address = "Required"
    if (!formData.parentDeclAgree) newErrors.parentDeclAgree = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = () => {
    const newErrors: Partial<FormData> = {}
    if (formData.paymentStatus === "paid") {
      if (!formData.proofFile) newErrors.proofFile = "Required"
    } else if (formData.paymentStatus === "") {
      newErrors.paymentStatus = "Required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    } else if (step === 3) {
      // fee info step has no required fields, just proceed
      setStep(4)
    } else if (step === 4 && validateStep4()) {
      handleSubmit()
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
                { num: 3, label: "Application Fee" },
                { num: 4, label: "Payment" }
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
                  <Label htmlFor="studentName">Full Name (Surname First name Middle) <span className="text-destructive">*</span></Label>
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
                    <Label htmlFor="placeOfBirth">Place of Birth <span className="text-destructive">*</span></Label>
                    <Input
                      id="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={(e) => updateField("placeOfBirth", e.target.value)}
                      className={cn(errors.placeOfBirth && "border-destructive")}
                    />
                    {errors.placeOfBirth && <p className="text-xs text-destructive">{errors.placeOfBirth}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clan">Clan <span className="text-destructive">*</span></Label>
                    <Input
                      id="clan"
                      value={formData.clan}
                      onChange={(e) => updateField("clan", e.target.value)}
                      className={cn(errors.clan && "border-destructive")}
                    />
                    {errors.clan && <p className="text-xs text-destructive">{errors.clan}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="citizenship">Citizenship <span className="text-destructive">*</span></Label>
                    <Input
                      id="citizenship"
                      value={formData.citizenship}
                      onChange={(e) => updateField("citizenship", e.target.value)}
                      className={cn(errors.citizenship && "border-destructive")}
                    />
                    {errors.citizenship && <p className="text-xs text-destructive">{errors.citizenship}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion <span className="text-destructive">*</span></Label>
                    <Input
                      id="religion"
                      value={formData.religion}
                      onChange={(e) => updateField("religion", e.target.value)}
                      className={cn(errors.religion && "border-destructive")}
                    />
                    {errors.religion && <p className="text-xs text-destructive">{errors.religion}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Sex <span className="text-destructive">*</span></Label>
                    <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                      <SelectTrigger className={cn(errors.gender && "border-destructive")}
                      >
                        <SelectValue placeholder="Select sex" />
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

                <div className="space-y-2">
                  <Label htmlFor="motherName">Mother's Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => updateField("motherName", e.target.value)}
                    className={cn(errors.motherName && "border-destructive")}
                  />
                  {errors.motherName && <p className="text-xs text-destructive">{errors.motherName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => updateField("fatherName", e.target.value)}
                    className={cn(errors.fatherName && "border-destructive")}
                  />
                  {errors.fatherName && <p className="text-xs text-destructive">{errors.fatherName}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Any Physical or Learning Disability? <span className="text-destructive">*</span></Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="disability"
                        value="no"
                        checked={formData.disability === "no"}
                        onChange={() => updateField("disability", "no")}
                        className="mr-1"
                      />
                      No
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="disability"
                        value="yes"
                        checked={formData.disability === "yes"}
                        onChange={() => updateField("disability", "yes")}
                        className="mr-1"
                      />
                      Yes
                    </label>
                  </div>
                  {errors.disability && <p className="text-xs text-destructive">{errors.disability}</p>}
                  {formData.disability === "yes" && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="disabilityDetails">If yes please specify <span className="text-destructive">*</span></Label>
                      <Input
                        id="disabilityDetails"
                        value={formData.disabilityDetails}
                        onChange={(e) => updateField("disabilityDetails", e.target.value)}
                        className={cn(errors.disabilityDetails && "border-destructive")}
                      />
                      {errors.disabilityDetails && <p className="text-xs text-destructive">{errors.disabilityDetails}</p>}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Applicant Lives With <span className="text-destructive">*</span></Label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Both Parents",
                      "Grandparents",
                      "Relatives",
                      "Single Parent",
                      "Others"
                    ].map(opt => (
                      <label key={opt} className="flex items-center">
                        <input
                          type="radio"
                          name="livingWith"
                          value={opt}
                          checked={formData.livingWith === opt}
                          onChange={() => updateField("livingWith", opt)}
                          className="mr-1"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.livingWith && <p className="text-xs text-destructive">{errors.livingWith}</p>}
                  {formData.livingWith === "Others" && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="livingWithOther">Please specify <span className="text-destructive">*</span></Label>
                      <Input
                        id="livingWithOther"
                        value={formData.livingWithOther}
                        onChange={(e) => updateField("livingWithOther", e.target.value)}
                        className={cn(errors.livingWithOther && "border-destructive")}
                      />
                      {errors.livingWithOther && <p className="text-xs text-destructive">{errors.livingWithOther}</p>}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousSchoolName">Previous School Attended</Label>
                  <Input
                    id="previousSchoolName"
                    value={formData.previousSchoolName}
                    onChange={(e) => updateField("previousSchoolName", e.target.value)}
                    placeholder="School Name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousSchoolFrom">From</Label>
                    <Input
                      id="previousSchoolFrom"
                      type="date"
                      value={formData.previousSchoolFrom}
                      onChange={(e) => updateField("previousSchoolFrom", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousSchoolTo">To</Label>
                    <Input
                      id="previousSchoolTo"
                      type="date"
                      value={formData.previousSchoolTo}
                      onChange={(e) => updateField("previousSchoolTo", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
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


            {/* Step 2: Parent/Guardian Information */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-foreground mb-4">Parent / Guardian Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="parentName">Full Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => updateField("parentName", e.target.value)}
                    placeholder="Parent/Guardian full name"
                    className={cn(errors.parentName && "border-destructive")}
                  />
                  {errors.parentName && <p className="text-xs text-destructive">{errors.parentName}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentOccupation">Occupation <span className="text-destructive">*</span></Label>
                    <Input
                      id="parentOccupation"
                      value={formData.parentOccupation}
                      onChange={(e) => updateField("parentOccupation", e.target.value)}
                      className={cn(errors.parentOccupation && "border-destructive")}
                    />
                    {errors.parentOccupation && <p className="text-xs text-destructive">{errors.parentOccupation}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentCompany">Name of Company <span className="text-destructive">*</span></Label>
                    <Input
                      id="parentCompany"
                      value={formData.parentCompany}
                      onChange={(e) => updateField("parentCompany", e.target.value)}
                      className={cn(errors.parentCompany && "border-destructive")}
                    />
                    {errors.parentCompany && <p className="text-xs text-destructive">{errors.parentCompany}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Cell Phone Number <span className="text-destructive">*</span></Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="parentHomePhone">Home Telephone <span className="text-destructive">*</span></Label>
                    <Input
                      id="parentHomePhone"
                      type="tel"
                      value={formData.parentHomePhone}
                      onChange={(e) => updateField("parentHomePhone", e.target.value)}
                      placeholder="+266 XXXX XXXX"
                      className={cn(errors.parentHomePhone && "border-destructive")}
                    />
                    {errors.parentHomePhone && <p className="text-xs text-destructive">{errors.parentHomePhone}</p>}
                  </div>
                </div>

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
                  <Label htmlFor="address">Physical Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Street address"
                    className={cn(errors.address && "border-destructive")}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.parentDeclAgree}
                      onChange={(e) => updateField("parentDeclAgree", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      I agree and declare that the information provided is true and complete.
                    </span>
                  </label>
                  {errors.parentDeclAgree && <p className="text-xs text-destructive">{errors.parentDeclAgree}</p>}

                  <div className="text-xs text-muted-foreground mt-2 space-y-1">
                    <p>
                      NA/KE LE MOTSOALI/MOHLOKOMELI OA/PARENT/GUARDIAN OF _______ KE ITLAMA HORE/DO HEREBY DECLARE THAT:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Ke tla lefella ngoana ka nako / I will pay school fees on stipulated time.</li>
                      <li>Ke tla etsa bonnete ba hore ngoana o apara seaparo sa sekolo se hloekile kamehla / I will ensure that my child puts on proper and clean school uniform.</li>
                      <li>Ke tla ba teng liphuthehong tsa sekolo kapa ke romelle motho ea tla nkukela liqeto / I will attend parents meetings or send a representative that will decide on my behalf.</li>
                      <li>Ke tla lefa ts’enyo eohle e tla etsoa ke ngoana oaka sekolong / I will pay for all the property damage caused by my child.</li>
                      <li>Ke tla ikamahanya le ho ts’ehetsa litlhoko le litsamaiso tsohle tsa sekolo / I will abide by and support the school policies.</li>
                    </ul>
                    <p>
                      Declaration by Parent/Guardian: I, Parent/Guardian of ______ declare that the information that I have given in this form is true and complete and that I have not withheld any relevant information.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Application Fee */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-foreground mb-4">Application Fee</h3>
                <p>Application Fee: <strong>M100.00</strong></p>
                <p className="mt-2">Payment Methods:</p>
                <ul className="list-disc list-inside">
                  <li>Ecocash Merchant 32241 – Ambassador International</li>
                  <li>Lesotho Post Bank 1035142200010</li>
                </ul>
              </div>
            )}

            {/* Step 4: Proof of Payment */}
            {step === 4 && (
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-foreground mb-4">Proof of Payment</h3>

                <div className="space-y-2">
                  <Label>Payment Status <span className="text-destructive">*</span></Label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="paid"
                        checked={formData.paymentStatus === "paid"}
                        onChange={() => updateField("paymentStatus", "paid")}
                      />
                      <span>I have already paid</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="later"
                        checked={formData.paymentStatus === "later"}
                        onChange={() => updateField("paymentStatus", "later")}
                      />
                      <span>I will pay later</span>
                    </label>
                  </div>
                  {errors.paymentStatus && <p className="text-xs text-destructive">{errors.paymentStatus}</p>}
                </div>

                {formData.paymentStatus === "paid" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="proofFile">Upload Proof of Payment <span className="text-destructive">*</span></Label>
                      <Input
                        id="proofFile"
                        type="file"
                        accept=".jpg,.png,.pdf"
                        onChange={(e) => updateField("proofFile", e.target.files?.[0] || null)}
                        className={cn(errors.proofFile && "border-destructive")}
                      />
                      {errors.proofFile && <p className="text-xs text-destructive">{errors.proofFile}</p>}
                      <p className="text-xs text-muted-foreground">Max size 5MB. JPG, PNG or PDF.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentReference">Payment Reference Number (optional)</Label>
                      <Input
                        id="paymentReference"
                        value={formData.paymentReference}
                        onChange={(e) => updateField("paymentReference", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method Used</Label>
                      <Select value={formData.paymentMethod} onValueChange={(v) => updateField("paymentMethod", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecocash">Ecocash</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {formData.paymentStatus === "later" && (
                  <p className="text-sm text-muted-foreground">
                    Your application will only be reviewed after proof of payment is submitted. You may upload the proof later via the parent portal or using the confirmation email link.
                  </p>
                )}
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
              
              {step < 4 ? (
                <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
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
