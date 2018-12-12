import { Document } from 'mongoose';

export async function isMongooseDocumentPasswordHashValid<
  T extends Document & { password: string }
>(params: {
  readonly document: T;
  readonly passwordCandidate: string;
}): Promise<boolean> {
  // TODO: implement
  return await false;
}
