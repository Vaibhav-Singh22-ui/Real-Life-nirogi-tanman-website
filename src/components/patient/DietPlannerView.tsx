"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Utensils, Flame, Sparkles, Check, Plus, RefreshCw } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  completed: boolean;
  type: "breakfast" | "lunch" | "dinner" | "snack";
}

const defaultMeals: Meal[] = [
  { id: "1", name: "Warm Ginger Tea & Almonds", calories: 150, protein: 6, carbs: 12, fat: 10, time: "07:30 AM", completed: true, type: "breakfast" },
  { id: "2", name: "Yellow Mung Chilla with Spinach", calories: 350, protein: 18, carbs: 45, fat: 8, time: "08:30 AM", completed: true, type: "breakfast" },
  { id: "3", name: "Quinoa Salad with Roasted Zucchini & Chickpeas", calories: 480, protein: 22, carbs: 65, fat: 12, time: "01:00 PM", completed: false, type: "lunch" },
  { id: "4", name: "Pumpkin Seeds & Apple slices", calories: 180, protein: 5, carbs: 25, fat: 6, time: "04:30 PM", completed: false, type: "snack" },
  { id: "5", name: "Light Lentil Soup with Barley", calories: 320, protein: 16, carbs: 48, fat: 4, time: "07:30 PM", completed: false, type: "dinner" }
];

const ayurvedicSwaps = [
  { original: "Morning Bed Tea/Coffee", swap: "Warm Ginger & Fennel Water", benefit: "Boosts Agni (digestive fire) without acidity." },
  { original: "White Rice & Heavy Curry", swap: "Mung Khichdi with Ghee", benefit: "Easily digestible and pacifies all three Doshas." },
  { original: "Cold Salad at Night", swap: "Steamed Veggies with Cumin", benefit: "Prevents bloating and gas accumulation." },
];

