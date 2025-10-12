export const getRandomNumber = (length: number): number => {
  return Math.floor(Math.random() * length);
};

export const replaceTemplateStrings = (
  templateString: string,
  terms: Record<
    | 'batsman'
    | 'bowler'
    | 'first_team'
    | 'second_team'
    | 'batting_card'
    | 'bowling_card'
    | 'shot_timing'
    | 'runs'
    | 'margin'
    | 'wickets',
    string
  >
): string => {
  return templateString.replace(
    /{(batsman|bowler|first_team|second_team|batting_card|bowling_card|shot_timing|runs|margin|wickets)}/g,
    (_, key: keyof typeof terms) => terms[key] ?? ''
  );
};

