export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: 'linear-gradient(to right, #002244 0%, #0a3d1a 25%, #050a14 50%, #1a0a12 75%, #002244 100%)' }}>
      {/* Seahawks side - left */}
      <div className="absolute top-0 left-0 w-[55%] h-full opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[60%] bg-seahawks-green/30 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-seahawks-navy/40 blur-[100px] rounded-full mix-blend-screen" />
      </div>
      {/* Patriots side - right */}
      <div className="absolute top-0 right-0 w-[55%] h-full opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[60%] bg-patriots-red/30 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-patriots-navy/40 blur-[100px] rounded-full mix-blend-screen" />
      </div>
      {/* Spotlights */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[20%] w-[200px] h-[1000px] bg-gradient-to-b from-seahawks-green/15 to-transparent rotate-[25deg] blur-xl origin-top animate-[spotlight_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-[-20%] right-[20%] w-[200px] h-[1000px] bg-gradient-to-b from-patriots-red/15 to-transparent rotate-[-25deg] blur-xl origin-top animate-[spotlight_8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay" />
    </div>
  )
}
