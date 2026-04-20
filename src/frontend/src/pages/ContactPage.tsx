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
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Instagram,
  Mail,
  MessageCircle,
  Paperclip,
  Send,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import {
  type SubmitInquiryPayload,
  useSubmitInquiry,
} from "../hooks/useQueries";

interface FormFields {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  deadline: string;
  description: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  deadline?: string;
  description?: string;
}

const initialForm: FormFields = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  deadline: "",
  description: "",
  file: null,
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(form: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(form.email))
    errors.email = "Enter a valid email address.";
  if (!form.projectType) errors.projectType = "Please select a project type.";
  if (!form.budget) errors.budget = "Please select a budget range.";
  if (!form.deadline) errors.deadline = "Please provide a deadline.";
  if (!form.description.trim())
    errors.description = "Please describe your project.";
  return errors;
}

export function ContactPage() {
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: submitInquiry, isPending } = useSubmitInquiry();

  function handleChange(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({
        ...prev,
        [field]: newErrors[field as keyof FormErrors],
      }));
    }
  }

  function handleBlur(field: keyof FormErrors) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, file }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(initialForm).map((k) => [k, true]),
    );
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload: SubmitInquiryPayload = {
      name: form.name,
      email: form.email,
      projectType: form.projectType,
      budget: form.budget,
      deadline: form.deadline,
      description: form.description,
    };

    await submitInquiry(payload);
    setSubmitted(true);
    setForm(initialForm);
    setTouched({});
    setErrors({});
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="contact.page">
      {/* Page Header */}
      <section className="bg-card border-b py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            className="text-label text-primary mb-3"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            Get In Touch
          </motion.p>
          <motion.h1
            className="text-heading-lg text-foreground mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            Start Your Project
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tell us about your project and we'll get back to you within 24
            hours.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center py-20 text-center gap-5 rounded-2xl bg-card border border-border"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2
                    className="w-14 h-14 text-primary"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h2 className="text-heading-md text-foreground mb-2">
                      Message Sent!
                    </h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Thanks for reaching out. We'll review your project details
                      and be in touch within 24 hours.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    data-ocid="contact.secondary_button"
                    className="mt-2 transition-smooth"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm"
                  data-ocid="contact.form"
                >
                  {/* Name + Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-name"
                        className="text-foreground font-medium"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`transition-smooth focus-visible:ring-2 focus-visible:ring-primary ${errors.name ? "border-destructive" : ""}`}
                        data-ocid="contact.name.input"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p
                          className="text-destructive text-sm flex items-center gap-1"
                          data-ocid="contact.name.field_error"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-email"
                        className="text-foreground font-medium"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={`transition-smooth focus-visible:ring-2 focus-visible:ring-primary ${errors.email ? "border-destructive" : ""}`}
                        data-ocid="contact.email.input"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p
                          className="text-destructive text-sm flex items-center gap-1"
                          data-ocid="contact.email.field_error"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Project Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.projectType}
                      onValueChange={(v) => {
                        handleChange("projectType", v);
                        handleBlur("projectType");
                      }}
                    >
                      <SelectTrigger
                        className={`transition-smooth focus:ring-2 focus:ring-primary ${errors.projectType ? "border-destructive" : ""}`}
                        data-ocid="contact.project_type.select"
                      >
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Graphic Design">
                          Graphic Design
                        </SelectItem>
                        <SelectItem value="Video Editing">
                          Video Editing
                        </SelectItem>
                        <SelectItem value="Website Development">
                          Website Development
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && (
                      <p
                        className="text-destructive text-sm flex items-center gap-1"
                        data-ocid="contact.project_type.field_error"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  {/* Budget + Deadline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-foreground font-medium">
                        Budget <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={form.budget}
                        onValueChange={(v) => {
                          handleChange("budget", v);
                          handleBlur("budget");
                        }}
                      >
                        <SelectTrigger
                          className={`transition-smooth focus:ring-2 focus:ring-primary ${errors.budget ? "border-destructive" : ""}`}
                          data-ocid="contact.budget.select"
                        >
                          <SelectValue placeholder="Select budget range..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Under $500">Under $500</SelectItem>
                          <SelectItem value="$500–$1,000">
                            $500–$1,000
                          </SelectItem>
                          <SelectItem value="$1,000–$2,500">
                            $1,000–$2,500
                          </SelectItem>
                          <SelectItem value="$2,500+">$2,500+</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.budget && (
                        <p
                          className="text-destructive text-sm flex items-center gap-1"
                          data-ocid="contact.budget.field_error"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.budget}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-deadline"
                        className="text-foreground font-medium"
                      >
                        Deadline <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-deadline"
                        type="date"
                        value={form.deadline}
                        onChange={(e) =>
                          handleChange("deadline", e.target.value)
                        }
                        onBlur={() => handleBlur("deadline")}
                        className={`transition-smooth focus-visible:ring-2 focus-visible:ring-primary ${errors.deadline ? "border-destructive" : ""}`}
                        data-ocid="contact.deadline.input"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.deadline && (
                        <p
                          className="text-destructive text-sm flex items-center gap-1"
                          data-ocid="contact.deadline.field_error"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.deadline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-description"
                      className="text-foreground font-medium"
                    >
                      Project Description{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="contact-description"
                      placeholder="Tell us about your project goals, target audience, and any specific requirements..."
                      rows={5}
                      value={form.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      onBlur={() => handleBlur("description")}
                      className={`resize-none transition-smooth focus-visible:ring-2 focus-visible:ring-primary ${errors.description ? "border-destructive" : ""}`}
                      data-ocid="contact.description.textarea"
                    />
                    {errors.description && (
                      <p
                        className="text-destructive text-sm flex items-center gap-1"
                        data-ocid="contact.description.field_error"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Attachments
                    </Label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-3 w-full border border-dashed border-input rounded-xl px-4 py-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-smooth group text-left"
                      data-ocid="contact.upload_button"
                      aria-label="Upload file attachment"
                    >
                      <Paperclip className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth flex-shrink-0" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth min-w-0 truncate">
                        {form.file
                          ? form.file.name
                          : "Attach files (images, PDFs, docs)"}
                      </span>
                      {form.file && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setForm((prev) => ({ ...prev, file: null }));
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className="ml-auto text-muted-foreground hover:text-destructive transition-smooth text-xs flex-shrink-0"
                          aria-label="Remove file"
                        >
                          Remove
                        </button>
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      data-ocid="contact.file.input"
                      aria-label="File upload input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted: JPG, PNG, PDF, DOC, DOCX, TXT
                    </p>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto gap-2 transition-smooth"
                      data-ocid="contact.submit_button"
                      size="lg"
                    >
                      {isPending ? (
                        <>
                          <span
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                            data-ocid="contact.loading_state"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              data-ocid="contact.sidebar"
            >
              {/* Quick Contact */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-display text-lg text-foreground mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/1234567890?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 bg-green-600 text-white font-semibold hover:brightness-110 transition-smooth shadow-sm"
                    data-ocid="contact.whatsapp_button"
                    aria-label="Chat on WhatsApp"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hello@cutiepi.studio"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 text-foreground transition-smooth group"
                    data-ocid="contact.email_link"
                  >
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth flex-shrink-0" />
                    <span className="text-sm font-medium min-w-0 truncate">
                      hello@cutiepi.studio
                    </span>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-display font-semibold text-foreground text-sm mb-1">
                      Fast Response
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We review all inquiries within{" "}
                      <strong className="text-foreground">24 hours</strong> and
                      aim to respond on the same business day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-display text-sm font-semibold text-foreground mb-4">
                  Follow Our Work
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://instagram.com/cutiepi.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-smooth group"
                    data-ocid="contact.instagram_link"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
                      @cutiepi.studio
                    </span>
                  </a>
                  <a
                    href="https://twitter.com/cutiepi_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-smooth group"
                    data-ocid="contact.twitter_link"
                    aria-label="Twitter / X"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
                      @cutiepi_studio
                    </span>
                  </a>
                </div>
              </div>

              {/* Studio Details */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
                <h3 className="text-display text-sm font-semibold text-foreground">
                  Studio
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're a remote-first creative studio working with clients
                  globally. All projects are handled digitally with seamless
                  communication.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Graphic Design", "Visual Identity", "Brand Strategy"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
