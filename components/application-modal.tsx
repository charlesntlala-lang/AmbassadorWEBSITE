"use client";

/**
 * Ambassador International School – Application Modal
 * ─────────────────────────────────────────────────────
 * Features:
 *  • Real fee structure (Pre-school & Primary)
 *  • All fields mandatory (with validation)
 *  • Declarations: ALL 4 required checkboxes must be ticked → Submit button hidden until done
 *  • Payment: "Paid" → upload proof of payment flow
 *              "Not Paid" → show EcoCash merchant & Lesotho Post Bank details
 *  • Progress persisted to sessionStorage so user can close & return
 *  • Fully accessible, mobile responsive
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ─── Utility ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const SB = {
  width: "1em", height: "1em", viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor", strokeWidth: 2,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};
const IAlert  = ({ className }: { className?: string }) => (<svg {...SB} className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const ICheck  = ({ className }: { className?: string }) => (<svg {...SB} className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const ILeft   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><polyline points="15 18 9 12 15 6"/></svg>);
const IRight  = ({ className }: { className?: string }) => (<svg {...SB} className={className}><polyline points="9 18 15 12 9 6"/></svg>);
const IUpload = ({ className }: { className?: string }) => (<svg {...SB} className={className}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>);
const IClose  = ({ className }: { className?: string }) => (<svg {...SB} className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const ISpin   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>);
const IFile   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
const IClock  = ({ className }: { className?: string }) => (<svg {...SB} className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IUser   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const IUsers  = ({ className }: { className?: string }) => (<svg {...SB} className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IGrad   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>);
const ISave   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>);
const IMobile = ({ className }: { className?: string }) => (<svg {...SB} className={className}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>);
const IBank   = ({ className }: { className?: string }) => (<svg {...SB} className={className}><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>);

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentStatus = "paid" | "not_paid" | "";

interface AppForm {
  // Step 1
  grade: string;
  firstName: string; lastName: string; dateOfBirth: string;
  gender: string; nationality: string; homeLanguage: string;
  hasDisability: boolean; disabilityDescription: string;
  previousSchool: string; previousGrade: string; reasonForLeaving: string;
  medicalConditions: string; allergies: string;
  studentPhotoFile: File | null;            // optional photo upload
  studentPhotoPreview: string;
  // Step 2
  guardianFirstName: string; guardianLastName: string; relationship: string;
  guardianEmail: string; guardianPhone: string; guardianAltPhone: string;
  guardianAddress: string; guardianOccupation: string;
  emergencyContactName: string; emergencyContactPhone: string;
  // Payment
  paymentStatus: PaymentStatus;
  paymentReference: string;
  paymentProofFile: File | null;
  paymentProofPreview: string;
  // Declarations
  declarationAccurate: boolean; declarationRules: boolean;
  declarationFees: boolean; declarationMedia: boolean;
  signatureName: string; signatureDate: string;
}

type ErrorMap = Partial<Record<keyof AppForm | "general", string>>;

// ─── Fee Structure (official) ─────────────────────────────────────────────────

const PRESCHOOL_GRADES = ["playgroup", "nursery", "reception"];
const PRIMARY_GRADES   = ["grade1","grade2","grade3","grade4","grade5","grade6"];

const GRADE_LABELS: Record<string, string> = {
  playgroup: "Playgroup", nursery: "Nursery", reception: "Reception (Grade R)",
  grade1: "Grade 1", grade2: "Grade 2", grade3: "Grade 3",
  grade4: "Grade 4", grade5: "Grade 5", grade6: "Grade 6",
};

interface FeeRow {
  registration: number;
  term1: number; term2: number; term3: number; term4: number;
  extras: { label: string; amount: string; note?: string }[];
}

const PRESCHOOL_EXTRAS = [
  { label: "Graduation Fee (all preschool learners)", amount: "500.00", note: "Deadline 30 June" },
  { label: "Sports & Entertainment Fee", amount: "450.00", note: "Deadline 05 May" },
  { label: "HEC Project", amount: "200.00", note: "Per year / M50.00 on project month" },
  { label: "Gas", amount: "100.00", note: "Deadline 30 March" },
];
const PRIMARY_EXTRAS = [
  { label: "Sports & Entertainment Fee", amount: "450.00", note: "Deadline 05 May" },
  { label: "HEC Project", amount: "200.00", note: "Per year / M50.00 on project month" },
  { label: "Gas", amount: "100.00", note: "Deadline 30 March" },
];

const FEE_DATA: Record<string, FeeRow> = {
  playgroup: { registration: 200, term1: 900, term2: 800, term3: 800, term4: 800, extras: PRESCHOOL_EXTRAS },
  nursery:   { registration: 200, term1: 900, term2: 800, term3: 800, term4: 800, extras: PRESCHOOL_EXTRAS },
  reception: { registration: 200, term1: 900, term2: 800, term3: 800, term4: 800, extras: PRESCHOOL_EXTRAS },
  grade1:    { registration: 400, term1: 1800, term2: 1600, term3: 1600, term4: 1600, extras: PRIMARY_EXTRAS },
  grade2:    { registration: 400, term1: 1800, term2: 1600, term3: 1600, term4: 1600, extras: PRIMARY_EXTRAS },
  grade3:    { registration: 400, term1: 2200, term2: 1700, term3: 1700, term4: 1700, extras: PRIMARY_EXTRAS },
  grade4:    { registration: 400, term1: 2200, term2: 1700, term3: 1700, term4: 1700, extras: PRIMARY_EXTRAS },
  grade5:    { registration: 400, term1: 2700, term2: 1800, term3: 1800, term4: 1800, extras: PRIMARY_EXTRAS },
  grade6:    { registration: 400, term1: 2700, term2: 1800, term3: 1800, term4: 1800, extras: PRIMARY_EXTRAS },
};

// ─── Session storage helpers ──────────────────────────────────────────────────

const STORAGE_KEY = "ais_application_draft";

const BLANK: AppForm = {
  grade: "", firstName: "", lastName: "", dateOfBirth: "", gender: "",
  nationality: "", homeLanguage: "", hasDisability: false, disabilityDescription: "",
  previousSchool: "", previousGrade: "", reasonForLeaving: "", medicalConditions: "", allergies: "",
  studentPhotoFile: null, studentPhotoPreview: "",
  guardianFirstName: "", guardianLastName: "", relationship: "", guardianEmail: "",
  guardianPhone: "", guardianAltPhone: "", guardianAddress: "", guardianOccupation: "",
  emergencyContactName: "", emergencyContactPhone: "",
  paymentStatus: "", paymentReference: "", paymentProofFile: null, paymentProofPreview: "",
  declarationAccurate: false, declarationRules: false,
  declarationFees: false, declarationMedia: false,
  signatureName: "", signatureDate: "",
};

function loadDraft(): AppForm {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return BLANK;
    return { ...BLANK, ...JSON.parse(raw), paymentProofFile: null, paymentProofPreview: "", studentPhotoFile: null, studentPhotoPreview: "" };
  } catch { return BLANK; }
}
function saveDraft(form: AppForm) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { paymentProofFile, paymentProofPreview, studentPhotoFile, studentPhotoPreview, ...rest } = form;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch { /* quota exceeded */ }
}
function clearDraft() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch { /**/ }
}

