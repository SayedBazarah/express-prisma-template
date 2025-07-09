import * as bcrypt from "bcrypt";

async function hash(data: string | Buffer): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(data, salt);
}

async function compare(
  data: string | Buffer,
  encrypted: string
): Promise<boolean> {
  return bcrypt.compare(data, encrypted);
}

export { hash, compare };
