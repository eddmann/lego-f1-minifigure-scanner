import type { CarEntry } from '../types';

interface ResultCardProps {
  car: CarEntry;
  scannedCode: string;
  onScanAnother: () => void;
}

export default function ResultCard({
  car,
  scannedCode,
  onScanAnother,
}: ResultCardProps) {
  const badgeBg =
    car.region === 'NA' ? 'bg-[#3a86ff]' : 'bg-[#fcbf49] text-black';

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-[#161616] text-white">
      <div
        role="region"
        aria-label="Scan result"
        className="glass rounded-2xl border border-white/10 p-6 w-full max-w-lg shadow-lg animate-[fadeIn_300ms_ease-out]"
      >
        <h2 className="lego-heading text-3xl text-[#d62828] mb-4">
          {car.name}
        </h2>

        <div className="w-full aspect-video bg-white/10 rounded-lg flex items-center justify-center overflow-hidden mb-4">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span
            aria-label={`Region ${car.region}`}
            className={`inline-flex items-center justify-center ${badgeBg} rounded-md px-3 py-1 font-semibold shadow-md`}
          >
            {car.region}
          </span>
          <code className="text-xs bg-[#212121] px-2 py-1 rounded border border-white/10">
            {scannedCode}
          </code>
        </div>

        <button
          onClick={onScanAnother}
          className="mt-2 w-full rounded-full bg-[#fcbf49] px-4 py-2 font-semibold text-black shadow-md transition-transform hover:scale-105 active:scale-100"
          aria-label="Scan another code"
        >
          Scan Another
        </button>
      </div>
    </div>
  );
}
