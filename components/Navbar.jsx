"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{backgroundColor:"#111", borderBottom:"1px solid #222",
      width:"100%", position:"sticky", top:0, zIndex:50}}>
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"0 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px"}}>

        {/* Logo */}
        <Link href="/" style={{display:"flex", alignItems:"center", gap:"8px", textDecoration:"none"}}>
          <Image src="/logo.png" alt="FitLog" width={28} height={28} />
          <span style={{fontFamily:"Oswald,sans-serif", color:"#ccff00",
            fontWeight:"700", fontSize:"1.1rem", letterSpacing:"0.15em"}}>
            FITLOG
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex" style={{gap:"32px"}}>
          {[{label:"Workout",href:"/"},{label:"My Plan",href:"/my-plan"}].map(({label,href})=>(
            <Link key={href} href={href} style={{
              color: pathname===href ? "#ccff00" : "#888",
              fontWeight:"600", fontSize:"0.875rem", letterSpacing:"0.05em",
              textDecoration:"none",
              borderBottom: pathname===href ? "2px solid #ccff00" : "2px solid transparent",
              paddingBottom:"2px"
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Badges */}
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <Link href="/my-plan" style={{textDecoration:"none"}}>
            <span style={{backgroundColor:"#ccff00", color:"#000", fontWeight:"700",
              fontSize:"0.72rem", padding:"4px 12px", borderRadius:"999px"}}>
              Plan {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" style={{textDecoration:"none"}}>
            <span style={{border:"2px solid #ccff00", color:"#ccff00", fontWeight:"700",
              fontSize:"0.72rem", padding:"4px 12px", borderRadius:"999px"}}>
              Saved {saved.length}
            </span>
          </Link>
          {/* Mobile menu button */}
          <button onClick={()=>setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            style={{background:"none", border:"none", color:"#fff",
              fontSize:"1.4rem", cursor:"pointer", marginLeft:"8px"}}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex md:hidden" style={{flexDirection:"column",
          backgroundColor:"#111", borderTop:"1px solid #222", padding:"16px 24px", gap:"16px"}}>
          {[{label:"Workout",href:"/"},{label:"My Plan",href:"/my-plan"}].map(({label,href})=>(
            <Link key={href} href={href} onClick={()=>setMenuOpen(false)}
              style={{color: pathname===href ? "#ccff00" : "#888",
                fontWeight:"600", fontSize:"0.9rem", textDecoration:"none"}}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
