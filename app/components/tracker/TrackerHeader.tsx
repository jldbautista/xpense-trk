import Image from 'next/image'
import Link from 'next/link'
import { logout } from '@/app/actions/auth'

type TrackerHeaderProps = {
  displayName: string
}

export default function TrackerHeader({ displayName }: TrackerHeaderProps) {
  return (
    <header className="border-b-[3px] border-[#2D2A32] bg-[#F7C948] shadow-[0_4px_0_#2D2A32]">
      <div className="mx-auto flex min-h-20 max-w-[1480px] items-center justify-between gap-4 px-4 py-2 sm:px-8">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-0" aria-label="xpense.trk dashboard">
          <Image
            src="/xpense-logo.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            priority
            className="pixel-art -mr-3 h-16 w-16 shrink-0 sm:h-20 sm:w-20"
          />
          <span className="truncate text-4xl font-bold leading-none text-[#2D2A32] sm:text-5xl">
            xpense.trk
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Image
            src="/cat-head.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            className="pixel-art hidden h-16 w-16 shrink-0 sm:block"
          />
          <span className="hidden max-w-64 truncate text-2xl font-bold text-[#2D2A32] md:block">
            Welcome {displayName}!
          </span>
          <div className="hidden h-9 w-[3px] bg-[#2D2A32] md:block" aria-hidden="true" />
          <form action={logout}>
            <button
              type="submit"
              className="border-[3px] border-[#2D2A32] bg-white px-4 py-2 text-xl font-bold uppercase text-[#2D2A32] shadow-[3px_3px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32] sm:px-6"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