export default function DietPlannerView() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMealName, setNewMealName] = useState("");
  const [newMealCal, setNewMealCal] = useState("");
  const [newMealProt, setNewMealProt] = useState("");
  const [newMealCarbs, setNewMealCarbs] = useState("");
  const [newMealFat, setNewMealFat] = useState("");
  const [newMealType, setNewMealType] = useState<Meal["type"]>("breakfast");

  useEffect(() => {
    const saved = localStorage.getItem("nirogi_diet_meals");
    if (saved) {
      try {
        setMeals(JSON.parse(saved));
      } catch (e) {
        setMeals(defaultMeals);
      }
    } else {
      setMeals(defaultMeals);
    }
  }, []);

  const saveMeals = (updated: Meal[]) => {
    setMeals(updated);
    localStorage.setItem("nirogi_diet_meals", JSON.stringify(updated));
  };

  const toggleMeal = (id: string) => {
    const updated = meals.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
    saveMeals(updated);
    const meal = meals.find(m => m.id === id);
    if (meal) {
      if (!meal.completed) {
        toast.success(`Logged: ${meal.name}`);
      } else {
        toast.info(`Removed: ${meal.name}`);
      }
    }
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName || !newMealCal) {
      toast.error("Please fill in the meal name and calories.");
      return;
    }

    const meal: Meal = {
      id: Date.now().toString(),
      name: newMealName,
      calories: parseInt(newMealCal) || 0,
      protein: parseInt(newMealProt) || 0,
      carbs: parseInt(newMealCarbs) || 0,
      fat: parseInt(newMealFat) || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      completed: true,
      type: newMealType,
    };

    saveMeals([...meals, meal]);
    setNewMealName("");
    setNewMealCal("");
    setNewMealProt("");
    setNewMealCarbs("");
    setNewMealFat("");
    toast.success(`Added & Logged: ${meal.name}`);
  };

  const totalCalories = meals.reduce((acc, m) => acc + (m.completed ? m.calories : 0), 0);
  const totalProtein = meals.reduce((acc, m) => acc + (m.completed ? m.protein : 0), 0);
  const totalCarbs = meals.reduce((acc, m) => acc + (m.completed ? m.carbs : 0), 0);
  const totalFat = meals.reduce((acc, m) => acc + (m.completed ? m.fat : 0), 0);

  const targetCal = 1800;
  const targetProt = 90;
  const targetCarbs = 200;
  const targetFat = 50;

  const calProgress = Math.min(100, Math.round((totalCalories / targetCal) * 100));
  const protProgress = Math.min(100, Math.round((totalProtein / targetProt) * 100));
  const carbProgress = Math.min(100, Math.round((totalCarbs / targetCarbs) * 100));
  const fatProgress = Math.min(100, Math.round((totalFat / targetFat) * 100));

  return (
    <div className="space-y-6 font-['Manrope',sans-serif]">
      {/* Page Header */}
      <section className="grid gap-4 rounded-lg border border-border bg-hero-gradient p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="uppercase-label text-primary font-bold">Patient Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Diet Planner</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Track daily calories and macro goals aligned with your wellness plan. Keep meals warm, balanced, and paced.
          </p>
        </div>
        <div className="rounded-md border border-border bg-background/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Today's Nutrition Focus</p>
          <p className="mt-1 text-sm font-medium text-foreground">Vata pacifying, easily digestible foods.</p>
        </div>
      </section>

      {/* Progress Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-500" /> Calories Logged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCalories} / {targetCal} kcal</div>
            <div className="w-full bg-muted h-2.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${calProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{calProgress}% of daily intake target</p>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalProtein}g / {targetProt}g</div>
            <div className="w-full bg-muted h-2.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full transition-all duration-300" style={{ width: `${protProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{protProgress}% of target reached</p>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Carbohydrates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCarbs}g / {targetCarbs}g</div>
            <div className="w-full bg-muted h-2.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-secondary h-full transition-all duration-300" style={{ width: `${carbProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{carbProgress}% of target reached</p>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Healthy Fats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalFat}g / {targetFat}g</div>
            <div className="w-full bg-muted h-2.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full transition-all duration-300" style={{ width: `${fatProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{fatProgress}% of target reached</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        {/* Daily Meal Log */}
        <Card className="surface-panel">
          <CardHeader className="border-b border-border/40 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" /> Daily Meal Schedule
                </CardTitle>
                <CardDescription>Check off items as you eat them to track your calorie and macro intake.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {meals.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex items-center justify-between p-3.5 border rounded-xl transition-all ${
                    m.completed 
                      ? "border-primary/20 bg-primary/[0.02]" 
                      : "border-border hover:border-primary/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => toggleMeal(m.id)}
                      className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                        m.completed 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "border-input bg-card hover:border-primary"
                      }`}
                    >
                      {m.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </button>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide block leading-none mb-1">
                        {m.type} · {m.time}
                      </span>
                      <p className={`font-semibold text-sm ${m.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {m.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground font-medium">
                        <span>{m.calories} kcal</span>
                        <span>·</span>
                        <span>P: {m.protein}g</span>
                        <span>·</span>
                        <span>C: {m.carbs}g</span>
                        <span>·</span>
                        <span>F: {m.fat}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {meals.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">No meals logged for today.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Add Custom Meal */}
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" /> Log Custom Meal
              </CardTitle>
              <CardDescription>Enter details to add and log custom items.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddMeal} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="meal-name" className="text-xs font-bold">Meal Name</Label>
                  <Input 
                    id="meal-name" 
                    placeholder="e.g. Oatmeal with Chia Seeds" 
                    value={newMealName}
                    onChange={(e) => setNewMealName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="meal-cal" className="text-xs font-bold">Calories (kcal)</Label>
                    <Input 
                      id="meal-cal" 
                      type="number" 
                      placeholder="300" 
                      value={newMealCal}
                      onChange={(e) => setNewMealCal(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="meal-type" className="text-xs font-bold">Meal Type</Label>
                    <Select value={newMealType} onValueChange={(v: any) => setNewMealType(v)}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Breakfast" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="meal-prot" className="text-[10px] font-bold">Protein (g)</Label>
                    <Input 
                      id="meal-prot" 
                      type="number" 
                      placeholder="10" 
                      value={newMealProt}
                      onChange={(e) => setNewMealProt(e.target.value)}
                      className="h-8 text-[11px] px-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="meal-carbs" className="text-[10px] font-bold">Carbs (g)</Label>
                    <Input 
                      id="meal-carbs" 
                      type="number" 
                      placeholder="40" 
                      value={newMealCarbs}
                      onChange={(e) => setNewMealCarbs(e.target.value)}
                      className="h-8 text-[11px] px-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="meal-fat" className="text-[10px] font-bold">Fat (g)</Label>
                    <Input 
                      id="meal-fat" 
                      type="number" 
                      placeholder="5" 
                      value={newMealFat}
                      onChange={(e) => setNewMealFat(e.target.value)}
                      className="h-8 text-[11px] px-2"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full text-xs font-bold h-9 mt-2">
                  Log This Meal
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Ayurvedic Meal Swaps */}
          <Card className="surface-panel">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" /> Ayurvedic Diet Swaps
              </CardTitle>
              <CardDescription>Upgrade your digestion with simple ingredient swaps.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {ayurvedicSwaps.map((item, idx) => (
                <div key={idx} className="text-xs border-b border-border/40 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-1.5 text-muted-foreground line-through">
                    <span>{item.original}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary font-bold mt-0.5">
                    <RefreshCw className="h-3 w-3 stroke-[2.5]" />
                    <span>{item.swap}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-normal">{item.benefit}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
