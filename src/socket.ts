// src/socket.ts
import { io, Socket } from 'socket.io-client';

export function createSocket(
  role: 'interviewer' | 'applicant',
  name?: string,
  company?: string
): Socket {
  return io('https://portfolio-interview-chat.onrender.com', {
    query: {
      role,
      name,
      company,
    },
    transports: ['websocket'], //안정성
  });
}
