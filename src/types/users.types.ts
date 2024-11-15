interface User {
  firstName: string
  lastName: string
  email: string
  provider: "google" | "firebase"
}

export default User
