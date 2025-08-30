import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  );
}
