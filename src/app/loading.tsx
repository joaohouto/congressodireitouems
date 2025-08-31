import { Spinner } from "@/components/luxe/spinner";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Spinner />
    </div>
  );
}
