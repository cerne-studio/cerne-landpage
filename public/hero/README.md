# Imagens do hero cinematográfico

Solte aqui os 4 arquivos com **exatamente** estes nomes (a ordem é a narrativa):

| Arquivo            | Cena                              | Texto que aparece                         |
| ------------------ | --------------------------------- | ----------------------------------------- |
| `01-cidade.jpg`    | Cidade noturna (vista aérea)      | "Milhares de empresas…"                   |
| `02-predio.jpg`    | O prédio destacado (sua empresa)  | "A sua está aí no meio."                  |
| `03-pessoa.jpg`    | Pessoa no computador (à noite)    | "Onde alguém ainda faz tudo na mão."      |
| `04-sistema.jpg`   | O dashboard / o sistema           | "A gente transforma isso num sistema." …  |

## Especificação de exportação (para ficar nítido e leve)

- **Resolução:** 2560×1440 (16:9). Mínimo 1920×1080.
- **Formato:** `.jpg` (qualidade ~82) ou `.webp` (melhor). Se usar webp,
  troque a extensão em `src/components/heromotion/scenes.ts`.
- **Peso alvo:** < 400 KB por imagem (webp ajuda muito).
- **Enquadramento:** deixe o **centro respirável** — o texto entra no centro.
  Evite informação importante exatamente no meio.
- **Grade de cor:** dark pro, fundo #0a0a0b, acento teal #00d4b4 (como já estão).

Enquanto os arquivos não existem, o hero mostra um **placeholder com gradiente**
(não quebra). Assim que você soltar os 4, eles aparecem automaticamente.

> Dica: se você só tem a arte composta (2×2 num arquivo só), me mande que eu
> fatio nos 4 arquivos certos.
