interface Props {
  data: number[] | null;
  loading?: boolean;
}

const cellColors = [
  'rgba(215, 226, 234, 0.05)',
  'rgba(182, 0, 168, 0.25)',
  'rgba(182, 0, 168, 0.5)',
  'rgba(182, 0, 168, 0.75)',
  'rgba(255, 105, 180, 1)',
];

const WEEKS = 53;
const DAYS = 7;

export default function ContributionHeatmap({ data, loading }: Props) {
  const values = data ?? [];
  // Take the last WEEKS*DAYS values if available.
  const tail = values.slice(-WEEKS * DAYS);
  const total = tail.reduce((a, b) => a + b, 0);

  const cells: number[] = [];
  for (let i = 0; i < WEEKS * DAYS; i++) cells.push(tail[i] ?? 0);

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/60 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
          GitHub Contributions · last 12 months
        </span>
        <span className="text-xs text-[#D7E2EA]/70">
          {loading ? '…' : `${total.toLocaleString()} contributions`}
        </span>
      </div>
      <div className="overflow-x-auto">
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateRows: `repeat(${DAYS}, 1fr)` }}
        >
          <div className="flex gap-[3px]">
            {Array.from({ length: WEEKS }).map((_, week) => (
              <div key={week} className="flex flex-col gap-[3px]">
                {Array.from({ length: DAYS }).map((_, day) => {
                  const idx = week * DAYS + day;
                  const intensity = cells[idx] ?? 0;
                  return (
                    <span
                      key={`${week}-${day}`}
                      className="h-[10px] w-[10px] rounded-sm"
                      style={{ background: cellColors[intensity] }}
                      title={`${intensity}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest text-[#D7E2EA]/50">
        <span>Less</span>
        {cellColors.map((c, i) => (
          <span
            key={i}
            className="h-[10px] w-[10px] rounded-sm"
            style={{ background: c }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
