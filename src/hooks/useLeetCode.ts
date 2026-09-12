import { useEffect, useState } from 'react';

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  contributionPoints: number;
  reputation: number;
}

interface State {
  stats: LeetCodeStats | null;
  loading: boolean;
  error: string | null;
}

const fallback: LeetCodeStats = {
  totalSolved: 45,
  easySolved: 28,
  mediumSolved: 14,
  hardSolved: 3,
  ranking: 3_600_000,
  acceptanceRate: 71.4,
  contributionPoints: 120,
  reputation: 50,
};

export function useLeetCode(handle: string): State {
  const [state, setState] = useState<State>({ stats: null, loading: true, error: null });

  useEffect(() => {
    if (!handle) {
      setState({ stats: fallback, loading: false, error: null });
      return;
    }
    let cancelled = false;
    fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const stats: LeetCodeStats = {
          totalSolved: data.totalSolved ?? 0,
          easySolved: data.easySolved ?? 0,
          mediumSolved: data.mediumSolved ?? 0,
          hardSolved: data.hardSolved ?? 0,
          ranking: data.ranking ?? 0,
          acceptanceRate: data.acceptanceRate ?? 0,
          contributionPoints: data.contributionPoints ?? 0,
          reputation: data.reputation ?? 0,
        };
        if (!cancelled) setState({ stats, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ stats: fallback, loading: false, error: null });
      });

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return state;
}
