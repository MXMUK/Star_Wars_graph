export interface Vehicle {
  id: number
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  vehicle_class: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- can be any pilot
  pilots: any[]
  films: number[]
  created: string
  edited: string
  url: string
}

