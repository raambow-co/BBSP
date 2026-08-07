import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, X, FileText, CreditCard, Lock, Check, Loader2, UploadCloud, ImageIcon } from 'lucide-react';
 
interface PartnershipCTAProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
  currentPath?: string;
}
 
export const PartnershipCTA: React.FC<PartnershipCTAProps> = ({
  isModalOpen,
  onCloseModal,
  onOpenModal,
  currentPath = ''
}) => {
  const [step, setStep] = useState(1);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    category: 'solar',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleNextStep1 = () => {
    if (policyAccepted && termsAccepted) {
      setStep(2);
    }
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number (10+ digits)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep2 = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmitRegistration = async () => {
    if (!screenshot) {
      alert('Please upload a screenshot of your payment.');
      return;
    }

    setSubmitLoading(true);

    try {
      // Helper function to read file as base64
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64String = await fileToBase64(screenshot);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        category: formData.category,
        attachmentBase64: base64String,
        attachmentName: screenshot.name,
        attachmentType: screenshot.type,
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionId('reg_' + Math.random().toString(36).substr(2, 9));
        setSubmitSuccess(true);
      } else {
        console.error('Submission failed', data);
        alert('Failed to submit registration. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setPolicyAccepted(false);
    setTermsAccepted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      businessName: '',
      category: 'solar',
    });
    setFormErrors({});
    setScreenshot(null);
    setSubmitLoading(false);
    setSubmitSuccess(false);
    setSubmissionId('');
    onCloseModal();
  };

  const categories = [
    { id: 'solar', name: 'Solar & Renewable Energy' },
    { id: 'loans', name: 'Loans & MSME Credit' },
    { id: 'real-estate', name: 'Real Estate & Infrastructure' },
    { id: 'education', name: 'EduTech & Vocational' }
  ];
 
  return (
    <>
      {/* SECTION 6 — CTA BANNER */}
      <section className="py-12 relative bg-grid-pattern overflow-hidden bg-[#FAF9F6] border-b border-stone-200">
        <div className="container-custom relative z-10">
          <div className="bg-[#FFFFFF] rounded-2xl p-8 sm:p-14 border border-stone-200 text-center relative overflow-hidden shadow-2xl glass-panel shadow-md">
            
            {/* Background subtle highlights */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D57530]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D57530]/5 rounded-full blur-3xl pointer-events-none" />
 
            {currentPath === '/loans' ? (
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 bg-stone-100 border border-stone-200 mb-6 rounded-full subheading-font shadow-sm">
                  <span>RBI-COMPLIANT CREDIT SERVICES</span>
                </div>
 
                <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-wide mb-3 uppercase leading-tight">
                  Ready to grow your business?
                </h2>
 
                <p className="text-xl sm:text-2xl font-bold gradient-gold heading-font mb-6">
                  Apply for BuildBharat Loans today.
                </p>
 
                <p className="text-stone-650 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
                  Unlock competitive rates, flexible repayment structures, and streamlined digital approvals tailored to your infrastructure or business needs.
                </p>
 
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onOpenModal}
                    className="bg-[#10367D] hover:bg-[#10367D]/95 text-white w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-md border border-[#10367D]"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={16} />
                  </button>
 
                  <button
                    onClick={() => {
                      window.location.href = 'tel:+919353018855';
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold shadow-sm"
                  >
                    <span>Talk to an Advisor</span>
                  </button>
                </div>
              </div>
            ) : (currentPath === '/solar' || currentPath === '/sriram-solar') ? (
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 bg-stone-100 border border-stone-200 mb-6 rounded-full subheading-font shadow-sm">
                  <span>MNRE EMPANELLED SOLAR PROVIDER</span>
                </div>
 
                <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-wide mb-3 uppercase leading-tight text-center">
                  Ready to go solar?
                </h2>
 
                <p className="text-xl sm:text-2xl font-bold gradient-gold heading-font mb-6 text-center">
                  Get your free site survey today.
                </p>
 
                <p className="text-stone-650 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal text-center">
                  Our certified engineers will analyze your roof space, sun path, and monthly utility bills to design a custom high-yield solar PV system with a guaranteed 25-year panel warranty.
                </p>
 
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onOpenModal}
                    className="bg-[#10367D] hover:bg-[#10367D]/95 text-white w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-md border border-[#10367D]"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight size={16} />
                  </button>
 
                  <button
                    onClick={() => {
                      window.location.href = 'tel:+919353018855';
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold shadow-sm"
                  >
                    <span>Talk to an Advisor</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 bg-stone-100 border border-stone-200 mb-6 rounded-full subheading-font shadow-sm">
                  <span>BUILD BHARAT SYNERGY NETWORK</span>
                </div>
 
                <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-wide mb-3 uppercase leading-tight">
                  “Build something bigger.”
                </h2>
 
                <p className="text-xl sm:text-2xl font-bold gradient-gold heading-font mb-6">
                  Find your path. Build your future.
                </p>
 
                <p className="text-stone-650 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
                  Whether you are seeking sustainable solar power, financial credit, property investment, or tech upskilling—Build Bharat connects you with specialized enterprise partners under one trustworthy ecosystem.
                </p>
 
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <button
                    onClick={onOpenModal}
                    className="btn-gold w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-1.5 animate-pulse"
                  >
                    <span>Partner With Us</span>
                    <ArrowRight size={16} />
                  </button>
 
                  <button
                    onClick={() => {
                      const el = document.getElementById('pathways');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold shadow-sm"
                  >
                    <span>Explore Pathways</span>
                  </button>
                </div>

                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-stone-200 max-w-4xl mx-auto bg-white p-2">
                  <iframe 
                    src="https://maps.google.com/maps?q=17.320444,78.627167&hl=en&z=15&output=embed" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Build Bharat Synergy Partners Location"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PARTNER ONBOARDING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn text-left">
          <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-2xl border border-stone-200 p-6 sm:p-8 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh] glass-panel">
            
            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-6 right-6 text-stone-500 hover:text-stone-900 bg-stone-100 p-2 border border-stone-200 transition-all cursor-pointer rounded-full z-10"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {submitSuccess ? (
              <div className="text-center py-10 flex flex-col items-center justify-center overflow-y-auto">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-500/20 rounded-full animate-bounce">
                  <CheckCircle2 size={42} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 heading-font mb-3 uppercase tracking-wide">
                  Welcome to the Ecosystem!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. Your details and payment screenshot have been sent for verification. Our team will contact you shortly!
                </p>
                
                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 w-full max-w-md text-left mb-8 text-xs space-y-2">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-400 font-medium uppercase tracking-wider">Submission ID</span>
                    <span className="font-mono font-bold text-stone-905">{submissionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-medium uppercase tracking-wider">Contact Email</span>
                    <span className="font-bold text-stone-905">{formData.email}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-[#10367D] hover:bg-[#10367D]/90 text-white text-xs rounded-full px-8 py-3.5 uppercase font-bold tracking-wider cursor-pointer transition-all shadow-md"
                >
                  Finish & Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Header */}
                <div className="mb-4 pr-8">
                  <div className="flex items-center gap-2 text-[#10367D] text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck size={14} />
                    <span>Synergy Partner Registration</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-905 heading-font uppercase tracking-wider">
                    Partner With Us
                  </h3>
                </div>

                {/* Stepper Progress Bar */}
                <div className="mb-6 select-none shrink-0">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider font-extrabold text-stone-400 mb-2">
                    <span className={step >= 1 ? 'text-[#10367D]' : ''}>1. Privacy & Terms</span>
                    <span className={step >= 2 ? 'text-[#10367D]' : ''}>2. Details</span>
                    <span className={step >= 3 ? 'text-[#10367D]' : ''}>3. Connect / Pay</span>
                  </div>
                  <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#10367D] transition-all duration-350"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Step Contents */}
                <div className="flex-grow overflow-y-auto pr-1 mb-6">
                  
                  {/* STEP 1: Policies and Terms */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        To maintain the high professional standard and compliance of our B2B matching and credit platform, all new entities must read and explicitly accept our standard operational guidelines and policies.
                      </p>
                      
                      {/* Scrollable Policy Box */}
                      <div className="border border-stone-200 rounded-xl bg-stone-50/50 p-4 max-h-64 overflow-y-auto text-xs space-y-4">
                        <div>
                          <h4 className="font-bold text-stone-900 uppercase tracking-wide mb-3 flex items-center gap-1.5 border-b border-stone-200 pb-2">
                            <FileText size={14} className="text-[#10367D]" /> Synergy Network Terms & Policies
                          </h4>
                          <ul className="space-y-2 text-stone-600 list-disc pl-4 leading-relaxed font-normal">
                            <li>Become a part of the Build Bharat Synergy Partners network.</li>
                            <li>Access multiple business opportunities through a single membership.</li>
                            <li>Earn commissions by referring customers to our services.</li>
                            <li>Partner across Solar, Real Estate, Loan Services, and EdTech.</li>
                            <li>Receive a unique Member ID after successful registration.</li>
                            <li>Get your own Referral Code to track your referrals and earnings.</li>
                            <li>Access your Partner Dashboard to monitor commissions and activities.</li>
                            <li>There is no limit on the number of referrals you can make.</li>
                            <li>Commissions are paid based on the applicable commission structure for each business category.</li>
                            <li>Each successful referral is recorded and processed transparently.</li>
                            <li>Partners are expected to conduct business ethically and professionally.</li>
                            <li>Membership is valid for a period of five (5) years from the date of activation.</li>
                            <li>A one-time membership fee of ₹5,000 is required to activate your partner account.</li>
                            <li>The membership fee is paid only once during the membership period.</li>
                            <li>If a partner is unable to complete even a single successful transaction during the five-year membership period, the ₹5,000 membership fee will be eligible for refund, subject to the company’s Terms & Conditions.</li>
                            <li>Refund requests will be processed only after the completion of the five-year membership period.</li>
                            <li>Build Bharat Synergy Partners reserves the right to modify partner benefits, commission structures, and policies whenever required.</li>
                            <li>By registering as a partner, you acknowledge and agree to comply with all applicable Terms & Conditions and company policies.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Policy Checkboxes */}
                      <div className="space-y-3 pt-2">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={policyAccepted}
                            onChange={(e) => setPolicyAccepted(e.target.checked)}
                            className="mt-1 rounded border-stone-300 text-[#10367D] focus:ring-[#10367D] h-4 w-4"
                          />
                          <span className="text-xs text-stone-650 leading-relaxed group-hover:text-stone-900 transition-colors">
                            I read, understand, and agree to the <strong>Privacy Policy</strong> and allow BuildBharat to securely store and process my business metrics.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-1 rounded border-stone-300 text-[#10367D] focus:ring-[#10367D] h-4 w-4"
                          />
                          <span className="text-xs text-stone-650 leading-relaxed group-hover:text-stone-900 transition-colors">
                            I agree to the <strong>Ecosystem Membership Terms</strong> and represent that all documentation and information provided are complete and correct.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Fill Details */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-stone-600 text-xs leading-relaxed">
                        Provide the primary details for your organization profile. These will be used for onboarding verification and connection records.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Sudheer Kumar"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none transition-colors"
                          />
                          {formErrors.fullName && <span className="text-[10px] text-red-500 font-medium mt-1 block">{formErrors.fullName}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                            Business Name / Organization
                          </label>
                          <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            placeholder="e.g. Sri Ram Solar Hub"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none transition-colors"
                          />
                          {formErrors.email && <span className="text-[10px] text-red-500 font-medium mt-1 block">{formErrors.email}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                            Phone Number (10+ digits) *
                          </label>
                          <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +91 93530 18855"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none transition-colors"
                          />
                          {formErrors.phone && <span className="text-[10px] text-red-500 font-medium mt-1 block">{formErrors.phone}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: QR Payment & Screenshot Upload */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-center space-y-4">
                        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                          Ecosystem Membership Fee
                        </h4>
                        
                        <div className="space-y-1">
                          <div className="text-3xl sm:text-4xl font-black text-stone-905 heading-font">
                            ₹5,000<span className="text-xs font-medium text-stone-500"> / one-time</span>
                          </div>
                          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                            Scan the QR code below to pay
                          </p>
                        </div>
                        
                        <div className="py-4">
                          <img 
                            src="/bbsp-qr.png" 
                            alt="Payment QR Code" 
                            className="w-full max-w-[280px] mx-auto rounded-xl border border-stone-200 shadow-sm"
                          />
                        </div>

                        <div className="border-t border-stone-200/60 pt-4 text-left text-xs space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <ImageIcon size={14} className="text-[#10367D]" />
                              Upload Payment Screenshot *
                            </label>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setScreenshot(e.target.files[0]);
                                }
                              }}
                              className="w-full text-stone-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#10367D]/10 file:text-[#10367D] hover:file:bg-[#10367D]/20 cursor-pointer border border-stone-200 rounded-xl p-1 bg-white"
                            />
                            {screenshot && (
                              <p className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 size={12} /> Screenshot selected: {screenshot.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200 shrink-0">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(prev => prev - 1)}
                      disabled={submitLoading}
                      className="bg-stone-100 hover:bg-stone-200 disabled:opacity-50 text-stone-850 border border-stone-200 rounded-full px-5 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === 1 && (
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      disabled={!policyAccepted || !termsAccepted}
                      className="bg-[#10367D] hover:bg-[#10367D]/95 disabled:opacity-50 text-white rounded-full px-6 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto"
                    >
                      <span>Accept & Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="bg-[#10367D] hover:bg-[#10367D]/95 text-white rounded-full px-6 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto"
                    >
                      <span>Save & Proceed</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="button"
                      onClick={handleSubmitRegistration}
                      disabled={submitLoading || !screenshot}
                      className="bg-[#E2B049] hover:bg-[#c99b38] disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-black transition-all ml-auto shadow-md"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={14} />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud size={14} />
                          <span>Submit Registration</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default PartnershipCTA;
