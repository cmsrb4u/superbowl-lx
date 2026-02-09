export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #013369 0%, #01244d 30%, #0a1628 60%, #0d0d0d 100%)' }}>
      {/* NFL-style dark blue top wash */}
      <div className="absolute top-0 left-0 w-full h-[40%] opacity-50">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[80%] blur-[120px] rounded-full mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(1,51,105,0.6) 0%, transparent 70%)' }} />
      </div>
      {/* Subtle team accents */}
      <div className="absolute top-[30%] left-[-5%] w-[40%] h-[40%] bg-seahawks-green/10 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] bg-patriots-red/10 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
      {/* NFL red accent line glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D50A0A] to-transparent opacity-60" />
      {/* Spotlights */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-20%] left-[20%] w-[200px] h-[1000px] bg-gradient-to-b from-white/8 to-transparent rotate-[25deg] blur-xl origin-top animate-[spotlight_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-[-20%] right-[20%] w-[200px] h-[1000px] bg-gradient-to-b from-white/8 to-transparent rotate-[-25deg] blur-xl origin-top animate-[spotlight_8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-150 contrast-150 mix-blend-overlay" />
    </div>
  )
}
