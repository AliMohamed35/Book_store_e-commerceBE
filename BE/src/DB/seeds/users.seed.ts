import type { UserCreationAttributes } from "../models/user.model.ts";

// Password: "Password123!" - hashed with bcrypt (10 rounds)
const hashedPassword = "$2b$10$rQZ8K9jXfZL5C0Zt3Q5vZeKqZmV6X8F5nL2rM4sD1pJ6hG3wY7iNu";

// Egyptian first names
const firstNames = [
  "Ahmed", "Mohamed", "Ali", "Omar", "Hassan", "Youssef", "Mahmoud", "Khaled", 
  "Sara", "Fatma", "Nour", "Aya", "Mona", "Heba", "Dina", "Rania", "Layla", 
  "Ibrahim", "Mostafa", "Tarek", "Amr", "Sherif", "Karim", "Amir", "Adam"
];

// Egyptian last names
const lastNames = [
  "Hassan", "Mohamed", "Ali", "Ibrahim", "Salem", "Farouk", "Mansour", "Nabil",
  "Khalil", "Saeed", "Rashid", "Abdel", "Gamal", "Hossam", "Essam", "Fathy"
];

// Egyptian cities
const cities = [
  "Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Hurghada", "Sharm El Sheikh",
  "Port Said", "Suez", "Mansoura", "Tanta", "Ismailia", "Fayoum", "Zagazig"
];

function generateUsers(count: number): UserCreationAttributes[] {
  const users: UserCreationAttributes[] = [];

  // First user is always Admin
  users.push({
    name: "Admin User",
    email: "admin@bookstore.com",
    password: hashedPassword,
    address: "123 Admin Street, Cairo, Egypt",
    phone_number: "+201000000000",
    role: "ADMIN" as const,
    isActive: true,
    isDeleted: false,
    refreshToken: null,
    otp: null,
    isVerified: true,
  });

  // Generate remaining customers
  for (let i = 1; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const phoneNumber = `+201${String(i).padStart(9, '0')}`;
    
    users.push({
      name: `${firstName} ${lastName}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      address: `${100 + i} ${lastName} Street, ${city}, Egypt`,
      phone_number: phoneNumber,
      role: "CUSTOMER" as const,
      isActive: Math.random() > 0.2,        // 80% active
      isDeleted: Math.random() < 0.05,      // 5% deleted
      refreshToken: null,
      otp: null,
      isVerified: Math.random() > 0.15,     // 85% verified
    });
  }

  return users;
}

export const userSeeds = generateUsers(100);