// ─── Validation ───────────────────────────────────────────────────────────────

function v1(d: AppForm): ErrorMap {
  const e: ErrorMap = {};
  if (!d.grade)                         e.grade                 = "Please select a grade.";
  if (!d.firstName.trim())              e.firstName             = "First name is required.";
  if (!d.lastName.trim())               e.lastName              = "Last name is required.";
  if (!d.dateOfBirth) {
    e.dateOfBirth = "Date of birth is required.";
  } else {
    const dob = new Date(d.dateOfBirth);
    if (isNaN(dob.getTime()))           e.dateOfBirth           = "Enter a valid date.";
    else if (dob >= new Date())         e.dateOfBirth           = "Date of birth must be in the past.";
  }
  if (!d.gender)                        e.gender                = "Please select a gender.";
  if (!d.nationality.trim())            e.nationality           = "Nationality is required.";
  if (!d.homeLanguage.trim())           e.homeLanguage          = "Home language is required.";
  if (d.hasDisability && !d.disabilityDescription.trim())
                                        e.disabilityDescription = "Please describe the disability.";
  return e;
}

function v2(d: AppForm): ErrorMap {
  const e: ErrorMap = {};
  if (!d.guardianFirstName.trim())      e.guardianFirstName     = "First name is required.";
  if (!d.guardianLastName.trim())       e.guardianLastName      = "Last name is required.";
  if (!d.relationship.trim())           e.relationship          = "Relationship is required.";
  if (!d.guardianEmail.trim())          e.guardianEmail         = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.guardianEmail))
                                        e.guardianEmail         = "Enter a valid email address.";
  if (!d.guardianPhone.trim())          e.guardianPhone         = "Phone number is required.";
  else if (/\D/.test(d.guardianPhone)) e.guardianPhone         = "Digits only.";
  if (!d.guardianAddress.trim())        e.guardianAddress       = "Address is required.";
  if (!d.emergencyContactName.trim())   e.emergencyContactName  = "Emergency contact name is required.";
  if (!d.emergencyContactPhone.trim())  e.emergencyContactPhone = "Emergency contact phone is required.";
  else if (/\D/.test(d.emergencyContactPhone)) e.emergencyContactPhone = "Digits only.";
  if (!d.paymentStatus)                 e.paymentStatus         = "Please select a payment option.";
  if (d.paymentStatus === "paid" && !d.paymentReference.trim())
                                        e.paymentReference      = "Payment reference is required.";
  if (!d.declarationAccurate)           e.declarationAccurate   = "Required.";
  if (!d.declarationRules)              e.declarationRules      = "Required.";
  if (!d.declarationFees)               e.declarationFees       = "Required.";
  if (!d.declarationMedia)              e.declarationMedia      = "Required.";
  if (!d.signatureName.trim())          e.signatureName         = "Signature (full name) is required.";
  if (!d.signatureDate)                 e.signatureDate         = "Date is required.";
  return e;
}

