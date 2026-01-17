/**
 * Generate a random 6-digit game code
 */
export const generateGameCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Calculate points based on time taken and total time
 */
export const calculatePoints = (timeTaken: number, totalTime: number, basePoints: number = 100): number => {
  if (timeTaken > totalTime) {
    return 0;
  }
  const percentage = (totalTime - timeTaken) / totalTime;
  return Math.round(basePoints * percentage * 0.5) + Math.round(basePoints * 0.5); // 50% base + 50% time bonus
};

/**
 * Format time remaining in MM:SS format
 */
export const formatTimeRemaining = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get rank from position (1st, 2nd, 3rd, etc.)
 */
export const getRankLabel = (position: number): string => {
  const suffixes = ['st', 'nd', 'rd'];
  const suffix = position <= 3 && position > 0 ? suffixes[position - 1] : 'th';
  return `${position}${suffix}`;
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate random color from game button colors
 */
export const getRandomGameColor = (): string => {
  const colors = ['#1368CE', '#D81B60', '#43A047', '#FFA000'];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Convert milliseconds to readable time
 */
export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
