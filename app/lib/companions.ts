export type CompanionName = 'Mochi' | 'Spud'

export type CompanionMood =
  | 'very-happy'
  | 'happy'
  | 'neutral'
  | 'concerned'
  | 'worried'
  | 'sad'
  | 'over-budget'

const IMAGE_PREFIXES: Record<CompanionName, string> = {
  Mochi: 'cat',
  Spud: 'spud',
}

export function getCompanionName(companion: unknown): CompanionName {
  return companion === 'Spud' ? 'Spud' : 'Mochi'
}

export function getCompanionHeadImage(companion: unknown): string {
  return `/${IMAGE_PREFIXES[getCompanionName(companion)]}-head.png`
}

export function getCompanionMoodImage(companion: CompanionName, mood: CompanionMood): string {
  return `/${IMAGE_PREFIXES[companion]}-${mood}.png`
}
