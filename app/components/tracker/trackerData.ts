export type Category = 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Other'

export const categories: Category[] = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Other']

export const categoryStyles: Record<Category, string> = {
  Food: 'bg-[#E76F51] text-white',
  Transport: 'bg-[#5D9CEC] text-white',
  Shopping: 'bg-[#F7C948] text-[#2D2A32]',
  Entertainment: 'bg-[#B388FF] text-white',
  Other: 'bg-[#5BAE4A] text-white',
}

export const categoryIcons: Record<Category, string> = {
  Food: '/burger.png',
  Transport: '/car.png',
  Shopping: '/coin.png',
  Entertainment: '/scroll.png',
  Other: '/signpost.png',
}
