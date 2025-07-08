// src/socket.ts
import { io, Socket } from 'socket.io-client';

export function createSocket(
  role: 'interviewer' | 'applicant',
  name?: string,
  company?: string
): Socket {
  return io('http://localhost:10000', {
    query: {
      role,
      name,
      company,
    },
  });
}
