import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{backgroundColor:"#0a0a0a", borderTop:"1px solid #1a1a1a",
      width:"100%", marginTop:"60px"}}>
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"32px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px"}}>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <Image src="/logo.png" alt="FitLog" width={24} height={24} />
          <span style={{fontFamily:"Oswald,sans-serif", color:"#ccff00",
            fontWeight:"700", fontSize:"1rem", letterSpacing:"0.15em"}}>
            FITLOG
          </span>
        </div>
        <p style={{color:"#444", fontSize:"0.8rem"}}>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
