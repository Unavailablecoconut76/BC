import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Upload,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ImageIcon,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const STORAGE_KEY = 'propertyTransactionForm';
const STAGES = [
  {
    id: 1,
    title: 'Due Diligence & Title Verification',
    description: 'Verify property details and title history',
  },
  {
    id: 2,
    title: 'Agreement to Sell',
    description: 'Draft and finalize the agreement',
  },
  {
    id: 3,
    title: 'Stamp Duty & Registration Fee',
    description: 'Calculate and pay stamp duty and registration fees',
  },
  {
    id: 4,
    title: 'Sale Deed Execution & Registration',
    description: 'Execute deed with witnesses and biometric authentication',
  },
  {
    id: 5,
    title: 'Possession Handover',
    description: 'Complete physical handover of property',
  },
  {
    id: 6,
    title: 'Mutation (Updating Revenue Records)',
    description: 'Update government revenue records',
  },
];

const VALIDATION_RULES = {
  1: {
    propertyName: { required: true, message: 'Property name is required' },
    propertyLocation: { required: true, message: 'Property location is required' },
    propertyArea: { required: true, message: 'Property area is required (in sq ft)' },
    titleHistoryDocument: { required: true, message: 'Title history document is required' },
    encumbrancesCheck: { required: true, message: 'Encumbrances status is required' },
    lawyerName: { required: true, message: 'Lawyer name is required' },
  },
  2: {
    sellerName: { required: true, message: 'Seller name is required' },
    sellerEmail: { required: true, pattern: 'email', message: 'Valid email is required' },
    sellerPhone: { required: true, pattern: 'phone', message: 'Valid phone number is required' },
    agreementDocument: { required: true, message: 'Agreement document is required' },
    paymentSchedule: { required: true, message: 'Payment schedule is required' },
    propertyPrice: { required: true, message: 'Property price is required' },
  },
  3: {
    stampDutyAmount: { required: true, message: 'Stamp duty amount is required' },
    paymentProof: { required: true, message: 'Payment proof is required' },
    registrationFees: { required: true, message: 'Registration fees amount is required' },
    tdsAmount: { required: true, message: 'TDS amount is required' },
    paymentStatus: { required: true, message: 'Payment status is required' },
  },
  4: {
    witness1Name: { required: true, message: 'Witness 1 name is required' },
    witness1IdImage: { required: true, message: 'Witness 1 ID image is required' },
    witness2Name: { required: true, message: 'Witness 2 name is required' },
    witness2IdImage: { required: true, message: 'Witness 2 ID image is required' },
    biometricStatus: { required: true, message: 'Biometric authentication status is required' },
    registrationCertificate: { required: true, message: 'Registration certificate is required' },
  },
  5: {
    handoverDate: { required: true, message: 'Handover date is required' },
    possessionStatus: { required: true, message: 'Possession status is required' },
    sellerConfirmation: { required: true, message: 'Seller confirmation is required' },
    handoverDocument: { required: true, message: 'Handover document is required' },
  },
  6: {
    patwariAssigned: { required: true, message: 'Patwari name is required' },
    applicationStatus: { required: true, message: 'Application status is required' },
    publicNoticeIssued: { required: true, message: 'Public notice status is required' },
    pattaIssuanceDate: { required: true, message: 'Patta issuance date is required' },
  },
};
//regex for various fields
const validateField = (fieldName, value, stageId) => {
  const rule = VALIDATION_RULES[stageId]?.[fieldName];
  if (!rule) return null;

  if (rule.required && (!value)) {
    return rule.message;
  }

  if (rule.pattern === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return rule.message;
    }
  }

  if (rule.pattern === 'phone' && value) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return rule.message;
    }
  }

  return null;
};

