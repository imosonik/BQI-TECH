"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useActionState } from "@/hooks/useActionState"
import { submitApplication } from "@/actions/submitApplication"
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeft, ArrowRight, Send } from "lucide-react"

const hearAboutOptions = ["LinkedIn", "Internet search", "Other"] as const
const experienceOptions = [
  "Less than 2 years",
  "2-5 years", 
  "6-10 years",
  "Over 10 years"
] as const

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  position: z.string().min(1, "Position is required"),
  cv: z.any().optional(),
  hearAbout: z.enum(hearAboutOptions),
  otherSource: z.string().optional(),
  experience: z.enum(experienceOptions, {
    required_error: "Please select your experience level",
    invalid_type_error: "Please select a valid experience level"
  }),
  salary: z.string().min(1, "Salary expectation is required"),
})

type FormData = z.infer<typeof formSchema>

function AdvancedLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 border-4 border-blue-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-green-500 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -360],
            borderRadius: ["25%", "50%", "25%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white font-bold"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          Loading
        </motion.div>
      </div>
    </div>
  )
}

function SnakeProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-20 relative">
      <svg className="w-full h-24" viewBox="0 0 600 50">
        {/* Background path */}
        <path
          d="M 50 25 C 100 25, 100 25, 150 25 C 200 25, 200 25, 300 25 C 400 25, 400 25, 450 25 C 500 25, 500 25, 550 25"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2"
          className="path-bg"
        />
        {/* Animated progress path */}
        <motion.path
          d="M 50 25 C 100 25, 100 25, 150 25 C 200 25, 200 25, 300 25 C 400 25, 400 25, 450 25 C 500 25, 500 25, 550 25"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: (step - 1) / 2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="path-progress"
        />
        
        {/* Step circles */}
        {[1, 2, 3].map((i) => (
          <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}>
            <motion.circle
              cx={50 + (i - 1) * 250}
              cy="25"
              r="20"
              className={`${
                step >= i 
                  ? "fill-blue-600" 
                  : "fill-white stroke-2 stroke-gray-200"
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <text
              x={50 + (i - 1) * 250}
              y="30"
              textAnchor="middle"
              className={`text-sm font-semibold ${
                step >= i ? "fill-white" : "fill-gray-400"
              }`}
            >
              {i}
            </text>
            <text
              x={50 + (i - 1) * 250}
              y="60"
              textAnchor="middle"
              className={`text-xs font-medium ${
                step >= i ? "fill-blue-600" : "fill-gray-400"
              }`}
            >
              {i === 1 ? "Personal Info" : i === 2 ? "Details" : "Experience"}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function ApplicationForm() {
  const { id } = useParams()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [positions, setPositions] = useState<{ id: string; title: string }[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  const { execute, isLoading, error } = useActionState(submitApplication)
  const hearAbout = watch("hearAbout")

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch("/api/job-postings")
        if (!response.ok) throw new Error("Failed to fetch job postings")
        const data = await response.json()
        setPositions(data)
      } catch (error) {
        console.error("Error fetching positions:", error)
      }
    }

    fetchPositions()
  }, [])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const formData = new FormData()
      
      // Basic form fields with trimming
      formData.append('name', `${data.firstName.trim()} ${data.lastName.trim()}`)
      formData.append('email', data.email.trim())
      formData.append('phoneNumber', data.phone.trim())
      formData.append('location', data.location.trim())
      formData.append('hearAbout', data.hearAbout)
      formData.append('experience', data.experience)
      formData.append('salary', data.salary.trim())
      
      // Handle position
      const selectedPosition = positions.find(pos => pos.id === data.position)
      if (!selectedPosition) {
        throw new Error('Invalid position selected')
      }
      formData.append('position', selectedPosition.title)
      
      // Handle optional fields
      if (data.otherSource?.trim()) {
        formData.append('otherSource', data.otherSource.trim())
      }
      
      // Handle file upload
      if (uploadedFile) {
        formData.append('resume', uploadedFile)
      }

      const result = await execute(formData)

      if (!result) {
        toast.error("Failed to submit application. Please try again.")
        return
      }

      if (!result.success) {
        toast.error(result.error || "An error occurred during submission")
        return
      }

      toast.success(result.message || 'Application submitted successfully')
      router.push('/dashboard/apply/thank-you')
    } catch (error) {
      console.error('Application submission error:', error)
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Define the field names type based on FormData
  type FieldName = keyof FormData

  // Create typed arrays of fields to validate for each step
  const step1Fields: FieldName[] = ['firstName', 'lastName', 'email', 'phone']
  const step2Fields: FieldName[] = ['location', 'position', 'hearAbout']
  const step3Fields: FieldName[] = ['experience', 'salary']

  // Update the nextStep function with proper typing
  const nextStep = async () => {
    let fieldsToValidate: FieldName[] = []
    
    switch (step) {
      case 1:
        fieldsToValidate = step1Fields
        break
      case 2:
        fieldsToValidate = step2Fields
        break
      case 3:
        fieldsToValidate = step3Fields
        break
    }

    const isStepValid = await trigger(fieldsToValidate)
    
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, 3))
    } else {
      toast.error('Please fill in all required fields correctly', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#F9FAFB',
          color: '#1F2937',
          border: '1px solid #E5E7EB'
        }
      })
    }
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <InputField
                label="First Name"
                id="firstName"
                register={register}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                id="lastName"
                register={register}
                error={errors.lastName}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                register={register}
                error={errors.email}
              />
              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                register={register}
                error={errors.phone}
              />
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Application Details</h2>
            <div className="space-y-4">
              <InputField
                label="Location (City)"
                id="location"
                register={register}
                error={errors.location}
              />
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  id="position"
                  {...register("position")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.title}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV/Resume 
                </label>
                <input
                  type="file"
                  id="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500"
                />
                {uploadedFile && <p>Uploaded: {uploadedFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where did you hear about BQI Tech?
                </label>
                {hearAboutOptions.map((option) => (
                  <div key={option} className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...register("hearAbout")}
                        value={option}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
                {hearAbout === "Other" && (
                  <input
                    type="text"
                    {...register("otherSource")}
                    placeholder="Please specify"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  How many years of full-time work experience do you have?
                </label>
                <select
                  id="experience"
                  {...register("experience")}
                  className={`mt-1 block w-full rounded-md shadow-sm 
                            focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                            ${errors.experience ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select experience</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <AnimatePresence mode="wait">
                  {errors.experience && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      Please select your experience level
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <InputField
                label="Salary Expectation (In Kenyan Shillings)"
                id="salary"
                register={register}
                error={errors.salary}
              />
            </div>
          </motion.div>
        )
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Application Form</h1>
          <p className="text-gray-600">Complete all steps to submit your application</p>
        </motion.div>

        {/* Replace old progress bar with new SnakeProgressBar */}
        <SnakeProgressBar step={step} />

        {/* Form Content */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <motion.div 
              className="flex justify-between mt-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300 group"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Back
                </motion.button>
              )}
              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 ml-auto group"
                  whileHover={{ x: 5 }}
                >
                  Next
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 ml-auto disabled:bg-green-400 group"
                  whileHover={{ scale: 1.05 }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <Send className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </motion.button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
      {isSubmitting && <AdvancedLoader />}
    </motion.div>
  )
}

interface InputFieldProps {
  label: string
  id: string
  register: any
  error: any
  type?: string
}

function InputField({ label, id, register, error, type = "text" }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  )
}

export default ApplicationForm