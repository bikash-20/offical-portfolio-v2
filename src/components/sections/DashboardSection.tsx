import {
  Github,
  Code2,
  Cloud,
  Trophy,
  Clock,
  Calendar,
  Sun,
} from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { useGitHub, useGitHubContributions } from '../../hooks/useGitHub';
import { useLeetCode } from '../../hooks/useLeetCode';
import { describeCode, useWeather } from '../../hooks/useWeather';
import { useLocalTime } from '../../hooks/useLocalTime';
import { PROFILE } from '../../data/profile';
import ContributionHeatmap from '../widgets/ContributionHeatmap';

interface WidgetCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
}

function WidgetCard({ icon, title, children, href }: WidgetCardProps) {
  const inner = (
    <div className="flex h-full flex-col gap-3 rounded-3xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/60 p-5 transition-colors hover:border-[#D7E2EA]/35">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#D7E2EA]/10 text-[#D7E2EA]">
          {icon}
        </span>
        {title}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function DashboardSection() {
  const gh = useGitHub(PROFILE.githubHandle);
  const contrib = useGitHubContributions(PROFILE.githubHandle);
  const lc = useLeetCode(PROFILE.leetcodeHandle);
  const wx = useWeather(PROFILE.lat, PROFILE.lon);
  const clock = useLocalTime(PROFILE.timezone);
  const wxDesc = wx.weather ? describeCode(wx.weather.code) : null;

  return (
    <section className="relative w-full bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
          Live Dashboard
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {/* GitHub */}
        <WidgetCard
          icon={<Github className="h-4 w-4" />}
          title="GitHub"
          href={`https://github.com/${PROFILE.githubHandle}`}
        >
          {gh.loading ? (
            <div className="text-sm text-[#D7E2EA]/50">Loading…</div>
          ) : gh.error || !gh.profile ? (
            <div className="text-sm text-rose-300/80">
              Could not load. Check the handle in <code>.env.local</code>.
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-[#D7E2EA]">
                {gh.profile.public_repos}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                public repositories
              </span>
              <div className="mt-2 flex justify-between text-xs text-[#D7E2EA]/70">
                <span>{gh.profile.followers} followers</span>
                <span>{gh.profile.following} following</span>
              </div>
            </div>
          )}
        </WidgetCard>

        {/* LeetCode */}
        <WidgetCard
          icon={<Code2 className="h-4 w-4" />}
          title="LeetCode"
          href={`https://leetcode.com/${PROFILE.leetcodeHandle}`}
        >
          {lc.loading ? (
            <div className="text-sm text-[#D7E2EA]/50">Loading…</div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-[#D7E2EA]">
                {lc.stats?.totalSolved ?? 0}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                problems solved
              </span>
              <div className="mt-2 flex gap-2 text-[10px]">
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
                  Easy {lc.stats?.easySolved ?? 0}
                </span>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-300">
                  Med {lc.stats?.mediumSolved ?? 0}
                </span>
                <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-300">
                  Hard {lc.stats?.hardSolved ?? 0}
                </span>
              </div>
            </div>
          )}
        </WidgetCard>

        {/* Weather */}
        <WidgetCard
          icon={<Cloud className="h-4 w-4" />}
          title="Weather · Sylhet"
        >
          {wx.loading || !wx.weather ? (
            <div className="text-sm text-[#D7E2EA]/50">
              {wx.error ? 'Weather unavailable' : 'Loading…'}
            </div>
          ) : (
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#D7E2EA]">
                  {wx.weather.temp}°C
                </span>
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                  Feels {wx.weather.feels}°C
                </span>
              </div>
              <div className="text-right text-xs text-[#D7E2EA]/70">
                <div className="text-2xl">{wxDesc?.emoji}</div>
                <div>{wxDesc?.label}</div>
                <div className="text-[#D7E2EA]/40">{wx.weather.humidity}% humidity</div>
              </div>
            </div>
          )}
        </WidgetCard>

        {/* Contribution heatmap - full width */}
        <div className="md:col-span-3">
          <ContributionHeatmap
            data={contrib.data}
            loading={contrib.loading}
          />
        </div>

        {/* Codeforces */}
        <WidgetCard
          icon={<Trophy className="h-4 w-4" />}
          title="Codeforces"
          href={
            PROFILE.codeforcesHandle
              ? `https://codeforces.com/profile/${PROFILE.codeforcesHandle}`
              : undefined
          }
        >
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-black text-[#D7E2EA]">
              {PROFILE.codeforcesHandle ? 'Active' : '—'}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
              {PROFILE.codeforcesHandle
                ? `@${PROFILE.codeforcesHandle}`
                : 'Set VITE_CODEFORCES_HANDLE'}
            </span>
            <p className="mt-2 text-[10px] text-[#D7E2EA]/40">
              Configure the handle in <code>.env.local</code> to pull live
              contest stats.
            </p>
          </div>
        </WidgetCard>

        {/* Local time */}
        <WidgetCard icon={<Clock className="h-4 w-4" />} title="Local Time · BD">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-3xl font-black tabular-nums text-[#D7E2EA]">
              {clock.time}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
              Asia / Dhaka (UTC+6)
            </span>
          </div>
        </WidgetCard>

        {/* Date */}
        <WidgetCard icon={<Calendar className="h-4 w-4" />} title="Today">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-black uppercase text-[#D7E2EA]">
              {clock.weekday}
            </span>
            <span className="text-sm text-[#D7E2EA]/70">{clock.date}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-amber-300/80">
              <Sun className="h-3 w-3" />
              Good day to ship something.
            </span>
          </div>
        </WidgetCard>
      </div>
    </section>
  );
}
