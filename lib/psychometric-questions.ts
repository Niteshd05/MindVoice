export interface Question {
  id: number;
  text: string;
  options: Array<{
    text: string;
    value: number;
    themeIndicator: 'warm-earth' | 'cool-slate' | 'soft-lavender' | 'sage-green';
  }>;
}

export const PSYCHOMETRIC_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'How would you describe your current mood?',
    options: [
      { text: 'Energetic and uplifted', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Calm and peaceful', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Anxious and overwhelmed', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Neutral and balanced', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 2,
    text: 'How often do you feel stressed during your day?',
    options: [
      { text: 'Rarely - I handle stress well', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Sometimes - manageable levels', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Often - significant stress', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Occasionally - depends on circumstances', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 3,
    text: 'What is your sleep quality like?',
    options: [
      { text: 'Excellent - sleep well consistently', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Good - mostly restful', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Poor - frequently interrupted', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Fair - could be better', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 4,
    text: 'How do you typically cope with challenges?',
    options: [
      { text: 'Face them head-on with optimism', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Think carefully and take measured steps', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Feel overwhelmed and avoid them', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Seek support and collaborate with others', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 5,
    text: 'How satisfied are you with your social connections?',
    options: [
      { text: 'Very satisfied - strong relationships', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Satisfied - good support system', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Unsatisfied - feeling isolated', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Moderately satisfied - working on it', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 6,
    text: 'How frequently do you engage in self-care activities?',
    options: [
      { text: 'Daily - prioritize my wellbeing', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Several times a week', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Rarely - neglect self-care', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Weekly - when I remember', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 7,
    text: 'How would you rate your overall anxiety levels?',
    options: [
      { text: 'Very low - minimal anxiety', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Low to moderate - manageable', value: 3, themeIndicator: 'cool-slate' },
      { text: 'High - significantly impacts daily life', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Moderate - present but controlled', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 8,
    text: 'How confident are you in your ability to handle future challenges?',
    options: [
      { text: 'Very confident - trust my abilities', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Confident - believe I can manage', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Uncertain - doubt my capabilities', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Somewhat confident - with support', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 9,
    text: 'How would you describe your emotional resilience?',
    options: [
      { text: 'Strong - bounce back quickly', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Moderate - recover with time', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Weak - struggle with setbacks', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Developing - improving gradually', value: 2, themeIndicator: 'sage-green' },
    ],
  },
  {
    id: 10,
    text: 'How often do you experience feelings of fulfillment?',
    options: [
      { text: 'Frequently - living purposefully', value: 4, themeIndicator: 'warm-earth' },
      { text: 'Often - usually content', value: 3, themeIndicator: 'cool-slate' },
      { text: 'Rarely - searching for meaning', value: 1, themeIndicator: 'soft-lavender' },
      { text: 'Sometimes - working toward it', value: 2, themeIndicator: 'sage-green' },
    ],
  },
];

export function getThemeFromScores(scores: number[]): 'warm-earth' | 'cool-slate' | 'soft-lavender' | 'sage-green' {
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;

  if (average >= 3.5) {
    return 'warm-earth'; // High positivity and energy
  } else if (average >= 2.5) {
    return 'cool-slate'; // Balanced and grounded
  } else if (average >= 1.5) {
    return 'sage-green'; // Growing and improving
  } else {
    return 'soft-lavender'; // Needs support and gentle care
  }
}
