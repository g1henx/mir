import { create } from 'zustand';
import { SessionProgress } from '@/types';

interface ProgressState {
  completedSessions: Set<number>;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProgress: () => Promise<void>;
  toggleSession: (sessionNumber: number, vuelta: number) => Promise<void>;
  isSessionCompleted: (sessionNumber: number) => boolean;
  getCompletedCount: () => number;
  getCompletedCountByVuelta: (vuelta: number, totalSessions: number, startFrom: number) => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedSessions: new Set<number>(),
  isLoading: true,
  error: null,

  loadProgress: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch('/api/progress');
      if (!response.ok) throw new Error('Error loading progress');

      const data: SessionProgress[] = await response.json();
      const completedSet = new Set<number>(
        data.filter(s => s.completed).map(s => s.sessionNumber)
      );

      set({ completedSessions: completedSet, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  toggleSession: async (sessionNumber: number, vuelta: number) => {
    const { completedSessions } = get();
    const isCurrentlyCompleted = completedSessions.has(sessionNumber);

    // Optimistic update
    const newSet = new Set(completedSessions);
    if (isCurrentlyCompleted) {
      newSet.delete(sessionNumber);
    } else {
      newSet.add(sessionNumber);
    }
    set({ completedSessions: newSet });

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionNumber,
          vuelta,
          completed: !isCurrentlyCompleted,
        }),
      });

      if (!response.ok) {
        // Revert on error
        set({ completedSessions });
        throw new Error('Error updating progress');
      }
    } catch (error) {
      // Revert on error
      set({ completedSessions, error: (error as Error).message });
    }
  },

  isSessionCompleted: (sessionNumber: number) => {
    return get().completedSessions.has(sessionNumber);
  },

  getCompletedCount: () => {
    return get().completedSessions.size;
  },

  getCompletedCountByVuelta: (vuelta: number, totalSessions: number, startFrom: number) => {
    const { completedSessions } = get();
    let count = 0;
    for (let i = startFrom; i < startFrom + totalSessions; i++) {
      if (completedSessions.has(i)) count++;
    }
    return count;
  },
}));
