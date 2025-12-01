import Colors from '../themes/colors';

export const getProgressPercentage = (
  count: number,
  target: number,
): number => {
  return Math.min((count / target) * 100, 100);
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 70) return Colors.success;
  if (percentage >= 40) return Colors.warning;
  return Colors.error;
};

export const getMotivationMessage = (percentage: number) => {
  if (percentage >= 100) return 'motivation-msg-1';
  if (percentage >= 75) return 'motivation-msg-2';
  if (percentage >= 50) return 'motivation-msg-3';
  return 'motivation-msg-4';
};
