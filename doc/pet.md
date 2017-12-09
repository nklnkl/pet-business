# Pet

## create
- parameters
  - species
    - type: number
    - presence: required
    - validation: 1..Species list length
  - breed
    - type: number
    - presence: required
    - validation: 1..Breeds list length
  - birthDate
    - type: number
    - presence: required
    - validation: none
  - name
    - type: string
    - presence: required
    - validation: length of 1-16 characters
  - status
    - type: number
    - presence: required
    - validation: 1..2
- returns
  - 1: invalid species
  - 2: invalid breed
  - 3: invalid name
  - 4: invalid birthDate
  - 5: invalid status

## update
- description
  - Data from the update object will be applied to the original, thus only data
  from the update will be validated. The original is assumed to be valid.
- parameters
  - Pet (original)
  - Object (update)
- returns
  - 1: invalid species
    - type: number
    - presence: required
    - validation: 1..Species list length
  - 2: invalid breed
    - type: number
    - presence: required
    - validation: 1..Breeds list length
  - 3: invalid name
    - type: string
    - presence: required
    - validation: length of 1-16 characters
  - 4: invalid birthDate
    - type: number
    - presence: required
    - validation: none
  - 5: invalid status
    - type: number
    - presence: required
    - validation: 1..2
