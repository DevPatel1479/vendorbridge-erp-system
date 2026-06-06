import { Camera } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-10 text-center text-white">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-indigo-100">
              Join our community and complete your registration
            </p>
          </div>

          <div className="p-8 md:p-10">
            {/* Profile Upload */}
            <div className="mb-10 flex justify-center">
              <label className="group relative cursor-pointer">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-indigo-100 bg-gradient-to-br from-indigo-100 to-cyan-100 shadow-lg transition duration-300 group-hover:scale-105">
                  <Camera
                    size={30}
                    className="text-indigo-600 transition group-hover:rotate-12"
                  />
                </div>

                <div className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-2 text-white shadow-md">
                  <Camera size={16} />
                </div>

                <input type="file" className="hidden" />
              </label>
            </div>

            <form className="space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField placeholder="First Name" />
                <InputField placeholder="Last Name" />
                <InputField type="email" placeholder="Email Address" />
                <InputField type="tel" placeholder="Phone Number" />
                <InputField placeholder="Institution" />
                <InputField placeholder="Country" />
              </div>

              {/* Additional Information */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us something about yourself..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <p className="text-sm text-gray-600">
                  I agree to the Terms & Conditions and Privacy Policy.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-10 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

type InputFieldProps = {
  placeholder: string;
  type?: string;
};

function InputField({
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {placeholder}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}