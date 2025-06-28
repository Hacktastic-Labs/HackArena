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
  mentor?: {
    id: string;
    name: string;
    image?: string;
  };
}

interface CreateProblemData {
  title: string;
  description: string;
  tags?: string[];
}

export function useProblems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProblems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/problems');
      if (!response.ok) {
        throw new Error('Failed to fetch problems');
      }
      const data = await response.json();
      setProblems(data.problems);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const createProblem = async (problemData: CreateProblemData) => {
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problemData),
      });

      if (!response.ok) {
        throw new Error('Failed to create problem');
      }

      const data = await response.json();
      setProblems(prev => [data.problem, ...prev]);
      return data.problem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return {
    problems,
    isLoading,
    error,
    fetchProblems,
    createProblem,
  };
} 