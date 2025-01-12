import { AnimatedBackground } from "@/components/ui/animated-background";

export function Tabs({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (input: string) => void;
}) {
  return (
    <div className="rounded-[8px] p-[2px] bg-transparent flex justify-around">
      <AnimatedBackground
        defaultValue={tab}
        className="rounded-sm bg-black dark:bg-violet-800"
        onValueChange={(val: string | null) => val && setTab(val)}
        transition={{
          ease: "easeInOut",
          duration: 0.2,
        }}
      >
        {["AI", "Manual"].map((label, index) => {
          return (
            <button
              key={index}
              data-id={label}
              type="button"
              aria-label={`${label} view`}
              className="inline-flex items-center justify-center text-center text-zinc-800  active:scale-[0.98] px-3 py-1 bg-slate-900 data-[checked=true]:bg-transparent rounded-sm  data-[checked=true]:dark:text-zinc-50 data-[checked=true]:text-zinc-50 data-[checked=false]:dark:text-zinc-50 transition-all"
            >
              {label}
            </button>
          );
        })}
      </AnimatedBackground>
    </div>
  );
}
