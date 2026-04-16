export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="flex flex-col items-center leading-none">
          <span className="font-serif text-xl font-light tracking-[0.2em] text-cream">
            ALBERTSON & WEISS
          </span>
          <span className="font-serif text-[10px] font-light tracking-[0.35em] text-gold">
            MOTORS
          </span>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-[shimmer_1s_ease-in-out_infinite] rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
