import { StoryPreview } from "./client";

export default async function Ticket({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center">
      <main className="h-full max-w-[500px] mx-auto my-auto p-8 flex flex-col items-center">
        <StoryPreview id={id} />
      </main>
    </div>
  );
}
