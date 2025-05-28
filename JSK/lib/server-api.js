"use server"

export async function login(email, password) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would authenticate against your backend
  if (email === "test@example.com" && password === "password") {
    return { success: true, message: "Login successful" }
  } else {
    return { success: false, message: "Invalid credentials" }
  }
}

export async function logout() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would invalidate the session on the backend
  return { success: true, message: "Logout successful" }
}

export async function getUserProfile() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would fetch the user profile from your backend
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token")
    if (!token) {
      return { success: false, message: "Unauthorized" }
    }
  }

  return {
    success: true,
    data: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      createdAt: new Date().toISOString(),
    },
  }
}

// Fonction utilitaire pour formater les dates de manière cohérente (version serveur)
export async function formatDateServer(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
} 