// ─── Backend stub ─────────────────────────────────────────────────────────────

async function submitApp(_d: AppForm): Promise<{ id: string }> {
  // TODO: replace with real API call:
  // const body = new FormData();
  // Object.entries(_d).forEach(([k,v]) => v !== null && body.append(k, v as string | Blob));
  // const res = await fetch("/api/applications", { method: "POST", body });
  // if (!res.ok) throw new Error((await res.json()).message ?? "Submission failed.");
  // return res.json();
  await new Promise((r) => setTimeout(r, 1800));
  return { id: `AIS-${Date.now().toString(36).toUpperCase()}` };
}

// ─── Helper components ────────────────────────────────────────────────────────

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-600" role="alert">
      <IAlert className="h-3 w-3 flex-shrink-0" />{message}
    </p>
  ) : null;

function FF({ label, required, error, children, className }: {
  label: string; required?: boolean; error?: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function SH({ icon: Icon, title, subtitle }: {
  icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: 1 | 2 }) {
  const STEPS: { label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { label: "Student Details", Icon: IGrad },
    { label: "Parent & Payment", Icon: IUsers },
  ];
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const n = (i + 1) as 1 | 2;
        const active = step === n, done = step > n;
        return (
          <React.Fragment key={s.label}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                done   ? "border-blue-600 bg-blue-600 text-white"
                : active ? "border-blue-600 bg-white text-blue-600"
                         : "border-gray-300 bg-white text-gray-400",
              )}>
                {done ? <ICheck className="h-4 w-4" /> : <s.Icon className="h-4 w-4" />}
              </div>
              <span className={cn("text-xs font-medium",
                active ? "text-blue-700" : done ? "text-blue-500" : "text-gray-400"
              )}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("mx-3 mb-5 h-0.5 flex-1 transition-all duration-500",
                step > 1 ? "bg-blue-500" : "bg-gray-200")} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Fee Table ────────────────────────────────────────────────────────────────

function FeeTable({ grade }: { grade: string }) {
  if (!grade || !FEE_DATA[grade]) return null;
  const f = FEE_DATA[grade];
  const isPreschool = PRESCHOOL_GRADES.includes(grade);
  const annual = f.term1 + f.term2 + f.term3 + f.term4;

  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 text-sm">
      <div className="flex items-center justify-between bg-blue-700 px-4 py-2.5">
        <p className="font-semibold text-white">Fee Schedule — {GRADE_LABELS[grade]}</p>
        <span className="rounded bg-blue-600 px-2 py-0.5 text-xs text-blue-100">
          {isPreschool ? "Pre-school" : "Primary"}
        </span>
      </div>

      {/* Application form fee */}
      <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 px-4 py-2.5">
        <div>
          <span className="font-semibold text-amber-800">Application Form Fee</span>
          <span className="ml-2 text-xs text-amber-600">(paid once to apply)</span>
        </div>
        <span className="font-bold text-amber-700">M 100.00</span>
      </div>

      {/* Term fees */}
      <div className="divide-y divide-gray-100 bg-white">
        <div className="flex items-center justify-between px-4 py-2.5 font-medium text-gray-700">
          <span>Registration</span>
          <span>M {f.registration.toFixed(2)}</span>
        </div>
        {([ ["1st Term", f.term1], ["2nd Term", f.term2], ["3rd Term", f.term3], ["4th Term", f.term4] ] as [string,number][]).map(([label, amt]) => (
          <div key={label} className="flex items-center justify-between px-4 py-2 text-gray-600">
            <span>{label}</span>
            <span className="font-semibold">M {amt.toFixed(2)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-blue-50 px-4 py-3">
          <span className="font-bold text-gray-900">Annual Total <span className="text-xs font-normal text-gray-500">(excl. extras)</span></span>
          <span className="text-base font-bold text-blue-700">M {annual.toFixed(2)}</span>
        </div>
      </div>

      {/* Extras */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Additional / Levy Fees</p>
        <div className="space-y-1.5 text-gray-700">
          {f.extras.map((x) => (
            <div key={x.label} className="flex items-start justify-between gap-2">
              <div className="leading-snug">
                <span>{x.label}</span>
                {x.note && <span className="ml-1 text-xs text-gray-400">({x.note})</span>}
              </div>
              <span className="flex-shrink-0 font-semibold">M {x.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">Important Notes</p>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>• Books are provided at school. Additional stationery after year-end is the parent&apos;s responsibility.</li>
          <li className="font-medium text-gray-700">• Fee Deadlines: 1st Term: <strong>05 Feb</strong> · 2nd Term: <strong>05 May</strong> · 3rd Term: <strong>05 Aug</strong> · 4th Term: <strong>05 Nov</strong></li>
        </ul>
      </div>
    </div>
  );
}

// ─── Step 1: Student Details ──────────────────────────────────────────────────

function Step1({ d, e, onChange, onSel, onPhoto }: {
  d: AppForm; e: ErrorMap;
  onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSel: (field: keyof AppForm, value: string | boolean) => void;
  onPhoto: (file: File | null) => void;
}) {
  const photoRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-7">
      <section>
        <SH icon={IGrad} title="Grade & Enrollment" subtitle="Select the grade your child is applying for." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FF label="Applying for Grade" required error={e.grade}>
            <Select value={d.grade} onValueChange={(v) => onSel("grade", v)}>
              <SelectTrigger className={cn(e.grade && "border-red-400")}><SelectValue placeholder="Select grade…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__ps_header__" disabled>— Pre-school —</SelectItem>
                {PRESCHOOL_GRADES.map((g) => <SelectItem key={g} value={g}>{GRADE_LABELS[g]}</SelectItem>)}
                <SelectItem value="__pri_header__" disabled>— Primary —</SelectItem>
                {PRIMARY_GRADES.map((g) => <SelectItem key={g} value={g}>{GRADE_LABELS[g]}</SelectItem>)}
              </SelectContent>
            </Select>
          </FF>
        </div>
        {d.grade && FEE_DATA[d.grade] && <div className="mt-4"><FeeTable grade={d.grade} /></div>}
      </section>

      <Separator />

      <section>
        <SH icon={IUser} title="Student Information" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FF label="First Name" required error={e.firstName}>
            <Input name="firstName" value={d.firstName} onChange={onChange} placeholder="e.g. Amara" className={cn(e.firstName && "border-red-400")} />
          </FF>
          <FF label="Last Name" required error={e.lastName}>
            <Input name="lastName" value={d.lastName} onChange={onChange} placeholder="e.g. Mokoena" className={cn(e.lastName && "border-red-400")} />
          </FF>
          <FF label="Date of Birth" required error={e.dateOfBirth}>
            <Input type="date" name="dateOfBirth" value={d.dateOfBirth} onChange={onChange} max={new Date().toISOString().split("T")[0]} className={cn(e.dateOfBirth && "border-red-400")} />
          </FF>
          <FF label="Gender" required error={e.gender}>
            <Select value={d.gender} onValueChange={(v) => onSel("gender", v)}>
              <SelectTrigger className={cn(e.gender && "border-red-400")}><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </FF>
          <FF label="Nationality" required error={e.nationality}>
            <Input name="nationality" value={d.nationality} onChange={onChange} placeholder="e.g. Mosotho" className={cn(e.nationality && "border-red-400")} />
          </FF>
          <FF label="Home Language" required error={e.homeLanguage}>
            <Input name="homeLanguage" value={d.homeLanguage} onChange={onChange} placeholder="e.g. Sesotho" className={cn(e.homeLanguage && "border-red-400")} />
          </FF>
        </div>
      </section>

      <Separator />

      <section>
        <SH icon={IUpload} title="Student Photo" subtitle="Optional: upload an image of the student." />
        <FF label="Photo" error={e.studentPhotoFile}>
          <div onClick={() => photoRef.current?.click()}
            onKeyDown={(ev) => ev.key === "Enter" && photoRef.current?.click()}
            role="button" tabIndex={0} aria-label="Upload student photo"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 transition hover:border-gray-400 hover:bg-gray-50/60">
            {d.studentPhotoPreview ? (
              <div className="flex items-center gap-2">
                <img src={d.studentPhotoPreview} alt="Student" className="h-16 w-16 rounded-full object-cover" />
                <span className="max-w-[220px] truncate text-sm font-medium text-gray-700">{d.studentPhotoFile?.name}</span>
                <button type="button" aria-label="Remove photo"
                  onClick={(ev) => { ev.stopPropagation(); onPhoto(null); }}
                  className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                  <IClose className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <IUpload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG — max 5 MB</p>
              </>
            )}
          </div>
          <input ref={photoRef} type="file" accept="image/*" className="hidden"
            onChange={(ev) => onPhoto(ev.target.files?.[0] ?? null)} aria-label="Student photo file" />
        </FF>
      </section>

      <Separator />

      <section>
        <SH icon={IAlert} title="Medical & Special Needs" subtitle="Helps us support your child better." />
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <Checkbox id="hasDisability" checked={d.hasDisability} onCheckedChange={(c) => onSel("hasDisability", !!c)} className="mt-0.5" />
            <label htmlFor="hasDisability" className="cursor-pointer text-sm text-gray-700">
              The student has a disability or special educational need the school should be aware of.
            </label>
          </div>
          {d.hasDisability && (
            <FF label="Describe the disability / special need" required error={e.disabilityDescription}>
              <Textarea name="disabilityDescription" value={d.disabilityDescription} onChange={onChange} rows={3}
                placeholder="Describe the condition and any accommodations required…"
                className={cn(e.disabilityDescription && "border-red-400")} />
            </FF>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FF label="Medical Conditions (optional)">
              <Textarea name="medicalConditions" value={d.medicalConditions} onChange={onChange} rows={2} placeholder="List any known conditions…" />
            </FF>
            <FF label="Allergies (optional)">
              <Textarea name="allergies" value={d.allergies} onChange={onChange} rows={2} placeholder="List any allergies…" />
            </FF>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <SH icon={IGrad} title="Previous Schooling" subtitle="Leave blank if this is the student's first school." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FF label="Previous School Name">
            <Input name="previousSchool" value={d.previousSchool} onChange={onChange} placeholder="Name of previous school" />
          </FF>
          <FF label="Grade Last Completed">
            <Input name="previousGrade" value={d.previousGrade} onChange={onChange} placeholder="e.g. Grade 2" />
          </FF>
          <FF label="Reason for Leaving" className="sm:col-span-2">
            <Textarea name="reasonForLeaving" value={d.reasonForLeaving} onChange={onChange} rows={2} placeholder="Why is the student leaving their current school?" />
          </FF>
        </div>
      </section>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({ d, e, onChange, onSel, onFile }: {
  d: AppForm; e: ErrorMap;
  onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSel: (field: keyof AppForm, value: string | boolean) => void;
  onFile: (file: File | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const allDeclarations = d.declarationAccurate && d.declarationRules && d.declarationFees && d.declarationMedia;

  return (
    <div className="space-y-7">
      {/* Fee reminder */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <IAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Application & Registration Fee Required</p>
          <p className="text-sm text-amber-700">
            The <strong>M100 application form fee</strong> must be paid before your application is processed. Your place is confirmed only after the registration fee is received.
          </p>
        </div>
      </div>

      {/* Guardian */}
      <section>
        <SH icon={IUsers} title="Parent / Guardian Information" subtitle="Primary contact responsible for the student's schooling." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FF label="First Name" required error={e.guardianFirstName}>
            <Input name="guardianFirstName" value={d.guardianFirstName} onChange={onChange} placeholder="Guardian's first name" className={cn(e.guardianFirstName && "border-red-400")} />
          </FF>
          <FF label="Last Name" required error={e.guardianLastName}>
            <Input name="guardianLastName" value={d.guardianLastName} onChange={onChange} placeholder="Guardian's last name" className={cn(e.guardianLastName && "border-red-400")} />
          </FF>
          <FF label="Relationship to Student" required error={e.relationship}>
            <Select value={d.relationship} onValueChange={(v) => onSel("relationship", v)}>
              <SelectTrigger className={cn(e.relationship && "border-red-400")}><SelectValue placeholder="Select relationship…" /></SelectTrigger>
              <SelectContent>
                {["Mother","Father","Legal Guardian","Grandparent","Aunt/Uncle","Other"].map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FF>
          <FF label="Occupation (optional)">
            <Input name="guardianOccupation" value={d.guardianOccupation} onChange={onChange} placeholder="e.g. Teacher" />
          </FF>
          <FF label="Email Address" required error={e.guardianEmail}>
            <Input type="email" name="guardianEmail" value={d.guardianEmail} onChange={onChange} placeholder="guardian@example.com" className={cn(e.guardianEmail && "border-red-400")} />
          </FF>
          <FF label="Primary Phone" required error={e.guardianPhone}>
            <Input type="tel" inputMode="numeric" pattern="\d*" name="guardianPhone" value={d.guardianPhone} onChange={onChange} placeholder="e.g. 2665XXXXXXXX" className={cn(e.guardianPhone && "border-red-400")} />
          </FF>
          <FF label="Alternative Phone (optional)">
            <Input type="tel" inputMode="numeric" pattern="\d*" name="guardianAltPhone" value={d.guardianAltPhone} onChange={onChange} placeholder="Optional" />
          </FF>
          <FF label="Home Address" required error={e.guardianAddress} className="sm:col-span-2">
            <Textarea name="guardianAddress" value={d.guardianAddress} onChange={onChange} rows={2}
              placeholder="Street, area, city…" className={cn(e.guardianAddress && "border-red-400")} />
          </FF>
        </div>
      </section>

      <Separator />

      {/* Emergency */}
      <section>
        <SH icon={IAlert} title="Emergency Contact" subtitle="Someone to reach if we cannot contact the primary guardian." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FF label="Full Name" required error={e.emergencyContactName}>
            <Input name="emergencyContactName" value={d.emergencyContactName} onChange={onChange} placeholder="Full name" className={cn(e.emergencyContactName && "border-red-400")} />
          </FF>
          <FF label="Phone Number" required error={e.emergencyContactPhone}>
            <Input type="tel" inputMode="numeric" pattern="\d*" name="emergencyContactPhone" value={d.emergencyContactPhone} onChange={onChange} placeholder="e.g. 2665XXXXXXXX" className={cn(e.emergencyContactPhone && "border-red-400")} />
          </FF>
        </div>
      </section>

      <Separator />

      {/* Payment */}
      <section>
        <SH icon={IFile} title="Fees & Payment" subtitle="Have you already paid the M100 application form fee?" />
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Payment Status<span className="ml-0.5 text-red-500">*</span></Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {([
                { val: "paid"     as PaymentStatus, Icon: ICheck, label: "Yes, I Have Paid", desc: "Upload proof of payment", border: "border-green-500", bg: "bg-green-50", iconC: "text-green-600" },
                { val: "not_paid" as PaymentStatus, Icon: IClock, label: "Not Yet / Pay Later", desc: "See payment methods below", border: "border-amber-400", bg: "bg-amber-50", iconC: "text-amber-500" },
              ]).map((o) => (
                <button key={o.val} type="button" onClick={() => onSel("paymentStatus", o.val)}
                  aria-pressed={d.paymentStatus === o.val}
                  className={cn("flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                    d.paymentStatus === o.val ? `${o.border} ${o.bg}` : "border-gray-200 bg-white hover:border-gray-300")}>
                  <o.Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", d.paymentStatus === o.val ? o.iconC : "text-gray-400")} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{o.label}</p>
                    <p className="text-xs text-gray-500">{o.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            {e.paymentStatus && <FieldError message={e.paymentStatus} />}
          </div>

          {/* ── PAID: upload proof ── */}
          {d.paymentStatus === "paid" && (
            <div className="space-y-4 rounded-xl border border-green-200 bg-green-50/50 p-4">
              <div className="flex items-start gap-2 rounded-lg bg-green-100 p-3 text-sm text-green-800">
                <ICheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                Thank you! Please enter your payment reference number and upload proof of payment.
              </div>
              <FF label="Payment Reference / Receipt Number" required error={e.paymentReference}>
                <Input name="paymentReference" value={d.paymentReference} onChange={onChange}
                  placeholder="e.g. EcoCash TXN123456 or bank receipt number"
                  className={cn(e.paymentReference && "border-red-400")} />
              </FF>
              <FF label="Upload Proof of Payment (recommended)">
                <div onClick={() => fileRef.current?.click()}
                  onKeyDown={(ev) => ev.key === "Enter" && fileRef.current?.click()}
                  role="button" tabIndex={0} aria-label="Upload payment proof"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-300 bg-white p-6 transition hover:border-green-400 hover:bg-green-50/60">
                  {d.paymentProofPreview ? (
                    <div className="flex items-center gap-2">
                      <IFile className="h-6 w-6 text-green-600" />
                      <span className="max-w-[220px] truncate text-sm font-medium text-green-700">{d.paymentProofFile?.name}</span>
                      <button type="button" aria-label="Remove file"
                        onClick={(ev) => { ev.stopPropagation(); onFile(null); }}
                        className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                        <IClose className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <IUpload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG, PDF — max 5 MB</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden"
                  onChange={(ev) => onFile(ev.target.files?.[0] ?? null)} aria-label="Payment proof file" />
              </FF>
            </div>
          )}

          {/* ── NOT PAID: payment methods + saved progress ── */}
          {d.paymentStatus === "not_paid" && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-700">Pay via one of these methods, then come back to submit:</p>

              {/* EcoCash */}
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 bg-[#007A3D] px-4 py-3">
                  <IMobile className="h-5 w-5 text-white" />
                  <p className="font-bold text-white">EcoCash Merchant Payment</p>
                </div>
                <div className="bg-white px-4 py-4">
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="text-sm text-gray-500">Merchant Number</span>
                    <span className="text-3xl font-black tracking-widest text-gray-900">32241</span>
                  </div>
                  <p className="mb-3 text-sm text-gray-600">Merchant Name: <strong>Ambassador International</strong></p>
                  <div className="rounded-lg bg-green-50 p-3 text-xs text-green-800">
                    <p className="mb-1 font-semibold">How to pay:</p>
                    <ol className="list-decimal space-y-0.5 pl-4">
                      <li>Open EcoCash on your phone</li>
                      <li>Select <strong>Pay Merchant</strong></li>
                      <li>Enter merchant number <strong>32241</strong></li>
                      <li>Enter amount <strong>M100</strong></li>
                      <li>Use <strong>student surname + grade</strong> as reference</li>
                      <li>Confirm payment and save your receipt</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Lesotho Post Bank */}
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 bg-[#003087] px-4 py-3">
                  <IBank className="h-5 w-5 text-white" />
                  <p className="font-bold text-white">Lesotho Post Bank</p>
                </div>
                <div className="bg-white px-4 py-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Account Name</span>
                      <span className="font-semibold text-gray-900">Ambassador International Preschool</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Account Number</span>
                      <span className="font-mono text-lg font-black tracking-widest text-gray-900">1035142200010</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-bold text-gray-900">M 100.00</span>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
                    Use <strong>student surname + grade</strong> as the reference when depositing. Keep your deposit slip as proof of payment.
                  </div>
                </div>
              </div>

              {/* Progress saved */}
              <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <ISave className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Your progress is saved automatically</p>
                  <p className="text-sm text-blue-700">
                    After paying, close this form and reopen it — all your answers will still be here. Select <strong>&quot;Yes, I Have Paid&quot;</strong>, enter your reference number, upload your receipt, and submit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* Declarations */}
      <section>
        <SH icon={IFile} title="Declarations & Consent"
          subtitle="You must accept all four required declarations (*) before the Submit button appears." />
        <div className="space-y-3">
          {([
            { id: "declarationAccurate" as keyof AppForm, req: true,  text: "I confirm that all information provided in this application is accurate and complete to the best of my knowledge." },
            { id: "declarationRules"    as keyof AppForm, req: true,  text: "I understand that my child will be required to abide by the school's code of conduct and rules." },
            { id: "declarationFees"     as keyof AppForm, req: true,  text: "I agree to pay all fees according to the school's fee schedule and payment deadlines as stated above." },
            { id: "declarationMedia"    as keyof AppForm, req: true, text: "I consent to the school photographing / recording my child for educational and promotional purposes." },
          ]).map((dc) => {
            const checked = !!d[dc.id];
            return (
              <div key={dc.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border-2 p-3 transition-all duration-150",
                  dc.req && checked  ? "border-green-400 bg-green-50"
                  : dc.req          ? "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    : "border-gray-200 bg-gray-50",
                )}>
                <Checkbox id={dc.id} checked={checked} onCheckedChange={(c) => onSel(dc.id, !!c)} className="mt-0.5" />
                <label htmlFor={dc.id} className="cursor-pointer text-sm leading-relaxed text-gray-700">
                  {dc.req && <span className="mr-1 font-bold text-red-500">*</span>}
                  {dc.text}
                  {dc.req && checked && (
                    <span className="ml-2 inline-flex items-center gap-0.5 text-xs font-medium text-green-600">
                      <ICheck className="h-3 w-3" />Accepted
                    </span>
                  )}
                </label>
              </div>
            );
          })}

          {!allDeclarations && (
            <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5">
              <IAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
              <p className="text-sm text-orange-700">
                Please accept all four required declarations (marked <strong className="text-red-500">*</strong>) to enable the Submit button.
              </p>
            </div>
          )}
        </div>

        {/* Signature */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FF label="Full Name (acts as signature)" required error={e.signatureName}>
            <Input name="signatureName" value={d.signatureName} onChange={onChange}
              placeholder="Type your full legal name" className={cn(e.signatureName && "border-red-400")} />
          </FF>
          <FF label="Date" required error={e.signatureDate}>
            <Input type="date" name="signatureDate" value={d.signatureDate} onChange={onChange}
              max={new Date().toISOString().split("T")[0]} className={cn(e.signatureDate && "border-red-400")} />
          </FF>
        </div>
      </section>
    </div>
  );
}

// ─── Confirmation ─────────────────────────────────────────────────────────────

function Confirmed({ appId, d, onClose }: { appId: string; d: AppForm; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <ICheck className="h-9 w-9 text-green-600" />
      </div>
      <h2 className="mb-1 text-2xl font-bold text-gray-900">Application Submitted!</h2>
      <p className="mb-4 text-gray-500">
        Thank you, <strong>{d.guardianFirstName}</strong>. We&apos;ve received the application for{" "}
        <strong>{d.firstName} {d.lastName}</strong>.
      </p>
      <div className="mb-6 w-full max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Application Summary</p>
        <div className="space-y-2 text-sm">
          {[
            { label: "Reference ID", node: <Badge variant="outline" className="font-mono font-bold text-blue-700">{appId}</Badge> },
            { label: "Student",      node: <span className="font-medium">{d.firstName} {d.lastName}</span> },
            { label: "Grade",        node: <span className="font-medium">{d.grade ? GRADE_LABELS[d.grade] : "—"}</span> },
            { label: "Payment",      node: <Badge variant="outline" className={d.paymentStatus === "paid" ? "text-green-700" : "text-amber-700"}>{d.paymentStatus === "paid" ? "Confirmed Paid" : "Pending"}</Badge> },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-gray-500">{r.label}</span>{r.node}
            </div>
          ))}
        </div>
      </div>
      <p className="mb-1 text-sm text-gray-600">A confirmation will be sent to <strong>{d.guardianEmail}</strong>.</p>
      <p className="mb-6 text-sm text-gray-500">Our admissions team will contact you within 3–5 working days.</p>
      <Button onClick={onClose} size="lg" className="bg-blue-600 hover:bg-blue-700">Close</Button>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationModal({ open, onOpenChange }: ApplicationModalProps) {
  const [step, setStep]           = useState<1 | 2>(1);
  const [form, setForm]           = useState<AppForm>(() => loadDraft());
  const [errors, setErrors]       = useState<ErrorMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [appId, setAppId]         = useState<string | null>(null);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const scrollRef                 = useRef<HTMLDivElement>(null);

  // Auto-save draft on every form change
  useEffect(() => { saveDraft(form); }, [form]);

  const handlePhoto = useCallback((file: File | null) => {
    if (!file) { setForm((p) => ({ ...p, studentPhotoFile: null, studentPhotoPreview: "" })); return; }
    if (file.size > 5 * 1024 * 1024) { setErrors((p) => ({ ...p, studentPhotoFile: "File must be under 5 MB." })); return; }
    setForm((p) => ({ ...p, studentPhotoFile: file, studentPhotoPreview: URL.createObjectURL(file) }));
  }, []);

  // Scroll to top on step change
  useEffect(() => { scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    if (appId) {
      setTimeout(() => { clearDraft(); setStep(1); setForm(BLANK); setErrors({}); setAppId(null); setSubmitErr(null); }, 300);
    }
  }, [onOpenChange, appId]);

const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;
    let v = value;
    // numeric-only fields
    if (["guardianPhone","guardianAltPhone","emergencyContactPhone"].includes(name)) {
      v = value.replace(/\D/g, "");
    }
    setForm((p) => ({ ...p, [name]: v }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  }, []);

  const handleSel = useCallback((field: keyof AppForm, value: string | boolean) => {
    setForm((p) => {
      const n = { ...p, [field]: value };
      if (field === "paymentStatus" && value !== "paid") {
        n.paymentReference = ""; n.paymentProofFile = null; n.paymentProofPreview = "";
      }
      return n;
    });
    setErrors((p) => ({ ...p, [field]: undefined }));
  }, []);

  const handleFile = useCallback((file: File | null) => {
    if (!file) { setForm((p) => ({ ...p, paymentProofFile: null, paymentProofPreview: "" })); return; }
    if (file.size > 5 * 1024 * 1024) { setErrors((p) => ({ ...p, paymentProofFile: "File must be under 5 MB." })); return; }
    setForm((p) => ({ ...p, paymentProofFile: file, paymentProofPreview: URL.createObjectURL(file) }));
  }, []);

  const handleNext = useCallback(() => { setErrors(v1(form)); setStep(2); }, [form]);
  const handleBack = useCallback(() => { setErrors({}); setStep(1); }, []);

  const handleSubmit = useCallback(async () => {
    const errs = v2(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 50);
      return;
    }
    setSubmitting(true); setSubmitErr(null);
    try {
      const r = await submitApp(form);
      setAppId(r.id);
      clearDraft();
    } catch (err) {
      setSubmitErr(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally { setSubmitting(false); }
  }, [form]);

  const confirmed       = !!appId;
  const s1HasErrors     = Object.keys(v1(form)).length > 0;
  const allDeclarations = form.declarationAccurate && form.declarationRules && form.declarationFees && form.declarationMedia;
  const paymentPending  = form.paymentStatus === "not_paid";
  const hasDraft        = !!(form.firstName || form.grade);

  // Submit is visible only when: all 3 declarations ticked AND payment is not in "not_paid" state
  const submitVisible = step === 2 && allDeclarations && !paymentPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[90vw] max-w-[90vw] flex-col overflow-hidden p-0"
        style={{ maxHeight: "90vh" }}
        onPointerDownOutside={(e) => { if (!confirmed) e.preventDefault(); }}
        aria-label="School Application Form"
      >
        {!confirmed && (
          <DialogHeader className="flex-shrink-0 border-b border-gray-100 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">Ambassador International School</DialogTitle>
                <p className="text-sm text-gray-500">Student Application Form — {new Date().getFullYear()}</p>
              </div>
              <button type="button" onClick={handleClose} aria-label="Close dialog"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600">
                <IClose className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4"><ProgressBar step={step} /></div>
            {step === 2 && s1HasErrors && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs text-orange-700">
                <IAlert className="h-3.5 w-3.5 flex-shrink-0" />
                Some fields in Step 1 need attention — go back to correct them before submitting.
              </div>
            )}
            {step === 1 && hasDraft && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
                <ISave className="h-3.5 w-3.5 flex-shrink-0" />
                Your previous progress has been restored. Continue where you left off.
              </div>
            )}
          </DialogHeader>
        )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="min-h-[400px] px-6 py-5">
            {confirmed
              ? <Confirmed appId={appId!} d={form} onClose={handleClose} />
              : step === 1
                ? <Step1 d={form} e={errors} onChange={handleChange} onSel={handleSel} onPhoto={handlePhoto} />
                : <Step2 d={form} e={errors} onChange={handleChange} onSel={handleSel} onFile={handleFile} />
            }
          </div>
        </div>

        {!confirmed && (
          <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-4">
            {submitErr && (
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <IAlert className="h-4 w-4 flex-shrink-0" />{submitErr}
              </div>
            )}
            {step === 2 && paymentPending && (
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                <IClock className="h-4 w-4 flex-shrink-0" />
                Progress saved. After paying via EcoCash or Lesotho Post Bank, reopen this form, select &quot;Yes, I Have Paid&quot; and submit.
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <p className="hidden text-xs text-gray-400 sm:block">
                Fields marked <span className="text-red-500">*</span> are required.
              </p>
              <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                {step === 2 && (
                  <Button variant="outline" onClick={handleBack} disabled={submitting} className="flex items-center gap-1">
                    <ILeft className="h-4 w-4" />Back
                  </Button>
                )}

                {step === 1 && (
                  <Button onClick={handleNext} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                    Continue<IRight className="h-4 w-4" />
                  </Button>
                )}

                {/* Submit: only visible when declarations done AND payment confirmed */}
                {submitVisible && (
                  <Button onClick={handleSubmit} disabled={submitting}
                    className="flex min-w-[145px] items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                    {submitting
                      ? <><ISpin className="h-4 w-4 animate-spin" />Submitting…</>
                      : <>Submit Application<IRight className="h-4 w-4" /></>
                    }
                  </Button>
                )}

                {/* Hint: explains why submit is not visible */}
                {step === 2 && !submitVisible && !submitting && (
                  <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
                    <IAlert className="h-3.5 w-3.5 text-gray-400" />
                    {paymentPending
                      ? "Pay the registration fee to unlock submission."
                      : "Accept all 4 required declarations to unlock submission."}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationModal;