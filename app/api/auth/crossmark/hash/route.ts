import crypto from 'crypto';
import { NextResponse } from 'next/server';

function generateSecureRandomHash(): string {
  // Generate a random buffer (16 bytes in this example)
  const randomBuffer = crypto.randomBytes(16);

  // Create a SHA-256 hash of the random buffer
  const sha256Hash = crypto
    .createHash('sha256')
    .update(randomBuffer)
    .digest('hex');

  return sha256Hash;
}

export async function GET(): Promise<NextResponse> {
  try {
    const hash = generateSecureRandomHash();
    return NextResponse.json({ hash }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
