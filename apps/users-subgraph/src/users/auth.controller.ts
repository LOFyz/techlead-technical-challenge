import { All, Controller, Req, Res } from "@nestjs/common";
import { auth } from "../lib/auth";
import type { Request, Response } from "express";

@Controller("api/auth")
export class AuthController {
  @All("*")
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return (auth.handler as any)(req, res);
  }
}
