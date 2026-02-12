"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "aus-wh-departure";

interface UseDepartureReturn {
  departureDate: string | null;
  setDepartureDate: (date: string) => void;
  daysUntilDeparture: number | null;
  clearDeparture: () => void;
}

function loadDeparture(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

function calcDaysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const departure = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  departure.setHours(0, 0, 0, 0);
  const diff = departure.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function useDeparture(): UseDepartureReturn {
  const [departureDate, setDepartureDateState] = useState<string | null>(
    () => loadDeparture()
  );

  useEffect(() => {
    setDepartureDateState(loadDeparture());
  }, []);

  const daysUntilDeparture = calcDaysUntil(departureDate);

  const setDepartureDate = useCallback((date: string): void => {
    localStorage.setItem(STORAGE_KEY, date);
    setDepartureDateState(date);
  }, []);

  const clearDeparture = useCallback((): void => {
    localStorage.removeItem(STORAGE_KEY);
    setDepartureDateState(null);
  }, []);

  return {
    departureDate,
    setDepartureDate,
    daysUntilDeparture,
    clearDeparture,
  };
}
