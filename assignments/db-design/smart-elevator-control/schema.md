# Entity Relationship Diagram

## Smart Elevator Control

```txt

buildings [icon: building, color: blue] {
  id int pk
  name string
  total_floors int
  location string
  created_at datetime
}

zones [icon: layout, color: blue] {
  id int pk
  building_id fk
  zone_name string
  floor_range_start int
  floor_range_end int
}

shafts [icon: arrow-up, color: orange] {
  id int pk
  zone_id fk
  shaft_number int
  shaft_type enum('passenger', 'service', 'goods')
}

elevators [icon: zap, color: orange] {
  id int pk
  shaft_id fk
  elevator_number int
  capacity_people int
  capacity_kgs int
}

floor_requests [icon: bell, color: yellow] {
  id int pk
  building_id fk
  floor_number int
  direction enum('up', 'down')
  requested_at datetime
  status enum('pending', 'assigned', 'completed', 'cancelled')
}

ride_assignments [icon: git-branch, color: green] {
  id int pk
  floor_request_id fk
  elevator_id fk
  destination_floor int
  status enum('pending', 'in_progress', 'completed', 'cancelled')
  assigned_at datetime
}

elevator_status [icon: activity, color: black] {
  id int pk
  elevator_id fk
  current_floor int
  direction enum('up', 'down')
  status enum('occupied', 'available', 'maintenance')
  last_updated datetime

}

ride_logs [icon: clock, color: purple] {
  id int pk
  ride_assignments_id fk
  start_floor int
  end_floor int
  start_time datetime
  end_time datetime
}

maintenance [icon: tool, color: red] {
  id int pk
  elevator_id fk
  reason string
  maintenance_date date
  resolved_date date
  status enum('checked', 'repaired', 'ready')
  done_by string
}

buildings.id < zones.building_id

zones.id < shafts.zone_id

shafts.id - elevators.shaft_id

elevators.id < ride_assignments.elevator_id

buildings.id < floor_requests.building_id

elevators.id - elevator_status.elevator_id

elevators.id < maintenance.elevator_id

floor_requests.id < ride_assignments.floor_request_id
ride_assignments.id < ride_logs.ride_assignments_id


```
