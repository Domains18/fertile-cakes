import { PrismaClient  } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword, generateToken } from "../utils/utils";

const prisma = new PrismaClient();

interface expectedUserProps {
    email: string;
    password: string;
}

interface exportedWithError extends Error {
    status: number;
    message: string;
    stack: string | null;
}

interface exportedUser extends expectedUserProps{
    token: string;
}

export async function createUser(req: Request, res: Response) {
    const { email, password }: expectedUserProps = req.body
    
    if (!email || !password) {
        return res.status(400).json({ status: 400, message: "fields are empty", stack: null} as exportedWithError)
    }

    const uniqueUser = await prisma.user.findUnique({ where: { email } })
    if (uniqueUser) {
        return res.status(400).json({ status: 400, message: "user already exists", stack: null} as exportedWithError)
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({ data: { email, password: hashedPassword } })

    if (!newUser) {
        return res.status(500).json({ status: 500, message: "server error", stack: null} as exportedWithError)
    }
    const token = generateToken(newUser.id)

    const user: exportedUser = { email, password, token }

    return res.status(201).json(user)
}



export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            password: false,
            email: true
        }
    })
    return res.status(200).json(users)
}