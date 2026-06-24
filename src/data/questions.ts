import { Question, Level, Car, Achievement } from '../types';

export const CARS: Car[] = [
  { id: 'basic', name: 'Basic Sedan', emoji: '🚗', desc: 'The classic starter vehicle, clean and functional.', cost: 0, unlocked: true },
  { id: 'rally', name: 'Rally Cruiser', emoji: '🏎️', desc: 'Fast, agile, and aerodynamically tuned.', cost: 200, unlocked: false },
  { id: 'offroad', name: 'Off-Road 4x4', emoji: '🚙', desc: 'Built for extreme slopes and rocky terrains.', cost: 350, unlocked: false },
  { id: 'pickup', name: 'Heavy Hauler', emoji: '🛻', desc: 'Sturdy frame with massive torque and momentum.', cost: 400, unlocked: false },
  { id: 'sports', name: 'Hyper Speedster', emoji: '🏎️', desc: 'Lightweight body with supercharged electric engine.', cost: 600, unlocked: false },
  { id: 'formula', name: 'Apex Racer', emoji: '🏁', desc: 'F1 style chassis, maximum downforce and grip.', cost: 900, unlocked: false },
  { id: 'monster', name: 'Monster Crusher', emoji: '🚜', desc: 'Giant wheels, absorbs any bumps in the terrain.', cost: 1200, unlocked: false },
  { id: 'electric', name: 'Neo Volt', emoji: '⚡', desc: 'Eco-friendly speed with instant torque delivery.', cost: 750, unlocked: false },
];

export const TERRAINS = [
  'Flat Road',
  'Dirt Road',
  'Forest Trail',
  'Rocky Road',
  'Desert',
  'Snow',
  'Mountain',
  'Steep Hill',
  'Bridge',
  'Volcano Path'
];

