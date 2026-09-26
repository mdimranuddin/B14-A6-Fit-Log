"use client";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [activeTab, setActiveTab] = useState("today");
  const list = activeTab === "today" ? plan : saved;
  const totalMinutes = plan.reduce((s, w) => s + (w.duration || 0), 0);
  const totalCalories = plan.reduce((s, w) => s + (w.caloriesBurned || 0), 0);

  return (
    <div style={{backgroundColor:"#0f0f0f", minHeight:"100vh", padding:"40px 24px"}}>
      <div style={{maxWidth:"800px", margin:"0 auto"}}>

        <h1 style={{fontFamily:"Oswald,sans-serif", fontSize:"3rem", fontWeight:"700",
          color:"#ffffff", textTransform:"uppercase", marginBottom:"8px"}}>
          MY PLAN
        </h1>
        <p style={{color:"#666666", marginBottom:"36px"}}>
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"36px"}}
          className="grid-cols-3">
          {[["Exercises", plan.length], ["Minutes", totalMinutes], ["Calories", totalCalories]].map(([label,val]) => (
            <div key={label} style={{backgroundColor:"#1a1a1a", borderRadius:"12px",
              padding:"24px 16px", textAlign:"center", border:"1px solid #222"}}>
              <p style={{fontFamily:"Oswald,sans-serif", fontSize:"2.5rem",
                fontWeight:"700", color:"#ccff00"}}>{val}</p>
              <p style={{color:"#666666", fontSize:"0.8rem", marginTop:"4px"}}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{display:"flex", gap:"10px", marginBottom:"24px"}}>
          {[["today","Today's Plan"],["saved","Saved"]].map(([key,label]) => (
            <button key={key} onClick={()=>setActiveTab(key)}
              style={{padding:"8px 20px", borderRadius:"999px", fontWeight:"700",
                fontSize:"0.85rem", cursor:"pointer", border:"none",
                backgroundColor: activeTab===key ? "#ccff00" : "transparent",
                color: activeTab===key ? "#000" : "#666666",
                outline: activeTab===key ? "none" : "1px solid #333"}}>
              {label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div style={{textAlign:"center", padding:"80px 24px"}}>
            <h2 style={{fontFamily:"Oswald,sans-serif", fontSize:"1.8rem",
              fontWeight:"700", color:"#ffffff", textTransform:"uppercase", marginBottom:"12px"}}>
              NOTHING HERE YET
            </h2>
            <p style={{color:"#666666", marginBottom:"28px"}}>
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" style={{backgroundColor:"#ccff00", color:"#000",
              fontWeight:"700", padding:"12px 24px", borderRadius:"999px",
              textDecoration:"none", fontSize:"0.875rem"}}>
              Go to Workouts
            </Link>
          </div>
        ) : (
          <div style={{display:"flex", flexDirection:"column", gap:"12px"}}>
            {list.map((w) => (
              <div key={w.id} style={{backgroundColor:"#1a1a1a", borderRadius:"12px",
                padding:"16px", display:"flex", alignItems:"center", gap:"16px",
                border:"1px solid #222", opacity: w.done ? 0.5 : 1}}
                className="flex-col sm:flex-row">
                <div style={{position:"relative", width:"80px", height:"64px",
                  borderRadius:"8px", overflow:"hidden", flexShrink:0}}>
                  <Image src={w.image} alt={w.name} fill
                    sizes="80px" style={{objectFit:"cover"}} />
                </div>
                <div style={{flex:1}}>
                  <h3 style={{fontFamily:"Oswald,sans-serif", fontSize:"1rem",
                    fontWeight:"700", color:"#ffffff", textTransform:"uppercase", marginBottom:"2px"}}>
                    {w.done && <span style={{color:"#4ade80", marginRight:"6px"}}>✓</span>}
                    {w.name}
                  </h3>
                  <p style={{color:"#666", fontSize:"0.78rem", marginBottom:"4px"}}>{w.equipment}</p>
                  <div style={{display:"flex", gap:"12px", fontSize:"0.75rem", color:"#888"}}>
                    <span>⏱ {w.duration} min</span>
                    <span>🔥 {w.caloriesBurned} kcal</span>
                    <span>⭐ {w.rating}</span>
                  </div>
                </div>
                <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                  <Link href={`/workout/${w.id}`}
                    style={{border:"1px solid #333", color:"#aaa", fontSize:"0.75rem",
                      padding:"6px 12px", borderRadius:"999px", textDecoration:"none"}}>
                    View Details
                  </Link>
                  {activeTab === "today" && (
                    <>
                      <button onClick={()=>{markDone(w.id);toast.success("Marked as done! ✅");}}
                        disabled={w.done}
                        style={{backgroundColor:w.done?"#222":"#166534", color:"#fff",
                          fontSize:"0.75rem", padding:"6px 12px", borderRadius:"999px",
                          border:"none", cursor:w.done?"not-allowed":"pointer"}}>
                        ✓ Done
                      </button>
                      <button onClick={()=>{removeFromPlan(w.id);toast.success("Removed!");}}
                        style={{backgroundColor:"#7f1d1d", color:"#fff",
                          fontSize:"0.75rem", padding:"6px 12px", borderRadius:"999px",
                          border:"none", cursor:"pointer"}}>
                        ✕
                      </button>
                    </>
                  )}
                  {activeTab === "saved" && (
                    <button onClick={()=>{removeFromSaved(w.id);toast.success("Removed!");}}
                      style={{backgroundColor:"#7f1d1d", color:"#fff",
                        fontSize:"0.75rem", padding:"6px 12px", borderRadius:"999px",
                        border:"none", cursor:"pointer"}}>
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
