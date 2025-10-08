import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">Login Page</h1>
      <Card className="w-full max-w-sm space-y-4 text-center">
        <p className="text-slate-600">
          Authentication flows coming soon. Use the navigation to explore the
          demo pages.
        </p>
        <Button disabled>Sign in</Button>
      </Card>
    </section>
  );
}
