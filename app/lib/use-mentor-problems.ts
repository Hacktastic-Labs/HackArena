"use client";

import { useState, useEffect } from 'react';

interface Problem {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
    email: string;
  };
  mentor?: {
    id: string;
    name: string;
    image?: string;
  };
}

interface MentorStats {
  totalProblems: number;
  openProblems: number;
  inProgressProblems: number;
  resolvedProblems: number;
  myMentoredProblems: number;
  uniqueStudents: number;
}

export function useMentorProblems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [stats, setStats] = useState<MentorStats>({
    totalProblems: 0,
    openProblems: 0,
    inProgressProblems: 0,
    resolvedProblems: 0,
    myMentoredProblems: 0,
    uniqueStudents: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProblems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/problems/all');
      if (!response.ok) {
        throw new Error('Failed to fetch problems');
      }
      const data = await response.json();
      setProblems(data.problems);
      setStats(data.stats);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const assignMentorToProblem = async (problemId: string) => {
    try {
      const response = await fetch(`/api/problems/${problemId}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to assign mentor to problem');
      }

      const data = await response.json();
      setProblems(prev => prev.map(p => 
        p.id === problemId ? { ...p, mentor: data.problem.mentor, status: data.problem.status } : p
      ));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        myMentoredProblems: prev.myMentoredProblems + 1,
        openProblems: prev.openProblems - 1,
        inProgressProblems: prev.inProgressProblems + 1
      }));

      return data.problem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchAllProblems();
  }, []);

  return {
    problems,
    stats,
    isLoading,
    error,
    fetchAllProblems,
    assignMentorToProblem,
  };
} 