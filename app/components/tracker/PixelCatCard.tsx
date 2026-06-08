import Image from 'next/image'
import { getMonthlyBudget } from '@/app/lib/budget'
import { getMonthlySummary } from '@/app/lib/expenses'

type CatMood =
  | 'very-happy'
  | 'happy'
  | 'neutral'
  | 'concerned'
  | 'worried'
  | 'sad'
  | 'over-budget'

const catMoodImages: Record<CatMood, string> = {
  'very-happy': '/cat-very-happy.png',
  happy: '/cat-happy.png',
  neutral: '/cat-neutral.png',
  concerned: '/cat-concerned.png',
  worried: '/cat-worried.png',
  sad: '/cat-sad.png',
  'over-budget': '/cat-over-budget.png',
}

const catMoodLabels: Record<CatMood, string> = {
  'very-happy': 'VERY HAPPY',
  happy: 'HAPPY',
  neutral: 'NEUTRAL',
  concerned: 'CONCERNED',
  worried: 'WORRIED',
  sad: 'SAD',
  'over-budget': 'OVER BUDGET',
}

const catMoodMessages: Record<CatMood, string> = {
  'very-happy': 'Plenty of room left this month!',
  happy: "You're doing great!",
  neutral: "You're about halfway there.",
  concerned: 'Keep an eye on your spending.',
  worried: "You're getting close to your budget.",
  sad: 'Almost at your monthly limit.',
  'over-budget': "You've gone over budget this month.",
}

function getCatMood(percentage: number): CatMood {
  if (percentage <= 25) return 'very-happy'
  if (percentage <= 45) return 'happy'
  if (percentage <= 60) return 'neutral'
  if (percentage <= 75) return 'concerned'
  if (percentage <= 90) return 'worried'
  if (percentage < 100) return 'sad'

  return 'over-budget'
}

export default async function PixelCatCard() {
  const [monthlyBudget, summary] = await Promise.all([getMonthlyBudget(), getMonthlySummary()])

  if (!monthlyBudget) {
    return (
      <section className="tracker-card flex h-full flex-col items-center justify-center p-5 text-center sm:p-6">
        <h2 className="text-3xl font-bold uppercase leading-none text-[#168C2D]">Pixel Cat</h2>

        <Image
          src={catMoodImages.neutral}
          alt="Pixel cat mood: neutral"
          width={1254}
          height={1254}
          className="pixel-art my-2 h-44 w-44 shrink-0 object-contain sm:h-52 sm:w-52 xl:h-60 xl:w-60"
          preload
        />

        <p className="text-3xl font-bold uppercase leading-none text-[#2D2A32]">MOOD: WAITING</p>
        <p className="mt-2 text-center text-sm leading-snug text-[#2D2A32]">
          Set a monthly budget so I can keep an eye on your spending!
        </p>
      </section>
    )
  }

  const percentageUsed = (summary.spentThisMonth / monthlyBudget) * 100
  const currentMood = getCatMood(percentageUsed)

  return (
    <section className="tracker-card flex h-full flex-col items-center justify-center p-5 text-center sm:p-6">
      <h2 className="text-3xl font-bold uppercase leading-none text-[#168C2D]">Pixel Cat</h2>

      <Image
        src={catMoodImages[currentMood]}
        alt={`Pixel cat mood: ${catMoodLabels[currentMood].toLowerCase()}`}
        width={1254}
        height={1254}
        className="pixel-art my-2 h-44 w-44 shrink-0 object-contain sm:h-52 sm:w-52 xl:h-60 xl:w-60"
        preload
      />

      <p className="text-3xl font-bold uppercase leading-none text-[#2D2A32]">
        MOOD: {catMoodLabels[currentMood]}
      </p>
      <p className="mt-2 text-center text-lg leading-snug text-[#2D2A32]">
        {catMoodMessages[currentMood]}
      </p>
    </section>
  )
}
