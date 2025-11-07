"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function Countdown({
  targetDate,
  labels
}: {
  targetDate: Date;
  labels?: CountdownLabels;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  const defaultLabels: CountdownLabels = {
    days: "Dies",
    hours: "Hores",
    minutes: "Minuts",
    seconds: "Segons",
  };

  const currentLabels = labels || defaultLabels;

  const timeUnits = [
    { value: timeLeft.days, label: currentLabels.days },
    { value: timeLeft.hours, label: currentLabels.hours },
    { value: timeLeft.minutes, label: currentLabels.minutes },
    { value: timeLeft.seconds, label: currentLabels.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex gap-3 sm:gap-6 justify-center"
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[100px]">
              <motion.div
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl sm:text-5xl font-bold text-gray-900 text-center tabular-nums"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.div>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2 uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
