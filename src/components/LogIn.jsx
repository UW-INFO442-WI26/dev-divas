import { motion } from 'motion/react';
import { useAuth } from '../AuthContext.jsx';

export default function LogIn() {
  const { user, loginWithGoogle, logout } = useAuth();

  if (user) {
    return (
      <main className="pt-16 min-h-screen bg-gradient-to-b from-purple-50/60 to-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <h1 className="text-2xl font-bold text-gray-900 text-center">You&apos;re signed in</h1>
          <p className="mt-3 text-sm text-gray-600 text-center">
            Signed in as <span className="font-semibold">{user.displayName || user.email}</span>.
          </p>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Your future profile updates and match history will be associated with this account.
          </p>
          <button
            type="button"
            onClick={logout}
            className="mt-8 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-purple-50/60 to-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Sign in to your Dev Divas account to manage your volunteer profile and matches.</p>
        </div>

        <div
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100"
          aria-label="Sign in form"
        >
          <p className="text-sm text-gray-500">
            For this prototype, you can create an account using Google. Your volunteer profile and
            match history will be stored securely under that account.
          </p>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Continue with Google
          </button>
        </div>
      </motion.div>
    </main>
  );
}
