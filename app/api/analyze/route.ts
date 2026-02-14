import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.FASTAPI_BACKEND_URL || "http://127.0.0.1:8000"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Forward the form data to FastAPI backend
    const response = await fetch(`${BACKEND_URL}/ayc/uploadaudio/`, {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { success: false, error: errorText || "Backend analysis failed" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? `Cannot reach backend: ${error.message}`
            : "Cannot reach backend server",
      },
      { status: 502 }
    )
  }
}
