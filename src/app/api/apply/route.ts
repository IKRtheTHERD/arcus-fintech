import { NextResponse } from "next/server";
import { createApplication } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, investableAssets, investorType, referralSource } = body;

    if (!fullName || !email || !phone || !investableAssets || !investorType) {
      return NextResponse.json(
        { error: "Missing required qualification fields." },
        { status: 400 }
      );
    }

    const application = await createApplication({
      fullName,
      email,
      phone,
      investableAssets,
      investorType,
      referralSource,
    });

    return NextResponse.json({
      success: true,
      message: "Accredited investor qualification request received.",
      application,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error processing investor application." },
      { status: 500 }
    );
  }
}
