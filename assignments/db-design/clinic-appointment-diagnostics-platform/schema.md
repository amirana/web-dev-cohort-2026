# 🏥 Entity Relationship Diagram

## Clinic Appointment & Diagnostics Platform

```txt

specialities [icon: award, color: white] {
  specialities_id int pk
  name string
  description string
  created_at timestamp
}

doctors [icon: doctor, color: white] {
  doctor_id int pk
  specialities_id fk
  first_name string
  last_name string
  qualifications string
  years_of_experience int
  consulatation_fee decimal
  email string
  phone_number string
  availability timestamp
  profile_image_url string
  bio string
  created_at timestamp
  updated_at timestamp
}

patients [icon: users, color: orange] {
  patient_id int pk
  first_name string
  last_name string
  age int
  gender string
  blood_group string
  phone_number string
  emergency_phone_number string
  email string
  address string
  pincode int
  city string
  state string
  country string
  profile_image_url string
  created_at timestamp
  updated_at timestamp
}

appointments [icon: calendar, color: blue] {
  appointment_id int pk
  patient_id fk
  doctor_id fk
  reason string
  appointment_datetime timestamp
  type enum('walk_in', 'emergency', 'follow_up', 'online')
  status enum('confirmed', 'rescheduled', 'cancelled')
  rescheduled_datetime timestamp
  reason_for_cancellation string
  cancelled_by string
  booked_by string
  created_at timestamp
  updated_at timestamp
}

consultations [icon: doctor, color: yellow] {
  consulatation_id int pk
  appointment_id fk
  patient_id fk
  doctor_id fk
  symptoms string
  diagnosis string
  notes string
  next_appointment_datetime timestamp
  created_at timestamp
}

prescriptions [icon: list, color: blue] {
  prescription_id int pk
  consulatation_id fk
  medicine_id fk
  dosage string
  duration string
  instructions string
  created_at timestamp
}

medicines [icon: capsule, color: blue] {
  medicine_id int pk
  name string
  type string
}

diagnosis_reports [icon: report, color: blue] {
  report_id int pk
  prescription_id fk
  patient_id fk
  doctor_id fk
  report_type string
  description string
  sample string
  result string
  amount decimal
  taken_by string
  status enum('pending', 'ready', 'sent', 'reviewed')
  remark string
  generated_date timestamp
}

payments [icon: payment, color: green] {
  payment_id int pk
  patient_id fk
  consulatation_id fk
  report_id fk
  prescription_id fk
  invoice_number string
  consulatation_fee decimal
  subtotal decimal
  discount decimal
  tax_amount decimal
  total_amount decimal
  paid_amount decimal
  due_amount decimal
  payment_mode enum('debit_card', 'credit_card', 'upi', 'bank_transfer')
  payment_status enum('pending', 'completed', 'failed')
  paid_at timestamp
  reciept_url string
  payment_datetime timestamp
}

specialities.specialities_id - doctors.specialities_id

patients.patient_id < appointments.patient_id
doctors.doctor_id < appointments.doctor_id

appointments.appointment_id - consultations.appointment_id

patients.patient_id < consultations.patient_id
doctors.doctor_id < consultations.doctor_id

consultations.consultation_id < prescriptions.consultation_id

prescriptions.prescription_id < diagnosis_reports.prescription_id
patients.patient_id < diagnosis_reports.patient_id
doctors.doctor_id < diagnosis_reports.doctor_id
medicines.medicine_id < prescriptions.medicine_id

patients.patient_id < payments.patient_id
consultations.consultation_id < payments.consultation_id
diagnosis_reports.report_id < payments.report_id
prescriptions.prescription_id < payments.prescription_id

```
