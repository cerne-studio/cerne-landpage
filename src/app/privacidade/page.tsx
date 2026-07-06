import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade — cerne",
  description: "Como a cerne coleta, usa e protege os dados enviados pelo formulário de contato.",
};

const SECTIONS = [
  {
    title: "Quem somos",
    body: "A cerne desenvolve sistemas sob medida para pequenas e médias empresas. Este documento explica como tratamos os dados pessoais enviados através do formulário de contato deste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).",
  },
  {
    title: "Quais dados coletamos",
    body: "Ao preencher o formulário de contato, coletamos: nome, nome da empresa, segmento de atuação, número de WhatsApp e a necessidade selecionada (CRM, financeiro, agenda, dashboard ou combinação). Não coletamos dados sensíveis, financeiros ou de pagamento neste formulário.",
  },
  {
    title: "Para que usamos esses dados",
    body: "Os dados são usados exclusivamente para entrar em contato com você pelo WhatsApp e apresentar o diagnóstico gratuito solicitado. Não usamos esses dados para nenhuma outra finalidade.",
  },
  {
    title: "Base legal",
    body: "O tratamento é baseado no seu consentimento, dado no momento em que você preenche e envia o formulário, e no legítimo interesse em responder a um contato comercial solicitado por você.",
  },
  {
    title: "Com quem compartilhamos",
    body: "Não vendemos, alugamos ou compartilhamos seus dados com terceiros. Os dados preenchidos são enviados diretamente para o WhatsApp da equipe cerne, sem passar por servidores ou bancos de dados intermediários.",
  },
  {
    title: "Por quanto tempo guardamos",
    body: "Os dados ficam armazenados apenas na conversa de WhatsApp gerada pelo contato, pelo tempo necessário para conduzir a negociação. Você pode pedir a exclusão a qualquer momento pelos canais abaixo.",
  },
  {
    title: "Seus direitos",
    body: "Você pode, a qualquer momento, pedir para saber quais dados temos sobre você, corrigi-los, ou solicitar a exclusão. Basta enviar uma mensagem pelo WhatsApp ou pelo e-mail de contato informado abaixo.",
  },
  {
    title: "Contato",
    body: "Dúvidas sobre privacidade ou tratamento de dados podem ser enviadas para privacidade@cerne.com.br (e-mail provisório — atualizar antes da publicação).",
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <Nav />
      <main style={{ background: "var(--surface-page)", padding: "clamp(64px,10vw,104px) 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 var(--gutter)" }}>
          <span className="section-label">LEGAL</span>
          <h1
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: "var(--display-sm)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text-heading)",
              margin: "14px 0 8px",
            }}
          >
            Política de Privacidade
          </h1>
          <p className="font-sans" style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 48px" }}>
            Última atualização: julho de 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {SECTIONS.map((s, i) => (
              <div key={i}>
                <h2
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: "var(--text-xl)",
                    letterSpacing: "-0.02em",
                    color: "var(--text-heading)",
                    margin: "0 0 10px",
                  }}
                >
                  {s.title}
                </h2>
                <p className="font-sans" style={{ fontSize: "var(--text-base)", lineHeight: 1.7, color: "var(--text-body)", margin: 0 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
