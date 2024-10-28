import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET_KEY;