export const TERRAIN_COLORS: Record<string, string[]> = {
  'Flat Road': ['#4a5568', '#718096', '#a0aec0'],
  'Dirt Road': ['#744210', '#975a16', '#b7791f'],
  'Forest Trail': ['#276749', '#2f855a', '#38a169'],
  'Rocky Road': ['#2d3748', '#4a5568', '#606060'],
  'Desert': ['#c05621', '#dd6b20', '#ed8936'],
  'Snow': ['#bee3f8', '#90cdf4', '#63b3ed'],
  'Mountain': ['#553c9a', '#6b46c1', '#805ad5'],
  'Steep Hill': ['#2d3748', '#38505e', '#4a616d'],
  'Bridge': ['#8b4513', '#a0522d', '#cd853f'],
  'Volcano Path': ['#9b2335', '#c0392b', '#e74c3c'],
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', name: 'First Victory', icon: '🏁', desc: 'Complete your first level in the physics rally!', earned: false },
  { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', desc: 'Complete 10 levels successfully.', earned: false },
  { id: 'newton_fan', name: 'Newton Fan', icon: '🍎', desc: 'Complete all levels in Zone 2: Newton\'s Laws.', earned: false },
  { id: 'force_master', name: 'Force Master', icon: '💪', desc: 'Complete all levels in Zone 3: Forces & Gravity.', earned: false },
  { id: 'energy_guru', name: 'Energy Guru', icon: '🔋', desc: 'Complete all levels in Zone 4: Work & Energy.', earned: false },
  { id: 'momentum_king', name: 'Momentum King', icon: '👑', desc: 'Complete all levels in Zone 5: Momentum.', earned: false },
  { id: 'coin_collector', name: 'Coin Collector', icon: '🪙', desc: 'Earn 500 total coins.', earned: false },
  { id: 'xp_champion', name: 'XP Champion', icon: '⭐', desc: 'Earn 1,000 total XP.', earned: false },
  { id: 'perfect_run', name: 'Perfect Run', icon: '💯', desc: 'Answer a question correctly on the first attempt.', earned: false },
  { id: 'halfway', name: 'Halfway There', icon: '🎯', desc: 'Complete 50 levels.', earned: false },
  { id: 'century', name: 'Century Mark', icon: '🏆', desc: 'Complete all 100 levels of Newton\'s Challenge!', earned: false },
  { id: 'car_buyer', name: 'Car Enthusiast', icon: '🚗', desc: 'Unlock any car from the Garage.', earned: false },
];

export const QUESTIONS: Record<string, Question[]> = {
  // ZONE 1: MOTION (Levels 1-20)
  motion: [
    {
      q: "A rally car travels 150 meters in 15 seconds. What is its average speed?",
      choices: ["5 m/s", "10 m/s", "15 m/s"],
      correct: 1,
      exp: "Speed = Distance ÷ Time. Here, 150 m ÷ 15 s = 10 m/s.",
      formula: "Speed = Distance / Time",
      topic: "Speed",
      zone: "motion"
    },
    {
      q: "A cyclist covers 360 meters in 60 seconds. What is their speed?",
      choices: ["3 m/s", "6 m/s", "12 m/s"],
      correct: 1,
      exp: "Speed = Distance ÷ Time = 360 m ÷ 60 s = 6 m/s.",
      formula: "Speed = Distance / Time",
      topic: "Speed",
      zone: "motion"
    },
    {
      q: "A runner completes 400 meters in 50 seconds. What is their speed?",
      choices: ["8 m/s", "10 m/s", "12 m/s"],
      correct: 0,
      exp: "Speed = Distance ÷ Time = 400 m ÷ 50 s = 8 m/s.",
      formula: "Speed = Distance / Time",
      topic: "Speed",
      zone: "motion"
    },
    {
      q: "A freight train travels 1000 meters in 40 seconds. What is its speed?",
      choices: ["20 m/s", "25 m/s", "40 m/s"],
      correct: 1,
      exp: "Speed = Distance ÷ Time = 1000 m ÷ 40 s = 25 m/s.",
      formula: "Speed = Distance / Time",
      topic: "Speed",
      zone: "motion"
    },
    {
      q: "A boulder rolls 180 meters in 30 seconds. What is its speed?",
      choices: ["3 m/s", "6 m/s", "9 m/s"],
      correct: 1,
      exp: "Speed = Distance ÷ Time = 180 m ÷ 30 s = 6 m/s.",
      formula: "Speed = Distance / Time",
      topic: "Speed",
      zone: "motion"
    },
    {
      q: "A sports car moving at 25 m/s travels for 8 seconds. How far does it go?",
      choices: ["100 m", "200 m", "300 m"],
      correct: 1,
      exp: "Distance = Speed × Time. Here, 25 m/s × 8 s = 200 m.",
      formula: "Distance = Speed × Time",
      topic: "Distance",
      zone: "motion"
    },
    {
      q: "A passenger bus moving at 15 m/s travels 450 meters. How long does this take?",
      choices: ["15 s", "30 s", "45 s"],
      correct: 1,
      exp: "Time = Distance ÷ Speed = 450 m ÷ 15 m/s = 30 s.",
      formula: "Time = Distance / Speed",
      topic: "Time",
      zone: "motion"
    },
    {
      q: "Convert 72 km/h to meters per second (m/s).",
      choices: ["10 m/s", "20 m/s", "36 m/s"],
      correct: 1,
      exp: "To convert km/h to m/s, divide by 3.6: 72 ÷ 3.6 = 20 m/s.",
      formula: "m/s = km/h ÷ 3.6",
      topic: "Unit Conversion",
      zone: "motion"
    },
    {
      q: "Convert 108 km/h to m/s.",
      choices: ["20 m/s", "30 m/s", "40 m/s"],
      correct: 1,
      exp: "108 ÷ 3.6 = 30 m/s.",
      formula: "m/s = km/h ÷ 3.6",
      topic: "Unit Conversion",
      zone: "motion"
    },
    {
      q: "A car drives 300 m East in 15 s. What is its velocity?",
      choices: ["20 m/s West", "20 m/s East", "20 m/s"],
      correct: 1,
      exp: "Velocity is speed with direction: 300 m ÷ 15 s = 20 m/s East.",
      formula: "Velocity = Displacement / Time",
      topic: "Velocity",
      zone: "motion"
    },
    {
      q: "A runner completes a full lap around a 400 m circular track in 50 s. What is their average velocity?",
      choices: ["0 m/s", "8 m/s", "16 m/s"],
      correct: 0,
      exp: "Velocity depends on displacement. Since the runner started and ended at the same spot, displacement is 0 m, so average velocity is 0 m/s.",
      formula: "Velocity = Displacement / Time",
      topic: "Velocity",
      zone: "motion"
    },
    {
      q: "What is the primary difference between distance and displacement?",
      choices: ["Distance has direction, displacement does not", "Displacement has direction, distance does not", "They are exactly the same physical quantity"],
      correct: 1,
      exp: "Displacement is a vector quantity (magnitude and direction), while distance is scalar (magnitude only).",
      formula: "Displacement = Final Pos - Initial Pos",
      topic: "Displacement",
      zone: "motion"
    },
    {
      q: "A person walks 6 m North, then 8 m East. What is their total distance walked?",
      choices: ["10 m", "14 m", "48 m"],
      correct: 1,
      exp: "Distance is the total path length: 6 m + 8 m = 14 m.",
      formula: "Distance = Sum of all paths",
      topic: "Distance",
      zone: "motion"
    },
    {
      q: "A person walks 6 m North, then 8 m East. What is the magnitude of their displacement?",
      choices: ["10 m", "14 m", "100 m"],
      correct: 0,
      exp: "Displacement is the straight-line distance from start to finish. Using Pythagoras: √(6² + 8²) = √(36 + 64) = √100 = 10 m.",
      formula: "Displacement = √(x² + y²)",
      topic: "Displacement",
      zone: "motion"
    },
    {
      q: "An object is moving with constant velocity. What is its acceleration?",
      choices: ["Zero", "Increasing", "Decreasing"],
      correct: 0,
      exp: "Acceleration is the rate of change of velocity. If velocity is constant, there is no change, so acceleration is zero.",
      formula: "a = Δv / t = 0",
      topic: "Acceleration",
      zone: "motion"
    }
  ],

  // ZONE 2: NEWTON'S LAWS (Levels 21-40)
  newtons: [
    {
      q: "A physics book rests stationary on a dashboard. According to Newton's 1st Law, what is true?",
      choices: ["There are no forces acting on it", "The forces acting on it are perfectly balanced", "Only gravity acts on it"],
      correct: 1,
      exp: "An object at rest remains at rest because the net force is zero. Gravity pulls down, and the dashboard pushes up with an equal normal force.",
      formula: "Net Force = 0 → Acceleration = 0",
      topic: "Newton's 1st Law",
      zone: "newtons"
    },
    {
      q: "A truck abruptly slams on its brakes and packages in the back slide forward. This is an example of:",
      choices: ["Gravitational force", "Inertia (Newton's 1st Law)", "Action-reaction pairs"],
      correct: 1,
      exp: "Due to inertia, the packages keep their forward motion even when the truck stops under them.",
      formula: "Inertia = Resistance to change in motion",
      topic: "Newton's 1st Law",
      zone: "newtons"
    },
    {
      q: "How does the mass of an object relate to its inertia?",
      choices: ["Higher mass means less inertia", "Mass and inertia are completely unrelated", "Higher mass means greater inertia"],
      correct: 2,
      exp: "Mass is the quantitative measure of inertia. The heavier an object, the harder it is to change its state of motion.",
      formula: "Inertia ∝ Mass",
      topic: "Newton's 1st Law",
      zone: "newtons"
    },
    {
      q: "If a hockey puck slides on a perfectly frictionless ice rink, what will happen?",
      choices: ["It will gradually slow down and stop", "It will continue moving at constant speed in a straight line", "It will accelerate continuously"],
      correct: 1,
      exp: "In the absence of external net force (no friction), an object in motion remains in motion at constant velocity.",
      formula: "F_net = 0 → v = constant",
      topic: "Newton's 1st Law",
      zone: "newtons"
    },
    {
      q: "A net force of 30 N acts on a 6 kg toy car. What is the car's acceleration?",
      choices: ["5 m/s²", "180 m/s²", "0.2 m/s²"],
      correct: 0,
      exp: "Using Newton's 2nd Law: a = F ÷ m. Here, 30 N ÷ 6 kg = 5 m/s².",
      formula: "F = m × a  →  a = F / m",
      topic: "Newton's 2nd Law",
      zone: "newtons"
    },
    {
      q: "A 1200 kg vehicle accelerates at 3 m/s². What net force is acting on it?",
      choices: ["400 N", "3600 N", "1203 N"],
      correct: 1,
      exp: "F = m × a. Here, 1200 kg × 3 m/s² = 3600 N.",
      formula: "F = m × a",
      topic: "Newton's 2nd Law",
      zone: "newtons"
    },
    {
      q: "A force of 80 N gives an object an acceleration of 4 m/s². What is the object's mass?",
      choices: ["20 kg", "320 kg", "84 kg"],
      correct: 0,
      exp: "m = F ÷ a. Here, 80 N ÷ 4 m/s² = 20 kg.",
      formula: "m = F / a",
      topic: "Newton's 2nd Law",
      zone: "newtons"
    },
    {
      q: "If the net force acting on a cart is doubled while its mass is kept constant, what happens to its acceleration?",
      choices: ["It is halved", "It remains unchanged", "It is doubled"],
      correct: 2,
      exp: "Acceleration is directly proportional to net force. Doubling the force doubles the acceleration.",
      formula: "a ∝ F_net",
      topic: "Newton's 2nd Law",
      zone: "newtons"
    },
    {
      q: "You push a heavy box with a force of 50 N. According to Newton's 3rd Law, the box exerts a force on you of:",
      choices: ["0 N", "50 N in the opposite direction", "100 N in the same direction"],
      correct: 1,
      exp: "For every action force, there is an equal and opposite reaction force. The box pushes back with 50 N.",
      formula: "F_action = -F_reaction",
      topic: "Newton's 3rd Law",
      zone: "newtons"
    },
    {
      q: "A bird flies by pushing air downwards with its wings. What is the reaction force that lifts the bird?",
      choices: ["The air pushing the wings upwards", "Gravity pulling the bird downwards", "Friction resisting forward motion"],
      correct: 0,
      exp: "The action is wings pushing air down. The reaction is air pushing the wings up, creating lift.",
      formula: "F_action = -F_reaction",
      topic: "Newton's 3rd Law",
      zone: "newtons"
    },
    {
      q: "A high-speed bullet is fired from a heavy rifle. Why is the acceleration of the bullet much larger than the recoil acceleration of the rifle?",
      choices: ["The force on the bullet is much greater", "The bullet has a much smaller mass than the rifle", "The forces are unequal"],
      correct: 1,
      exp: "The forces are equal in magnitude (Newton's 3rd), but since the bullet has a much smaller mass, it experiences a much greater acceleration (Newton's 2nd).",
      formula: "a = F / m",
      topic: "Newton's 3rd Law",
      zone: "newtons"
    },
    {
      q: "A car accelerates from 0 to 24 m/s in 6 seconds. What is its acceleration?",
      choices: ["4 m/s²", "18 m/s²", "144 m/s²"],
      correct: 0,
      exp: "a = (v - u) ÷ t = (24 - 0) ÷ 6 = 4 m/s².",
      formula: "a = (v - u) / t",
      topic: "Acceleration",
      zone: "newtons"
    },
    {
      q: "A motorbike brakes from 30 m/s to 10 m/s in 4 seconds. What is its acceleration?",
      choices: ["-5 m/s²", "-10 m/s²", "-20 m/s²"],
      correct: 0,
      exp: "a = (v - u) ÷ t = (10 - 30) ÷ 4 = -20 ÷ 4 = -5 m/s².",
      formula: "a = (v - u) / t",
      topic: "Acceleration",
      zone: "newtons"
    }
  ],

  // ZONE 3: FORCES & GRAVITY (Levels 41-60)
  forces: [
    {
      q: "What is the SI unit of force?",
      choices: ["Joule", "Pascal", "Newton"],
      correct: 2,
      exp: "The SI unit of force is the Newton (N). One Newton is the force needed to accelerate 1 kg by 1 m/s².",
      formula: "1 N = 1 kg·m/s²",
      topic: "Units of Force",
      zone: "forces"
    },
    {
      q: "A block is pulled with 15 N of force to the right and 5 N of force to the left. What is the net force?",
      choices: ["10 N to the right", "20 N to the right", "10 N to the left"],
      correct: 0,
      exp: "Forces in opposite directions subtract: 15 N - 5 N = 10 N to the right.",
      formula: "F_net = F_right - F_left",
      topic: "Net Force",
      zone: "forces"
    },
    {
      q: "An astronaut has a mass of 80 kg on Earth. What is their mass on the Moon where gravity is 1/6th of Earth's?",
      choices: ["13.3 kg", "80 kg", "480 kg"],
      correct: 1,
      exp: "Mass is the amount of matter and remains constant regardless of gravitational pull. Weight changes, mass does not.",
      formula: "Mass is constant",
      topic: "Mass vs Weight",
      zone: "forces"
    },
    {
      q: "A crate has a mass of 25 kg. What is its approximate weight on Earth? (Use g = 10 m/s²)",
      choices: ["2.5 N", "25 N", "250 N"],
      correct: 2,
      exp: "Weight = Mass × Gravity = 25 kg × 10 m/s² = 250 Newtons.",
      formula: "W = m × g",
      topic: "Weight",
      zone: "forces"
    },
    {
      q: "A lunar lander weighs 160 N on the Moon, where gravity is 1.6 m/s². What is its mass?",
      choices: ["10 kg", "100 kg", "256 kg"],
      correct: 1,
      exp: "m = W ÷ g. Here, 160 N ÷ 1.6 m/s² = 100 kg.",
      formula: "m = W / g",
      topic: "Weight",
      zone: "forces"
    },
    {
      q: "If you drop a feather and a bowling ball simultaneously in a vacuum chamber, what happens?",
      choices: ["The bowling ball hits the ground first", "The feather hits the ground first", "They hit the ground at exactly the same time"],
      correct: 2,
      exp: "In a vacuum, there is no air resistance. Gravity accelerates all objects at the same rate, regardless of mass.",
      formula: "a = g = 10 m/s²",
      topic: "Gravity",
      zone: "forces"
    },
    {
      q: "An object is dropped from a high bridge. Using g = 10 m/s², what is its speed after 4 seconds of free fall?",
      choices: ["10 m/s", "20 m/s", "40 m/s"],
      correct: 2,
      exp: "v = u + g × t = 0 + 10 × 4 = 40 m/s.",
      formula: "v = u + g × t",
      topic: "Free Fall",
      zone: "forces"
    },
    {
      q: "What force opposes the sliding or rolling of one object over another?",
      choices: ["Tension", "Friction", "Normal Force"],
      correct: 1,
      exp: "Friction is a contact force that acts in the direction opposite to relative motion between surfaces.",
      formula: "F_friction = μ × F_normal",
      topic: "Friction",
      zone: "forces"
    },
    {
      q: "Why is it easier to slide a heavy trunk across a smooth wooden floor than a rough carpeted floor?",
      choices: ["The wood provides more gravitational force", "The smooth wood has a lower coefficient of friction", "The carpet has lower friction"],
      correct: 1,
      exp: "Friction depends on surface roughness. Smoother surfaces have lower coefficients of friction (μ).",
      formula: "F_f = μ × F_N",
      topic: "Friction",
      zone: "forces"
    },
    {
      q: "A car drives at constant speed. The engine exerts 600 N forward. What is the force of friction/air resistance?",
      choices: ["Less than 600 N", "Exactly 600 N", "More than 600 N"],
      correct: 1,
      exp: "At constant speed, acceleration is 0, which means net force is 0. Forward engine force and backward friction must balance perfectly: 600 N.",
      formula: "F_net = F_engine - F_friction = 0",
      topic: "Balanced Forces",
      zone: "forces"
    }
  ],

  // ZONE 4: WORK & ENERGY (Levels 61-80)
  work: [
    {
      q: "A mechanical force of 40 Newtons pushes a box 5 meters along a flat surface. How much work is done?",
      choices: ["8 J", "45 J", "200 J"],
      correct: 2,
      exp: "Work Done = Force × Distance. Here, 40 N × 5 m = 200 Joules.",
      formula: "Work = F × d",
      topic: "Work Done",
      zone: "work"
    },
    {
      q: "You lift a 10 kg box vertically upward by 2 meters. How much work do you perform? (g = 10 m/s²)",
      choices: ["20 J", "100 J", "200 J"],
      correct: 2,
      exp: "Work done against gravity: W = m × g × h = 10 kg × 10 m/s² × 2 m = 200 J.",
      formula: "Work = m × g × h",
      topic: "Work Done",
      zone: "work"
    },
    {
      q: "You push a heavy stone wall with 500 N of force for 2 minutes, but the wall does not move. How much work is done?",
      choices: ["0 Joules", "1000 Joules", "60,000 Joules"],
      correct: 0,
      exp: "Work requires movement in the direction of the force. Since distance d = 0, Work = Force × 0 = 0 Joules.",
      formula: "Work = F × d  (if d=0, W=0)",
      topic: "Work Done",
      zone: "work"
    },
    {
      q: "What is the SI unit of work and energy?",
      choices: ["Newton", "Watt", "Joule"],
      correct: 2,
      exp: "Both work and energy are measured in Joules (J). 1 Joule is 1 Newton-meter.",
      formula: "1 J = 1 N·m = 1 kg·m²/s²",
      topic: "Units",
      zone: "work"
    },
    {
      q: "A motor lifts a load, performing 900 Joules of work in 3 seconds. What is its power output?",
      choices: ["300 Watts", "2700 Watts", "903 Watts"],
      correct: 0,
      exp: "Power = Work ÷ Time. Here, 900 J ÷ 3 s = 300 Watts.",
      formula: "Power = Work / Time",
      topic: "Power",
      zone: "work"
    },
    {
      q: "What is the primary definition of Power in physics?",
      choices: ["The total amount of force applied", "The rate at which work is done or energy is transferred", "The product of mass and velocity"],
      correct: 1,
      exp: "Power measures how quickly work is completed, measured in Joules per second (Watts).",
      formula: "Power = Work / Time",
      topic: "Power",
      zone: "work"
    },
    {
      q: "A machine with a power of 50 Watts operates for 10 seconds. How much energy/work does it consume?",
      choices: ["5 Joules", "60 Joules", "500 Joules"],
      correct: 2,
      exp: "Work/Energy = Power × Time = 50 W × 10 s = 500 J.",
      formula: "Energy = Power × Time",
      topic: "Power",
      zone: "work"
    },
    {
      q: "An object is pulled up a 30-degree inclined ramp. What component of its weight pulls it backward down the ramp?",
      choices: ["m × g × cos(θ)", "m × g × sin(θ)", "m × g × tan(θ)"],
      correct: 1,
      exp: "The component of gravitational force parallel to an inclined plane is always m g sin(θ).",
      formula: "F_parallel = m × g × sin(θ)",
      topic: "Inclined Planes",
      zone: "work"
    },
    {
      q: "A 10 kg box sits on a 30° inclined slope. If g = 10 m/s², what is the parallel force pulling it down the slope? (sin 30° = 0.5)",
      choices: ["50 N", "86.6 N", "100 N"],
      correct: 0,
      exp: "F_parallel = m g sin(30°) = 10 kg × 10 m/s² × 0.5 = 50 Newtons.",
      formula: "F = m × g × sin(θ)",
      topic: "Inclined Planes",
      zone: "work"
    },
    {
      q: "What kind of energy is stored in a compressed spring or an object held at a high height?",
      choices: ["Kinetic Energy", "Potential Energy", "Thermal Energy"],
      correct: 1,
      exp: "Potential energy is stored energy due to position or state (like height in gravity or spring compression).",
      formula: "PE_grav = mgh",
      topic: "Potential Energy",
      zone: "work"
    }
  ],

  // ZONE 5: MOMENTUM & KINETIC ENERGY (Levels 81-100)
  momentum: [
    {
      q: "What is the momentum of a 5 kg bowling ball rolling at 8 m/s?",
      choices: ["1.6 kg·m/s", "13 kg·m/s", "40 kg·m/s"],
      correct: 2,
      exp: "Momentum p = mass × velocity = 5 kg × 8 m/s = 40 kg·m/s.",
      formula: "p = m × v",
      topic: "Momentum",
      zone: "momentum"
    },
    {
      q: "A heavy 1500 kg pickup truck travels at 20 m/s. What is its momentum?",
      choices: ["75 kg·m/s", "30,000 kg·m/s", "1520 kg·m/s"],
      correct: 1,
      exp: "p = m × v = 1500 kg × 20 m/s = 30,000 kg·m/s.",
      formula: "p = m × v",
      topic: "Momentum",
      zone: "momentum"
    },
    {
      q: "Which has more momentum: a 10 kg cart moving at 3 m/s, or a 2 kg skateboard moving at 12 m/s?",
      choices: ["The 10 kg cart", "The 2 kg skateboard", "They are exactly equal"],
      correct: 0,
      exp: "Cart momentum = 10 × 3 = 30 kg·m/s. Skateboard momentum = 2 × 12 = 24 kg·m/s. The cart has more.",
      formula: "p = m × v",
      topic: "Momentum comparison",
      zone: "momentum"
    },
    {
      q: "What physical quantity is equal to the change in momentum of an object?",
      choices: ["Force", "Work Done", "Impulse"],
      correct: 2,
      exp: "Impulse is defined as the change in momentum, and is also equal to Force × Time.",
      formula: "Impulse = F × Δt = Δp",
      topic: "Impulse",
      zone: "momentum"
    },
    {
      q: "A force of 50 Newtons acts on a ball for 4 seconds. What is the impulse delivered?",
      choices: ["12.5 N·s", "200 N·s", "54 N·s"],
      correct: 1,
      exp: "Impulse = Force × Time = 50 N × 4 s = 200 N·s.",
      formula: "Impulse = F × t",
      topic: "Impulse",
      zone: "momentum"
    },
    {
      q: "Why do modern cars have 'crumple zones' that fold easily in a crash?",
      choices: ["To look cooler", "To increase collision time, thereby reducing the average impact force", "To increase the final momentum"],
      correct: 1,
      exp: "By extending the collision duration (t), the force (F) required to produce the same change in momentum is reduced, saving lives.",
      formula: "F = Δp / Δt",
      topic: "Impulse applications",
      zone: "momentum"
    },
    {
      q: "What is the kinetic energy of a 4 kg drone flying at 10 m/s?",
      choices: ["40 J", "200 J", "400 J"],
      correct: 1,
      exp: "Kinetic Energy = ½ m v² = 0.5 × 4 kg × 10² = 2 × 100 = 200 Joules.",
      formula: "KE = ½ m v²",
      topic: "Kinetic Energy",
      zone: "momentum"
    },
    {
      q: "If you double the velocity of a rally car, what happens to its kinetic energy?",
      choices: ["It is doubled", "It is tripled", "It is quadrupled"],
      correct: 2,
      exp: "Since velocity is squared in the KE formula, doubling velocity increases the kinetic energy by 2² = 4 times.",
      formula: "KE ∝ v²",
      topic: "Kinetic Energy",
      zone: "momentum"
    },
    {
      q: "A 10 kg block falls from a shelf 5 meters high. What is its kinetic energy right before it hits the floor? (g = 10 m/s²)",
      choices: ["50 J", "250 J", "500 J"],
      correct: 2,
      exp: "By conservation of energy, the gravitational potential energy at the top converts entirely to kinetic energy at the bottom: KE = PE = m g h = 10 × 10 × 5 = 500 Joules.",
      formula: "KE_final = m × g × h",
      topic: "Conservation of Energy",
      zone: "momentum"
    },
    {
      q: "In an inelastic collision between two carts on a bumper track, what is always conserved?",
      choices: ["Kinetic Energy is conserved", "Total Momentum is conserved", "Both Momentum and Kinetic Energy"],
      correct: 1,
      exp: "Momentum is conserved in all collisions (closed system). Kinetic energy is only conserved in perfectly elastic collisions.",
      formula: "p_before = p_after",
      topic: "Collisions",
      zone: "momentum"
    }
  ]
};

// Flatten questions for easy random picking per zone
export const ALL_QUESTIONS: Question[] = [];
Object.entries(QUESTIONS).forEach(([zone, qs]) => {
  qs.forEach(q => ALL_QUESTIONS.push({ ...q, zone }));
});

// Helper to generate all 100 levels
export function generateLevels(): Level[] {
  const levels: Level[] = [];
  const zoneMapKeys = ['motion', 'motion', 'newtons', 'newtons', 'forces', 'forces', 'work', 'work', 'momentum', 'momentum'];
  
  for (let i = 1; i <= 100; i++) {
    // 20 levels per zone
    const zoneIdx = Math.floor((i - 1) / 20); // 0 to 4
    const zoneKey = zoneMapKeys[Math.floor((i - 1) / 10)]; // Map to key
    const terrain = TERRAINS[(i - 1) % TERRAINS.length];
    const difficulty = Math.ceil(i / 10);
    const questionsNeeded = i <= 20 ? 1 : i <= 60 ? 2 : 3; // Increase length as level rises
    const coins = 30 + difficulty * 10;
    const xp = 50 + difficulty * 15;

    const topicsByZoneKey: Record<string, string[]> = {
      motion: ['Speed & Distance', 'Average Velocity', 'Displacement', 'Acceleration Metrics', 'Unit Conversions'],
      newtons: ['Newton\'s First Law', 'F=ma Calculation', 'Action & Reaction Pairs', 'Acceleration Vectors', 'Inertia & Mass'],
      forces: ['Units & Scaling', 'Gravitational Weight', 'Free Fall Mechanics', 'Frictional Resistance', 'Net Balanced Forces'],
      work: ['Frictional Limits', 'Inclined Plane Forces', 'Work Done Calculations', 'Power Rates', 'Stored Potential Energy'],
      momentum: ['Momentum Vectors', 'Impulse Impact', 'Kinetic Energy Squaring', 'Elastic Collisions', 'Conservation Laws']
    };

    const topics = topicsByZoneKey[zoneKey] || topicsByZoneKey.motion;
    const topic = topics[(i - 1) % topics.length];

    levels.push({
      id: i,
      zone: zoneIdx + 1,
      terrain,
      topic,
      questionsNeeded,
      coins,
      xp,
      difficulty
    });
  }
  return levels;
}

export const LEVELS = generateLevels();
