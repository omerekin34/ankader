import Image from "next/image";

export default function BoardAvatar({
  name,
  initials,
  image,
  className,
}: {
  name: string;
  initials: string;
  image?: string;
  className: string;
}) {
  const photo = image?.trim();
  if (photo) {
    return (
      <div className={`relative overflow-hidden rounded-full ${className}`}>
        <Image src={photo} alt={name} fill sizes="96px" unoptimized={photo.startsWith("http")} className="object-cover object-[center_22%]" />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center rounded-full ${className}`} aria-hidden>
      {initials}
    </div>
  );
}
