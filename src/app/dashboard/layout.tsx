// components/AuthShell.tsx
export default function AuthShell({ children }: { children: React.ReactNode }) {
    
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg">
        {children}
      </div>
    </main>
  );
}
