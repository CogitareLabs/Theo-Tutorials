import { getMyImages } from "~/server/queries";
import Image from "next/image";
export const dynamic = "force-dynamic";
export default async function HomePage() {

  const images = await getMyImages();
  console.log("images: ", images);

  return (
    <main>
      <div className="flex flex-wrap gap-4 p-4">
<<<<<<< HEAD
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id}>
=======
        {images.map((image, index) => (
          <div key={image.id} className="flex flex-col gap-2">
>>>>>>> 08a3e2a4b1e4aa07ca3c7bb0b556835de8dda21f
            <Image src={image.url} alt="image" width={200} height={200} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