const validateStage = (formData, stageId) => {
  const rules = VALIDATION_RULES[stageId] || {};
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const error = validateField(field, formData[field] || '', stageId);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

const loadFormData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveFormData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save form data');
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StageProgressBar = ({ currentStage, completedStages }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STAGES.map((stage, idx) => {
          const isCompleted = completedStages.includes(stage.id);
          const isCurrent = stage.id === currentStage;

          return (
            <div key={stage.id} className="flex flex-col items-center flex-1">
              {/* Circle with number or checkmark */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  boxShadow: isCurrent
                    ? '0 0 0 4px rgba(16, 185, 129, 0.2)'
                    : 'none',
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-emerald-400 text-slate-900 border-2 border-emerald-500'
                    : 'bg-slate-700 text-slate-300 border-2 border-slate-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{stage.id}</span>
                )}
              </motion.div>

              {/* Stage title (mobile: hidden, desktop: visible) */}
              <p
                className={`text-xs font-medium mt-2 text-center max-w-[100px] hidden sm:block transition-colors ${
                  isCurrent ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {stage.title.split(' &')[0]}
              </p>

              {/* Connector line */}
              {idx < STAGES.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 mt-2 transition-colors ${
                    completedStages.includes(stage.id)
                      ? 'bg-emerald-500'
                      : 'bg-slate-700'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-slate-200 mb-2">
        {label}
        {required && <span className="text-emerald-400 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-all ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
              : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
          } focus:ring-2`}
          rows={3}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-white focus:outline-none transition-all appearance-none cursor-pointer ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
              : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
          } focus:ring-2`}
        >
          <option value="">Select an option</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === 'date' ? (
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-white focus:outline-none transition-all ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
              : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
          } focus:ring-2`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-all ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
              : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
          } focus:ring-2`}
        />
      )}

      {error && (
        <div className="flex items-center mt-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

const ImageUpload = ({ label, name, value, onChange, error, required = false }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        compressImage(event.target.result, (compressed) => {
        onChange({
          target: {
            name,
            value: {
              fileName: file.name,
              data: compressed,
            },
          },
        });
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          target: {
            name,
            value: {
              fileName: file.name,
              data: event.target.result,
            },
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const hasImage = value && typeof value === 'object' && value.data;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-200 mb-2">
        {label}
        {required && <span className="text-emerald-400 ml-1">*</span>}
      </label>

      {hasImage ? (
        <div className="relative">
          <img
            src={value.data}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-emerald-500/50"
          />
          <button
            onClick={() =>
              onChange({
                target: { name, value: null },
              })
            }
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <p className="text-xs text-slate-400 mt-2">
            {value.fileName || 'Image uploaded'}
          </p>
        </div>
      ) : (
        <>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-emerald-400 bg-emerald-400/10'
                : error
                ? 'border-red-500 bg-red-500/5'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
          >
            <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${
              dragActive ? 'text-emerald-400' : error ? 'text-red-400' : 'text-slate-400'
            }`} />
            <p className="text-slate-300 text-sm font-medium mb-1">
              Drag and drop your image here
            </p>
            <p className="text-slate-500 text-xs mb-3">or</p>
            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className="text-emerald-400 hover:text-emerald-300 text-sm font-medium cursor-pointer underline">
                Click to select
              </span>
            </label>
          </div>

          {error && (
            <div className="flex items-center mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ============================================================================
// STAGE FORM COMPONENTS
// ============================================================================

//i thinkk ye sbko hi viewing access rhega bs govt official ko hi edit/ modify access hoga
const Stage1Form = ({ formData, onFieldChange, errors }) => (
  <div>
    <FormInput
      label="Property Name"
      name="propertyName"
      placeholder="e.g., Silver Garden Apartments"
      value={formData.propertyName || ''}
      onChange={onFieldChange}
      error={errors.propertyName}
      required
    />
    <FormInput
      label="Property Location"
      name="propertyLocation"
      placeholder="e.g., Pune, Maharashtra"
      value={formData.propertyLocation || ''}
      onChange={onFieldChange}
      error={errors.propertyLocation}
      required
    />
    <FormInput
      label="Property Area (sq ft)"
      name="propertyArea"
      type="number"
      placeholder="e.g., 1200"
      value={formData.propertyArea || ''}
      onChange={onFieldChange}
      error={errors.propertyArea}
      required
    />
    <ImageUpload
      label="Title History Document"
      name="titleHistoryDocument"
      value={formData.titleHistoryDocument}
      onChange={onFieldChange}
      error={errors.titleHistoryDocument}
      required
    />

    {/* Custom section that appears only when title history document is uploaded */}
    {formData.titleHistoryDocument && (
      <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-slate-200">
            <h4 className="font-semibold text-emerald-400 mb-2">Document Upload Complete</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your title history document has been successfully uploaded and will be physically verified.
            </p>
            <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-700">
              <p className="text-xs text-slate-400">
                <strong>Next Steps:</strong> Once verified, you can proceed to the Agreement to Sell stage.
                Please ensure all other required fields in this stage are completed before moving forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}

    <FormInput
      label="Encumbrances Check"
      name="encumbrancesCheck"
      type="select"
      options={['No Encumbrances', 'With Encumbrances']}
      value={formData.encumbrancesCheck || ''}
      onChange={onFieldChange}
      error={errors.encumbrancesCheck}
      required
    />
    <FormInput
      label="Lawyer Name"
      name="lawyerName"
      placeholder="Enter assigned lawyer name"
      value={formData.lawyerName || ''}
      onChange={onFieldChange}
      error={errors.lawyerName}
      required
    />
  </div>
);

const Stage2Form = ({ formData, onFieldChange, errors }) => (
  <div>
    <FormInput
      label="Seller Name"
      name="sellerName"
      placeholder="Full name of the seller"
      value={formData.sellerName || ''}
      onChange={onFieldChange}
      error={errors.sellerName}
      required
    />
    <FormInput
      label="Seller Email"
      name="sellerEmail"
      type="email"
      placeholder="seller@example.com"
      value={formData.sellerEmail || ''}
      onChange={onFieldChange}
      error={errors.sellerEmail}
      required
    />
    <FormInput
      label="Seller Phone"
      name="sellerPhone"
      type="tel"
      placeholder="10-digit phone number"
      value={formData.sellerPhone || ''}
      onChange={onFieldChange}
      error={errors.sellerPhone}
      required
    />
    <ImageUpload
      label="Agreement Document"
      name="agreementDocument"
      value={formData.agreementDocument}
      onChange={onFieldChange}
      error={errors.agreementDocument}
      required
    />
    {formData.agreementDocument && (() => {
  const file = formData.agreementDocument;
  console.log(file.fileName);
  const isValid =
  file.fileName?.toLowerCase() === "real_aggrement.png" &&
  file.data?.startsWith("data:image/png");

  return isValid ? (
    <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
      <div className="flex items-start space-x-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />

        <div className="text-slate-200">
          <h4 className="font-semibold text-emerald-400 mb-2">
            Document Verification Complete
          </h4>

          <p className="text-sm text-slate-300 leading-relaxed">
            Your agreement document has been successfully uploaded and is being processed.
          </p>

          <br />

          <div>
            Extracted info:
            <ul className="list-disc list-inside">
              <li>Vendor: {"M/s Apex Space Corporation"} PAN: {"ACVPK1234F"}</li>
              <li>Vendee: {"MR. RAJESH KUMAR SHARMA"} PAN: {"AXDPS4567B"}</li>
              <li>Price: {formData.propertyLocation}</li>
              <li>Property Area (sq ft): {formData.propertyArea}</li>
            </ul>
          </div>

          <br />

          <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-700">
            <p className="text-xs text-slate-400">
              <strong>Next Steps:</strong> Once verified, proceed to Agreement to Sell.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
      <p className="text-sm text-red-400">
        Wrong file/Wrong details. Kindly check with the official
      </p>
    </div>
  );
})()}
    <FormInput
      label="Payment Schedule"
      name="paymentSchedule"
      type="textarea"
      placeholder="e.g., 50% on agreement, 50% on completion"
      value={formData.paymentSchedule || ''}
      onChange={onFieldChange}
      error={errors.paymentSchedule}
      required
    />
    <FormInput
      label="Property Price (in ETH)"
      name="propertyPrice"
      type="number"
      placeholder="e.g., 25"
      value={formData.propertyPrice || ''}
      onChange={onFieldChange}
      error={errors.propertyPrice}
      required
    />
  </div>
);
//only the govt official has access to this
const Stage3Form = ({ formData, onFieldChange, errors }) => (
  <div>
    <FormInput
      label="Stamp Duty Amount (in ₹)"
      name="stampDutyAmount"
      type="number"
      placeholder="e.g., 75000"
      value={formData.stampDutyAmount || ''}
      onChange={onFieldChange}
      error={errors.stampDutyAmount}
      required
    />
    <ImageUpload
      label="Payment Proof"
      name="paymentProof"
      value={formData.paymentProof}
      onChange={onFieldChange}
      error={errors.paymentProof}
      required
    />
    <FormInput
      label="Registration Fees (1% of property value)"
      name="registrationFees"
      type="number"
      placeholder="e.g., 25000"
      value={formData.registrationFees || ''}
      onChange={onFieldChange}
      error={errors.registrationFees}
      required
    />
    <FormInput
      label="TDS Amount (₹50 lakhs)"
      name="tdsAmount"
      type="number"
      placeholder="e.g., 5000000"
      value={formData.tdsAmount || ''}
      onChange={onFieldChange}
      error={errors.tdsAmount}
      required
    />
    <FormInput
      label="Payment Status"
      name="paymentStatus"
      type="select"
      options={['Pending', 'Completed', 'Partially Paid']}
      value={formData.paymentStatus || ''}
      onChange={onFieldChange}
      error={errors.paymentStatus}
      required
    />
  </div>
);

const Stage4Form = ({ formData, onFieldChange, errors }) => (
  <div>
    <div className="border-l-4 border-emerald-500 pl-4 mb-6 bg-slate-800/50 py-3 px-4 rounded">
      <p className="text-slate-300 text-sm">
        <span className="font-semibold text-emerald-400">Witness 1 Details</span>
      </p>
    </div>
    <FormInput
      label="Witness 1 Name"
      name="witness1Name"
      placeholder="Full name"
      value={formData.witness1Name || ''}
      onChange={onFieldChange}
      error={errors.witness1Name}
      required
    />
    <ImageUpload
      label="Witness 1 - ID Image"
      name="witness1IdImage"
      value={formData.witness1IdImage}
      onChange={onFieldChange}
      error={errors.witness1IdImage}
      required
    />

    <div className="border-l-4 border-emerald-500 pl-4 mb-6 bg-slate-800/50 py-3 px-4 rounded mt-6">
      <p className="text-slate-300 text-sm">
        <span className="font-semibold text-emerald-400">Witness 2 Details</span>
      </p>
    </div>
    <FormInput
      label="Witness 2 Name"
      name="witness2Name"
      placeholder="Full name"
      value={formData.witness2Name || ''}
      onChange={onFieldChange}
      error={errors.witness2Name}
      required
    />
    <ImageUpload
      label="Witness 2 - ID Image"
      name="witness2IdImage"
      value={formData.witness2IdImage}
      onChange={onFieldChange}
      error={errors.witness2IdImage}
      required
    />

    <div className="border-l-4 border-emerald-500 pl-4 mb-6 bg-slate-800/50 py-3 px-4 rounded mt-6">
      <p className="text-slate-300 text-sm">
        <span className="font-semibold text-emerald-400">Biometric & Registration</span>
      </p>
    </div>
    <FormInput
      label="Biometric Authentication Status"
      name="biometricStatus"
      type="select"
      options={['Verified', 'Pending', 'Failed']}
      value={formData.biometricStatus || ''}
      onChange={onFieldChange}
      error={errors.biometricStatus}
      required
    />
    <ImageUpload
      label="Registration Certificate"
      name="registrationCertificate"
      value={formData.registrationCertificate}
      onChange={onFieldChange}
      error={errors.registrationCertificate}
      required
    />
    {formData.registrationCertificate && (
      <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-slate-200">
            <h4 className="font-semibold text-emerald-400 mb-2">Document Verification Complete</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your title history document has been successfully uploaded and is being processed.
              Our verification team will review the document within 24-48 hours. You will receive
              a notification once the verification is complete and the property details are confirmed.
            </p>
            <br />
            <div>
              Extracted info: 
              <ul className="list-disc list-inside">

                <li>Vendor: {"M/s Apex Space Corporation"} PAN: {"ACVPK1234F"}</li>
                <li>Vendee: {"MR. RAJESH KUMAR SHARMA"} PAN: {"AXDPS4567B"}</li>
                <li>Vendee: {"MRS. SUNITA RAJESH SHARMA"} PAN: {"AYTPK9876C"}</li>
                <li>Date: 25-09-24</li>
                <li>Property Location: {formData.propertyLocation}</li>
                <li>Property Area (sq ft): {formData.propertyArea}</li>

              </ul>
            </div>
            <br />
            <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-700">
              <p className="text-xs text-slate-400">
                <strong>Next Steps:</strong> Once verified, you can proceed to the Agreement to Sell stage.
                Please ensure all other required fields in this stage are completed before moving forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

const Stage5Form = ({ formData, onFieldChange, errors }) => (
  <div>
    <FormInput
      label="Handover Date"
      name="handoverDate"
      type="date"
      value={formData.handoverDate || ''}
      onChange={onFieldChange}
      error={errors.handoverDate}
      required
    />
    <FormInput
      label="Possession Status"
      name="possessionStatus"
      type="select"
      options={['Pending', 'In Progress', 'Completed']}
      value={formData.possessionStatus || ''}
      onChange={onFieldChange}
      error={errors.possessionStatus}
      required
    />
    <div className="mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="sellerConfirmation"
          checked={formData.sellerConfirmation || false}
          onChange={(e) =>
            onFieldChange({
              target: { name: 'sellerConfirmation', value: e.target.checked },
            })
          }
          className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
        />
        <span className="ml-2 text-slate-300">
          We confirm the property handover has been completed
          <span className="text-emerald-400 ml-1">*</span>
        </span>
      </label>
      {errors.sellerConfirmation && (
        <div className="flex items-center mt-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors.sellerConfirmation}
        </div>
      )}
    </div>
    <ImageUpload
      label="Handover Document"
      name="handoverDocument"
      value={formData.handoverDocument}
      onChange={onFieldChange}
      error={errors.handoverDocument}
      required
    />
  </div>
);

const Stage6Form = ({ formData, onFieldChange, errors }) => (
  <div>
    <FormInput
      label="Patwari Assigned"
      name="patwariAssigned"
      placeholder="Name of the assigned Patwari (official)"
      value={formData.patwariAssigned || ''}
      onChange={onFieldChange}
      error={errors.patwariAssigned}
      required
    />
    <FormInput
      label="Application Status"
      name="applicationStatus"
      type="select"
      options={['Submitted', 'Under Review', 'Verified', 'Completed']}
      value={formData.applicationStatus || ''}
      onChange={onFieldChange}
      error={errors.applicationStatus}
      required
    />
    <FormInput
      label="Public Notice Issued"
      name="publicNoticeIssued"
      type="select"
      options={['Yes', 'No', 'Pending']}
      value={formData.publicNoticeIssued || ''}
      onChange={onFieldChange}
      error={errors.publicNoticeIssued}
      required
    />
    <FormInput
      label="Physical Verification Status"
      name="physicalVerificationStatus"
      type="select"
      options={['Pending', 'In Progress', 'Verified']}
      value={formData.physicalVerificationStatus || ''}
      onChange={onFieldChange}
    />
    <FormInput
      label="Patta Issuance Date"
      name="pattaIssuanceDate"
      type="date"
      value={formData.pattaIssuanceDate || ''}
      onChange={onFieldChange}
      error={errors.pattaIssuanceDate}
      required
    />
  </div>
);

const stageFormMap = {
  1: Stage1Form,
  2: Stage2Form,
  3: Stage3Form,
  4: Stage4Form,
  5: Stage5Form,
  6: Stage6Form,
};

// ============================================================================
// MAIN PROGRESS COMPONENT
// ============================================================================

export default function Progress() {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState(loadFormData());
  const [completedStages, setCompletedStages] = useState([]);
  const [errors, setErrors] = useState({});
  const [showEditWarning, setShowEditWarning] = useState(false);
  const [targetEditStage, setTargetEditStage] = useState(null);

  // Validate current stage and disable next button if invalid
  const validateCurrentStage = () => {
    const stageErrors = validateStage(formData, currentStage);
    setErrors(stageErrors);
    return Object.keys(stageErrors).length === 0;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    try {
      saveFormData(updatedData);
    } catch (e) {
      console.warn("Storage failed, continuing without persistence");
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleNextStage = () => {
    if (validateCurrentStage()) {
      const newCompleted = Array.from(
        new Set([...completedStages, currentStage])
      );
      setCompletedStages(newCompleted);

      if (currentStage < STAGES.length) {
        setCurrentStage(currentStage + 1);
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePreviousStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStageSelect = (stageId) => {
    if (stageId === currentStage) return;

    if (stageId < currentStage && completedStages.includes(stageId)) {
      setShowEditWarning(true);
      setTargetEditStage(stageId);
    } else if (stageId > currentStage && !completedStages.includes(currentStage)) {
      return; // Can't jump to future stages without completing current
    } else {
      setCurrentStage(stageId);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const confirmEdit = () => {
    setCurrentStage(targetEditStage);
    setErrors({});
    setShowEditWarning(false);
    setTargetEditStage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const CurrentForm = stageFormMap[currentStage];
  const stage = STAGES.find((s) => s.id === currentStage);

  return (
    <div className="min-h-screen bg-slate-900 from-slate-900 via-slate-900 to-slate-800 text-white p-4 sm:p-8">
      {/* Edit Warning Modal */}
      <AnimatePresence>
        {showEditWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md"
            >
              <AlertCircle className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Edit Previous Stage?</h3>
              <p className="text-slate-300 text-sm mb-6">
                Editing a previous stage may affect the data in later stages. Are
                you sure you want to continue?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditWarning(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEdit}
                  className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
                >
                  Edit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-emerald-400">
            Property Transaction Process
          </h1>
          <p className="text-slate-400">
            Complete each stage to proceed through the 6-stage property transfer pipeline
          </p>
        </div>

        {/* Progress Bar */}
        <StageProgressBar currentStage={currentStage} completedStages={completedStages} />

        {/* Stage Card */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 mb-8 backdrop-blur-sm"
        >
          {/* Stage Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">
              Stage {stage.id}: {stage.title}
            </h2>
            <p className="text-slate-400">{stage.description}</p>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            <CurrentForm
              formData={formData}
              onFieldChange={handleFieldChange}
              errors={errors}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8 border-t border-slate-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePreviousStage}
              disabled={currentStage === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStage === 1
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>

            <div className="flex-1" />

            {currentStage < STAGES.length ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStage}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-all text-white"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 font-medium">
                {/* <Check className="w-5 h-5" />
                All Stages Completed! */}
                <button type='submit'>
                  Initiate Transfer
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stage Summary Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>
            Stage {currentStage} of {STAGES.length}
            {completedStages.length > 0 && (
              <span className="ml-4 text-emerald-400">
                ✓ {completedStages.length} stage{completedStages.length !== 1 ? 's' : ''} completed
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
