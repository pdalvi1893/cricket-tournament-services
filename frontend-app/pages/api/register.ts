// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Define a reusable response shape
interface ApiResponse {
  success: boolean;
  message: string;
}

// Mock in-memory users list (use DB in real project)
const users: string[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  // ✅ Basic validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  // ✅ Check duplicate
  if (users.includes(email)) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  // ✅ Add new "user"
  users.push(email);

  console.log(`🟢 Registered user: ${email}`);

  return res.status(200).json({
    success: true,
    message: 'Registered successfully!',
  });
}
