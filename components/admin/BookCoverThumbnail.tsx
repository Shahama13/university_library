import { Image, ImageKitProvider } from "@imagekit/next";
import config from "@/lib/config";

interface Props {
  coverUrl: string; // ImageKit path
  coverColor: string;
  title: string;
}

const BookCoverThumbnail = ({ coverUrl, coverColor, title }: Props) => {
  return (
    <div
      className="relative aspect-[144/199] w-9 shrink-0 overflow-hidden rounded-sm"
      style={{ backgroundColor: coverColor }}
    >
      <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
        <Image
          src={coverUrl}
          alt={title}
          fill
          sizes="36px"
          loading="lazy"
          className="object-cover"
        />
      </ImageKitProvider>
    </div>
  );
};

export default BookCoverThumbnail;