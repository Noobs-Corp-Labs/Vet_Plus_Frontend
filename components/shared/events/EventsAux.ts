export type EventType = 'nutricional' | 'reprodutivo' | 'saude' | 'performance' | 'geral'

export interface CalendarEvent {
  date: Date
  type: EventType
  title: string
}

export const eventStyles: Record<EventType, { bg: string; bg2: string; border: string; text: string }> = {
   nutricional: {
      bg: 'bg-green-500',
      bg2: 'bg-green-500/20',
      border: 'border-green-600',
      text: 'text-green-700'
   },
   reprodutivo: {
      bg: 'bg-pink-500',
      bg2: 'bg-pink-500/20',
      border: 'border-pink-600',
      text: 'text-pink-700'
   },
   saude: {
      bg: 'bg-red-500',
      bg2: 'bg-red-500/20',
      border: 'border-red-600',
      text: 'text-red-700'
   },
   performance: {
      bg: 'bg-blue-500',
      bg2: 'bg-blue-500/20',
      border: 'border-blue-600',
      text: 'text-blue-700'
   },
   geral: {
      bg: 'bg-amber-500',
      bg2: 'bg-amber-500/20',
      border: 'border-amber-600',
      text: 'text-amber-700'
   }
}