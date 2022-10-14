import { compare } from "bcryptjs";

interface IHashedPasses {
    hashed: string;
    password: string;
}

async function validateHashedPasswords({ hashed, password }: IHashedPasses) {
    return await compare(password, hashed)
}

export { validateHashedPasswords };