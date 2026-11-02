import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react'
import type { RegistrationFormData, RegistrationFormErrors } from '@/types/event'
import { Button } from '@/components/common/Button'

const INITIAL_FORM_DATA: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  institution: '',
  department: '',
  yearOfStudy: '3rd Year',
  teamName: '',
  teamSize: 3,
  primaryDomain: 'AI & Machine Learning',
  ideaSummary: '',
  agreedToRules: false,
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<RegistrationFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedTeam, setSubmittedTeam] = useState<RegistrationFormData | null>(null)

  const validate = (): boolean => {
    const newErrors: RegistrationFormErrors = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.'
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution / College name is required.'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department / Branch is required.'
    }

    if (!formData.teamName.trim() || formData.teamName.trim().length < 2) {
      newErrors.teamName = 'Team name must be at least 2 characters.'
    }

    if (formData.teamSize < 2 || formData.teamSize > 4) {
      newErrors.teamSize = 'Team size must be between 2 and 4 members.'
    }

    if (!formData.agreedToRules) {
      newErrors.agreedToRules = 'You must agree to the ideathon code of conduct and rules.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))

    // Clear individual field error on change
    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Simulate frontend validation & async submission cycle (No backend integration)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setSubmittedTeam({ ...formData })
      setFormData(INITIAL_FORM_DATA)
    }, 800)
  }

  const handleReset = () => {
    setIsSuccess(false)
    setSubmittedTeam(null)
    setErrors({})
  }

  if (isSuccess && submittedTeam) {
    return (
      <div
        role="region"
        aria-live="polite"
        className="p-8 bg-[#163866] border border-emerald-500/40 text-left space-y-6 rounded-xs shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              Registration Draft Recorded!
            </h3>
            <p className="font-mono text-xs text-emerald-300 uppercase tracking-wider font-semibold">
              STATUS: PRE-REGISTERED // CONFIRMATION PENDING
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed font-mono">
          Thank you for registering team <strong className="text-[#ffc928]">"{submittedTeam.teamName}"</strong> for IDEA SPRINT 2026. Your team lead details have been validated by the client-side system.
        </p>

        {/* Confirmation Summary Card */}
        <div className="p-4 bg-[#102b52] border border-[#59d6e8]/30 rounded-xs font-mono text-xs space-y-2">
          <div className="flex justify-between border-b border-[#59d6e8]/20 pb-2">
            <span className="text-[#a0c0e0]">Team Leader:</span>
            <span className="text-white font-medium">{submittedTeam.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-[#59d6e8]/20 pb-2">
            <span className="text-[#a0c0e0]">Official Contact:</span>
            <span className="text-white font-medium">{submittedTeam.email}</span>
          </div>
          <div className="flex justify-between border-b border-[#59d6e8]/20 pb-2">
            <span className="text-[#a0c0e0]">Institution:</span>
            <span className="text-white font-medium">{submittedTeam.institution}</span>
          </div>
          <div className="flex justify-between border-b border-[#59d6e8]/20 pb-2">
            <span className="text-[#a0c0e0]">Selected Track:</span>
            <span className="text-[#ffc928] font-bold">{submittedTeam.primaryDomain}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-[#a0c0e0]">Squad Count:</span>
            <span className="text-[#59d6e8] font-bold">{submittedTeam.teamSize} Members</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Register Another Squad
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-4 sm:p-8 bg-[#163866] border border-[#59d6e8]/30 space-y-6 text-left rounded-xs shadow-2xl"
    >
      <div className="border-b border-[#59d6e8]/20 pb-4">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Team Registration Application
        </h3>
        <p className="font-mono text-xs text-[#a0c0e0] mt-1">
          Complete the form below to register your squad for IDEA SPRINT 2026.
        </p>
      </div>

      {/* Team Leader Contact Information */}
      <div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#ffc928] font-bold mb-3">
          // 01. Team Leader Information
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reg-fullName" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Full Name *
            </label>
            <input
              id="reg-fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              required
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={`w-full bg-[#102b52] border text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffc928] ${
                errors.fullName ? 'border-red-400' : 'border-[#59d6e8]/30 hover:border-[#59d6e8]/60'
              }`}
              placeholder="e.g. Maya Chen"
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1 text-xs text-red-400 font-mono">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Official Email Address *
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              enterKeyHint="next"
              required
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full bg-[#102b52] border text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffc928] ${
                errors.email ? 'border-red-400' : 'border-[#59d6e8]/30 hover:border-[#59d6e8]/60'
              }`}
              placeholder="e.g. name@ceconline.edu"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-400 font-mono">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reg-phone" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Phone Number (WhatsApp) *
            </label>
            <input
              id="reg-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              enterKeyHint="next"
              required
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full bg-[#102b52] border text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffc928] ${
                errors.phone ? 'border-red-400' : 'border-[#59d6e8]/30 hover:border-[#59d6e8]/60'
              }`}
              placeholder="+91 98765 43210"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-red-400 font-mono">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reg-institution" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              College / Institution *
            </label>
            <input
              id="reg-institution"
              name="institution"
              type="text"
              autoComplete="organization"
              enterKeyHint="next"
              required
              value={formData.institution}
              onChange={handleChange}
              aria-invalid={!!errors.institution}
              aria-describedby={errors.institution ? 'institution-error' : undefined}
              className={`w-full bg-[#102b52] border text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffc928] ${
                errors.institution ? 'border-red-400' : 'border-[#59d6e8]/30 hover:border-[#59d6e8]/60'
              }`}
              placeholder="e.g. College of Engineering Chengannur"
            />
            {errors.institution && (
              <p id="institution-error" className="mt-1 text-xs text-red-400 font-mono">
                {errors.institution}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reg-department" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Department / Branch *
            </label>
            <input
              id="reg-department"
              name="department"
              type="text"
              enterKeyHint="next"
              required
              value={formData.department}
              onChange={handleChange}
              aria-invalid={!!errors.department}
              aria-describedby={errors.department ? 'department-error' : undefined}
              className={`w-full bg-[#102b52] border text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffc928] ${
                errors.department ? 'border-red-400' : 'border-[#59d6e8]/30 hover:border-[#59d6e8]/60'
              }`}
              placeholder="e.g. Computer Science & Engineering"
            />
            {errors.department && (
              <p id="department-error" className="mt-1 text-xs text-red-400 font-mono">
                {errors.department}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reg-yearOfStudy" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Year of Study *
            </label>
            <select
              id="reg-yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full bg-[#102b52] border border-[#59d6e8]/30 text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors hover:border-[#59d6e8]/60 focus-visible:outline-2 focus-visible:outline-[#ffc928]"
            >
              <option value="1st Year">1st Year (Freshman)</option>
              <option value="2nd Year">2nd Year (Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year (Senior)</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Squad & Track Information */}
      <div className="pt-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#59d6e8] font-bold mb-3">
          // 02. Squad & Innovation Track
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reg-teamName" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Team Name *
            </label>
            <input
              id="reg-teamName"
              name="teamName"
              type="text"
              enterKeyHint="next"
              required
              value={formData.teamName}
              onChange={handleChange}
              aria-invalid={!!errors.teamName}
              aria-describedby={errors.teamName ? 'teamName-error' : undefined}
              className={`w-full bg-[#102b52] border text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffc928] ${
                errors.teamName ? 'border-red-400' : 'border-[#59d6e8]/30 hover:border-[#59d6e8]/60'
              }`}
              placeholder="e.g. Quantum Pioneers"
            />
            {errors.teamName && (
              <p id="teamName-error" className="mt-1 text-xs text-red-400 font-mono">
                {errors.teamName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reg-teamSize" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Total Team Size (2 - 4 Members) *
            </label>
            <select
              id="reg-teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="w-full bg-[#102b52] border border-[#59d6e8]/30 text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors hover:border-[#59d6e8]/60 focus-visible:outline-2 focus-visible:outline-[#ffc928]"
            >
              <option value={2}>2 Members</option>
              <option value={3}>3 Members</option>
              <option value={4}>4 Members</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reg-primaryDomain" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Primary Innovation Track / Domain *
            </label>
            <select
              id="reg-primaryDomain"
              name="primaryDomain"
              value={formData.primaryDomain}
              onChange={handleChange}
              className="w-full bg-[#102b52] border border-[#59d6e8]/30 text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors hover:border-[#59d6e8]/60 focus-visible:outline-2 focus-visible:outline-[#ffc928]"
            >
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="CleanTech & Energy">CleanTech & Energy</option>
              <option value="Healthcare & Assistive">Healthcare & Assistive Tech</option>
              <option value="Fintech & Open Commerce">Fintech & Open Commerce</option>
              <option value="Open Innovation & Smart Hardware">Open Innovation & Smart Hardware</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reg-ideaSummary" className="block text-xs font-mono text-zinc-200 mb-1.5 font-medium">
              Preliminary Concept or Problem Thesis (Optional)
            </label>
            <textarea
              id="reg-ideaSummary"
              name="ideaSummary"
              rows={3}
              enterKeyHint="done"
              value={formData.ideaSummary}
              onChange={handleChange}
              className="w-full bg-[#102b52] border border-[#59d6e8]/30 text-base sm:text-sm text-white px-3.5 py-3 sm:py-2.5 rounded-xs transition-colors hover:border-[#59d6e8]/60 focus-visible:outline-2 focus-visible:outline-[#ffc928]"
              placeholder="Briefly state the challenge your squad intends to tackle (can be refined during the sprint)..."
            />
          </div>
        </div>
      </div>

      {/* Rules Agreement Checkbox */}
      <div className="pt-2 border-t border-[#59d6e8]/20">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            id="reg-agreedToRules"
            name="agreedToRules"
            type="checkbox"
            checked={formData.agreedToRules}
            onChange={handleChange}
            style={{ accentColor: '#ffc928' }}
            className="w-4 h-4 mt-0.5 rounded-xs bg-[#102b52] border border-[#59d6e8]/40 focus-visible:outline-2 focus-visible:outline-[#ffc928]"
          />
          <span className="text-xs text-zinc-200 leading-relaxed font-mono">
            I confirm that all squad members are active undergraduate/graduate students, and we agree to abide by the IEDC BOOTCAMP CEC code of conduct, intellectual integrity guidelines, and sprint schedule.
          </span>
        </label>
        {errors.agreedToRules && (
          <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{errors.agreedToRules}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-[#a0c0e0]">
          Client-side validation enabled • No credentials stored
        </span>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto min-h-[48px] justify-center active:scale-[0.98] font-bold"
        >
          Submit Team Application
        </Button>
      </div>
    </form>
  )
}

export default RegistrationForm
