import { useCallback, useMemo, useState } from 'react';
import Scanner from './components/Scanner';
import ResultCard from './components/ResultCard';
import { findCarByCode } from './data/codes';

function App() {
  const [view, setView] = useState<'scanner' | 'result'>('scanner');
  const [scannedCodeRaw, setScannedCodeRaw] = useState<string>('');
  const [normalizedCode, setNormalizedCode] = useState<string>('');

  const car = useMemo(
    () => findCarByCode(normalizedCode) ?? null,
    [normalizedCode]
  );

  const extractFirstNumber = useCallback((input: string): string => {
    const match = input.match(/\d+/);
    if (match && match[0]) return match[0];
    // Fallback to first whitespace-delimited token if no digits at all
    const firstToken = input.trim().split(/\s+/)[0] ?? '';
    return firstToken;
  }, []);

  const handleDetected = useCallback(
    (code: string) => {
      setScannedCodeRaw(code);
      setNormalizedCode(extractFirstNumber(code));
      setView('result');
    },
    [extractFirstNumber]
  );

  const handleScanAnother = useCallback(() => {
    setScannedCodeRaw('');
    setNormalizedCode('');
    setView('scanner');
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#161616] text-white">
      {view === 'scanner' && <Scanner onDetected={handleDetected} />}
      {view === 'result' && car && (
        <ResultCard
          car={car}
          scannedCode={normalizedCode}
          onScanAnother={handleScanAnother}
        />
      )}
      {view === 'result' && !car && (
        <div className="min-h-[100dvh] flex items-center justify-center p-6">
          <div className="glass rounded-2xl border border-white/10 p-6 max-w-md w-full">
            <h2 className="lego-heading text-2xl text-[#d62828] mb-2">
              Code not recognized
            </h2>
            <p className="text-white/80">Code:</p>
            <code className="block mt-1 bg-[#212121] px-2 py-1 rounded border border-white/10">
              {scannedCodeRaw}
            </code>
            <button
              onClick={handleScanAnother}
              className="mt-4 w-full rounded-full bg-[#fcbf49] px-4 py-2 font-semibold text-black shadow-md transition-transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
