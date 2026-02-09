import { useState, useEffect, useRef } from 'react'

export default function FadeInCard({ children, delay = 0, className = '' }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [delay])
  return (
    <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} hover:scale-[1.01] hover:shadow-lg hover:shadow-slate-900/50 ${className}`}>
      {children}
    </div>
  )
}
