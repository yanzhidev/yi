interface HexagramImageProps {
  hexagram: any;
  altText: string;
}

export function HexagramImage({ hexagram, altText }: HexagramImageProps) {
  if (!hexagram) return null;

  return (
    <div className="mt-4 pt-4 border-t border-stone-200">
      <div className="flex justify-center">
        <img 
          src={`/images/hexagrams/${hexagram.id}.png`}
          alt={altText}
          width={450}
          height={270}
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    </div>
  );
}
