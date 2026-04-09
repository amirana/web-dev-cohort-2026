# Entity Relationship Diagram

## Comic-con India Parking System

```txt

vehicles_types [icon:car, color: blue] {
  id string pk
  type_name string
  created_at datetime
  updated_at datetime
}

vehicles [icon: car, color: blue] {
  id string pk
  vehicle_type_id fk
  registration_number string
  created_at datetime
  updated_at datetime
}

parking_zones [icon: parking, color: orange] {
  id string pk
  zone_name string
  created_at datetime
}

parking_levels [icon: layers, color: orange] {
  id string pk
  zone_id fk
  level_name string
  level_number string
  created_at datetime
}

spot_categories [icon: tag, color: orange] {
  id string pk
  category_name string
  reserved_for string
  created_at datetime
}

parking_spots [icon: parking, color: orange] {
  id string pk
  categories_id fk
  level_id fk
  spot_number string
  vehicle_type_id fk
  is_available boolean
  created_at datetime
  updated_at datetime
}

tickets [icon: ticket, color: yellow] {
  id string pk
  ticket_number string
  spot_id fk
  vehicle_id fk
  entry_time datetime
  created_at datetime
}

sessions [icon: timer, color: yellow] {
  id string pk
  ticket_id fk
  entry_time datetime
  exit_time datetime
  duration_minutes int
  status enum('active', 'completed', 'cancelled')
  created_at datetime
  updated_at datetime
}

payments [icon: payment, color: green] {
  id string pk
  session_id fk
  parking_fee decimal
  payment_mode enum('cash', 'card', 'upi', 'wallet')
  payment_status enum('pending', 'paid', 'refunded', 'failed')
  paid_at datetime
  created_at datetime
}

vehicles_types.id < vehicles.vehicle_type_id

parking_zones.id < parking_levels.zone_id
parking_levels.id < parking_spots.level_id
spot_categories.id < parking_spots.categories_id

vehicles_types.id < parking_spots.vehicle_type_id

vehicles.id < tickets.vehicle_id

parking_spots.id < tickets.spot_id
tickets.id - sessions.ticket_id

sessions.id - payments.session_id

```
