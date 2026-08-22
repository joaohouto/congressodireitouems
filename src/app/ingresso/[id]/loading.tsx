import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/luxe/spinner";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="bg-muted min-h-screen">
      <main className="h-full max-w-[500px] mx-auto my-auto p-4 flex flex-col items-center">
        <Card className="rounded-lg w-full p-0 overflow-hidden shadow-sm">
          <CardContent className="p-0 relative">
            <div className="relative aspect-[9/16] w-full bg-card/60 flex flex-col items-center justify-center gap-4">
              <Skeleton className="w-full h-full absolute inset-0" />
              <Button variant="outline" className="rounded-full relative z-10 shadow-sm pointer-events-none">
                <Spinner />
                Carregando seu ingresso...
              </Button>
            </div>
          </CardContent>
        </Card>
        <Footer />
      </main>
    </div>
  );
}
