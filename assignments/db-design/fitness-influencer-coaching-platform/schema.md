# Entity Relationship Diagram

## Fitness Influencer Coaching Platform

```txt
users [icon: user, color: black] {
  user_id int pk
  full_name string
  email string
  password_hash string
  phone_number string
  dob date
  gender enum('male', 'female', 'other')
  location string
  role string
  bio string
  profile_picture_url string
  is_active boolean
  created_at datetime
}

client_profile [icon: user, color: black] {
  client_id int pk
  user_id fk
  height_cm decimal
  weight_kg decimal
  goal string
  dietary_preference enum('veg', 'non_vegetarian', 'vegan')
  food_allergies string
  fitness_device string
  created_at datetime
  updated_at datetime
}

trainer_profile [icon: user, color: black] {
  trainer_id int pk
  user_id fk
  years_of_experience decimal
  expertise string
  availability_schedule string
  created_at datetime
  updated_at datetime
}

fitness_plans [icon: notebook, color: blue] {
  plan_id int pk
  trainer_id fk
  name string
  duration_months decimal
  amount decimal
  batch_size int
  description string
  is_active boolean
  created_at datetime
  updated_at datetime
}

client_subscriptions [icon: payment, color: blue] {
  subscription_id int pk 
  client_id fk
  plan_id fk
  start_date date
  end_date date
  status enum('active', 'expired', 'cancelled')
  auto_renewal_enabled boolean
  created_at datetime
}

client_trainer_assignments [icon: users, color: blue] {
  assignment_id int pk
  trainer_id fk
  subscription_id fk
  assigned_date datetime
  status enum('ongoing', 'completed')
  expertise enum('pt', 'dietitian', 'st', 'hc', 'wlc')
  created_at datetime
}

sessions [icon: calendar, color: purple] {
  session_id int pk
  trainer_id fk
  subscription_id fk
  session_type enum('consultation', 'check_in', 'training')
  scheduled_datetime datetime
  duration int
  meeting_link string
  meeting_platform string
  location string
  status enum('scheduled', 'completed', 'cancelled', 'no_show')
  attendance_marked_at datetime
  session_notes string
  completed_at datetime
}

body_measurements [icon: list, color: black] {
  measurement_id int pk
  client_id fk
  recorded_at datetime
  weight_kg decimal
  body_fat_percentage decimal
  muscle_mass_kg decimal
  chest_cm decimal
  waist_cm decimal
  hips_cm decimal
  arms_cm decimal
  measured_by_trainer_id fk
}

check_ins [icon: checklist, color: purple] {
  check_in_id int pk
  trainer_id fk
  subscription_id fk
  scheduled_date datetime
  completed_date datetime
  status enum('scheduled', 'completed', 'missed', 'rescheduled')
  body_measurement_id fk
  next_checkin_date datetime
  created_at datetime
  updated_at datetime
}

 trainer_notes [icon: notebook, color: yellow] {
  note_id int pk
  trainer_id fk
  session_id fk
  check_in_id fk
  note_taken_at datetime
  note string
  category enum('progress', 'advice', 'achievement')
  created_at datetime
  updated_at datetime
 }

diet_plans [icon: notebook, color: orange] {
  diet_plan_id int pk
  subscription_id fk
  created_by_trainer_id fk
  plan_name string
  start_date date
  end_date date
  instructions string
  created_at datetime
  updated_at datetime
}

diet_plan_meals [icon: notebook, color: orange] {
  meal_id int pk
  diet_plan_id fk
  day_of_week enum
  meal_time enum
  food_items string
  calories decimal
  protein_g decimal
  carbs_g decimal
  fat_g decimal
  fibre_g decimal
  created_at datetime
  updated_at datetime
}

transactions [icon: payment, color: green] {
  transaction_id int pk
  subscription_id fk
  amount decimal
  payment_method enum('credit_card', 'debit_card', 'upi', 'bank_transfer')
  payment_type enum('full', 'installment')
  installment_number int 
  total_installments int
  discount decimal
  status enum('pending', 'completed', 'failed', 'refunded')
  transaction_date datetime
  gateway_transaction_id string
  receipt_url string
}


users.user_id - client_profile.user_id
users.user_id - trainer_profile.user_id

fitness_plans.trainer_id > trainer_profile.trainer_id
client_profile.client_id < client_subscriptions.client_id
fitness_plans.plan_id < client_subscriptions.plan_id

client_subscriptions.subscription_id < client_trainer_assignments.subscription_id
trainer_profile.trainer_id < client_trainer_assignments.trainer_id

trainer_profile.trainer_id < sessions.trainer_id
client_subscriptions.subscription_id < sessions.subscription_id 

client_profile.client_id < body_measurements.client_id
trainer_profile.trainer_id < body_measurements.measured_by_trainer_id 

trainer_profile.trainer_id < check_ins.trainer_id
client_subscriptions.subscription_id < check_ins.subscription_id
body_measurements.measurement_id - check_ins.body_measurement_id

client_subscriptions.subscription_id < diet_plans.subscription_id  
trainer_profile.trainer_id < diet_plans.created_by_trainer_id  
diet_plans.diet_plan_id < diet_plan_meals.diet_plan_id

check_ins.check_in_id < trainer_notes.check_in_id
sessions.session_id < trainer_notes.session_id
trainer_profile.trainer_id < trainer_notes.trainer_id

client_subscriptions.subscription_id < transactions.subscription_id 

```