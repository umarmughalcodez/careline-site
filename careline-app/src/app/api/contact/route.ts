import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // TODO: Connect email delivery using RESEND_API_KEY and CONTACT_TO_EMAIL.
    // Use a provider such as Resend or a mailer once the environment variables are configured.
    console.log("Contact inquiry received:", parsed.data);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    return NextResponse.json({
      success: true,
      message: "Inquiry received.",
      data: parsed.data,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong while submitting the inquiry.",
      },
      { status: 500 }
    );
  }
}
