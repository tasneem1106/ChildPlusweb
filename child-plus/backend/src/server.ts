import express from 'express';
import cors from 'cors';
import { supabase } from './services/supabase';
import { analyzeGrowth } from './services/growthEngine';
import { Child, GrowthRecord, Milestone } from 'shared';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', database: 'supabase', timestamp: new Date() });
});

// Endpoint to register a child
app.post('/api/children', async (req, res) => {
  try {
    const { name, date_of_birth, gender, anganwadi_center_id, village_name, parent_name, parent_phone } = req.body;
    
    if (!name || !date_of_birth || !gender || !anganwadi_center_id) {
      return res.status(400).json({ error: 'Missing required child registration fields' });
    }

    const newChild = {
      name,
      date_of_birth,
      gender,
      anganwadi_center_id,
      village_name: village_name || '',
      parent_name: parent_name || '',
      parent_phone: parent_phone || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('children')
      .insert([newChild])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error('Error inserting child:', err);
    res.status(500).json({ error: err.message || 'Server error inserting child' });
  }
});

// Endpoint to record growth metrics (analyzes and saves)
app.post('/api/growth', async (req, res) => {
  try {
    const { child_id, height_cm, weight_kg, muac_mm, measured_by_aww_id, notes, measured_at } = req.body;
    
    if (!child_id || !height_cm || !weight_kg || !measured_by_aww_id) {
      return res.status(400).json({ error: 'Missing required growth record fields' });
    }

    // 1. Fetch child to get date of birth and gender
    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('date_of_birth, gender')
      .eq('id', child_id)
      .single();

    if (childError || !childData) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Calculate age in months
    const dob = new Date(childData.date_of_birth);
    const measurementDate = measured_at ? new Date(measured_at) : new Date();
    const diffTime = Math.abs(measurementDate.getTime() - dob.getTime());
    const ageMonths = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.4375))); // Average month duration

    // 2. Perform WHO growth standards analysis
    const analysis = analyzeGrowth(childData.gender, ageMonths, height_cm, weight_kg);

    const growthRecord = {
      child_id,
      measured_at: measurementDate.toISOString(),
      height_cm,
      weight_kg,
      muac_mm: muac_mm || null,
      
      weight_for_age_z: analysis.weightForAgeZ,
      height_for_age_z: analysis.heightForAgeZ,
      weight_for_height_z: analysis.weightForHeightZ,
      
      wasting_status: analysis.wastingStatus,
      stunting_status: analysis.stuntingStatus,
      underweight_status: analysis.underweightStatus,
      
      measured_by_aww_id,
      notes: notes || '',
      photo_validation_status: 'PENDING'
    };

    // 3. Save to Supabase
    const { data, error } = await supabase
      .from('growth_records')
      .insert([growthRecord])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error('Error logging growth:', err);
    res.status(500).json({ error: err.message || 'Server error logging growth' });
  }
});

// Endpoint to log milestone completion
app.post('/api/milestones', async (req, res) => {
  try {
    const { child_id, milestone_code, milestone_name, category, target_age_months, completed, logged_by_aww_id, notes } = req.body;
    
    if (!child_id || !milestone_code || !milestone_name || !category || !logged_by_aww_id) {
      return res.status(400).json({ error: 'Missing required milestone completion fields' });
    }

    const milestoneRecord = {
      child_id,
      milestone_code,
      milestone_name,
      category,
      target_age_months: target_age_months || 0,
      completed: !!completed,
      completed_at: completed ? new Date().toISOString() : null,
      logged_by_aww_id,
      notes: notes || ''
    };

    const { data, error } = await supabase
      .from('milestones')
      .upsert([milestoneRecord], { onConflict: 'child_id,milestone_code' })
      .select();

    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error('Error logging milestone:', err);
    res.status(500).json({ error: err.message || 'Server error logging milestone' });
  }
});

// Endpoint to get a child's complete profile and dashboard data (for AWW or parent view)
app.get('/api/children/:id/dashboard', async (req, res) => {
  try {
    const childId = req.params.id;

    // Fetch Child Details
    const { data: child, error: childError } = await supabase
      .from('children')
      .select('*')
      .eq('id', childId)
      .single();

    if (childError || !child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Fetch Growth History
    const { data: growthHistory, error: growthError } = await supabase
      .from('growth_records')
      .select('*')
      .eq('child_id', childId)
      .order('measured_at', { ascending: false });

    // Fetch Milestone Status
    const { data: milestones, error: milestoneError } = await supabase
      .from('milestones')
      .select('*')
      .eq('child_id', childId);

    // Compute "Poshan Flower" parameters based on the most recent growth record
    const latestRecord = growthHistory && growthHistory.length > 0 ? growthHistory[0] : null;
    const completedMilestonesCount = milestones ? milestones.filter(m => m.completed).length : 0;
    
    const poshanFlower = {
      petal_weight: latestRecord ? latestRecord.underweight_status : 'NORMAL', // NORMAL / MAM / SAM
      petal_height: latestRecord ? latestRecord.stunting_status : 'NORMAL', // NORMAL / MAM / SAM
      petal_learning: completedMilestonesCount, // Number of leaves cleared
      vibrancy: latestRecord ? 'BLOOMING' : 'WILTED'
    };

    res.json({
      child,
      latestRecord,
      poshanFlower,
      growthHistory: growthHistory || [],
      milestones: milestones || []
    });
  } catch (err: any) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json({ error: err.message || 'Server error fetching dashboard' });
  }
});

app.listen(port, () => {
  console.log(`Child Plus backend running on http://localhost:${port}`);
});
