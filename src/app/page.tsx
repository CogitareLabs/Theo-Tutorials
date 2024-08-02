import { getMyImages } from "~/server/queries";
import Image from "next/image";

export default async function HomePage() {
  const mockUrls = [
    "https://utfs.io/f/a01c81cd-cbf8-4cdd-bc6b-8d25b02f5b7e-bsk3dw.webp",
    "https://utfs.io/f/28cfc6b0-ebe1-42ac-95ab-f90b4cecb936-1t6f.svg.png",
  ];

  const mockImages = mockUrls.map((url, index) => {
    return {
      url,
      id: index,
    };
  });

  const posts = await getMyImages();
  console.log("posts: ", posts);

  return (
    <main>
      <div className="flex flex-wrap gap-4 p-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id}>
            <Image src={image.url} alt="image" width={200} height={200} />
          </div>
        ))}
      </div>
    </main>
  );
}
