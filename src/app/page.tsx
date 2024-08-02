import { getMyImages } from "~/server/queries";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <p className="text-center">Please sign in above to view your images</p>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

async function Images() {
  const images = await getMyImages();
  console.log("images: ", images);
  return (<div className="flex flex-wrap gap-4 p-4">
    {images.map((image, index) => (
      <div key={image.id} className="flex flex-col gap-2">
        <Image src={image.url} alt="image" width={200} height={200} />
        <p>{image.name}</p>
      </div>
    ))}
  </div>)
}