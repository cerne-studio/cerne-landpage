import { useLang } from '@/providers/LanguageProvider'
import { copy } from '@/lib/copy'

export function useTranslation() {
  const { lang } = useLang()
  return copy[lang]
}
