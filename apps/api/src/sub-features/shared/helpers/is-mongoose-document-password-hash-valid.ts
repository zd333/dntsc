import { compare } from 'bcryptjs';
import { Document } from 'mongoose';

export async function isMongooseDocumentPasswordHashValid<
  T extends Document & { readonly password: string }
>(params: {
  readonly document: T;
  readonly passwordCandidate: string;
}): Promise<boolean> {
  return await compare(params.passwordCandidate, params.document.password);
}
