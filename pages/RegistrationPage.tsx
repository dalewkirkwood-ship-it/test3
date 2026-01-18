import React, { useState } from 'react';
import { SDE_ORGANISATIONS } from '../constants';
import { User, Mail, Briefcase, Clock, Tag, Award, Building2, CheckCircle, X, Lock, MapPin } from 'lucide-react';

export const RegistrationPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    organisation: '',
    ics: '',
    localAffiliation: '',
    isPrimaryAffiliation: false,
    jobTitle: '',
    bandGrade: '',
    contractedTime: '',
    isDirectoryOptIn: false,
    agreeTerms: false,
  });
  
  // Skills State
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 10) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and privacy policy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Simulation of API call
    setTimeout(() => {
        setIsSubmitted(true);
        window.scrollTo(0,0);
    }, 600);
  };

  if (isSubmitted) {
    return (
        <div className="max-w-2xl mx-auto py-12 px-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Registration Complete</h2>
            <p className="text-lg text-slate-600 mb-8">
                Thank you, <strong>{formData.firstName}</strong>. Your profile has been created successfully. 
                You will receive a confirmation email at <strong>{formData.email}</strong> shortly.
            </p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-left max-w-md mx-auto">
                <h3 className="font-semibold text-slate-800 mb-2">Next Steps:</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Check your email to verify your account.</li>
                    <li>Complete your profile in the User Dashboard.</li>
                    <li>Browse the PPIE directory to connect with peers.</li>
                </ul>
            </div>
            <button 
                onClick={() => window.location.reload()}
                className="mt-8 text-blue-600 hover:text-blue-800 font-medium"
            >
                Register another user
            </button>
        </div>
    );
  }

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                <User className="mr-3 h-6 w-6 text-blue-600" />
                PPIE Professional Registration
            </h1>
            <p className="text-slate-500 mt-2">
                Join the national network of Patient and Public Involvement and Engagement professionals.
            </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Section: Personal Details */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Surname <span className="text-red-500">*</span></label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={formData.surname}
                            onChange={(e) => setFormData({...formData, surname: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Professional Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input 
                            required
                            type="email" 
                            placeholder="name@organisation.nhs.uk"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            {/* Section: Account Security */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Account Security
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                required
                                type="password" 
                                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Repeat Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                required
                                type="password" 
                                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                </div>
            </div>

            {/* Section: Professional Role */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Professional Role & Affiliation
                </h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Secure Data Environment (SDE) <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <select 
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                            value={formData.organisation}
                            onChange={(e) => setFormData({...formData, organisation: e.target.value})}
                        >
                            <option value="">Select SDE...</option>
                            {SDE_ORGANISATIONS.map((org) => (
                                <option key={org} value={org}>{org}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Integrated Care System (ICS)</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="e.g. Greater Manchester"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={formData.ics}
                                onChange={(e) => setFormData({...formData, ics: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Hospital / GP / University</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="e.g. Manchester University NHS FT"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={formData.localAffiliation}
                                onChange={(e) => setFormData({...formData, localAffiliation: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="primary-affiliation"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            checked={formData.isPrimaryAffiliation}
                            onChange={(e) => setFormData({...formData, isPrimaryAffiliation: e.target.checked})}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="primary-affiliation" className="font-medium text-slate-700">
                            Primary Affiliation
                        </label>
                        <p className="text-slate-500 text-xs">
                            Is the organisation selected above your primary employer or contracting organisation?
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-100 my-4"></div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Job Title <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input 
                            required
                            type="text" 
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={formData.jobTitle}
                            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Band / Grade</label>
                        <div className="relative">
                            <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="e.g. Band 7"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={formData.bandGrade}
                                onChange={(e) => setFormData({...formData, bandGrade: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Contracted Time for PPIE</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="e.g. 0.5 FTE or 18.5 hrs"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={formData.contractedTime}
                                onChange={(e) => setFormData({...formData, contractedTime: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section: Skills & Directory */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Expertise & Visibility
                </h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Key Skills <span className="text-slate-400 font-normal">(Max 10)</span>
                    </label>
                    <div className="border border-slate-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
                         <div className="flex flex-wrap gap-2 mb-2">
                            {skills.map(skill => (
                                <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center">
                                    {skill}
                                    <button 
                                        type="button" 
                                        onClick={() => removeSkill(skill)}
                                        className="ml-1 hover:text-blue-900"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                         </div>
                         <div className="relative">
                             <Tag className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                             <input 
                                type="text"
                                className="w-full pl-8 py-1 outline-none text-sm"
                                placeholder={skills.length < 10 ? "Type a skill and press Enter..." : "Max skills reached"}
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                                disabled={skills.length >= 10}
                             />
                         </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Examples: Facilitation, Survey Design, Ethics, Policy Review.
                    </p>
                </div>

                <div className="flex items-start bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center h-5">
                        <input
                            id="directory-opt-in"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            checked={formData.isDirectoryOptIn}
                            onChange={(e) => setFormData({...formData, isDirectoryOptIn: e.target.checked})}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="directory-opt-in" className="font-medium text-slate-900">
                            Add to PPIE Directory
                        </label>
                        <p className="text-slate-500">
                            Can this profile be added to a searchable PPIE directory for your peers to be able to access and connect with you?
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Terms and Submit */}
            <div className="space-y-6 pt-2">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            checked={formData.agreeTerms}
                            onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className={`font-medium ${errors.agreeTerms ? 'text-red-600' : 'text-slate-700'}`}>
                            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                        </label>
                        {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:ring-4 focus:ring-blue-200 flex items-center"
                    >
                        Register Account
                        <CheckCircle className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

        </form>
      </div>
    </div>
  );
};