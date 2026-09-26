"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/fitlog")
      .then((r) => r.json())
      .then((data) => { setWorkouts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...workouts].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div style={{backgroundColor:"#0f0f0f", width:"100%"}}>

      {/* HERO */}
      <section style={{width:"100%", padding:"60px 0"}}>
        <div style={{maxWidth:"1200px", margin:"0 auto", padding:"0 24px",
          display:"flex", flexWrap:"wrap", alignItems:"center",
          justifyContent:"space-between", gap:"40px"}}>

          <div style={{flex:"1 1 400px", minWidth:"280px"}}>
            <p style={{color:"#ccff00", fontSize:"0.7rem",
              letterSpacing:"0.35em", fontWeight:"600", marginBottom:"16px"}}>
              WORKOUT LIBRARY
            </p>
            <h1 style={{fontFamily:"Oswald,sans-serif",
              fontSize:"clamp(2.2rem,5vw,4rem)", fontWeight:"700",
              lineHeight:"1.1", color:"#fff", textTransform:"uppercase",
              marginBottom:"20px"}}>
              TRAIN WITH INTENT.<br />LOG EVERY SET.
            </h1>
            <p style={{color:"#777", maxWidth:"420px", lineHeight:"1.8",
              marginBottom:"32px", fontSize:"0.95rem"}}>
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
              today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a href="#library" style={{backgroundColor:"#ccff00", color:"#000",
              fontWeight:"700", padding:"14px 28px", borderRadius:"999px",
              display:"inline-flex", alignItems:"center", gap:"8px",
              fontSize:"0.85rem", letterSpacing:"0.08em", textDecoration:"none"}}>
              💪 BROWSE WORKOUTS
            </a>
          </div>

          <div style={{flex:"1 1 300px", display:"flex", justifyContent:"center"}}>
            <Image src="/banner.png" alt="FitLog Hero" width={420} height={380}
              style={{objectFit:"contain", maxWidth:"100%", height:"auto"}} priority />
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section id="library" style={{width:"100%", padding:"40px 0 80px"}}>
        <div style={{maxWidth:"1200px", margin:"0 auto", padding:"0 24px"}}>

          {/* Header row */}
          <div style={{display:"flex", flexWrap:"wrap", alignItems:"center",
            justifyContent:"space-between", gap:"16px", marginBottom:"32px"}}>
            <div>
              <h2 style={{fontFamily:"Oswald,sans-serif", fontSize:"clamp(1.5rem,3vw,2rem)",
                fontWeight:"700", color:"#fff", textTransform:"uppercase", marginBottom:"4px"}}>
                THE LIBRARY
              </h2>
              <p style={{color:"#555", fontSize:"0.85rem"}}>
                Twelve lifts covering every major muscle group.
              </p>
            </div>
            <div style={{position:"relative"}}>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}
                style={{backgroundColor:"#1a1a1a", border:"1px solid #333",
                  color:"#fff", padding:"8px 36px 8px 14px", borderRadius:"8px",
                  fontSize:"0.85rem", cursor:"pointer", appearance:"none", outline:"none"}}>
                <option value="duration">Sort: Duration</option>
                <option value="caloriesBurned">Sort: Calories</option>
                <option value="rating">Sort: Rating</option>
              </select>
              <span style={{position:"absolute", right:"12px", top:"50%",
                transform:"translateY(-50%)", color:"#888", pointerEvents:"none"}}>▾</span>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", height:"300px", gap:"16px"}}>
              <div className="spinner" style={{width:"48px", height:"48px",
                border:"4px solid #ccff00", borderTopColor:"transparent",
                borderRadius:"50%", animation:"spin 0.8s linear infinite"}} />
              <p style={{color:"#666"}}>Loading workouts...</p>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : (
            <div style={{display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",
              gap:"20px"}}>
              {sorted.map((w) => <WorkoutCard key={w.id} workout={w} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} style={{textDecoration:"none"}}>
      <div style={{backgroundColor:"#1a1a1a", borderRadius:"14px",
        overflow:"hidden", border:"1px solid #222", cursor:"pointer",
        height:"100%", display:"flex", flexDirection:"column",
        transition:"border-color 0.2s, transform 0.2s"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#ccff00";e.currentTarget.style.transform="translateY(-2px)"}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="#222";e.currentTarget.style.transform="translateY(0)"}}>

        <div style={{position:"relative", height:"190px", width:"100%", flexShrink:0}}>
          <Image src={workout.image} alt={workout.name} fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            style={{objectFit:"cover"}} />
        </div>

        <div style={{padding:"16px", flex:1, display:"flex", flexDirection:"column"}}>
          <div style={{display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"10px"}}>
            {workout.muscleGroups?.map((cat) => (
              <span key={cat} style={{backgroundColor:"#ccff00", color:"#000",
                fontSize:"0.62rem", fontWeight:"700", padding:"2px 8px",
                borderRadius:"4px", letterSpacing:"0.04em"}}>
                {cat.toUpperCase()}
              </span>
            ))}
          </div>
          <h3 style={{fontFamily:"Oswald,sans-serif", fontSize:"1rem",
            fontWeight:"700", color:"#fff", textTransform:"uppercase",
            marginBottom:"4px", flex:1}}>
            {workout.name}
          </h3>
          <p style={{color:"#555", fontSize:"0.78rem", marginBottom:"12px"}}>
            {workout.equipment}
          </p>
          <div style={{display:"flex", gap:"12px", fontSize:"0.75rem",
            color:"#777", borderTop:"1px solid #2a2a2a", paddingTop:"10px"}}>
            <span>⏱ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span>⭐ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
