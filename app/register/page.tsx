'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, Building2, Loader2 } from 'lucide-react';

// Signup API expects: name, email, password, role
const ROLES = [
  { value: 'PROCUREMENT_OFFICER', label: 'Procurement Officer' },
  { value: 'VENDOR', label: 'Vendor' },
  { value: 'MANAGER', label: 'Manager / Approver' },
  { value: 'ADMIN', label: 'Admin' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    institution: '', country: '', password: '', role: 'PROCUREMENT_OFFICER', bio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }
      // Success → send to signin
      router.push('/signin');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-white/40 hover:text-white/70 transition-colors">
          <Building2 className="w-4 h-4" />
          VendorBridge
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d20] shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="relative overflow-hidden px-8 py-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-cyan-600/30" />
            <div className="absolute inset-0 bg-[#0d0d20]/40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-violet-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="mt-2 text-white/50 text-sm">Join VendorBridge and streamline your procurement</p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Profile Upload */}
            <div className="mb-10 flex justify-center">
              <label className="group relative cursor-pointer">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-violet-500/40 bg-violet-500/10 transition duration-300 group-hover:scale-105 group-hover:border-violet-400/60">
                  <Camera size={30} className="text-violet-400 transition group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="absolute bottom-0 right-0 rounded-full bg-violet-600 p-2 text-white shadow-md ring-2 ring-[#0d0d20]">
                  <Camera size={14} />
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 px-4 py-3 text-sm text-rose-400">
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField label="First Name *" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                <InputField label="Last Name" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                <InputField label="Email Address *" name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
                <InputField label="Password *" name="password" type="password" placeholder="Create a password" value={form.password} onChange={handleChange} />
                <InputField label="Phone Number" name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
                <InputField label="Institution" name="institution" placeholder="Institution" value={form.institution} onChange={handleChange} />
                <InputField label="Country" name="country" placeholder="Country" value={form.country} onChange={handleChange} />
                {/* Role selector */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Role *</label>
                  <select
                    name="role" value={form.role} onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white text-sm outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                  >
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value} className="bg-[#0d0d20]">{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/60">Additional Information</label>
                <textarea
                  name="bio" rows={4} value={form.bio} onChange={handleChange}
                  placeholder="Tell us something about yourself..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 resize-none"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500/30" />
                <p className="text-sm text-white/40">
                  I agree to the{' '}
                  <span className="text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">Terms & Conditions</span>
                  {' '}and{' '}
                  <span className="text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">Privacy Policy</span>.
                </p>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit" disabled={isLoading}
                  className="inline-flex items-center gap-2 px-12 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : 'Create Account'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-white/30">
              Already have an account?{' '}
              <Link href="/signin" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

function InputField({ label, name, placeholder, value, onChange, type = 'text' }: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/60">{label}</label>
      <input
        type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none transition-all duration-200 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
      />
    </div>
  );
}