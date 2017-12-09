# AccountService

## create()
Account creation business rules.
- parameters
  - email
    - type: string
    - presence: required
    - validation: email format
  - password
    - type: string
    - presence: required
    - validation: length of 7-32 characters
  - level
    - type: integer
    - presence: required
    - validation: 1..2
- returns
  - Account: creation successful
  - 0: password hashing failed
  - 1: email invalid
  - 2: password invalid
  - 3: level invalid

## update()
Account update business rules.
- description
  - Data from the update object will be applied to the original, thus only data
  from the update will be validated. The original is assumed to be valid.
- parameters
  - Account (original)
  - Account (update)
    - email
      - type: string
      - presence: optional
      - validation: email format
    - password
      - type: string
      - presence: optional
      - validation: length of 7-32 characters
    - name
      - type: string
      - presence: optional
      - validation: length of 1-16 characters
    - birthDate
      - type: number
      - presence: optional
      - validation: must be at least 13 years difference to current time
    - address
      - type: string
      - presence: optional
      - validation: none
    - level
      - type: integer
      - presence: optional
      - validation: 1..2
- returns
  - Account: update succesful
  - 0: password hashing failed
  - 1: email invalid
  - 2: password invalid
  - 3: name invalid
  - 4: birthDate invalid
  - 5: address invalid
  - 6: level invalid
