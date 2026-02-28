import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AuthSession {
  userId: string;
  email: string;
  username: string;
}

// Theme assignment logic
export function assignThemeBasedOnAnswers(answers: Array<{ questionId: number; selectedOption: number }>): string {
  const themes = ['theme-warm-earth', 'theme-cool-slate', 'theme-soft-lavender', 'theme-sage-green'];
  
  // Calculate a score based on answers (simple logic)
  const score = answers.reduce((sum, answer) => sum + answer.selectedOption, 0);
  const themeIndex = score % themes.length;
  
  return themes[themeIndex];
}

// Dashboard calculation based on test answers
export function calculateDashboardMetrics(answers: Array<{ questionId: number; selectedOption: number }>) {
  const totalQuestions = answers.length;
  const avgScore = answers.reduce((sum, a) => sum + a.selectedOption, 0) / totalQuestions;
  
  // Map to wellness score (0-100)
  const wellnessScore = Math.round((avgScore / 4) * 100); // Assuming 5 options (0-4)
  
  // Stress level inverse of wellness
  const stressLevel = 100 - wellnessScore;
  
  // Emotional state categories
  const emotionalCategories = ['calm', 'balanced', 'engaged', 'energized'];
  const emotionalState = emotionalCategories[Math.min(3, Math.floor(avgScore))];
  
  return {
    emotionalState,
    stressLevel,
    wellnessScore,
    insights: {
      summary: `You're feeling ${emotionalState} with a wellness score of ${wellnessScore}%`,
      recommendations: generateRecommendations(wellnessScore),
    },
  };
}

function generateRecommendations(wellnessScore: number): string[] {
  if (wellnessScore > 75) {
    return ['Keep maintaining your wellness routine', 'Share your positive energy', 'Help others with your insights'];
  } else if (wellnessScore > 50) {
    return ['Take more time for self-care', 'Try meditation or deep breathing', 'Connect with supportive friends'];
  } else {
    return ['Prioritize rest and recovery', 'Talk to someone you trust', 'Consider professional support'];
  }
}
