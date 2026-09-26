"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

export default function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { plan, addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((r) => r.json())
      .then((data) => { setWorkout(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    if (result === "added") toast.success("Added to today's plan!");
    else if (result === "full") toast.error("Plan is full! Max 5 workouts.");
    else toast.error("Already in your plan!");
  };

  const handleSave = () => {
    const result = addToSaved(workout);
    if (result === "added") toast.success("Saved for later!");
    else toast.error("Already saved!");
  };

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",flexDirection:"column",gap:"16px"}}>
      <div style={{width:"48px",height:"48px",border:"4px solid #ccff00",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
      <p style={{color:"#666"}}>Loading workout...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!workout) return (
    <div style={{textAlign:"center",padding:"60px 24px"}}>
      <p style={{color:"#888",marginBottom:"16px"}}>Workout not found.</p>
      <Link href="/" style={{color:"#ccff00"}}>Back to Library</Link>
    </div>
  );

  const alreadyInPlan = plan.find((w) => w.id === workout.id);
  const planFull = plan.length >= 5;

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", `⭐ ${workout.rating}`],
  ];

  return (
    <div style={{backgroundColor:"#0f0f0f", minHeight:"100vh", padding:"40px 24px"}}>
      <div style={{maxWidth:"1100px", margin:"0 auto", display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"40px"}}>

        <div style={{position:"relative", minHeight:"450px", borderRadius:"16px", overflow:"hidden"}}>
          <Image src={workout.image} alt={workout.name} fill
            sizes="(max-width:768px) 100vw, 50vw"
            style={{objectFit:"cover"}} priority />
        </div>

        <div>
          <h1 style={{fontFamily:"Oswald,sans-serif", fontSize:"2.5rem", fontWeight:"700",
            color:"#ffffff", textTransform:"uppercase", marginBottom:"12px"}}>
            {workout.name}
          </h1>
          <p style={{color:"#888888", lineHeight:"1.7", marginBottom:"16px"}}>
            {workout.description}
          </p>
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"24px"}}>
            {workout.muscleGroups?.map((cat) => (
              <span key={cat} style={{backgroundColor:"#ccff00", color:"#000",
                fontSize:"0.7rem", fontWeight:"700", padding:"4px 12px",
                borderRadius:"999px", letterSpacing:"0.05em"}}>
                {cat}
              </span>
            ))}
          </div>

          <div style={{backgroundColor:"#1a1a1a", borderRadius:"12px",
            padding:"16px", marginBottom:"24px"}}>
            {specs.map(([label, value]) => (
              <div key={label} style={{display:"flex", justifyContent:"space-between",
                alignItems:"center", padding:"8px 0",
                borderBottom:"1px solid #2a2a2a"}}>
                <span style={{color:"#666666", fontSize:"0.7rem", letterSpacing:"0.1em"}}>{label}</span>
                <span style={{color:"#ffffff", fontSize:"0.875rem", fontWeight:"500"}}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{marginBottom:"28px"}}>
            <h3 style={{fontFamily:"Oswald,sans-serif", fontSize:"1.1rem", fontWeight:"700",
              color:"#ffffff", textTransform:"uppercase", marginBottom:"12px"}}>
              INSTRUCTIONS
            </h3>
            <ol style={{listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"8px"}}>
              {workout.instructions?.map((step, i) => (
                <li key={i} style={{display:"flex", gap:"12px", color:"#aaaaaa", fontSize:"0.875rem", lineHeight:"1.6"}}>
                  <span style={{color:"#ccff00", fontWeight:"700", minWidth:"20px"}}>{i+1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div style={{display:"flex", gap:"12px", flexWrap:"wrap"}}>
            <button onClick={handleAddToPlan}
              disabled={!!alreadyInPlan || planFull}
              style={{backgroundColor: (alreadyInPlan||planFull) ? "#333" : "#ccff00",
                color: (alreadyInPlan||planFull) ? "#666" : "#000",
                fontWeight:"700", padding:"12px 20px", borderRadius:"999px",
                border:"none", cursor: (alreadyInPlan||planFull) ? "not-allowed" : "pointer",
                fontSize:"0.85rem", display:"flex", alignItems:"center", gap:"6px"}}>
              ➕ Add to today&apos;s plan
            </button>
            <button onClick={handleSave}
              style={{backgroundColor:"transparent", color:"#ccff00",
                fontWeight:"700", padding:"12px 20px", borderRadius:"999px",
                border:"2px solid #ccff00", cursor:"pointer", fontSize:"0.85rem",
                display:"flex", alignItems:"center", gap:"6px"}}>
              🔖 Save for later
            </button>
          </div>

          <Link href="/" style={{color:"#555", fontSize:"0.8rem",
            textDecoration:"none", display:"inline-block", marginTop:"20px"}}>
            ← Back to Library
          </Link>
        </div>
      </div>
    </div>
  );
}
