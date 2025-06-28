import { AspectRatio } from '@/components/shared/aspect-ratio';

interface BlurredHeroImageProps {
  imageUrl: string;
  alt: string;
}

export function BlurredHeroImage({ imageUrl, alt }: BlurredHeroImageProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <img
          src={imageUrl || '/static/placeholder.svg'}
          alt="blurred image"
          className="absolute inset-0 h-full w-full scale-105 object-cover blur-md brightness-50"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-0">
        <AspectRatio ratio={16 / 9} className="overflow-hidden shadow-lg">
          <img
            src={imageUrl || '/static/placeholder.svg'}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
