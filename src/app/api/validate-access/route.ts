import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { accessKey } = await request.json();

		if (!accessKey) {
			return NextResponse.json({ valid: false, message: "Access key is required" }, { status: 400 });
		}

		const validAccessKey = process.env.ACCESS_KEY;

		if (!validAccessKey) {
			console.error("ACCESS_KEY environment variable is not set");
			return NextResponse.json(
				{ valid: false, message: "Server configuration error" },
				{ status: 500 }
			);
		}

		const isValid = accessKey === validAccessKey;

		return NextResponse.json({ valid: isValid });
	} catch (error) {
		console.error("Error validating access key:", error);
		return NextResponse.json({ valid: false, message: "Internal server error" }, { status: 500 });
	}
}
