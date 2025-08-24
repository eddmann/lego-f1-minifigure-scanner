import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Scanner as QRScanner } from '@yudiel/react-qr-scanner';

interface ScannerProps {
  onDetected: (code: string) => void;
}

type PermissionStateLike = 'granted' | 'denied' | 'prompt' | 'unknown';

export function Scanner({ onDetected }: ScannerProps) {
  const [permission, setPermission] = useState<PermissionStateLike>('unknown');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState<string>('');
  const [scanningEnabled, setScanningEnabled] = useState<boolean>(true);

  const lastScanRef = useRef<{ code: string; at: number } | null>(null);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check camera permission if supported
  useEffect(() => {
    let cancelled = false;
    const checkPermission = async () => {
      try {
        const anyNavigator: any = navigator as any;
        if (anyNavigator?.permissions?.query) {
          const status = await anyNavigator.permissions.query({
            name: 'camera' as PermissionName,
          });
          if (!cancelled) setPermission(status.state as PermissionStateLike);
          status.onchange = () => {
            setPermission((status.state as PermissionStateLike) ?? 'unknown');
          };
        } else {
          setPermission('unknown');
        }
      } catch {
        setPermission('unknown');
      }
    };
    checkPermission();
    return () => {
      cancelled = true;
    };
  }, []);

  const announce = useCallback((text: string) => {
    const node = liveRegionRef.current;
    if (!node) return;
    node.textContent = '';
    // Allow screen readers to detect change
    setTimeout(() => {
      node.textContent = text;
    }, 50);
  }, []);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}its-lights-out-and-away-we-go.mp3`
    );
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const playScanSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
      audio.volume = 0.85;
      void audio.play();
    } catch {}
  }, []);

  const handleResult = useCallback(
    (result: unknown) => {
      if (!scanningEnabled) return;

      let code: string | undefined;
      if (Array.isArray(result)) {
        const first = (result as any[])[0];
        code =
          first?.rawValue ??
          first?.text ??
          (typeof first === 'string' ? first : undefined);
      } else if (result && typeof result === 'object') {
        const obj = result as any;
        code = obj?.rawValue ?? obj?.text;
      } else if (typeof result === 'string') {
        code = result;
      }

      if (!code) return;

      // Debounce duplicates for 2 seconds
      const now = Date.now();
      if (
        lastScanRef.current &&
        lastScanRef.current.code === code &&
        now - lastScanRef.current.at < 2000
      ) {
        return;
      }
      lastScanRef.current = { code, at: now };

      // Feedback
      if ((navigator as any).vibrate) {
        try {
          (navigator as any).vibrate(200);
        } catch {}
      }
      playScanSound();
      announce('Scan successful');

      setScanningEnabled(false);
      onDetected(code);
    },
    [announce, playScanSound, onDetected, scanningEnabled]
  );

  const handleError = useCallback((err: unknown) => {
    setErrorMessage('Camera error. Please check permissions and try again.');
    setPermission(prev => (prev === 'denied' ? prev : 'unknown'));
    // eslint-disable-next-line no-console
    console.error(err);
  }, []);

  const overlay = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative w-[80vw] max-w-[480px] aspect-square">
          <div className="absolute inset-0 rounded-2xl border-[6px] border-[#fcbf49] shadow-[0_0_0_4px_#d62828_inset]" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center text-sm text-white/80">
            Align the code inside the frame
          </div>
        </div>
      </div>
    ),
    []
  );

  const showManualFallback = permission === 'denied' || !!errorMessage;

  return (
    <div className="fixed inset-0 bg-[#161616] text-white">
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" />

      {/* Themed header */}
      <div
        role="banner"
        aria-label="App header"
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="mx-auto max-w-screen-sm px-4 pt-4">
          <div className="glass rounded-xl border border-white/10 px-4 py-2 shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}lego.png`}
                alt="LEGO"
                className="h-8 w-auto md:h-10"
              />
              <h1 className="text-2xl md:text-3xl title-outline">
                <span className="racing-text">F1</span>{' '}
                <span className="lego-heading text-[#fcbf49]">
                  Minifigure Scanner
                </span>
              </h1>
            </div>
          </div>
          <div className="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-[#d62828] via-[#fcbf49] to-[#3a86ff]" />
        </div>
      </div>

      {showManualFallback ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="camera-permission-title"
          className="flex h-full min-h-[100dvh] items-center justify-center p-6"
        >
          <div className="glass rounded-2xl border border-white/10 p-6 max-w-md w-full shadow-lg">
            <h2
              id="camera-permission-title"
              className="lego-heading text-2xl mb-2 text-[#d62828]"
            >
              Camera access needed
            </h2>
            <p className="text-white/80 mb-4">
              To scan Lego F1 Data Matrix codes, we need access to your camera.
              You can allow camera permission in your browser settings, or enter
              the code manually below.
            </p>

            <label
              htmlFor="manualCode"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Manual code entry
            </label>
            <input
              id="manualCode"
              className="w-full rounded-md border border-white/20 bg-[#212121] px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3a86ff]"
              placeholder="Paste or type code"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
            />
            <button
              aria-label="Submit manual code"
              onClick={() => manualCode && handleResult(manualCode)}
              className="mt-4 w-full rounded-full bg-[#fcbf49] px-4 py-2 font-semibold text-black shadow-md transition-transform hover:scale-105 active:scale-100"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="relative h-full min-h-[100dvh]">
          <QRScanner
            onScan={handleResult}
            onError={handleError}
            constraints={{ facingMode: 'environment' }}
            components={{ torch: true }}
            formats={['data_matrix']}
            sound={false}
            styles={{
              container: { width: '100%', height: '100%' },
              video: { width: '100%', height: '100%', objectFit: 'cover' },
            }}
          />
          {overlay}
        </div>
      )}
    </div>
  );
}

export default Scanner;
