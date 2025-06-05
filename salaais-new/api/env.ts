import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    SALA_AIS_API: process.env.SALA_AIS_API,
    GOOGLE_CLIENT_ID_WEB: process.env.GOOGLE_CLIENT_ID_WEB,
    GOOGLE_URL_LOGIN: process.env.GOOGLE_URL_LOGIN,

    APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
    APPLE_KEY_ID: process.env.APPLE_KEY_ID,
    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
    APPLE_AUTH_URL: process.env.APPLE_AUTH_URL,
    APPLE_REDIRECT_URL: process.env.APPLE_REDIRECT_URL,
  });
}
