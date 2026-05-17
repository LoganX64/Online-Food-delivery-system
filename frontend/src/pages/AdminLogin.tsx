import { AdminLoginForm } from "@/components/admin/AdminLoginForm"

export default function AdminLogin() {
  return (
    <div className="flex min-h-[calc(100svh-64px)] w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-background via-muted/30 to-zinc-900/5">
      <div className="w-full max-w-4xl">
        <AdminLoginForm />
      </div>
    </div>
  )
}
