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
const experienceOptions = ["Entry Level", "Mid Level", "Senior"] as const

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
  experience: z.enum(experienceOptions),
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
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'cv' && uploadedFile) {
          formData.append('resume', uploadedFile)
        } else if (typeof value === 'string' && value.trim() !== '') {
          formData.append(key, value)
        } else if (value !== null && value !== undefined) {
          formData.append(key, JSON.stringify(value))
        }
      })

      // Send the position title instead of the ID
      const selectedPosition = positions.find(pos => pos.id === data.position)
      if (selectedPosition) {
        formData.append('position', selectedPosition.title)
      }

      formData.append('name', `${data.firstName} ${data.lastName}`)
      formData.append('phoneNumber', data.phone)
      formData.append('location', data.location)

      const result = await execute(formData)

      if (result.success) {
        toast.success('Application submitted successfully')
        router.push('/careers/apply/thank-you')
      } else {
        setSubmitError(result.message || "An error occurred during submission")
        toast.error(result.message || "An error occurred during submission")
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred")
      toast.error("An unexpected error occurred")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    const isStepValid = await trigger(
      step === 1
        ? ["firstName", "lastName", "email", "phone"]
        : step === 2
        ? ["location", "cv", "hearAbout", "otherSource"]
        : ["position", "experience", "salary"]
    )
    if (isStepValid) setStep((prev) => Math.min(prev + 1, 3))
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
                  Upload CV/Resume (Optional)
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Final Details</h2>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>
              <InputField
                label="Salary Expectation"
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
      className="container mx-auto px-4 py-8 mt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6">Application Form</h1>
      {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`h-1 w-12 ${
                      step > i ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 ml-auto"
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 ml-auto disabled:bg-green-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <Send className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
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